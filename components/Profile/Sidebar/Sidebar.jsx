// ** Next, React And Locals Imports
import Link from "next/link";
import { usePathname } from "next/navigation";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";

export default function Sidebar({ dict }) {
  const { classes } = useStyles();
  const pathname = usePathname();

  // Active link
  const currentPage = "/" + pathname.split("/").slice(2).join("/");

  // Menus
  const tabs = [
    { name: dict.sidebar.profile, link: "/profile" },
    { name: dict.sidebar.address, link: "/profile/address" },
    { name: dict.sidebar.orders, link: "/profile/orders" },
    { name: dict.sidebar.wishlist, link: "/profile/wishlist" },
    { name: dict.sidebar.coupons, link: "/profile/coupons" },
    { name: dict.sidebar.changePassword, link: "/profile/change-password" },
  ];

  return (
    <div className={classes.container}>
      <Paper elevation={0}>
        {tabs.map((tab, index) => {
          return (
            <MenuItem
              key={index}
              className={currentPage === tab.link ? classes.active : ""}
            >
              <Link href={tab.link}>
                <Typography variant="subtitle1">{tab.name}</Typography>
              </Link>
            </MenuItem>
          );
        })}
      </Paper>
    </div>
  );
}
