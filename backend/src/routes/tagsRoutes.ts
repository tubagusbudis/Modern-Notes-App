import { Router } from 'express';
import { getTags, createTag, updateTag, deleteTag } from '../controllers/tagsController';

const router = Router();

router.get('/', getTags);
router.post('/', createTag);
router.patch('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
