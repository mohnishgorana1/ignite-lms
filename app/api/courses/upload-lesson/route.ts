import { UploadFileToCloudinary } from "@/actions/cloudinary.action";
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course.model";
import Lesson from "@/models/lesson.model";
import Module from "@/models/module.model";
import mongoose from "mongoose";

const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = String(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
);

export async function POST(req: Request, res: Response) {
  await dbConnect();

  const formData = await req.formData();

  const lessonFile = formData.get("lessonFile") as File;
  const lessonTitle = formData.get("lessonTitle") as string;
  const lessonDescription = formData.get("lessonDescription") as string;

  const moduleId = formData.get("moduleId") as string;

  console.log(formData);

  // validations

  if (!lessonFile || !lessonDescription || !lessonTitle || !moduleId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid or Missing Data : Can't Create Course",
      }),
      { status: 400 }
    );
  }

  try {
    // file handling Uploading to Cloudinary
    console.log("uploading to cloudinary");

    const data: any = await UploadFileToCloudinary(lessonFile, "IgniteLMS");
    console.log("data", data);

    const { asset_id, public_id, secure_url } = data;
    let downloadUrl;
    if (
      lessonFile.type == "text/plain" ||
      lessonFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      downloadUrl = `https://res.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload/${public_id}.${extension}`;
    } else {
      downloadUrl = `https://res-console.cloudinary.com/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/media_explorer_thumbnails/${asset_id}/download`;
    }

    console.log("DOWNLOAD URL ", downloadUrl);

    // file uploaded now create course with that file

    const newLesson = await new Lesson({
      lessonTitle: lessonTitle,
      lessonDescription: lessonDescription,
      lessonUrl: {
        public_id: data?.public_id,
        secure_url: data?.secure_url,
        download_url: downloadUrl,
      },
      module: moduleId,
      freePreview: false,
      resources: [],
    });

    await newLesson.save();
    console.log("lesson added success", newLesson);

    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { $push: { lessons: newLesson._id } },
      { new: true }
    ).populate("lessons");

    if (!updatedModule) {
      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Module not found. Lesson created but not linked to any module.",
        }),
        { status: 500 }
      );
    }

    console.log("Updated Module:", updatedModule);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lesosn Added Successfully",
        newLesson,
      }),

      { status: 201 }
    );
  } catch (error) {
    console.log("Error: Can't add lesson", error);

    return new Response(
      JSON.stringify({ success: false, message: "Error: Can't add lesson" }),
      { status: 500 }
    );
  }
}
