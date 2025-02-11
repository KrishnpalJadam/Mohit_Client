// ** Next, React And Locals Imports
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerAPI } from "@/actions/customers.actions.js";
import { logoutAPI } from "@/actions/auth.actions.js";
import { getCustomer } from "@/redux/slices/customer.js";
import SecondaryButton from "@/components/Button/SecondaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";

// ** Third Party Imports

export default function ProfileModal({ dict, closeModal, isAuth }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  // Customer details
  const customer = useSelector((state) => state.customer.customer);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetchCustomerAPI();

      if (response?._id) {
        dispatch(getCustomer(response));
      }
    };
    if (!customer?._id) {
      fetchCustomer();
    }
  }, []);

  // Close Profile Modal
  const handleCloseModal = () => {
    closeModal();
  };

  // Detect Outside Click
  const modal = useRef(null);

  const useDetectOutsideClick = (ref) => {
    useEffect(() => {
      // Function for click event
      const handleOutsideClick = (event) => {
        if (
          !ref.current.contains(event.target) &&
          event.target.parentNode.parentNode?.id !== "profileIcon"
        ) {
          handleCloseModal();
        }
      };

      // Adding click event listener
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }, [ref]);
  };

  useDetectOutsideClick(modal);

  // Logout
  const handleLogout = () => {
    logoutAPI();
  };

  return (
    <div className={classes.container} ref={modal}>
      {isAuth ? (
        <Paper>
          <Box>
            <Typography variant="h5" sx={{ p: 2 }}>
              {dict.header.profileModalText1},{" "}
              {customer?.firstName
                ? customer.firstName
                : dict.header.profileModalText2}
              👋
            </Typography>
          </Box>
          <Divider />
          <Link href="/profile">
            <MenuItem>
              <Box>
                <Typography variant="subtitle1">
                  {dict.header.profileModalProfile}
                </Typography>
              </Box>
            </MenuItem>
          </Link>
          <Link href="/profile/wishlist">
            <MenuItem>
              <Box>
                <Typography variant="subtitle1">
                  {dict.header.profileModalWishlist}
                </Typography>
              </Box>
            </MenuItem>
          </Link>
          <Link href="/profile/orders">
            <MenuItem>
              <Box>
                <Typography variant="subtitle1">
                  {dict.header.profileModalOrders}
                </Typography>
              </Box>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <Box>
              <Typography variant="subtitle1">
                {dict.header.profileModalLogout}
              </Typography>
            </Box>
          </MenuItem>
        </Paper>
      ) : (
        <Paper>
          <Box>
            <Typography variant="h5" sx={{ p: 2 }}>
              {dict.header.profileModalShop}
            </Typography>
          </Box>
          <div className={classes.btn}>
            <SecondaryButton
              href="/login"
              text={dict.header.profileModalLogin}
            />
          </div>
        </Paper>
      )}
    </div>
  );
}
