"use client";

import {
  createCourseFormControls,
  initialCreateCourseFormData,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import CommonForm from "./CommonForm";
import { createCourseSchema } from "@/lib/validations/createCourseSchema";
import { toast } from "sonner";
import { createCourseAction } from "@/actions/course.action";
import axios from "axios";

interface CreateCourseFormInputs {
  title: string;
  description: string;
  category: string;
  welcomeMessage: string;
  pricing: number;
  courseThumbnail: File | null;
}

function CreateCourseForm({ profileInfo }: any) {
  const router = useRouter();
  const [createCourseFormData, setCreateCourseFormData] = useState(
    initialCreateCourseFormData
  );
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  // Check if all required fields are filled
  const isFormValid = Object.keys(createCourseFormData).every((key) => {
    const value = createCourseFormData[key as keyof CreateCourseFormInputs];
    if (key === "courseThumbnail") {
      return value instanceof File;
    }
    return value !== "" && value !== null && value !== undefined;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log("file", file);

    if (file) {
      setCreateCourseFormData({
        ...createCourseFormData,
        courseThumbnail: file, // Store the file in the form data
      });
    }
  };

  const handleCourseCreation: SubmitHandler<
    CreateCourseFormInputs
  > = async () => {
    try {
      console.log("is form valid", isFormValid);
      console.log(createCourseFormData);

      if (!createCourseFormData?.courseThumbnail) return;

      setIsCreatingCourse(true);

      const newCourseFormData = new FormData();
      newCourseFormData.append("instructor", profileInfo?._id);
      newCourseFormData.append("instructorAuthId", profileInfo?.userAuthId);
      newCourseFormData.append("title", createCourseFormData.title);
      newCourseFormData.append("description", createCourseFormData.description);
      newCourseFormData.append(
        "welcomeMessage",
        createCourseFormData.welcomeMessage
      );
      newCourseFormData.append("category", createCourseFormData.category);
      newCourseFormData.append("pricing", String(createCourseFormData.pricing));
      newCourseFormData.append(
        "courseThumbnailFile",
        createCourseFormData.courseThumbnail
      );

      try {
        console.log("necopursefoprm", newCourseFormData);

        const response = await axios.post(
          "/api/courses/create-course",
          newCourseFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Explicitly set this header
            },
          }
        );

        if (response?.data?.success === true) {
          toast.success("Course Created Successfully");
          setCreateCourseFormData(initialCreateCourseFormData)
        } else {
          toast.error("Can't Create Course");
        }

        console.log("newCourse", response?.data?.newCourse);
      } catch (error) {
        console.log("Error Creating Course", error);
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsCreatingCourse(false);
    }
  };
  return (
    <section>
      <div className="sm:w-[80vw] md:w-[60vw] mx-auto">
        <CommonForm
          formControls={createCourseFormControls}
          formData={createCourseFormData}
          setFormData={setCreateCourseFormData}
          schema={createCourseSchema}
          onSubmit={handleCourseCreation}
          btnText={"Submit"}
          btnType="SUBMIT"
          isButtonLoading={isCreatingCourse}
          isDisabled={!isFormValid}
          handleFileChange={handleFileChange}
        />
      </div>
    </section>
  );
}

export default CreateCourseForm;
