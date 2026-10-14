import { Router } from 'express';
import { getTags, createTag, updateTag, deleteTag } from '../controllers/tagsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// All tags routes require authentication
router.use(authMiddleware);

router.get('/', getTags);
router.post('/', createTag);
router.patch('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
