import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const genericType = {
  require: true,
  type: String,
};

const userSchema = new Schema(
  {
    name: genericType,
    imageUrl: { require: false, type: String },
    password: genericType,
    email: genericType,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
