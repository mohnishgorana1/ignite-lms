"use client";
import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import { useUser } from "@clerk/nextjs";
import { ThemeProvider } from "@/app/ThemeProvider";

function CommonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // useEffect(() => {
  //   if (isLoaded && user) {
  //     const getProfileDetails = async () => {
  //       const data = await fetchProfileAction(user.id);
  //       setProfileInfo(data);
  //       setIsLoading(false);
  //     };

  //     getProfileDetails();
  //   }
  // }, [isLoaded, user]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        {/* <Header profileInfo={profileInfo} /> */}
        {/* main content */}
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
}

export default CommonLayout;
