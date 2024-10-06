// models/Course.ts

import mongoose, { Document } from "mongoose";

export interface ICourse extends Document {
  instructor: mongoose.Types.ObjectId;
  instructorAuthId: string;

  pricing: number;
  category: string;
  title: string;
  welcomeMessage: string;
  description: string;
  
  courseThumbnail: {
    public_id: string;
    secure_url: string;
    download_url: string;
  };

  modules: mongoose.Types.ObjectId[];
  enrollments: mongoose.Types.ObjectId[];

  createdAt: Date;
  deletedAt?: Date | null;
}

const courseSchema = new mongoose.Schema<ICourse>({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Instructor is required"],
  },
  instructorAuthId: {
    type: String,
    required: [true, "Instructor Auth Id is required"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
  },
  welcomeMessage: {
    type: String,
    required: [true, "Course description is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Course category is required"],
    trim: true,
  },
  pricing: {
    type: Number,
    required: [true, "Course Price is required"],
    trim: true,
  },
  courseThumbnail: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    download_url: {
      type: String,
      required: true,
    },
  },
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
  enrollments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
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

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
