"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#00E5C0" // brand-teal
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
