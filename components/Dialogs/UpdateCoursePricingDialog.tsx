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
import "../../app/globals.css";
import CommonForm from "../Forms/CommonForm";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateSingleCoursePricingAction } from "@/actions/course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function UpdateCoursePricingDialog({
  isUpdatePriceDialogOpen,
  course,
  onClose,
}: any) {
  const router = useRouter();
  const [priceToUpdate, setPriceToUpdate] = useState(course?.pricing);

  const handleCoursePricingUpdate = async () => {
    const response = await updateSingleCoursePricingAction(
      course?._id,
      priceToUpdate,
      `/courses/${course._id}/manage-course`
    );

    if (response?.success === true) {
      toast.success("Price Update Successfully");
      onClose();
      router.refresh();
    }

    if (response?.success === false) {
        console.log(response);
        toast.success("Price Update Failed");
        onClose();
        router.refresh();
      }
  };

  return (
    <Dialog open={isUpdatePriceDialogOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black h-[55vh] w-[80vw] sm:w-[50vw] min-h-max max-h-[90vh] px-2 sm:px-4 py-8 sm:py-8 ">
        <div className="flex sm:flex-row flex-col sm:justify-between gap-y-3 overflow-auto dialog-scrollbar mx-4 w-full">
          <DialogHeader className="flex flex-col gap-y-8 w-full pr-8">
            <DialogTitle className="text-start text-3xl text-yellow-200">
              Update Pricing
            </DialogTitle>
            <DialogDescription className="text-start">
              <h1 className="text-xl">
                Current Course Pricing{" "}
                <span className="font-bold underline">Rs {course.pricing}</span>
              </h1>

              <div className="grid grid-cols-3 w-full items-center justify-between mt-8">
                <Label className="text-sm sm:text-lg md:text-xl text-start">
                  Price to Update (INR)
                </Label>

                <Input
                  type={"text"}
                  min={"0"}
                  required
                  placeholder={course.pricing}
                  name="priceToUpdate"
                  id="priceToUpdate"
                  value={priceToUpdate}
                  onChange={(event) => {
                    setPriceToUpdate(event.target.value);
                  }}
                  className="col-span-2 rounded-md h-[40px] sm:h-[50px] md:h-[55px] px-4 border  
                                      bg-[#131310] text-xs md:text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#333637]  focus:drop-shadow-lg focus-visible:outline-none 
                                      focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <DialogFooter className="mt-5 flex flex-row absolute bottom-5 right-6 gap-x-5">
                <Button
                  onClick={onClose}
                  className="text-[#e3e72f] font-semibold border border-[#e3e72f]  "
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCoursePricingUpdate}
                  className="text-black font-semibold border border-transparent bg-[#e3e72f] hover:scale-105 duration-300 ease-in-out"
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCoursePricingDialog;
