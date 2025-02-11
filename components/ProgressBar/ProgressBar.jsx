"use client";

// ** Third Party Imports
import { AppProgressBar } from "next-nprogress-bar";
import theme from "@/components/Theme/theme.js";

export default function ProgressBar() {
  return (
    <AppProgressBar
      height="5px"
      color={theme.palette.primary.dark}
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
