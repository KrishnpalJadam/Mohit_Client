// ** Next, React And Locals Imports
import Link from "next/link";
import useStyles from "./styles.js";

export default function CustomLink({ href, text, color, hover }) {
  const { classes } = useStyles();

  return (
    <Link
      href={href}
      className={`${color ? classes.color : ""} ${hover ? classes.hover : ""}`}
    >
      {text}
    </Link>
  );
}
