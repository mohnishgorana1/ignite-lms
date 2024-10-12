"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import CommonForm from "../Forms/CommonForm";
import { updateCourseDetailsFormControls } from "@/lib/constants";
import { updateCourseSchema } from "@/lib/validations/updateCourseSchema";
import { updateSingleCourseDetailsAction } from "@/actions/course.action";
import { toast } from "sonner";

interface UpdateCourseDetailsFormInputs {
  title: string;
  description: string;
  category: string;
  welcomeMessage: string;
  pricing: number;
}

function UpdateCourseDetailsDialog({
  course,
  onClose,
  isUpdateCourseDetailsDialogOpen,
}: any) {
  const router = useRouter();
  const [isUpdatingCourse, setIsUpdatingCourse] = useState(false);
  const [updateCourseDetailsFormData, setUpdateCourseDetailsFormData] =
    useState({
      title: course?.title,
      description: course?.description,
      category: course?.category,
      welcomeMessage: course?.welcomeMessage,
      pricing: course?.pricing,
    });


  const handleCourseDetailsUpdate = async () => {
    console.log("submit data", updateCourseDetailsFormData);

    const response = await updateSingleCourseDetailsAction(
      course?._id,
      updateCourseDetailsFormData,
      `/courses/${course._id}/manage-course`
    );

    if(response?.success === true){
        onClose()
        toast.success("Course Details Updated Successfully")
        router.refresh()
    }
    if(response?.success === false){
        toast.success("Course Updation Failed")
    }
  };
  return (
    <Dialog open={isUpdateCourseDetailsDialogOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black h-[95vh] w-[90vw] sm:w-[90vw] min-h-max max-h-[95vh] px-2 sm:px-4 py-8 sm:py-8 ">
        <div className="flex sm:flex-row flex-col sm:justify-between gap-y-3 overflow-auto dialog-scrollbar mx-4 w-full">
          <DialogHeader className="flex flex-col gap-y-8 w-full pr-8">
            <DialogTitle className="text-3xl text-center text-blue-500">
              Update Course Details
            </DialogTitle>
            <DialogDescription className="text-start">
              <CommonForm
                formControls={updateCourseDetailsFormControls}
                formData={updateCourseDetailsFormData}
                setFormData={setUpdateCourseDetailsFormData}
                schema={updateCourseSchema}
                onSubmit={handleCourseDetailsUpdate}
                btnText={"Submit"}
                btnType="SUBMIT"
                isButtonLoading={isUpdatingCourse}
              />
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCourseDetailsDialog;
