const SocialsFilter = (socialsData, network) => {
  const array = socialsData ? socialsData : [];

  const socials = {
    email: "",
    youtube: "",
    instagram: "",
    facebook: "",
    twitter: "",
    mobileNumber: "",
  };

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (item.match("@")?.index > 1) {
      socials.email = item.match("@").input;
    }

    if (item.match("youtube")?.index > 1) {
      socials.youtube = item.match("youtube").input;
    }

    if (item.match("instagram")?.index > 1) {
      socials.instagram = item.match("instagram").input;
    }

    if (item.match("facebook")?.index > 1) {
      socials.facebook = item.match("facebook").input;
    }

    if (item.match("twitter")?.index > 1) {
      socials.twitter = item.match("twitter").input;
    }

    if (item.length === 10) {
      socials.mobileNumber = item;
    }
  }

  // Network url
  const url =
    socials[network]?.length > 0
      ? socials[network]
      : process.env.NEXT_PUBLIC_CLIENT_URL;

  return url;
};

export default SocialsFilter;
