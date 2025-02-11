// ** Third Party Imports
import { getCookie, setCookie } from "cookies-next/client";

export default function CurrencyConverter(price) {
  // Currency formatting
  const formatCurrency = (rate, currency, locale) => {
    // Handle invalid price input
    if (!price || isNaN(price)) return null;

    // Total price
    const totalPrice = (rate * price).toFixed(2);

    try {
      const formattedCurrency = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency.toLowerCase(),
      }).format(totalPrice);

      return " " + formattedCurrency + " ";
    } catch (error) {
      return null;
    }
  };

  // Getting "myCurrency" from cookie
  const currencyFromCookie = getCookie("myCurrency");

  // Return formatted currency if "myCurrency" cookie is exist
  if (currencyFromCookie) {
    const { currency, rate, locale } = JSON.parse(currencyFromCookie);

    return formatCurrency(rate, currency, locale);
  } else {
    // If cookie is not present, setting the default currency "USD"
    const defaultCurrencyWithRate = {
      currency: "USD",
      locale: "en-US",
      rate: 1,
    };

    // Set the cookie for future use
    setCookie("myCurrency", JSON.stringify(defaultCurrencyWithRate));

    // Return formatted default currency
    return formatCurrency(
      defaultCurrencyWithRate.rate,
      defaultCurrencyWithRate.currency,
      defaultCurrencyWithRate.locale
    );
  }
}
