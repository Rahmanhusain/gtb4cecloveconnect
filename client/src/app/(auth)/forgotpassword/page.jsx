import StoreProvider from "@/app/StoreProvider";

/* import Register from "@/components/Register"; */
import { Suspense, lazy } from "react";
const ForgetPassComp = lazy(() => import("@/components/ForgetPassComp"));

export default function page() {
  return (
    <StoreProvider>
      <Suspense
        fallback={
          <div className="flex flex-row gap-2 justify-center items-center py-4">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        }
      >
        <ForgetPassComp/>
      </Suspense>
    </StoreProvider>
  );
}
