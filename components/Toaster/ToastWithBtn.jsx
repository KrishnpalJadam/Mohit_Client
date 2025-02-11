// ** Next, React And Locals Imports
import SecondaryButton from "../Button/SecondaryButton";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import toast from "react-hot-toast";

export default function ToastWithBtn(message) {
  return (
    <div>
      {toast(
        () => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ pr: 1 }}>
              {message}
            </Typography>
            <SecondaryButton href="/login" text="Login" />
          </div>
        ),
        { position: "top-right" }
      )}
    </div>
  );
}
