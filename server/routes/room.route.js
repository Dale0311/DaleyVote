import express from "express";
import {
  createRoom,
  uploadCandidatesImage,
  userVotes,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/", createRoom);
router.put("/:roomId", userVotes);
router.post("/upload-candidates-image", uploadCandidatesImage);

export default router;
