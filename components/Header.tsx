import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { GiHamburgerMenu } from "react-icons/gi";

function Header({ currentUser }: any) {
  const menuItems = [
    {
      label: "Courses",
      path: "/courses",
      show: currentUser,
    },
    {
      label: "Profile",
      path: "/profile",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !currentUser,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !currentUser,
    },
  ];

  return (
    <header className="flex items-center justify-between h-16 w-full">
      <Link href={"/"}>
        <h3 className="text-[30px] sm:text-4xl font-extrabold tracking-wide brightness-125">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent flex gap-x-1 h-12">
            <span>Ignite</span>
            <span>LMS</span>
          </span>
        </h3>
      </Link>

      {/* mobile */}
      <div className="md:hidden flex items-center justify-between gap-x-2 ">
        <Sheet>
          <SheetTrigger asChild>
            <GiHamburgerMenu className="text-white text-xl" />
          </SheetTrigger>

          <SheetContent side={"right"} className="bg-[#020202] text-white w-full h-[100vh]">
            <div className="h-full flex flex-col justify-between gap-y-8 py-6 ">
              <div className="flex gay-y-12 flex-col">
                <Link href={"/"} className="flex items-center justify-center w-full mb-12">
                  <h3 className="text-[30px] sm:text-4xl font-extrabold tracking-wide brightness-125">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent flex gap-x-1 h-12 ">
                      <span>Ignite</span>
                      <span>LMS</span>
                    </span>
                  </h3>
                </Link>
                <div className="flex flex-col justify-between gap-y-1 ">
                  {menuItems.map(
                    (menuItem, idx) =>
                      menuItem.show && (
                        <Link
                          key={idx}
                          href={menuItem.path}
                          className="w-fit flex items-center my-1 text-lg font-semibold dark:text-white border-b dark:hover:border-b-white hover:border-b-gray-950 duration-200"
                        >
                          {menuItem.label}
                        </Link>
                      )
                  )}
                </div>
              </div>

              <span className="flex flex-col gap-y-6 ">
                <div className="flex items-center justify-between gap-x-4">
                  <h1 className="dark:text-white font-bold">Profile</h1>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </span>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop */}
      <div className="hidden md:flex items-center gap-x-12 ">
        <nav className="flex gap-x-8 items-center">
          {menuItems.map(
            (menuItem, idx) =>
              menuItem.show && (
                <Link
                  key={idx}
                  href={menuItem.path}
                  className="text-white bg-transparent px-2 rounded-md border-b-transparent border-b-2 hover:border-white hover:border-b-2 font-semibold"
                >
                  {menuItem.label}
                </Link>
              )
          )}
        </nav>

        <div className="hidden md:flex">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
