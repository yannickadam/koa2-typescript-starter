/**
 *  
 *
 */
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string; 
  password: string; 
};

export const UserSchema = new mongoose.Schema({
  name: {type:String, required: true},
  password: {type:String, required: false},
});

export const User = mongoose.model<IUser>('User', UserSchema);