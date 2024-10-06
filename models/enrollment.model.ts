import mongoose from "mongoose";

export interface IEnrollment extends Document {
  user: mongoose.Types.ObjectId;
  userAuthId: string;

  course: mongoose.Types.ObjectId;
  

  progress: number; // 0-100
  completed: boolean;
  enrolledAt: Date;
  
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}


const enrollmentSchema = new mongoose.Schema<IEnrollment>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User (student) is required"],
  },
  userAuthId: {
    type: String,
    required: [true, "User Auth Id is required"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course is required"],
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
