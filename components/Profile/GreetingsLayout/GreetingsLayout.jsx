// ** Next, React And Locals Imports
import { logoutAPI } from "@/actions/auth.actions.js";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { FiLogOut } from "react-icons/fi";

export default function GreetingsLayout({ dict, customer }) {
  const { classes } = useStyles();

  // Greetings
  const Greetings = () => {
    var today = new Date();
    var currentHour = today.getHours();

    if (currentHour < 12) {
      return <Typography variant="h4">Good Morning 🌤️</Typography>;
    } else if (currentHour < 18) {
      return <Typography variant="h4">Good Afternoon 🌞</Typography>;
    } else {
      return <Typography variant="h4">Good Evening ✨</Typography>;
    }
  };

  // Logout
  const handleLogout = () => {
    logoutAPI();
  };

  return (
    <div className={classes.greetings}>
      <div>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {dict.greeting.hey}, {""}
          {customer?.firstName?.length > 0
            ? customer.firstName
            : dict.greeting.friend}
        </Typography>
        {Greetings()}
      </div>
      <div className={classes.logoutBtn} onClick={handleLogout}>
        <SecondaryButton text={dict.greeting.logout} endIcon={<FiLogOut />} />
      </div>
    </div>
  );
}
