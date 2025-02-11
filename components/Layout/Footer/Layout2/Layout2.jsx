"use client";

// ** Next, React And Locals Imports
import Link from "next/link";
import SocialsFilter from "@/helpers/SocialsFilter.js";
import FormatLink from "@/helpers/FormatLink.js";
import CapitalizeText from "@/helpers/CapitalizeText.js";
import CustomLink from "@/components/Link/CustomLink";
import CustomImage from "@/components/Image/CustomImage";
import paymentGateways from "../footer.json";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

// ** Third Party Imports
import { HiChevronDown } from "react-icons/hi";

export default function Layout2({ dict, categories, socials }) {
  const { classes } = useStyles();

  // Important texts & links
  const importantLinkTexts = [
    dict.footer.importantLink1,
    dict.footer.importantLink2,
    dict.footer.importantLink3,
    dict.footer.importantLink4,
  ];

  const importantLinks = [
    "Privacy Policy",
    "Terms And Conditions",
    "Shipping And Returns",
    "About Us",
  ];

  const CURRENT_YEAR = new Date().getFullYear();

  // Socials
  const socialNetworks = ["facebook", "instagram", "twitter", "youtube"];

  return (
    <div className={classes.container}>
      <div className={classes.topLayout}>
        <div className={classes.column1}>
          <Typography
            variant="h4"
            sx={{
              pb: 2,
            }}
          >
            {dict.footer.help}
          </Typography>
          <Typography variant="h5" className={classes.menuItem} sx={{ mb: 2 }}>
            <CustomLink
              href={`mailto:${SocialsFilter(socials, "email")}`}
              text={CapitalizeText(SocialsFilter(socials, "email"))}
              hover={true}
            />
          </Typography>
          <Typography variant="h5" className={classes.menuItem} sx={{ mb: 2 }}>
            <CustomLink
              href={`tel:${SocialsFilter(socials, "mobileNumber")}`}
              text={SocialsFilter(socials, "mobileNumber")}
              hover={true}
            />
          </Typography>
          <Typography variant="h5" className={classes.menuItem}>
            <CustomLink
              href="/help"
              text={dict.footer.contactUs}
              hover={true}
            />
          </Typography>
        </div>
        <div className={classes.column2}>
          <div>
            <Typography
              variant="h4"
              sx={{
                pb: 2,
              }}
            >
              {dict.footer.shopNow}
            </Typography>
            <Typography variant="h5" className={classes.menuItem}>
              <CustomLink href="/shop/all" text={dict.footer.shopAll} />
            </Typography>
            {categories?.map((category, index) => (
              <div key={index}>
                <Typography variant="h5" className={classes.menuItem}>
                  <CustomLink
                    href={"/shop/" + FormatLink(category)}
                    text={CapitalizeText(category)}
                  />
                </Typography>
              </div>
            ))}
          </div>
          {/* Mobile accordion */}
          <div className={classes.accordion}>
            <Accordion elevation={0} square={true}>
              <AccordionSummary expandIcon={<HiChevronDown />}>
                <Typography variant="h4">{dict.footer.shopNow}</Typography>
              </AccordionSummary>
              {categories?.map((category, index) => (
                <div key={index}>
                  {index === 0 && (
                    <AccordionDetails>
                      <Typography variant="h5" className={classes.menuItem}>
                        <CustomLink
                          href="/shop/all"
                          text={dict.footer.shopAll}
                        />
                      </Typography>
                    </AccordionDetails>
                  )}
                  <AccordionDetails>
                    <Typography variant="h5" className={classes.menuItem}>
                      <CustomLink
                        href={"/shop/" + FormatLink(category)}
                        text={CapitalizeText(category)}
                      />
                    </Typography>
                  </AccordionDetails>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
        <div className={classes.column3}>
          <div>
            <Typography
              variant="h4"
              sx={{
                pb: 2,
              }}
            >
              {dict.footer.importantLinkText}
            </Typography>
            {importantLinkTexts?.map((page, index) => (
              <div key={index}>
                <Typography variant="h5" className={classes.menuItem}>
                  <CustomLink
                    href={"/content/" + FormatLink(importantLinks[index])}
                    text={page}
                  />
                </Typography>
              </div>
            ))}
          </div>
          {/* Mobile accordion */}
          <div className={classes.accordion}>
            <Accordion elevation={0} square={true}>
              <AccordionSummary expandIcon={<HiChevronDown />}>
                <Typography variant="h4">
                  {dict.footer.importantLinkText}
                </Typography>
              </AccordionSummary>
              {importantLinkTexts?.map((page, index) => (
                <AccordionDetails key={index}>
                  <Typography variant="h5" className={classes.menuItem}>
                    <CustomLink
                      href={"/content/" + FormatLink(importantLinks[index])}
                      text={page}
                    />
                  </Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          </div>
        </div>
        <div className={classes.column4}>
          <Typography
            variant="h4"
            sx={{
              pb: 2,
            }}
          >
            {dict.footer.followUs}
          </Typography>
          {socialNetworks.map((network, index) => (
            <Link
              key={index}
              href={SocialsFilter(socials, network)}
              target="_blank"
              rel="noreferrer"
            >
              <div style={{ display: "inline", padding: "0 7px" }}>
                <CustomImage
                  src={`/assets/${network}.png`}
                  alt="social logo"
                  width={35}
                  height={35}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={classes.bottomLayout}>
        <div className={classes.copyrights}>
          <Typography variant="body1">
            © {CURRENT_YEAR} {process.env.NEXT_PUBLIC_SITE_NAME}.com -{" "}
            {dict.footer.rightsReserved}
          </Typography>
        </div>
        <div className={classes.paymentLabels}>
          {paymentGateways.paymentGateways.map((item, index) => {
            return (
              <div key={index}>
                <CustomImage
                  src={item.paymentGateway}
                  alt="payment logo"
                  width={35}
                  height={35}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
