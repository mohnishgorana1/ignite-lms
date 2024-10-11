import { fetchSingleCourseAction } from "@/actions/course.action";
import CourseDetailsComponent from "@/components/CourseDetailsComponent";
import React from "react";

// course details page
// here student can enroll to this course having unique [courseId]

async function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId;
  const fetchedCourse = await fetchSingleCourseAction(courseId);
  console.log("fetched course", fetchedCourse);

  const fetchedcourse = {
    status: 200,
    success: true,
    message: "Course Created Successfully",
    course: {
      courseThumbnail: {
        public_id: "IgniteLMS/xn0oszec4r8igo9tsimp",
        secure_url:
          "https://res.cloudinary.com/dagszmhdo/image/upload/v1728563654/IgniteLMS/xn0oszec4r8igo9tsimp.png",
        download_url:
          "https://res-console.cloudinary.com/dagszmhdo/media_explorer_thumbnails/ed61083040a1d98d43eb94579e7c9058/download",
      },
      _id: "6707c9c8cc311e0c0e7f7e5a",
      instructor: {
        _id: "67068040691f3a621d5b7de4",
        userAuthId: "user_2nCZwcruh00YNSq0vl6bOC1lwf2",
        name: "Mohnish Gorana Instructor",
        email: "mohnishgorana430@gmail.com",
        role: "INSTRUCTOR",
        courses: [],
        enrollments: [],
        deletedAt: null,
        createdAt: "2024-10-09T13:08:16.132Z",
        __v: 0,
      },
      instructorAuthId: "user_2nCZwcruh00YNSq0vl6bOC1lwf2",
      title: "The Complete Python Course | Learn Python by Doing in 2024",
      welcomeMessage:
        "Go from Beginner to Expert in Python by building projects. The best investment for your Python journey!",
      description:
        "Interact with REST APIs using Python and build a currency converter! , Automate extracting data from websites using web scraping libraries like BeautifulSoup and Selenium., Interact with REST APIs using Python and build a currency converter!, Learn how to write desktop applications with Python and Tkinter",
      category: "Technology",
      pricing: 500,
      modules: [],
      enrollments: [],
      deletedAt: null,
      createdAt: "2024-10-10T12:34:16.169Z",
      __v: 0,
    },
  };

  const {
    _id,
    instructor,
    title,
    welcomeMessage,
    description,
    category,
    pricing,
    courseThumbnail,
  } = fetchedCourse.course;

  if (fetchedCourse.success) {
    return (
      <main className="flex flex-col gap-y-2">
        <CourseDetailsComponent course = {fetchedCourse.course} />
      </main>
    );
  }
}

export default CourseDetailsPage;
