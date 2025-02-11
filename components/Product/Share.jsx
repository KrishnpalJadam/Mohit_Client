// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import CustomImage from "@/components/Image/CustomImage";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// ** Third Party Imports
import {
  FacebookShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} from "react-share";
import { FiCopy } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

export default function Share({ dict, product, modal, handleShare }) {
  const { classes } = useStyles();

  // States
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const image = product?.images?.[0];

  return (
    <div>
      <Toaster />
      {product && (
        <Modal
          open={modal}
          onClose={handleShare}
          className={classes.socialShare}
        >
          <div className={classes.socialShareCtn}>
            <div className={classes.closeIcon}>
              <GrClose onClick={handleShare} />
            </div>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {dict.product.shareTitle}
            </Typography>
            <div className={classes.socialIcons}>
              <FacebookShareButton
                url={currentUrl}
                quote={product.name}
                hashtag={`#${process.env.NEXT_PUBLIC_SITE_NAME}`}
              >
                <CustomImage
                  src={`/assets/facebook.png`}
                  alt="facebook logo"
                  width={35}
                  height={35}
                />
              </FacebookShareButton>
              <PinterestShareButton
                url={currentUrl}
                media={image}
                description={product.description}
              >
                <CustomImage
                  src={`/assets/pinterest.png`}
                  alt="pinterest logo"
                  width={35}
                  height={35}
                />{" "}
              </PinterestShareButton>
              <WhatsappShareButton
                url={currentUrl}
                title={product.name}
                separator="::"
              >
                <CustomImage
                  src={`/assets/whatsapp.png`}
                  alt="whatsapp logo"
                  width={35}
                  height={35}
                />{" "}
              </WhatsappShareButton>
            </div>
            <Typography variant="subtitle1" className={classes.copyLink}>
              {dict.product.shareCopyText1}
              <FiCopy
                fontSize={"1.5em"}
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);

                  ToastStatus("Success", dict.product.linkCopied);
                }}
              />
              {dict.product.shareCopyText2}
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
}
