"use client";

// ** Next, React And Locals Imports
import useStyles from "./styles";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import HomeMarquee from "react-fast-marquee";

export default function Marquee({ settings }) {
  const { classes } = useStyles();

  return (
    <>
      {settings?.marquee && (
        <div className={classes.container}>
          <HomeMarquee speed={60} gradient={false}>
            {Array(20)
              .fill()
              .map((_, index) => (
                <Typography
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: settings.marqueeText,
                  }}
                  variant="h2"
                  className={classes.content}
                />
              ))}
          </HomeMarquee>
        </div>
      )}
    </>
  );
}
