import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * Body: { username, password }
 */
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Username and password are required.' },
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 6 characters.' },
    });
  }

  try {
    // Check if username already exists
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: { code: 'CONFLICT', message: 'Username already taken.' },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at AS "createdAt"`,
      [username, hashedPassword]
    );

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      success: true,
      data: {
        user: { id: user.id, username: user.username, createdAt: user.createdAt },
        token,
      },
    });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  }
};

/**
 * POST /api/auth/login
 * Body: { username, password }
 */
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Username and password are required.' },
    });
  }

  try {
    const result = await pool.query(
      'SELECT id, username, password, created_at AS "createdAt" FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: { code: 'AUTH_FAILED', message: 'Invalid username or password.' },
      });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: 'AUTH_FAILED', message: 'Invalid username or password.' },
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      data: {
        user: { id: user.id, username: user.username, createdAt: user.createdAt },
        token,
      },
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  }
};

/**
 * POST /api/auth/forgot-password
 * Body: { username, newPassword }
 * Since there's no email, user provides username + new password directly.
 */
export const forgotPassword = async (req: Request, res: Response) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Username and new password are required.' },
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Password must be at least 6 characters.' },
    });
  }

  try {
    // Check if user exists
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found.' },
      });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await pool.query('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, username]);

    res.json({
      success: true,
      data: { message: 'Password updated successfully.' },
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  }
};

/**
 * GET /api/auth/me
 * Requires auth middleware. Returns the current user from the JWT token.
 */
export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
      });
    }

    const result = await pool.query(
      'SELECT id, username, created_at AS "createdAt" FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found.' },
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error in me:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  }
};

/**
 * PUT /api/auth/username
 * Body: { username }
 * Protected: Updates user's username if not duplicate.
 */
export const updateUsername = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
    });
  }

  const { username } = req.body;
  if (!username || typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Valid username is required.' },
    });
  }

  const trimmedUsername = username.trim();

  try {
    // Check if new username is already taken by another user
    const existing = await pool.query(
      'SELECT id FROM users WHERE username = $1 AND id != $2',
      [trimmedUsername, userId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'DUPLICATE_USERNAME', message: 'Username is already taken.' },
      });
    }

    // Update username
    const result = await pool.query(
      'UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, created_at AS "createdAt"',
      [trimmedUsername, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found.' },
      });
    }

    const updatedUser = result.rows[0];

    // Issue updated token with new username
    const token = jwt.sign({ id: updatedUser.id, username: updatedUser.username }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      data: {
        user: updatedUser,
        token,
        message: 'Username updated successfully.',
      },
    });
  } catch (error) {
    console.error('Error in updateUsername:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  }
};

/**
 * PUT /api/auth/password
 * Body: { currentPassword, newPassword }
 * Protected: Verifies current password and updates to new hashed password.
 */
export const updatePassword = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
    });
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Current password and new password are required.' },
    });
  }

  if (typeof newPassword !== 'string' || newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'New password must be at least 6 characters.' },
    });
  }

  try {
    const result = await pool.query('SELECT id, password FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found.' },
      });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_PASSWORD', message: 'Current password does not match.' },
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    res.json({
      success: true,
      data: { message: 'Password updated successfully.' },
    });
  } catch (error) {
    console.error('Error in updatePassword:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  }
};

/**
 * DELETE /api/auth/account
 * Protected: Deletes all notes (and tags) belonging to user_id, then deletes user.
 */
export const deleteAccount = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Not authenticated.' },
    });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Delete user's notes
    await client.query('DELETE FROM notes WHERE user_id = $1', [userId]);

    // Delete user's tags
    await client.query('DELETE FROM tags WHERE user_id = $1', [userId]);

    // Delete user
    const deleteResult = await client.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
    if (deleteResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'User not found.' },
      });
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      data: { message: 'Account deleted successfully.' },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in deleteAccount:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Internal server error.' },
    });
  } finally {
    client.release();
  }
};

