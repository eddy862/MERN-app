import mongoose, { Document, Schema } from "mongoose";

interface IBaseUser extends Document {
  email: string;
  createdAt: Date;
}

export interface IUser extends IBaseUser {
  username?: string;
  googleId?: string;
  displayName?: string;
  password?: string;
}

export interface ILocalUser extends IBaseUser {
  username: string;
  password: string;
}

export interface IGoogleUser extends IBaseUser {
  googleId: string;
  displayName: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, unique: true },
  googleId: { type: String },
  displayName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
