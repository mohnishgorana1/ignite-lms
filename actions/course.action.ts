"use server";

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course.model";

export const fetchAllCourseAction = async () => {
  await dbConnect();
  const courseList = await Course.find().populate("instructor").exec();

  if (!courseList) {
    return {
      status: 500,
      success: false,
      message: `No Course Found`,
      courseList: JSON.parse(JSON.stringify([])),
    };
  }

  console.log("Courselist", courseList);

  return {
    status: 200,
    success: true,
    message: `Course Created Successfully`,
    courseList: JSON.parse(JSON.stringify(courseList)),
  };
};

export const fetchSingleCourseAction = async (courseId: string) => {
  await dbConnect();
  const course = await Course.findById(courseId).populate("instructor").exec();

  if (!course) {
    return {
      status: 500,
      success: false,
      message: `No Such Course Found`,
      course: JSON.parse(JSON.stringify([])),
    };
  }

  console.log("course", course);

  return {
    status: 200,
    success: true,
    message: `Course Created Successfully`,
    course: JSON.parse(JSON.stringify(course)),
  };
};
