"use client";

// ** Next, React And Locals Imports
import useStyles from "./styles";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function StaticPages({ page }) {
  const { classes } = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {page?.pageName?.replaceAll("-", " ").toUpperCase()}
      </Typography>
      <Typography
        variant="subtitle2"
        dangerouslySetInnerHTML={{
          __html: page?.pageContent,
        }}
      />
    </Container>
  );
}
