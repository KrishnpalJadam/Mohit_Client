"use client";

// ** Next, React And Locals Imports
import Link from "next/link";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles";

export default function Spotlight({ spotlight, settings }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      {settings?.spotlight1 && spotlight === "spotlight1" && (
        <Link href={settings.spotlight1Link}>
          {settings.spotlight1Image && (
            <CustomImage
              src={
                process.env.NEXT_PUBLIC_BACKEND_URL +
                "uploads/" +
                settings.spotlight1Image
              }
              alt={"spotlight"}
              fill={"true"}
              style={classes.spotlightImage}
            />
          )}
        </Link>
      )}
      {settings?.spotlight2 && spotlight === "spotlight2" && (
        <Link href={settings.spotlight2Link}>
          {settings.spotlight2Image && (
            <CustomImage
              src={
                process.env.NEXT_PUBLIC_BACKEND_URL +
                "uploads/" +
                settings.spotlight2Image
              }
              alt={"spotlight"}
              fill={"true"}
              style={classes.spotlightImage}
            />
          )}
        </Link>
      )}
    </div>
  );
}
