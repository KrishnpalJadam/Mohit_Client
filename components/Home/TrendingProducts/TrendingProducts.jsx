"use client";

// ** Next, React And Locals Imports
import Link from "next/link";
import FormatLink from "@/helpers/FormatLink";
import CurrencyConverter from "@/helpers/CurrencyConverter";
import CapitalizeText from "@/helpers/CapitalizeText";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles";
import theme from "@/components/Theme/theme";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import Marquee from "react-fast-marquee";

export default function TrendingProducts({ dict, settings, products }) {
  const { classes } = useStyles();

  // Trending, limit & products
  const isTrending = settings?.trending;
  const trendingLimit = settings?.trendingLimit;

  const trendingProducts = products?.filter((product) => {
    return product.trending;
  });

  return (
    <div>
      {isTrending && trendingProducts?.length > 2 && (
        <div className={classes.container}>
          <div className={classes.title}>
            <Typography variant="h5">{dict.home.trendingTitle}</Typography>
            <CustomImage
              src={"/assets/Gif/trending.gif"}
              alt="trending gif"
              width={25}
              height={25}
            />
          </div>
          <Marquee pauseOnHover={true} gradientColor={[255, 255, 255]}>
            {trendingProducts
              ?.slice(0, trendingLimit)
              ?.map((product, index) => (
                <Link key={index} href={`/p/${FormatLink(product.name)}`}>
                  <div className={classes.trendingProduct}>
                    {product.images && (
                      <CustomImage
                        src={`${
                          process.env.NEXT_PUBLIC_BACKEND_URL +
                          "product/" +
                          product.images[0]
                        }`}
                        alt={product.name}
                        width={75}
                        height={75}
                        style={classes.productImage}
                      />
                    )}
                    <div>
                      <Typography variant="h5" sx={{ pl: 2 }}>
                        {product.name.length > 30 ? (
                          <>
                            {CapitalizeText(product.name.substring(0, 25)) +
                              "..."}
                          </>
                        ) : (
                          <>{CapitalizeText(product.name)}</>
                        )}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          pt: 1,
                          pl: 2,
                          color: theme.palette.error.light,
                        }}
                      >
                        {CurrencyConverter(product.salePrice)}
                      </Typography>
                    </div>
                  </div>
                </Link>
              ))}
          </Marquee>
        </div>
      )}
    </div>
  );
}
