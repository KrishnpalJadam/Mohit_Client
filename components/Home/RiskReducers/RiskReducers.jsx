"use client";

// ** Next, React And Locals Imports
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles";

// ** MUI Imports
import Typography from "@mui/material/Typography";

export default function RiskReducers({ settings }) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.reducersContainer}>
        {settings?.riskReducersImages?.map((item, index) => (
          <div className={classes.riskReducer} key={index}>
            <div className={classes.riskReducerImage}>
              <CustomImage
                src={process.env.NEXT_PUBLIC_BACKEND_URL + "uploads/" + item}
                alt="risk reducers icon"
                width={60}
                height={60}
              />
            </div>
            <div>
              <Typography variant="h5">
                {settings.riskReducersHeading[index]}
              </Typography>
              <Typography variant="subtitle2">
                {settings.riskReducersText[index]?.substring(0, 75)}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
