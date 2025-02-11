export const GET_SITE_SETTINGS = `
  query {
    getSiteSettings {
      _id
      logo
      topbar
      topbarContent
      topbarStyle
      headerLayout
      footerLayout
      socials
      paymentMethods
      customerViews
      customerViewsNos
      customerViewsTimer
      soldInLast
      soldInLastProducts
      soldInLastHours
      countdown
      countdownText
      countdownTimer
      hotStock
      hotStockInventoryLevel
    }
  }
`;
