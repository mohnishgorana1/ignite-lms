import mongoose from "mongoose";

export interface ICertificate extends Document {
  user: mongoose.Types.ObjectId;
  userAuthId: string;

  course: mongoose.Types.ObjectId;

  certificateURL: string;
  
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new mongoose.Schema<ICertificate>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User (student) is required"],
  },
  userAuthId: {
    type: String,
    required: [true, "User Auth ID is required"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Associated course is required"],
  },
  certificateURL: {
    type: String,
    required: [true, "Certificate URL is required"],
    trim: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", CertificateSchema);

export default Certificate;
