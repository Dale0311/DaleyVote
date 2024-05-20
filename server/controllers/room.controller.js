import cloudinary from '../config/cloudinary.js';
import pLimit from 'p-limit';

const limit = pLimit(2);
export const createRoom = (req, res) => {
  const { title, participant, createdById, duration } = req.body;
};

export const uploadCandidatesImage = async (req, res) => {
  const candidates = req.body;
  let toUploadImages;
  if (candidates.length > 0) {
    toUploadImages = candidates.map((candidate) => {
      const img = limit(async () => {
        return await cloudinary.uploader.upload(candidate.img, {
          folder: 'candidates_picture',
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
