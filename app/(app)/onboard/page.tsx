import { fetchProfileAction } from "@/actions/user.action";
import OnboardForm from "@/components/Forms/OnboardForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function OnboardPage() {
  const authUser = await currentUser();

  const profileInfo = await fetchProfileAction(authUser?.id);


  
  if (authUser && profileInfo?._id) redirect("/");



  if (authUser && !profileInfo?._id) {
    return (
      <main className="w-full px-4 sm:px-8 my-2 min-h-[60vh] flex flex-col justify-between">
        <h1 className="w-full text-center font-semibold text-2xl sm:text-3xl md:text-5xl text-[#e6e6e6] font-sans sm:tracking-tighter">
          Welcome to Ignite LMS Onboarding
        </h1>
        <section className="flex flex-col w-full mx-auto mt-8 md:mt-12">
          <h2 className="w-full text-center font-semibold text-xl sm:text-2xl md:text-3xl text-[#666666]">
            Complete your Profile
          </h2>
          <OnboardForm currentUser={JSON.parse(JSON.stringify(authUser))} />
        </section>
      </main>
    );
  }
}

export default OnboardPage;
