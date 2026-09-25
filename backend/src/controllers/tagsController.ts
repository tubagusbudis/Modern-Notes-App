import { Request, Response } from 'express';
import pool from '../db';

const DEFAULT_USER_ID = 1;

export const getTags = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, name, slug, created_at AS "createdAt"
      FROM tags
      WHERE user_id = $1
      ORDER BY name ASC
    `, [DEFAULT_USER_ID]);

    // Note: The frontend expects 'noteCount' for tags. We could JOIN or just return 0 for now for simplicity, 
    // or calculate it. Let's do a simple subquery.
    const tagsWithCountQuery = `
      SELECT t.id, t.name, t.slug, t.created_at AS "createdAt",
             (SELECT COUNT(*) FROM notes n WHERE t.name = ANY(n.tags) AND n.user_id = $1 AND n.deleted_at IS NULL)::int as "noteCount"
      FROM tags t
      WHERE t.user_id = $1
      ORDER BY t.name ASC
    `;
    const resultWithCount = await pool.query(tagsWithCountQuery, [DEFAULT_USER_ID]);

    res.json({ success: true, data: resultWithCount.rows });
  } catch (error) {
    console.error('Error in getTags:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ success: false, error: { message: 'Name is required' } });

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    const result = await pool.query(`
      INSERT INTO tags (user_id, name, slug)
      VALUES ($1, $2, $3)
      RETURNING id, name, slug, created_at AS "createdAt"
    `, [DEFAULT_USER_ID, name, slug]);

    res.status(201).json({ success: true, data: { ...result.rows[0], noteCount: 0 } });
  } catch (error) {
    console.error('Error in createTag:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (!name) return res.status(400).json({ success: false, error: { message: 'Name is required' } });
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  try {
    const result = await pool.query(`
      UPDATE tags
      SET name = $1, slug = $2
      WHERE id = $3 AND user_id = $4
      RETURNING id, name, slug, created_at AS "createdAt"
    `, [name, slug, id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Tag not found' } });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in updateTag:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      DELETE FROM tags
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Tag not found' } });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteTag:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};
