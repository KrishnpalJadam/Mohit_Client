"use client";

// ** Next, React And Locals Imports
import { useState } from "react";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { MdClose } from "react-icons/md";

export default function SimpleTopbar({ settings }) {
  const { classes } = useStyles();

  const [close, setClose] = useState(false);

  return (
    <div>
      {!close && (
        <div className={classes.container}>
          <Typography
            dangerouslySetInnerHTML={{
              __html: settings?.topbarContent,
            }}
            variant="subtitle1"
            className={classes.content}
          />

          <MdClose
            onClick={() => setClose(true)}
            className={classes.closeIcon}
          />
        </div>
      )}
    </div>
  );
}
