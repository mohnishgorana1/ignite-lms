"use server";

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/course.model";
import Module from "@/models/module.model"; // Ensure Module model is imported
import Lesson from "@/models/lesson.model"; // Ensure Lesson model is imported
import { revalidatePath } from "next/cache";
import { Role } from "@/models/user.model";
import Enrollment from "@/models/enrollment.model";
import mongoose from "mongoose";

export const fetchAllCourseAction = async () => {
  await dbConnect();
  const courseList = await Course.find()
    .populate("instructor")
    .populate("enrollments")
    .exec();

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
  const course = await Course.findById(courseId)
    .populate("instructor")
    .populate("enrollments")
    .exec();

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

export const updateSingleCoursePricingAction = async (
  courseId: string,
  priceToUpdate: string | number,
  pathToRevalidate: string
) => {
  await dbConnect();
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      pricing: Number(priceToUpdate),
    },
    {
      new: true,
    }
  );

  if (!updatedCourse) {
    return {
      status: 500,
      success: false,
      message: `No Such Course Found`,
      course: JSON.parse(JSON.stringify([])),
    };
  }

  console.log("updated price", updatedCourse);

  return {
    status: 200,
    success: true,
    message: `Course Price Updated Successfully`,
    course: JSON.parse(JSON.stringify(updatedCourse)),
  };
};

export const updateSingleCourseDetailsAction = async (
  courseId: string,
  courseUpdateData: any,
  pathToRevalidate: string
) => {
  await dbConnect();
  const { title, description, category, welcomeMessage, pricing } =
    courseUpdateData;

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      title,
      description,
      category,
      welcomeMessage,
      pricing,
    },
    {
      new: true,
    }
  );

  if (!updatedCourse) {
    return {
      status: 500,
      success: false,
      message: `No Such Course Found`,
      course: JSON.parse(JSON.stringify([])),
    };
  }

  console.log("updated course details", updatedCourse);

  return {
    status: 200,
    success: true,
    message: `Course Updated Successfully`,
    course: JSON.parse(JSON.stringify(updatedCourse)),
  };
};

export const addModuleToCourseAction = async (
  data: any,
  pathToRevalidate: string
) => {
  await dbConnect();
  const { title, associatedCourse } = data;

  try {
    const newModule = await Module.create({
      title,
      associatedCourse,
    });

    // Find the course by the associatedCourse ID and update it

    const updatedCourse = await Course.findByIdAndUpdate(
      associatedCourse,
      { $push: { modules: newModule._id } }, // Add the new module to the course's modules array
      { new: true } // Return the updated course
    ).populate("modules");

    if (!updatedCourse) {
      return {
        status: 500,
        success: false,
        message: `No Such Course Found`,
        course: JSON.parse(JSON.stringify([])),
      };
    }

    console.log("updated course details after module added", updatedCourse);

    revalidatePath(pathToRevalidate);
    return {
      status: 200,
      success: true,
      message: `Course Updated Successfully`,
      course: JSON.parse(JSON.stringify(updatedCourse)),
    };
  } catch (error) {
    console.error("Error adding module to course:", error);
    return {
      status: 500,
      success: false,
      message: `Error adding module to course`,
      course: JSON.parse(JSON.stringify([])),
    };
  }
};

export const fetchCourseModulesAndLecturesAction = async (courseId: string) => {
  await dbConnect();

  const fetchedCourse = await Course.findById(courseId)
    .populate({
      path: "modules",
      model: "Module", // Explicitly reference the "Module" model
      populate: {
        path: "lessons",
        model: "Lesson",
      },
    })
    .exec();

  if (!fetchedCourse) {
    return {
      status: 500,
      success: false,
      message: `No Such Course Found`,
      course: JSON.parse(JSON.stringify([])),
    };
  }

  console.log(" fetched course module details", fetchedCourse);

  return {
    status: 200,
    success: true,
    message: `Course Created Successfully`,
    course: JSON.parse(JSON.stringify(fetchedCourse)),
  };
};

export const toggleFreePreviewAction = async (
  lessonId: string,
  toggleStatus: boolean
) => {
  await dbConnect();

  try {
    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { freePreview: toggleStatus },
      { new: true }
    );

    if (!lesson) {
      return {
        status: 500,
        success: false,
        message: `No Such Lesson Found`,
        course: JSON.parse(JSON.stringify([])),
      };
    }

    console.log("updated Lesson Free Preview", lesson);

    return {
      status: 200,
      success: true,
      message: `Free Preview Status Updated Successfully`,
      lesson: JSON.parse(JSON.stringify(lesson)),
    };
  } catch (error) {
    console.error("Error Toggling Free Preview Status", error);
    return {
      status: 500,
      success: false,
      message: `Error Toggling Free Preview Status`,
      course: JSON.parse(JSON.stringify([])),
    };
  }
};

export const fetchMyCourses = async (userId: string, role: string) => {
  if (!userId || !role) {
    return {
      status: 500,
      success: false,
      message: `Invalid | Missing Request Data`,
      courses: JSON.parse(JSON.stringify([])),
    };
  }

  await dbConnect();

  try {
    let enrolledCourses = [];
    let createdCourses = [];

    if (role === Role.INSTRUCTOR) {
      createdCourses = await Course.find({
        instructor: new mongoose.Types.ObjectId(userId),
      }).select("title description courseThumbnail pricing");
    }

    const enrollments = await Enrollment.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .select("course")
      .populate({
        path: "course",
        select: "title description courseThumbnail pricing category",
      });
    console.log("enrollments", enrollments);

    enrolledCourses = enrollments.map((enrollment) => enrollment.course); // because i need courses only

    console.log("Created courses", createdCourses);
    console.log("enrolled courses", enrolledCourses);

    return {
      status: 200,
      success: true,
      message: `Courses Fetched Successfully`,
      enrolledCourses: JSON.parse(JSON.stringify(enrolledCourses)),
      createdCourses: JSON.parse(JSON.stringify(createdCourses)),
    };
  } catch (error) {
    console.error("Error Fetching Courses", error);

    return {
      status: 500,
      success: false,
      message: `Error Fetching Courses`,
      enrolledCourses: JSON.parse(JSON.stringify([])),
      createdCourses: JSON.parse(JSON.stringify([])),
    };
  }
};

export const fetchSingleCourseEnrollmentAction = async (courseId: string) => {
  await dbConnect();

  if (!courseId) {
    return {
      status: 400,
      success: false,
      message: `Missing Course Id`,
      enrollments: []
    };
  }

  try {
    const enrollments = await Enrollment.find({ course: courseId })
      .populate({
        path: "user",
        model: "User",
        select: "name email",
      })
      .exec();

    if (!enrollments || enrollments.length === 0) {
      return {
        status: 500,
        success: false,
        message: `No student enrolled to your course`,
        enrollments: [],
      };
    }
    console.log("enrollment list", enrollments);
    
    return {
      status: 200,
      success: true,
      message: `Course Enrollent List Fetched Successfully`,
      enrollments: JSON.parse(JSON.stringify(enrollments)),
    };
  } catch (error) {
    console.error("Error Fetching Course Enrollment List", error);
    return {
      status: 500,
      success: false,
      message: `Error Fetching Course Enrollment List`,
      enrollments: [],
    };
  }
};
