"use client";

// ** Next, React And Locals Imports
import Layout1 from "./Layout1/Layout1";
import Layout2 from "./Layout2/Layout2";
import Layout3 from "./Layout3/Layout3";
import Skeletons from "@/components/Skeletons/Skeletons";
import theme from "@/components/Theme/theme.js";

// ** MUI Imports
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Hero({ dict, settings }) {
  const heroType = settings?.heroType;

  // Background image (based on screen size)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  let sliderImages = [];

  if (isSmallScreen !== isLargeScreen) {
    sliderImages = isLargeScreen
      ? settings?.heroImagesLarge
      : settings?.heroImagesSmall;
  }

  return (
    <div>
      {sliderImages?.length > 0 ? (
        <>
          {/* Hero Layouts */}
          {heroType === "heroType1" && <Layout1 sliderImages={sliderImages} />}
          {heroType === "heroType2" && (
            <Layout2
              dict={dict}
              sliderImages={sliderImages}
              settings={settings}
            />
          )}
          {heroType === "heroType3" && (
            <Layout3 sliderImages={sliderImages} settings={settings} />
          )}
        </>
      ) : (
        <Skeletons type="hero" />
      )}
    </div>
  );
}
