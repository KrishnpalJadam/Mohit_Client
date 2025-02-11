// ** Next, React And Locals Imports
import CustomLink from "@/components/Link/CustomLink";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export default function BreadcrumbsBar({ dict, product }) {
  const { classes } = useStyles();

  return (
    <>
      {product ? (
        <Breadcrumbs className={classes.breadcrumbs}>
          <Typography variant="subtitle2">
            <CustomLink href="/" text={dict.product.breadcrumbsHome} />
          </Typography>
          <Typography variant="subtitle2">
            <CustomLink href="/shop/all" text={dict.product.breadcrumbsShop} />
          </Typography>
        </Breadcrumbs>
      ) : (
        <div className={classes.breadcrumbs}>
          <Skeleton
            animation="wave"
            width="25%"
            sx={{ bgcolor: `${theme.palette.primary.light}25` }}
          />
        </div>
      )}
    </>
  );
}
