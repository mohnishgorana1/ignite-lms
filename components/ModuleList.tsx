"use client";
import {
  fetchCourseModulesAndLecturesAction,
  toggleFreePreviewAction,
} from "@/actions/course.action";
import Loading from "@/app/Loading";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import AddLectureDialog from "./Dialogs/AddLectureDialog";
import { PiVideoFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AddModuleDialog from "./Dialogs/AddModuleDialog";

function ModuleList({ course, profileInfo, setCurrentLessonToPlay }: any) {
  const router = useRouter();
  const [courseModulesDetails, setCourseModulesDetails] = useState([]);
  const [openModule, setOpenModule] = useState(null);
  const [currentModuleToAddLecture, setCurrentModuleToAddLecture] = useState();

  const [isAddLectureDialogOpen, setIsAddLectureDialogOpen] = useState(false);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);

  const handleToggleModule = (moduleId) => {
    setOpenModule(openModule === moduleId ? null : moduleId);
  };

  const fetchCourseDetails = async () => {
    const response = await fetchCourseModulesAndLecturesAction(course._id);
    console.log("Res", response);

    setCourseModulesDetails(response?.course?.modules);
  };

  const togglePreview = async (
    lessonId: string,
    freePreviewCurrentStatus: boolean
  ) => {
    const toggleStatus = freePreviewCurrentStatus === true ? false : true;
    const response = await toggleFreePreviewAction(lessonId, toggleStatus);

    if (response?.success === true) {
      router.refresh();
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (courseModulesDetails.length < 0) {
    return <Loading />;
  }
  return (
    <div className="space-y-4 sm:border-l sm:pl-3">
      {courseModulesDetails &&
        courseModulesDetails.map((module) => (
          <div
            key={module?._id}
            className="bg-[#151515] p-4 rounded-lg shadow-lg hover:bg-[#090909]"
          >
            <div
              onClick={() => handleToggleModule(module._id)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{module?.title}</h2>
              <span>{openModule === module._id ? "-" : "+"}</span>
            </div>

            {openModule === module._id && (
              <div className="mt-4 space-y-2">
                {module.lessons?.length > 0 ? (
                  module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="w-full bg-[#252525] p-3 rounded-md hover:bg-[#333333] transition duration-200 flex items-center gap-2 justify-between "
                    >
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setCurrentLessonToPlay(lesson)}
                      >
                        <PiVideoFill className="text-white" />{" "}
                        <span className="text-blue-300 font-semibold font-sans">
                          {lesson.lessonTitle}
                        </span>
                      </div>
                      {profileInfo?._id === course?.instructor?._id && (
                        <div
                          className={`self-end text-sm underline cursor-pointer font-sans ${
                            lesson?.freePreview
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                          onClick={() =>
                            togglePreview(lesson._id, lesson?.freePreview)
                          }
                        >
                          {lesson?.freePreview ? "Disable" : "Enable"} Free
                          Preview
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No lectures available.</p>
                )}

                {profileInfo?._id === course?.instructor?._id && (
                  <Button
                    className="px-3 py-1 bg-orange-600 hover:bg-orange-700 font-semibold self-center"
                    onClick={() => {
                      setCurrentModuleToAddLecture(module);
                      setIsAddLectureDialogOpen(true);
                    }}
                  >
                    Add Lecture
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      <Button
        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 font-semibold self-center w-full"
        onClick={() => setIsAddModuleDialogOpen(true)}
      >
        Add Module
      </Button>

      <AddLectureDialog
        isAddLectureDialogOpen={isAddLectureDialogOpen}
        onClose={() => setIsAddLectureDialogOpen(false)}
        course={course}
        currentModuleToAddLecture={currentModuleToAddLecture}
      />

      <AddModuleDialog
        course={course}
        onClose={() => setIsAddModuleDialogOpen(false)}
        isAddModuleDialogOpen={isAddModuleDialogOpen}
      />
    </div>
  );
}

export default ModuleList;
