import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }else{
    console.log("user:: ",user);
  }

  return (
    <Fragment>
      <main className="">
        hello
      </main>
    </Fragment>
  );
}
export default Home;
