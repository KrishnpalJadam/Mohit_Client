"use client";

// ** Next, React And Locals Imports
import { useState } from "react";
import Link from "next/link";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function ShopByCategory({ settings }) {
  const { classes } = useStyles();

  // Slider
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        {settings?.categoryTitle}
      </Typography>
      <div className={classes.prevNextBtn}>
        <div onClick={sliderRef?.slickPrev} className={classes.arrow}>
          <BsChevronLeft />
        </div>
        <div onClick={sliderRef?.slickNext} className={classes.arrow}>
          <BsChevronRight />
        </div>
      </div>
      <Slider {...sliderSettings} ref={setSliderRef} className={classes.slider}>
        {settings?.categoryImages?.map((item, index) => (
          <div className={classes.main} key={index}>
            <Link href={settings.categoryLink[index]}>
              <CustomImage
                src={process.env.NEXT_PUBLIC_BACKEND_URL + "uploads/" + item}
                alt={settings.categoryHeading[index]}
                fill={true}
              />
              <div className={classes.categoryContent}>
                <Typography variant="h5" className={classes.categoryText}>
                  {settings.categoryHeading[index]}
                </Typography>
                <Typography variant="subtitle1" className={classes.action}>
                  {settings.categoryText[index]}
                </Typography>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
