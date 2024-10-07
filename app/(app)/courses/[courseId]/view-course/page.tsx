import React from 'react'


// enrolledUser, courseCreator(instructor) and admin can access this page 
// here they can access modules and lectures
// a module creation , and lecture creation dialog option will available only for courseCreator
function ViewCourse({ params }: { params: { courseId: string } }) {
  return (
    <div>ViewCourse Lecture and modules of course {params.courseId} </div>
  )
}

export default ViewCourse