import express from 'express';
import {
  createRoom,
  generateSignature,
} from '../controllers/room.controller.js';

const router = express.Router();

router.post('/', createRoom);
router.post('/get-signature', generateSignature);

export default router;
