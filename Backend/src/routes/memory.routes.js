import { Router } from 'express';
import {
    createMemory, getMemories, getMemoryById,
    updateMemory, deleteMemory, toggleFavorite
} from '../controllers/memory.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { verifyAuth } from '../middleware/verifyAuth.middleware.js';

const memoryRouter = Router();

memoryRouter.use(verifyAuth);

memoryRouter.route("/")
    .get(getMemories)
    .post(upload.single("media"), createMemory);

memoryRouter.route("/:id")
    .get(getMemoryById)
    .patch(upload.single("media"), updateMemory)
    .delete(deleteMemory);

memoryRouter.route("/:id/favorite").patch(toggleFavorite);

export default memoryRouter;