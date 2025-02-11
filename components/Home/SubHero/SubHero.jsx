"use client";

// ** Next, React And Locals Imports
import Link from "next/link";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function SubHero({ settings }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        {settings?.subHeroTitle}
      </Typography>
      <Grid container spacing={3}>
        {settings?.subHeroImages?.map((item, index) => (
          <Grid
            key={index}
            item
            xl={4}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            className={classes.subHeroGrid}
          >
            <div className={classes.main}>
              <CustomImage
                src={process.env.NEXT_PUBLIC_BACKEND_URL + "uploads/" + item}
                alt={settings.subHeroHeading[index]}
                fill={true}
              />
              <div className={classes.subHeroContent}>
                <Typography variant="h2" className={classes.subHeroText}>
                  {settings.subHeroHeading[index]}
                </Typography>
                <Link href={settings.subHeroLink[index]}>
                  <Typography variant="subtitle1" className={classes.action}>
                    {settings.subHeroBtnText[index]}
                  </Typography>
                </Link>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
