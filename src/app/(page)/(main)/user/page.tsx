import { User } from "@/containers";
import { Suspense } from "react";

export default function UserPage() {
  return (
    <Suspense>
      <User />
    </Suspense>
  );
}
