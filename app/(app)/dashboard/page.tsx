import { fetchMyCourses } from "@/actions/course.action";
import { fetchProfileAction } from "@/actions/user.action";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import InstructorDashboard from "@/components/Dashboard/InstructorDashboard";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

// dashbopard page for all roles bases on user role type
// wee will render component
// like : studentDashboardComponent, adminDashb, instDashb...

async function DashboardPageForAllRoles() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }
  const profileInfo = await fetchProfileAction(user?.id);

  const { enrolledCourses, createdCourses } = await fetchMyCourses(
    profileInfo._id,
    profileInfo.role
  );

  // console.log("fetched coourses", enrolledCourses, createdCourses);

  return (
    <main className="">
      <header className="mx-auto mb-8">
        <h1 className="text-center text-bold text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-sans">
          {" "}
          <span className="capitalize">
            {profileInfo.role === "INSTRUCTOR" && "Instructor"}
            {profileInfo.role === "STUDENT" && "Student"}
            {profileInfo.role === "ADMIN" && "ADMIN"}
          </span>{" "}
          Dashboard
        </h1>
      </header>
      {/* dashboard */}
      <section>
        {profileInfo.role === "INSTRUCTOR" && (
          <InstructorDashboard
            profileInfo={profileInfo}
            enrolledCourses={enrolledCourses}
            createdCourses={createdCourses}
          />
        )}
        {profileInfo.role === "STUDENT" && (
          <StudentDashboard
            profileInfo={profileInfo}
            enrolledCourses={enrolledCourses}
          />
        )}
        {profileInfo.role === "ADMIN" && (
          <AdminDashboard profileInfo={profileInfo} />
        )}
      </section>
    </main>
  );
}

export default DashboardPageForAllRoles;
