"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ViewCourseDetailDialog from "./Dialogs/ViewCourseDetailDialog";
import UpdateCoursePricingDialog from "./Dialogs/UpdateCoursePricingDialog";
import UpdateCourseDetailsDialog from "./Dialogs/UpdateCourseDetailsDialog";
import ModuleList from "./ModuleList";
import { fetchCourseModulesAndLecturesAction } from "@/actions/course.action";
import AddModuleDialog from "./Dialogs/AddModuleDialog";

function CourseManagementComponent({ course, profileInfo }): any {
  const {
    _id,
    instructor,
    title,
    welcomeMessage,
    description,
    category,
    pricing,
    courseThumbnail,
  } = course;

  const [isViewCourseDetailDialogOpen, setIsViewCourseDetailDialogOpen] =
    useState(false);
  const [isUpdatePriceDialogOpen, setIsUpdatePriceDialogOpen] = useState(false);
  const [isUpdateCourseDetailsDialogOpen, setIsUpdateCourseDetailsDialogOpen] =
    useState(false);
  const [isManageStudentsDialogOpen, setIsManageStudentsDialogOpen] =
    useState(false);

  return (
    <section className="space-y-5">
      <header className="w-full grid grid-cols-2 gap-y-2 sm:grid-cols-4 sm:px-10 gap-x-2 sm:gap-x-5">
        <Button
          onClick={() => setIsViewCourseDetailDialogOpen(true)}
          className="px-2 sm:px-4 py-1 h-8 sm:h-9 border-transparent text-black bg-sky-400 hover:bg-blue-800"
        >
          View Course Details
        </Button>
        <Button
          onClick={() => setIsUpdatePriceDialogOpen(true)}
          className="px-2 sm:px-4 py-1 h-8 sm:h-9 border-transparent text-black bg-sky-400 hover:bg-blue-800"
        >
          Update Course Pricing
        </Button>
        <Button
          onClick={() => setIsUpdateCourseDetailsDialogOpen(true)}
          className="px-2 sm:px-4 py-1 h-8 sm:h-9 border-transparent text-black bg-sky-400 hover:bg-blue-800"
        >
          Update Course Details
        </Button>
        <Button
          onClick={() => setIsManageStudentsDialogOpen(true)}
          className="px-2 sm:px-4 py-1 h-8 sm:h-9 border-transparent text-black bg-sky-400 hover:bg-blue-800"
        >
          Manage Students
        </Button>
      </header>

      <section className="py-2 px-0">
        <div className="w-full flex flex-col gap-y-8">
          <ModuleList
            course={course}
            profileInfo={profileInfo}
            setCurrentLessonToPlay={null}
          />
        </div>
      </section>

      {/* dialogs */}
      <>
        <ViewCourseDetailDialog
          isViewCourseDetailDialogOpen={isViewCourseDetailDialogOpen}
          onClose={() => setIsViewCourseDetailDialogOpen(false)}
          course={course}
        />
        <UpdateCoursePricingDialog
          isUpdatePriceDialogOpen={isUpdatePriceDialogOpen}
          course={course}
          onClose={() => setIsUpdatePriceDialogOpen(false)}
        />
        <UpdateCourseDetailsDialog
          course={course}
          onClose={() => setIsUpdateCourseDetailsDialogOpen(false)}
          isUpdateCourseDetailsDialogOpen={isUpdateCourseDetailsDialogOpen}
        />
      </>
    </section>
  );
}

export default CourseManagementComponent;
