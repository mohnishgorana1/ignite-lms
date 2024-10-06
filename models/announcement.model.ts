import mongoose from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  content: string;

  course: mongoose.Types.ObjectId;
  
  instructor: mongoose.Types.ObjectId;
  instructorId: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const announcementSchema = new mongoose.Schema<IAnnouncement>({
  title: {
    type: String,
    required: [true, "Announcement title is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Announcement content is required"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Associated course is required"],
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author (Instructor) is required"],
  },
  instructorId: {
    type: String,
    required: [true, "Author (Instructor) ID is required"],
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default Announcement;
