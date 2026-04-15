"use client";

import { Suspense } from "react";
import TimelinePage from "./TimelinePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TimelinePage />
    </Suspense>
  );
}