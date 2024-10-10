import { fetchProfileAction } from "@/actions/user.action";
import CreateCourseForm from "@/components/Forms/CreateCourseForm";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

// "/courses/create-course"
// courses creation only by instructor : only instructor can access this poge
async function CreateCoursePage() {
  const authUser = await currentUser();

  const profileInfo = await fetchProfileAction(authUser?.id);
  return (
    <main className="w-full px-4 sm:px-8 my-2 min-h-[60vh] flex flex-col justify-between">
      <h1 className="w-full text-center font-semibold text-2xl sm:text-3xl md:text-4xl text-[#bab9b9] sm:tracking-wide font-serif">
        Create a New Course
      </h1>
      <section className="flex flex-col w-full mx-auto mt-8 md:mt-12">
        <CreateCourseForm profileInfo={profileInfo} />
      </section>
    </main>
  );
}

export default CreateCoursePage;
