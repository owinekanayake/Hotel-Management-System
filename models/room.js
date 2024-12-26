import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomId: {
    type: Number,
    require: true,
    unique: true,
  },
  category: {
    type: String,
    require: true,
  },
  maxGuest: {
    type: Number,
    require: true,
    default: 3,
  },
  available: {
    type: Boolean,
    require: true,
    default: true,
  },
  photos: [
    {
      type: String,
    },
  ],
  specialDescription: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  timeStamp:{
    type : Date,
    default: Date.now
  }
});

const Room =  mongoose.model("Rooms",roomSchema);

export default Room;
