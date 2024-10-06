import mongoose from "mongoose";

export interface IModule extends Document {
  title: string;
  associatedCourse: mongoose.Types.ObjectId;
  lessons: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const moduleSchema = new mongoose.Schema<IModule>({
  title: {
    type: String,
    required: [true, "Module title is required"],
    trim: true,
  },
  associatedCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Associated course is required"],
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  deletedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);

export default Module;
