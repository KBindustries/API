import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },
    specialty: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Specialty',
      default: "all",
      required: false,
  }, 
  incident: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Incident'
    }],
  feedback: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Feedback'
    }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
