import { Suspense } from "react";
import Loading from "@/app/Loading";
import CommonLayout from '../CommonLayout'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <Suspense fallback={<Loading />}>
        <CommonLayout>{children}</CommonLayout>
      </Suspense>
    </main>
  );
}
