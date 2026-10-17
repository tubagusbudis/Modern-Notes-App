import { Router } from 'express';
import {
  register,
  login,
  forgotPassword,
  me,
  updateUsername,
  updatePassword,
  deleteAccount,
} from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', authMiddleware, me);
router.put('/username', authMiddleware, updateUsername);
router.put('/password', authMiddleware, updatePassword);
router.delete('/account', authMiddleware, deleteAccount);

export default router;

