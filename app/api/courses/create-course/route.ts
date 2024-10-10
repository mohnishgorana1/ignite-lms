import { UploadFileToCloudinary } from "@/actions/cloudinary.action";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course.model";
import mongoose from "mongoose";

const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = String(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
);

export async function POST(req: Request, res: Response) {
  await dbConnect();

  const formData = await req.formData();

  const courseThumbnailFile = formData.get("courseThumbnailFile") as File;
  const instructor = formData.get("instructor") as string;
  const instructorAuthId = formData.get("instructorAuthId") as string;
  const title = formData.get("title") as string;
  const welcomeMessage = formData.get("welcomeMessage") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const pricing = formData.get("pricing") as string;


  console.log(formData);

    // validations

  if (
    !instructor ||
    !instructorAuthId ||
    !title ||
    !welcomeMessage ||
    !description ||
    !category ||
    !pricing ||
    !courseThumbnailFile
  ) {
    return new Response(
      JSON.stringify({
        message: "Invalid or Missing Data : Can't Create Course",
      }),
      { status: 400 }
    );
  }


  try {
    // file handling Uploading to Cloudinary
    console.log("uploading to cloudinary");
    
    const data: any = await UploadFileToCloudinary(
      courseThumbnailFile,
      "IgniteLMS"
    );
    console.log("data", data);

    const { asset_id, public_id, secure_url } = data;
    let downloadUrl;
    if (
      courseThumbnailFile.type == "text/plain" ||
      courseThumbnailFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      downloadUrl = `https://res.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload/${public_id}.${extension}`;
    } else {
      downloadUrl = `https://res-console.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/media_explorer_thumbnails/${asset_id}/download`;
    }

    console.log("DOWNLOAD URL ", downloadUrl);

    // file uploaded now create course with that file

    const newCourse = await new Course({
      instructor,
      instructorAuthId,
      title,
      welcomeMessage,
      description,
      category,
      pricing: Number(pricing),
      courseThumbnail: {
        public_id: data?.public_id,
        secure_url: data?.secure_url,
        download_url: downloadUrl,
      },
    });

    console.log("course before saving", newCourse);

    await newCourse.save();

    console.log("course created success", newCourse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Course Created Successfully",
        newCourse,
      }),

      { status: 201 }
    );
  } catch (error) {
    console.log("Error: Can't Create Course", error);

    return new Response(
      JSON.stringify({ message: "Error: Can't Create Course" }),
      { status: 500 }
    );
  }
}
