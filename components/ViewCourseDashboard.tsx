"use client";
import React, { useEffect, useState } from "react";
import ModuleList from "./ModuleList";
import { CldVideoPlayer } from "next-cloudinary";

function ViewCourseDashboard({ course, profileInfo }: any) {
  const [currentCourse, setCurrentCourse] = useState(course);
  const [currentProfile, setCurrentProfile] = useState(profileInfo);
  const [currentLessonToPlay, setCurrentLessonToPlay] = useState();
  const [selectedVideo, setSelectedVideo] = useState();

  useEffect(() => {
    setCurrentCourse(course);
    setCurrentProfile(profileInfo);
  }, [course]);

  useEffect(() => {
    setSelectedVideo(currentLessonToPlay?.lessonUrl?.public_id);
  }, [setCurrentLessonToPlay]);

  return (
    <section className="w-full grid md:grid-cols-7 md:gap-x-4">
      <section className="md:col-span-5">
        {/* <CldVideoPlayer
          id="adaptive-bitrate-streaming"
          width="1920"
          height="1080"
          src={selectedVideo }
          pictureInPictureToggle
        /> */}
        <video
          src={currentLessonToPlay?.lessonUrl?.secure_url}
          controls
          className="w-full h-auto md:h-[400px] mb-4 rounded-xl"
        />
      </section>
      <section className="md:col-span-2">
        <ModuleList
          course={currentCourse}
          profileInfo={currentProfile}
          setCurrentLessonToPlay={setCurrentLessonToPlay}
        />
      </section>
    </section>
  );
}

export default ViewCourseDashboard;
