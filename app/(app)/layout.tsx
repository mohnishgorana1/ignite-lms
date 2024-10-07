import { Suspense } from "react";
import Loading from "@/app/Loading";
import { ThemeProvider } from "../ThemeProvider";
import Header from "@/components/Header";
import { currentUser } from "@clerk/nextjs/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeUser = await currentUser();

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <main className="p-3 sm:px-4 sm:py-3 md:px-5 md:py-4 lg:px-8 lg:py-6 w-full h-full">
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col gap-y-2 sm:gap-y-3">
            <nav>
              <Header currentUser={JSON.parse(JSON.stringify(activeUser))} />
            </nav>
            <div>{children}</div>
          </div>
        </Suspense>
      </main>
    </ThemeProvider>
  );
}
