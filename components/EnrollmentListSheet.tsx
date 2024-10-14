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

function EnrollmentListSheet({
  isEnrollmentListSheetOpen,
  onClose,
  currentEnrollmentList,
}: any) {
  return (
    <Dialog open={isEnrollmentListSheetOpen} onOpenChange={onClose}>
      {/* Sheet content sliding from the right */}
      <DialogContent className="bg-black w-[90vw] sm:w-[70vw] md:w-[50vw] p-0 h-[400px] min-h-[400px] max-h-[85vh] ">
        <div className="overflow-auto dialog-scrollbar py-10 px-2 ">
          <DialogHeader>
            <DialogTitle className="w-full px-8 flex justify-between items-baseline mb-2 ">
              <h1 className="text-3xl text-orange-700 opacity-85">
                Enrollment List
              </h1>
              <p className="">Total : {currentEnrollmentList.length}</p>
            </DialogTitle>
            <DialogDescription>
              <div className="w-full px-4 flex flex-col flex-row gap-6">
                {currentEnrollmentList &&
                  currentEnrollmentList.map((enrollment) => {
                    return (
                      <div
                        key={enrollment._id}
                        className="w-full  flex sm:items-center sm:justify-between flex-col gap-y-1 py-2 px-4 rounded-2xl bg-[#2c2c2c95]  hover:shadow-lg hover:shadow-[#3c3c3c95]"
                      >
                        <h1 className="flex items-center gap-x-1">
                          <span className="font-bold text-lg">Name: </span>
                          <span className="text-[16px]">
                            {enrollment.user?.name}
                          </span>
                        </h1>
                        <h1 className="flex items-center gap-x-1">
                          <span className="font-bold text-lg">Email: </span>
                          <span className="text-[16px]">
                            {enrollment.user?.email}
                          </span>
                        </h1>
                      </div>
                    );
                  })}
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EnrollmentListSheet;
