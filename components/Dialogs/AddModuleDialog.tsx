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

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { addModuleToCourseAction } from "@/actions/course.action";
import { FiLoader } from "react-icons/fi";

function AddModuleDialog({ course, onClose, isAddModuleDialogOpen }: any) {
  const router = useRouter();
  const [moduleTitle, setModuleTitle] = useState("");
  const [isAddingModule, setIsAddingModule] = useState(false);

  const handleAddModule = async () => {
    if (moduleTitle === "") return;
    setIsAddingModule(true);

    const data = {
      associatedCourse: course._id,
      title: moduleTitle,
    };
    console.log("data", data);

    const response = await addModuleToCourseAction(
      data,
      `/courses/${course._id}/manage-course`
    );
    console.log("response addmodule", response);

    setIsAddingModule(false);
    if (response.success === true) {
      setModuleTitle("");
      onClose();
      toast.success("Module Added");
      router.push(`/courses/${course._id}/manage-course`);
    }

    if (response.success === false) {
      toast.error("Module Can't be Added");
    }
  };

  return (
    <Dialog open={isAddModuleDialogOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black h-[55vh] w-[90vw] sm:w-[50vw] min-h-max max-h-[90vh] px-2 sm:px-4 py-8 sm:py-8 ">
        <div className="flex sm:flex-row flex-col sm:justify-between gap-y-3 overflow-auto dialog-scrollbar mx-4 w-full">
          <DialogHeader className="flex flex-col gap-y-8 w-full pr-8">
            <DialogTitle className="text-start text-3xl text-orange-700">
              Add Module
            </DialogTitle>
            <DialogDescription className="text-start">
              <div className="w-full flex flex-col gap-y-3 items-start justify-between mt-8">
                <Label className="text-sm sm:text-lg md:text-xl text-start">
                  Module Title
                </Label>

                <Input
                  type={"text"}
                  min={"0"}
                  required
                  placeholder={"give a module title"}
                  name="moduleTitle"
                  id="moduleTitle"
                  value={moduleTitle}
                  onChange={(event) => {
                    setModuleTitle(event.target.value);
                  }}
                  className=" rounded-md h-[40px] sm:h-[50px] md:h-[55px] px-4 border  
                                    bg-[#0e0e0c] text-xs md:text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#27170a]  focus:drop-shadow-lg focus-visible:outline-none 
                                    focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <DialogFooter className="mt-5 flex flex-row absolute bottom-5 right-6 gap-x-5">
                <Button
                  onClick={onClose}
                  className="text-orange-600 font-semibold border border-orange-600  "
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddModule}
                  className="text-white font-semibold border border-transparent bg-orange-600 hover:scale-105 duration-300 ease-in-out"
                >
                  {isAddingModule ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    "Add Module"
                  )}
                </Button>
              </DialogFooter>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddModuleDialog;
