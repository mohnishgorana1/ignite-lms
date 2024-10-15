import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

function ProfilePage() {
  // redirect("/")
  return (
    <main className='w-full h-[500px] flex md:items-center justify-center flex-col gap-y-5'>
      <h1 className="text-6xl sm:text-7xl opacity-25 hover:opacity-85 duration-300">
        DEVELOPMENT MODE
      </h1>
      <h2 className='text-2xl opacity-85'>Please try again later !</h2>

      <Link href={"/"} className='pb-0 border-b border-[#7a7a7a] hover:border-[#f6f6f6]'>Home Page</Link>
    </main>
  )
}

export default ProfilePage