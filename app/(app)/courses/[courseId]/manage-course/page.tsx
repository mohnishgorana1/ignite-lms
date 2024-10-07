import React from 'react'


// add delete module, lecture and manage this course [courseId] only by illustrator and admin
function ManageCourseByInstructorPage({ params }: { params: { courseId: string } }) {
  return (
    <div>ManageCourseByInstructorPage of course : {params.courseId}</div>
  )
}

export default ManageCourseByInstructorPage