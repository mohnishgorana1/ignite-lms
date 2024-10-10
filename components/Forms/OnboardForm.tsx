"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { onboardFormControls, initialOnboardFormData } from "@/lib/constants";
import { onboardSchema } from "@/lib/validations/onboardSchema";
import { SubmitHandler } from "react-hook-form";
import { createProfileAction } from "@/actions/user.action";
import { toast } from "sonner";
import CommonForm from "./CommonForm";

interface OnboardFormInputs {
  name: string;
  role: "STUDENT" | "INSTRUCTOR";
}

function OnboardForm({ currentUser }: any) {
  const router = useRouter();

  const [onboardFormData, setOnboardFormData] = useState(
    initialOnboardFormData
  );

  const [isCreatingProfile, setIsCreatingProfile] = useState(false);


  // Check if all required fields are filled
  const isFormValid = Object.values(onboardFormData).every(
    (fieldValue) => fieldValue !== ""
  );

  const handleOnboarding: SubmitHandler<OnboardFormInputs> = async () => {
    try {
     
      if (!currentUser) router.refresh();

      const data = {
        name: onboardFormData.name,
        role: onboardFormData.role,
        email: currentUser && currentUser.emailAddresses[0].emailAddress!,
        userAuthId: currentUser && currentUser.id,
      };

      console.log("Form Fileds data", data);
      setIsCreatingProfile(true);

      const newUser = await createProfileAction(data, "/");
      console.log(newUser);

      if (newUser?.success) {
        toast.success("Onboarded SuccessFully");
        router.replace("/");
      } else {
        toast.error("Erro Onboarding, Please try Again");
        router.replace("/onboard");
      }
      console.log("Submitted");
    } catch (error) {
      console.error("Error during onboarding:", error);
      toast.error("Erro Onboarding, Please try Again");
    } finally {
      setIsCreatingProfile(false);
    }
  };

  return (
    <section className="w-full h-auto sm:px-2 sm:py-2">
      <div className="sm:w-[80vw] md:w-[60vw] mx-auto">
        <CommonForm
          formControls={onboardFormControls}
          formData={onboardFormData}
          setFormData={setOnboardFormData}
          schema={onboardSchema}
          onSubmit={handleOnboarding}
          btnText={"Submit"}
          btnType="SUBMIT"
          isButtonLoading={isCreatingProfile}
          isDisabled={!isFormValid}
        />

        
      </div>
    </section>
  );
}

export default OnboardForm;
