import { fetchProfileAction } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");



  
  if (profileInfo?._id) {
    return (
      <Fragment>
        <main className="">hello</main>
      </Fragment>
    );
  }
}
export default Home;
