const GetCountryFlag = (code) => {
  const countryUrl = process.env.NEXT_PUBLIC_FLAG_CDN;

  if (code === "en") {
    return countryUrl + "us" + ".svg";
  }

  if (code === "ar") {
    return countryUrl + "ae" + ".svg";
  }

  return countryUrl + code + ".svg";
};

export default GetCountryFlag;
