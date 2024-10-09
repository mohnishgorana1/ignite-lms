import OnboardForm from "@/components/OnboardForm";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

async function OnboardPage() {
  const authUser = await currentUser();

  return (
    <main className="w-full h-[500px] px-4 sm:px-8 my-2">
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

export default OnboardPage;
