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
import { FiLoader } from "react-icons/fi";
import axios from "axios";

function AddLectureDialog({
  isAddLectureDialogOpen,
  onClose,
  course,
  currentModuleToAddLecture,
}: any) {
  const router = useRouter();
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedVideo(file);
      setVideoPreview(URL.createObjectURL(file)); // Create preview URL for the video
    } else {
      setSelectedVideo(null);
      setVideoPreview(null);
      alert("Please select a valid video file.");
    }
  };

  const handleAddLecture = async () => {

    // validations
    if (!selectedVideo) {
      toast.warning("Please select a video before submitting.");
      return;
    }
    if (lessonTitle.length > 50) {
      toast.warning("Lesson Title must be less than 50 characters");
      return;
    }
    if (lessonDescription.length > 500) {
      toast.warning("Lesson Description must be less than 500 characters");
      return;
    }

    setIsAddingLecture(true);
    // Logic to upload the lecture

    console.log("Sel data", selectedVideo, lessonTitle, lessonDescription);

    const newLesson = new FormData();
    newLesson.append("lessonFile", selectedVideo);
    newLesson.append("lessonTitle", lessonTitle);
    newLesson.append("lessonDescription", lessonDescription);
    newLesson.append("moduleId", currentModuleToAddLecture._id);

    try {
      console.log("newLesson", newLesson);

      const response = await axios.post(
        "/api/courses/upload-lesson",
        newLesson,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Explicitly set this header
          },
        }
      );

      if (response?.data?.success === true) {
        toast.success("Lecture Added Successfully");
        handleClose();
      } else {
        toast.error("Can't Add Lecture");
      }

      console.log("newCourse", response?.data?.newCourse);
    } catch (error) {
      console.log("Error Adding Lecture", error);
      toast.error("Something Went Wrong");
    } finally {
      setIsAddingLecture(false);
    }
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setVideoPreview(null);
    onClose();
  };

  return (
    <Dialog open={isAddLectureDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-black h-[85vh] w-[100vw] sm:w-[50vw] sm:max-w-[70vw] min-h-max max-h-[90vh] px-2 sm:px-4 py-8 sm:py-8 ">
        <div className="flex sm:flex-row flex-col sm:justify-between gap-y-3 overflow-y-auto dialog-scrollbar mx-4 w-full">
          <DialogHeader className="flex flex-col gap-y-8 w-full pr-8 justify-between h-auto">
            <div>
              <DialogTitle className="text-center text-3xl text-orange-700">
                Add Lecture
              </DialogTitle>

              <DialogDescription className="text-start mt-8 flex flex-col justify-between h-auto ">
                <h1 className="text-white text-xl truncate">
                  {currentModuleToAddLecture?.title}
                </h1>

                <div className="w-full flex flex-col gap-y-3 items-start justify-between mt-8">
                  {/* Video Preview */}
                  {videoPreview && (
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-auto mb-4 rounded-xl"
                    />
                  )}

                  <Label
                    htmlFor={"lecture"}
                    className="flex flex-col gap-y-8  bg-[#101213] items-center px-3 py-8 mx-auto mt-6 text-center border-2 border-dashed border-orange-500 rounded-lg cursor-pointer"
                  >
                    <h2 className="text-orange-300 font-bold text-lg">
                      {"Add a Lecture"}
                    </h2>
                    <Input
                      onChange={handleVideoChange}
                      id={"lecture"}
                      type="file"
                      accept="video/*" // Restrict file input to video only
                    />
                  </Label>
                </div>

                <div className="space-y-5 mt-8">
                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-sm sm:text-lg md:text-xl text-start">
                      Lesson Title{" "}
                      <span className="opacity-55 text-sm">
                        (50 character max)
                      </span>
                    </Label>

                    <Input
                      type="text"
                      required
                      placeholder="Add title for lesson"
                      name="lessonTitle"
                      id="lessonTitle"
                      value={lessonTitle}
                      onChange={(event) => {
                        setLessonTitle(event.target.value);
                      }}
                      className="min-w-full rounded-md h-[40px] sm:h-[50px] md:h-[55px] px-4 border 
                                      bg-[#101213] text-xs md:text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#333637]  focus:drop-shadow-lg focus-visible:outline-none 
                                      focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-sm sm:text-lg md:text-xl text-start">
                      Lesson Description{" "}
                      <span className="opacity-55 text-sm">
                        (500 character max)
                      </span>
                    </Label>

                    <Input
                      type="text"
                      required
                      placeholder="Add description for lesson"
                      name="lessonDescription"
                      id="lessonDescription"
                      value={lessonDescription}
                      onChange={(event) => {
                        setLessonDescription(event.target.value);
                      }}
                      className="min-w-full rounded-md h-[40px] sm:h-[50px] md:h-[55px] px-4 border 
                                      bg-[#101213] text-xs md:text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#333637]  focus:drop-shadow-lg focus-visible:outline-none 
                                      focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </DialogDescription>
            </div>

            <footer className="my-5 flex flex-row justify-end gap-x-5">
              <Button
                onClick={onClose}
                className="text-orange-600 font-semibold border border-orange-600  "
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddLecture}
                className="text-white font-semibold border border-transparent bg-orange-600 hover:scale-105 duration-300 ease-in-out min-w-28"
              >
                {isAddingLecture ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  "Add Module"
                )}
              </Button>
            </footer>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddLectureDialog;
