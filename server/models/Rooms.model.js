import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const genericType = {
  require: true,
  type: String,
};

//candidate for positionSchema
const candidate = new Schema({
  name: genericType,
  imageUrl: genericType,
});

// position for roomSchema
const positon = new Schema({
  name: genericType,
  candidates: [candidate],
  totalVotes: {
    type: Number,
    require: false,
  },
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
    expiration: { type: Date },
    votingDetails: [positon],
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
