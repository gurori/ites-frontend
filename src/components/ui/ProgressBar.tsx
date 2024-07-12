"use client";

import { AppProgressBar } from "next-nprogress-bar";

export default function ProgressBar() {
  return (
    <AppProgressBar
      color="#665BE3"
      height="5px"
      startPosition={0.3}
      delay={200}
      options={{ showSpinner: false }}
    />
  );
}
