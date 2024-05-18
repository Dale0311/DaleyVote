import cloudinary from '../config/cloudinary.js';

export const createRoom = (req, res) => {
  const { title, participant, createdById, duration } = req.body;
};

export const generateSignature = (req, res, next) => {
  const { folder } = req.body;
  // validation
  if (!folder) {
    res.status(400);
    return next(new Error('Bad request: Folder is required'));
  }

  // create timeStamp and apiKey
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiKey = cloudinary.config().api_key;
  const params = {
    timestamp,
    folder,
  };

  // create signature
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.API_SECRET
  );

  return res.json({ timestamp, apiKey, signature });
};

export const uploadImg = async (req, res, next) => {
  console.log(req.body);
  res.sendStatus(200);
};
