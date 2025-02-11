// ** Next, React And Locals Imports
import useStyles from "./styles";

export default function Layout1({ sliderImages }) {
  const { classes } = useStyles();

  return (
    <div
      className={`${classes.container} ${classes.screenRatio}`}
      style={{
        backgroundImage: `url(
            ${
              process.env.NEXT_PUBLIC_BACKEND_URL + "uploads/" + sliderImages[0]
            })`,
      }}
    ></div>
  );
}
