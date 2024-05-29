import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const genericType = {
  require: true,
  type: String,
};

//candidate for positionSchema
const candidate = new Schema({
  name: genericType,
  img: { public_id: String, secure_url: String },
});

// position for roomSchema
const position = new Schema({
  title: genericType,
  candidates: [candidate],
});

// participants for roomSchema
const participant = new Schema({
  socketId: genericType,
  userId: genericType,

  votes: [
    {
      position: genericType,
      votedFor: genericType,
    },
  ],
});

const roomSchema = new Schema(
  {
    title: genericType,
    participants: [participant],
    createdById: genericType,
    expiration: Date,
    code: String,
    votingDetails: [position],
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
