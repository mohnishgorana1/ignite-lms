"use server";

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course.model";
import Enrollment from "@/models/enrollment.model";
import { revalidatePath } from "next/cache";

export const createEnrollmentAction = async (
  courseId: string,
  userId: string,
  userAuthId: string,
  pathToRevalidate: string
) => {
  await dbConnect();

  if (!courseId || !userAuthId || !userId) {
    return {
      status: 500,
      success: false,
      message: `Invalid | Missing Request Data`,
    };
  }

  try {
    const newEnrollment = await Enrollment.create({
      user: userId,
      userAuthId: userAuthId,
      course: courseId,
    });

    // Find the course by the associatedCourse ID and update it with adding new Enrollment in it
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { enrollments: newEnrollment._id } }, // Add the new enrollment to the course's enrollement array
      { new: true } // Return the updated course
    )

    if (!updatedCourse) {
      return {
        status: 500,
        success: false,
        message: `No Such Course Found to add user enrollment in it`,
        course: JSON.parse(JSON.stringify([])),
      };
    }

    console.log("updated course details after enrollment added", updatedCourse);

    revalidatePath(pathToRevalidate);
    return {
      status: 200,
      success: true,
      message: `User Successfully Enrolled`,
      course: JSON.parse(JSON.stringify(updatedCourse)),
    };
  } catch (error) {
    console.error("Error in enrollment process:", error);
    return {
      status: 500,
      success: false,
      message: `Error in enrollment process`,
      course: JSON.parse(JSON.stringify([])),
    };
  }
};
