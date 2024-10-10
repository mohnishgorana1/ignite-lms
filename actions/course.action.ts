"use server";

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course.model";
import { CreateCourse } from "@/types";
import { revalidatePath } from "next/cache";

export const createCourseAction = async (
  newCourseFormData: CreateCourse,
  pathToRevalidate: string
) => {
  console.log("newCoursefromData", newCourseFormData);

  const {
    instructor,
    instructorAuthId,
    title,
    welcomeMessage,
    description,
    category,
    pricing,
    courseThumbnailFile,
  } = newCourseFormData;



  return "HELLO";
};


  //   if (
  //     !instructor ||
  //     !instructorAuthId ||
  //     !title ||
  //     !welcomeMessage ||
  //     !description ||
  //     !category ||
  //     !pricing ||
  //     !courseThumbnailFile
  //   ) {
  //     return {
  //       status: 500,
  //       success: false,
  //       message: `Error Creating Course : Invalid Data Passed`,
  //     };
  //   }


  //   try {
  //     await dbConnect();
  //     const newCourse = await Course.create(data);
  //     if (!newCourse) {
  //       return {
  //         status: 500,
  //         success: false,
  //         message: `Can't Create Your Course : Please try again later!`,
  //       };
  //     }
  //     console.log("New User", newCourse);
  //     revalidatePath(pathToRevalidate);

  //     return {
  //       status: 200,
  //       success: true,
  //       message: `Course Created Successfully`,
  //       newCourse: JSON.parse(JSON.stringify(newCourse)),
  //     };
  //   } catch (error) {
  //     console.log("Error Creating Course", error);
  //     return {
  //       status: 500,
  //       success: false,
  //       message: `Error Creating Course ${error}`,
  //     };
  //   }