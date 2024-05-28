import cloudinary from "../config/cloudinary.js";
import pLimit from "p-limit";
import { generateCode } from "../utils/generateCode.js";
import Room from "../models/Rooms.model.js";

const limit = pLimit(2);
export const createRoom = async (req, res, next) => {
  const { title, createdById, expiration, votingDetails } = req.body;

  if (!title || !createdById || !expiration || !votingDetails) {
    res.status(400);
    next(new Error("Bad request"));
  }
  // changed to uuid
  const code = generateCode();
  try {
    const positionsWithoutId = votingDetails.map((pos) => {
      const { _id, ...res } = pos;
      return res;
    });
    const roomConfig = {
      title,
      createdById,
      expiration,
      votingDetails: positionsWithoutId,
      code,
    };
    const response = await Room.create(roomConfig);
    res.json({ code: response.code, success: true });
  } catch (error) {
    res.status(500);
    next(new Error("Failed to save room config"));
  }
};

export const uploadCandidatesImage = async (req, res) => {
  const candidates = req.body;
  let toUploadImages;
  if (candidates.length > 0) {
    toUploadImages = candidates.map((candidate) => {
      const img = limit(async () => {
        return await cloudinary.uploader.upload(candidate.img, {
          folder: "candidates_picture",
        });
      });
      return img;
    });
  }

  const uploadedImages = await Promise.all(toUploadImages);
  const updatedData = candidates.map((c, i) => {
    const { public_id, secure_url } = uploadedImages[i];
    return { ...c, img: { public_id, secure_url } };
  });

  res.json(updatedData);
};
