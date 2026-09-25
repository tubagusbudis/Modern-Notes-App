import { Request, Response } from 'express';
import pool from '../db';

// Hardcoded default user ID since auth was removed
const DEFAULT_USER_ID = 1;

export const getNotes = async (req: Request, res: Response) => {
  const { q, filter } = req.query;
  
  try {
    let queryText = `
      SELECT id, title, content, preview, tags, 
             is_pinned AS "isPinned", 
             is_favorite AS "isFavorite", 
             color_variant AS "colorVariant", 
             image_url AS "imageUrl",
             file_url AS "fileUrl",
             created_at AS "createdAt", 
             updated_at AS "updatedAt", 
             deleted_at AS "deletedAt"
      FROM notes 
      WHERE user_id = $1
    `;
    const values: any[] = [DEFAULT_USER_ID];
    let paramIndex = 2;
    
    // Filter logic
    if (filter === 'trash') {
      queryText += ` AND deleted_at IS NOT NULL`;
    } else {
      queryText += ` AND deleted_at IS NULL`;
      if (filter === 'pinned') {
        queryText += ` AND is_pinned = true`;
      } else if (filter === 'favorites') {
        queryText += ` AND is_favorite = true`;
      }
    }

    // Search logic
    if (q && typeof q === 'string') {
      queryText += ` AND (title ILIKE $${paramIndex} OR content ILIKE $${paramIndex})`;
      values.push(`%${q}%`);
      paramIndex++;
    }

    queryText += ` ORDER BY is_pinned DESC, updated_at DESC`;

    const result = await pool.query(queryText, values);
    
    const mappedRows = result.rows.map(row => {
      if (!row.preview && row.content) {
        row.preview = row.content.substring(0, 50) + (row.content.length > 50 ? '...' : '');
      }
      return row;
    });

    res.json({ success: true, data: mappedRows });
  } catch (error) {
    console.error('Error in getNotes:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT id, title, content, preview, tags, 
             is_pinned AS "isPinned", 
             is_favorite AS "isFavorite", 
             color_variant AS "colorVariant", 
             image_url AS "imageUrl",
             file_url AS "fileUrl",
             created_at AS "createdAt", 
             updated_at AS "updatedAt", 
             deleted_at AS "deletedAt"
      FROM notes 
      WHERE id = $1 AND user_id = $2
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    const note = result.rows[0];
    if (!note.preview && note.content) {
      note.preview = note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '');
    }

    res.json({ success: true, data: note });
  } catch (error) {
    console.error('Error in getNote:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content, preview, tags, isPinned, isFavorite, colorVariant } = req.body;
  
  let imageUrl = null;
  let fileUrl = null;

  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files['image'] && files['image'][0]) {
      imageUrl = `/uploads/${files['image'][0].filename}`;
    }
    if (files['file'] && files['file'][0]) {
      fileUrl = `/uploads/${files['file'][0].filename}`;
    }
  }

  let parsedTags = tags;
  if (typeof tags === 'string') {
    try { parsedTags = JSON.parse(tags); } catch { parsedTags = [tags]; }
  }

  try {
    const result = await pool.query(`
      INSERT INTO notes (user_id, title, content, preview, tags, is_pinned, is_favorite, color_variant, image_url, file_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, title, content, preview, tags, 
                is_pinned AS "isPinned", 
                is_favorite AS "isFavorite", 
                color_variant AS "colorVariant", 
                image_url AS "imageUrl",
                file_url AS "fileUrl",
                created_at AS "createdAt", 
                updated_at AS "updatedAt", 
                deleted_at AS "deletedAt"
    `, [
      DEFAULT_USER_ID,
      title || '',
      content || '',
      preview || '',
      parsedTags || [],
      isPinned === 'true' || isPinned === true,
      isFavorite === 'true' || isFavorite === true,
      colorVariant || 'default',
      imageUrl,
      fileUrl
    ]);

    const note = result.rows[0];
    if (!note.preview && note.content) {
      note.preview = note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '');
    }

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    console.error('Error in createNote:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, preview, tags, isPinned, isFavorite, colorVariant, removeImage, removeFile } = req.body;
  
  let imageUrl: string | null | undefined = undefined;
  let fileUrl: string | null | undefined = undefined;

  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files['image'] && files['image'][0]) {
      imageUrl = `/uploads/${files['image'][0].filename}`;
    }
    if (files['file'] && files['file'][0]) {
      fileUrl = `/uploads/${files['file'][0].filename}`;
    }
  }

  if (removeImage === 'true' && imageUrl === undefined) {
    imageUrl = null;
  }
  if (removeFile === 'true' && fileUrl === undefined) {
    fileUrl = null;
  }

  let parsedTags = tags;
  if (typeof tags === 'string') {
    try { parsedTags = JSON.parse(tags); } catch { parsedTags = [tags]; }
  }
  
  try {
    // Basic dynamic update query
    const fields = [];
    const values: any[] = [id, DEFAULT_USER_ID];
    let paramIndex = 3;

    if (title !== undefined) { fields.push(`title = $${paramIndex++}`); values.push(title); }
    if (content !== undefined) { fields.push(`content = $${paramIndex++}`); values.push(content); }
    if (preview !== undefined) { fields.push(`preview = $${paramIndex++}`); values.push(preview); }
    if (parsedTags !== undefined) { fields.push(`tags = $${paramIndex++}`); values.push(parsedTags); }
    if (isPinned !== undefined) { fields.push(`is_pinned = $${paramIndex++}`); values.push(isPinned === 'true' || isPinned === true); }
    if (isFavorite !== undefined) { fields.push(`is_favorite = $${paramIndex++}`); values.push(isFavorite === 'true' || isFavorite === true); }
    if (colorVariant !== undefined) { fields.push(`color_variant = $${paramIndex++}`); values.push(colorVariant); }
    if (imageUrl !== undefined) { fields.push(`image_url = $${paramIndex++}`); values.push(imageUrl); }
    if (fileUrl !== undefined) { fields.push(`file_url = $${paramIndex++}`); values.push(fileUrl); }
    
    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (fields.length === 1) { // only updated_at
      return res.status(400).json({ success: false, error: { message: 'No fields to update' } });
    }

    const queryText = `
      UPDATE notes
      SET ${fields.join(', ')}
      WHERE id = $1 AND user_id = $2
      RETURNING id, title, content, preview, tags, 
                is_pinned AS "isPinned", 
                is_favorite AS "isFavorite", 
                color_variant AS "colorVariant", 
                image_url AS "imageUrl",
                file_url AS "fileUrl",
                created_at AS "createdAt", 
                updated_at AS "updatedAt", 
                deleted_at AS "deletedAt"
    `;

    const result = await pool.query(queryText, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    const note = result.rows[0];
    if (!note.preview && note.content) {
      note.preview = note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '');
    }

    res.json({ success: true, data: note });
  } catch (error) {
    console.error('Error in updateNote:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Soft delete
    const result = await pool.query(`
      UPDATE notes
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    // Following frontend standard to return 204
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteNote:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const restoreNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      UPDATE notes
      SET deleted_at = NULL
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    res.json({ success: true, data: { restored: true } });
  } catch (error) {
    console.error('Error in restoreNote:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const permanentDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      DELETE FROM notes
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error in permanentDelete:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const togglePin = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      UPDATE notes
      SET is_pinned = NOT is_pinned
      WHERE id = $1 AND user_id = $2
      RETURNING is_pinned AS "isPinned"
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in togglePin:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};

export const toggleFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      UPDATE notes
      SET is_favorite = NOT is_favorite
      WHERE id = $1 AND user_id = $2
      RETURNING is_favorite AS "isFavorite"
    `, [id, DEFAULT_USER_ID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { message: 'Note not found' } });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
    res.status(500).json({ success: false, error: { message: 'Server Error' } });
  }
};
