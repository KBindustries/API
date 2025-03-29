import mongoose from "mongoose";

const SpecialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
    },
    academic_year: {
      type: String,
      // match: /^\d{4}-\d{4}$/,
      required: [true, "must provide academic year"],
    },
    level: {
      type: Number,
      required: [true, "must provide level/year"],
    },
    total_fee: {
      type: Number,
      required: [true, "must provide fee"],
    },
    fees: {
      first_installment: Number,
      second_installment: Number,
      third_installment: Number,
    },
    fee_check: {
      type: Boolean,
      default: false,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    announcements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Announcement" },
    ],
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    weeklyTimetable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WeeklyTimetable",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Specialty", SpecialtySchema);
