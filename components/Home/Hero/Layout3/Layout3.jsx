// ** Next, React And Locals Imports
import { useState } from "react";
import Link from "next/link";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles";

// ** Third Party Imports
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function Layout3({ sliderImages, settings }) {
  const { classes } = useStyles();

  // Slider
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    lazyLoad: false,
    dots: true,
    pauseOnHover: false,
  };

  return (
    <div className={classes.container}>
      <div className={classes.prevNextBtn}>
        <div onClick={sliderRef?.slickPrev} className={classes.arrow}>
          <BsChevronLeft fontSize={"2em"} />
        </div>
        <div onClick={sliderRef?.slickNext} className={classes.arrow}>
          <BsChevronRight fontSize={"2em"} />
        </div>
      </div>
      <Slider ref={setSliderRef} {...sliderSettings} className={classes.slider}>
        {sliderImages.map((item, index) => {
          return (
            <div key={index} className={classes.screenRatio}>
              <Link href={settings.heroLink}>
                <CustomImage
                  src={process.env.NEXT_PUBLIC_BACKEND_URL + "uploads/" + item}
                  alt={item}
                  fill={true}
                  priority={true}
                />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
