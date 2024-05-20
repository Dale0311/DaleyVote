import express from 'express';
import {
  createRoom,
  uploadCandidatesImage,
} from '../controllers/room.controller.js';

const router = express.Router();

router.post('/', createRoom);
router.post('/upload-candidates-image', uploadCandidatesImage);

export default router;
