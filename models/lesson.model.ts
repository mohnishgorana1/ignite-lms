import mongoose from "mongoose";

export interface ILesson extends Document {
  title: string;
  lessonDescription: string;

  lessonUrl: {
    public_id: string;
    secure_url: string;
    download_url: string;
  };
  
  freePreview: boolean;
  
  module: mongoose.Types.ObjectId;
  resources: mongoose.Types.ObjectId[];
  
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const lessonSchema = new mongoose.Schema<ILesson>({
  title: {
    type: String,
    required: [true, "Lesson title is required"],
    trim: true,
  },
  lessonDescription: {
    type: String, // Can store HTML, Markdown, etc.
    required: [true, "Lesson content is required"],
  },
  lessonUrl: {
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
  freePreview: {
    type: Boolean,
    default: false,
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: [true, "Associated module is required"],
  },
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
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

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

export default Lesson;
