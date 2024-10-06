import mongoose from "mongoose";

export enum ResourceType {
  VIDEO = "VIDEO",
  PDF = "PDF",
  LINK = "LINK",
  IMAGE = "IMAGE",
}

export interface IResource extends Document {
  type: ResourceType;
  url: string;
  lesson: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const resourceSchema = new mongoose.Schema<IResource>({
  type: {
    type: String,
    enum: ResourceType,
    required: [true, "Resource type is required"],
  },
  url: {
    type: String,
    required: [true, "Resource URL is required"],
    trim: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: [true, "Associated lesson is required"],
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

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);

export default Resource;
