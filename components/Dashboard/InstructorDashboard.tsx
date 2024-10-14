// can view their made courses, link to manage them , request to change instructor
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

// can see enrolled courses
function InstructorDashboard({
  profileInfo,
  createdCourses,
  enrolledCourses,
}: any) {
  const [activeTab, setActiveTab] = useState<
    "createdCourses" | "enrolledCourses"
  >("createdCourses");

  useEffect(() => {
    console.log("courses", createdCourses, enrolledCourses);
  }, [enrolledCourses, createdCourses]);
  return (
    <main className="mt-3">
      <section className="space-y-4">
        <Tabs
          defaultValue="createdCourses"
          className="w-full flex flex-col items-center gap-y-3"
        >
          <TabsList className="w-full flex gap-x-2">
            <TabsTrigger
              value="createdCourses"
              className={`w-full text-sm sm:text-lg border rounded-lg ${
                activeTab === "createdCourses" && "bg-orange-600 text-white"
              }`}
              onClick={() => setActiveTab("createdCourses")}
            >
              Created Courses
            </TabsTrigger>
            <TabsTrigger
              value="enrolledCourses"
              className={`w-full text-sm sm:text-lg border rounded-lg ${
                activeTab === "enrolledCourses" && "bg-orange-600 text-white"
              }`}
              onClick={() => setActiveTab("enrolledCourses")}
            >
              Enrolled Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="createdCourses" className="my-4 py-4">
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 ">
                {createdCourses &&
                  createdCourses.map((course: any) => {
                    const { _id, title, pricing, courseThumbnail, category } =
                      course;

                    return (
                      <div
                        key={_id}
                        // href={`/courses/${_id}`}
                        className="min-h-[300px] cursor-pointer rounded-lg hover:shadow-md duration-300 hover:shadow-[#5d5d5e] "
                      >
                        <div className="bg-[#151515] px-4 py-4 flex flex-col gap-2 rounded-lg">
                          <Image
                            src={courseThumbnail?.secure_url}
                            width={500}
                            height={500}
                            alt="course-thumbnial "
                            className="w-full object-fit rounded-xl"
                          />
                          <section className="flex flex-col relative justify-between gap-y-2">
                            <div className="flex flex-col items-start gap-y-2 ">
                              <h1 className="text-lg font-semibold line-clamp-2">
                                {title}
                              </h1>
                              <h2 className="text-sm"> {category}</h2>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                              <Link
                                href={`/courses/${_id}/view-course`}
                                className="w-full "
                              >
                                <Button className="w-full h-8 sm:h-10 font-medium font-sans border border-pink-700 text-pink-700 hover:border-pink-600">
                                  View Course
                                </Button>
                              </Link>
                              <Link
                                href={`/courses/${_id}/manage-course`}
                                className="w-full "
                              >
                                <Button className="w-full h-8 sm:h-10 font-medium font-sans border border-pink-700 text-pink-700 hover:border-pink-600">
                                  Manage Course
                                </Button>
                              </Link>
                            </div>
                          </section>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="enrolledCourses" className="my-4 py-4">
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {enrolledCourses &&
                  enrolledCourses.map((course: any) => {
                    const { _id, title, pricing, courseThumbnail, category } =
                      course;

                    return (
                      <Link
                        key={_id}
                        href={`/courses/${_id}`}
                        className="min-h-[300px] cursor-pointer rounded-lg hover:shadow-md duration-300 hover:shadow-[#5d5d5e] "
                      >
                        <div className="bg-[#151515] px-4 py-4 flex flex-col gap-2 rounded-lg">
                          <Image
                            src={courseThumbnail?.secure_url}
                            width={500}
                            height={500}
                            alt="course-thumbnial "
                            className="w-full object-fit rounded-xl"
                          />
                          <section className="flex flex-col relative justify-between gap-y-2">
                            <div className="flex flex-col items-start gap-y-2 ">
                              <h1 className="text-lg font-semibold line-clamp-2">
                                {title}
                              </h1>
                              <h2 className="text-sm"> {category}</h2>
                            </div>
                            <Link
                              href={`/courses/${_id}/view-course`}
                              className="w-full "
                            >
                              <Button className="w-full h-8 sm:h-10 font-bold bg-pink-700 text-white hover:bg-pink-600">
                                View Course
                              </Button>
                            </Link>
                          </section>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default InstructorDashboard;
