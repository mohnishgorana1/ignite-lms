import { fetchProfileAction } from "@/actions/user.action";
import { HeroHighlightDemo } from "@/components/HeroHighlight";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
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
        <main className="w-full h-full">
            <HeroHighlightDemo />
        </main>
      </Fragment>
    );
  }
}
export default Home;
