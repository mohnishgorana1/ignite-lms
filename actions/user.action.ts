"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { CreateProfile } from "@/types";
import { revalidatePath } from "next/cache";

export const createProfileAction = async (
  data: CreateProfile,
  pathToRevalidate: string
) => {
  const { name, email, role, userAuthId } = data;
  if (!name || !email || !role || !userAuthId) {
    return {
      status: 500,
      success: false,
      message: `Error Creating Profile : Invalid Data Passed`,
    };
  }

  try {
    await dbConnect();
    const newUser = await User.create(data);
    if (!newUser) {
      return {
        status: 500,
        success: false,
        message: `Can't Onboard Your Profile : Please try again later!`,
      };
    }
    console.log("New User", newUser);
    revalidatePath(pathToRevalidate);

    return {
      status: 200,
      success: true,
      message: `Profile Created Successfully`,
      newUser: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    console.log("Error Creating Profile", error);
    return {
      status: 500,
      success: false,
      message: `Error Creating Profile ${error}`,
    };
  }
};

export const fetchProfileAction = async (userAuthId: string) => {
  if (!userAuthId) {
    return {
      status: 500,
      success: false,
      message: `Error Fetching Profile : No User Authentication Id Passsed`,
    };
  }
  try {
    await dbConnect();
    const fetchedProfile = await User.findOne({ userAuthId: userAuthId });

    if (!fetchedProfile) {
      console.log("Profle result can't find", fetchedProfile);
    }

    return JSON.parse(JSON.stringify(fetchedProfile));

    
  } catch (error) {
    console.log("Error Fetching Profile", error);
  }
};
