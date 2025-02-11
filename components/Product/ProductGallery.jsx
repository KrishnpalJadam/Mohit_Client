// ** Next, React And Locals Imports
import { useEffect } from "react";
import CustomImage from "@/components/Image/CustomImage";
import theme from "@/components/Theme/theme.js";
import useStyles from "./styles.js";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

// ** Third Party Imports
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function ProductGallery({ product }) {
  const { classes } = useStyles();

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#lightbox",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  const gallery = product?.images;

  return (
    <div>
      {/* For larger screens */}
      <Grid
        container
        spacing={1}
        id="lightbox"
        className={classes.productGallery}
      >
        {gallery ? (
          <>
            {gallery?.length > 0 ? (
              <>
                {gallery.map((image, index) => (
                  <Grid item sm={6} xs={12} key={index}>
                    <div className={classes.productImageCtn}>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_BACKEND_URL +
                          "product/" +
                          image
                        }
                        target="_blank"
                        rel="noreferrer"
                        data-pswp-width={660}
                        data-pswp-height={770}
                      >
                        <CustomImage
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                            "product/" +
                            image
                          }
                          alt="product catalogue"
                          style={classes.productImage}
                          fill={true}
                        />
                      </a>
                    </div>
                  </Grid>
                ))}
              </>
            ) : (
              <>
                <Grid item sm={6} xs={12}>
                  <div className={classes.productImageCtn}>
                    <CustomImage
                      src={"/assets/emptyImage.png"}
                      alt="no product images found"
                      style={classes.productImage}
                      fill={true}
                    />
                  </div>
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            {Array.from({ length: 4 }, (_, index) => index).map((item) => (
              <Grid key={item} item sm={6} xs={12}>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{
                    bgcolor: `${theme.palette.primary.light}25`,
                    paddingBottom: "116.67%",
                  }}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
      {/* For smaller screens */}
      <div className={classes.scrollSnapGallery} id="lightbox">
        {gallery ? (
          <>
            {gallery?.length > 0 ? (
              <>
                {gallery.map((image, index) => (
                  <div key={index} className={classes.scrollSnapCtn}>
                    <a
                      href={
                        process.env.NEXT_PUBLIC_BACKEND_URL + "product/" + image
                      }
                      target="_blank"
                      rel="noreferrer"
                      data-pswp-width={660}
                      data-pswp-height={770}
                    >
                      <CustomImage
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_URL +
                          "product/" +
                          image
                        }
                        alt="product catalogue"
                        style={classes.productImage}
                        fill={true}
                      />
                    </a>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className={classes.scrollSnapCtn}>
                  <CustomImage
                    src={"/assets/emptyImage.png"}
                    alt="no product images found"
                    style={classes.productImage}
                    fill={true}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{
                bgcolor: `${theme.palette.primary.light}25`,
                paddingBottom: "116.67%",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
