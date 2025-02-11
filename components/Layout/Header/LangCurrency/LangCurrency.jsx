// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import GetCountryFlag from "@/helpers/GetCountryFlag.js";
import CustomImage from "@/components/Image/CustomImage";
import intlData from "./intl.json";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { getCookie, setCookie } from "cookies-next/client";
import Axios from "axios";
import { MdClose } from "react-icons/md";

export default function LangCurrency({ dict, handleIntlModal }) {
  const { classes } = useStyles();
  const router = useRouter();
  const pathname = usePathname();
  const { locales, currencies } = intlData;

  // Switcher
  const [switcher, setSwitcher] = useState("language");

  // Current Language & Currency
  const [currentLang, setCurrentLang] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState("");

  useEffect(() => {
    // Getting language and currency from cookies
    const langFromCookie = getCookie("myLanguage");
    const currencyFromCookie = getCookie("myCurrency");

    if (langFromCookie) {
      setCurrentLang(langFromCookie);
    }

    if (currencyFromCookie) {
      setCurrentCurrency(JSON.parse(currencyFromCookie)?.currency);
    }
  }, []);

  // Setting language & currency as cookies on change
  const handleLang = (e) => {
    if (!e.target.textContent) return;

    const language = e.target.textContent.toLowerCase();

    setCookie("myLanguage", language);

    setCurrentLang(language);

    const pathnameWithoutLocale = pathname.split("/").slice(2).join("/");

    // Update the URL with the new locale
    router.push(`/${language}/${pathnameWithoutLocale}`);

    handleIntlModal();
  };

  const handleCurrency = (e) => {
    if (!e.target.textContent) return;

    const currency = e.target.textContent.toLowerCase();

    // Currency conversion api
    const currencyApi = process.env.NEXT_PUBLIC_CURRENCY_CONVERSION_API;

    Axios.get(currencyApi)
      .then((res) => {
        // Getting locale from currencies json
        const locale = currencies.find(
          (item) => item.currency.toLowerCase() === currency
        );

        const currencyWithRate = {
          currency: currency,
          locale: locale.locale,
          rate: res.data.usd[currency],
        };

        //Set currency as a cookie
        setCookie("myCurrency", JSON.stringify(currencyWithRate));
      })
      .catch((error) => {
        // Error fetching currency data
        router.refresh();
      });

    setCurrentCurrency(currency);

    router.refresh();

    handleIntlModal();
  };

  return (
    <div className={classes.container}>
      <div className={classes.closeIcon}>
        <MdClose fontSize={"1.5em"} onClick={() => handleIntlModal()} />
      </div>
      <Typography variant="h4" sx={{ pb: 5 }}>
        {dict.header.langCurrencyText1}{" "}
        <span
          onClick={() => setSwitcher("language")}
          className={`${classes.switcher} ${
            switcher === "language" && classes.activeSwitcher
          }`}
        >
          {dict.header.langCurrencyText2}
        </span>{" "}
        {dict.header.langCurrencyText3}{" "}
        <span
          onClick={() => setSwitcher("currency")}
          className={`${classes.switcher} ${
            switcher === "currency" && classes.activeSwitcher
          }`}
        >
          {dict.header.langCurrencyText4}
        </span>
      </Typography>
      {switcher === "language" && (
        <div>
          {locales?.map((lang) => (
            <div
              key={lang}
              className={`${classes.menu} ${
                lang === currentLang ? classes.activeItem : ""
              }`}
              onClick={(e) => {
                e.preventDefault();

                handleLang(e);
              }}
            >
              <CustomImage
                src={GetCountryFlag(lang)}
                alt={"lang" + "flag"}
                width={45}
                height={30}
              />
              <Typography variant="subtitle1" className={classes.text}>
                {lang.toUpperCase()}
              </Typography>
            </div>
          ))}
        </div>
      )}

      {switcher === "currency" && (
        <div>
          {currencies.map((item) => {
            const locale = item.locale.slice(-2).toLowerCase();
            return (
              <div
                key={item}
                className={`${classes.menu} ${
                  item.currency.toLowerCase() === currentCurrency
                    ? classes.activeItem
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  handleCurrency(e);
                }}
              >
                <CustomImage
                  src={GetCountryFlag(locale)}
                  alt={locale + "flag"}
                  width={45}
                  height={30}
                />
                <Typography variant="body2" className={classes.text}>
                  {item.currency}
                </Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
