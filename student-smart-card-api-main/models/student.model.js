import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
    },
    email: {
      type: String,
      required: [true, "must provide email"],
    },
    role: {
      type: String,
      default: "student",
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "must provide phone"],
    },
    address: {
      type: String,
      // required: [true, 'must provide address']
    },
    fee_paid: {
      type: Number,
      required: [true, "must provide fee_paid"],
    },
    specialty_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
    },
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],

    qrcode: {
      type: String,
      // required: [true, 'must provide qrcode']
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
