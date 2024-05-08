import express from 'express';
import { createUser, signin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);
router.post('/signin', signin);

export default router;
