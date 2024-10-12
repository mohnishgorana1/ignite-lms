"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import "../../app/globals.css";

function ViewCourseDetailDialog({
  isViewCourseDetailDialogOpen,
  course,
  onClose,
}: any) {
  return (
    <Dialog open={isViewCourseDetailDialogOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black h-[80vh] w-[100vw] sm:w-[90vw] min-h-max max-h-[90vh] px-2 sm:px-4 py-8 sm:py-8 ">
        <div className="flex sm:flex-row flex-col sm:justify-between p-4 sm:px-8 gap-y-3 overflow-auto dialog-scrollbar px-2 pr-4">
          <DialogHeader className="space-y-4 flex flex-col items-start gap-y-10">
            <DialogTitle className="w-full">
              <h1 className="text-start sm:text-center text-lg sm:text-2xl">{course?.title}</h1>
            </DialogTitle>
            <DialogDescription className="grid sm:grid-cols-5 sm:gap-x-16 gap-y-4">
              <div className="sm:col-span-3 flex flex-col items-start gap-y-4 sm:pr-12">
                <p className="flex flex-col items-start">
                  <span className="font-bold text-lg ">Course Description</span>
                  <span className="text-justify opacity-60">
                    {course?.description}
                  </span>
                </p>
                <p className="flex flex-col items-start">
                  <span className="font-bold text-lg ">
                    Course Welcome Message
                  </span>
                  <span className="text-justify opacity-60">
                    {course?.welcomeMessage}
                  </span>
                </p>
                <p className="flex flex-col items-start">
                  <span className="font-bold text-lg ">Course Category</span>
                  <span className="text-justify opacity-60">
                    {course?.category}
                  </span>
                </p>
                <p className="flex flex-col items-start">
                  <span className="font-bold text-lg ">Course Pricing</span>
                  <span className="text-justify opacity-60">
                    Rs. {course?.pricing}
                  </span>
                </p>
              </div>
              <div className="sm:col-span-2 flex flex-col items-start gap-y-2 sm:gap-y-4">
                <span className="font-bold text-lg ">Course Thumbnail</span>
                <span className="w-full flex items-center justify-center mx-auto">
                  <Image
                    src={course?.courseThumbnail?.secure_url}
                    width={500}
                    height={500}
                    alt="course-thumbnial "
                    className="w-full h-[180px] object-fit rounded-xl"
                  />
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewCourseDetailDialog;
