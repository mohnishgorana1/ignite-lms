import React from 'react'


// course details page 
// here student can enroll to this course having unique [courseId]


function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const courseId = params.courseId

  return (
    <div>CourseDetailsPage {courseId}</div>
  )
}

export default CourseDetailsPage