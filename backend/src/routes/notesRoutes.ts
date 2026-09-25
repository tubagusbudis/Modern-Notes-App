import { Router } from 'express';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  restoreNote,
  permanentDelete,
  togglePin,
  toggleFavorite
} from '../controllers/notesController';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', getNotes);
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), createNote);
router.get('/:id', getNote);
router.patch('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), updateNote);
router.delete('/:id', deleteNote);

// Specific actions
router.post('/:id/restore', restoreNote);
router.delete('/:id/permanent', permanentDelete);
router.patch('/:id/pin', togglePin);
router.patch('/:id/favorite', toggleFavorite);

export default router;
