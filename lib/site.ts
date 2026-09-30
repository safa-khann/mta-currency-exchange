// Single source of truth for business details shown across the site.
export const site = {
  name: 'MTA Worldwide',
  legalName: 'MTA Worldwide Limited',
  companyNumber: '13941385',
  companiesHouseUrl: 'https://find-and-update.company-information.service.gov.uk/company/13941385',
  phone: '+44 1375 413554',
  phoneHref: 'tel:+441375413554',
  email: 'mtaworldwidelimited@gmail.com',
  address: {
    line1: '54–56 High Street',
    city: 'Grays',
    postcode: 'RM17 6NA',
    country: 'United Kingdom',
  },
  hours: { days: 'Monday – Saturday', time: '9:00am – 6:00pm', closed: 'Sunday' },
  mapsUrl: 'https://maps.app.goo.gl/q1FFEuoKTSGVqJNw6',
  reviewsUrl:
    'https://www.google.com/maps/place/MTA+worldwide+Currency+Exchange+%26+Money+Transfer/@51.4769918,0.3226627,17z/data=!4m8!3m7!1s0x47d8b792e960dbdb:0x19994416c2535aa9!8m2!3d51.4769918!4d0.3226627!9m1!1b1!16s%2Fg%2F11m5fjwvxt',
  googlePlaceId: 'ChIJ29tg6ZK32EcRqVpTwhZEmRk',
} as const;

export const nav = {
  exchange: [
    { name: 'Click & Buy', href: '/click-and-buy-currency', description: 'Order online, collect in branch' },
    { name: 'Click & Sell', href: '/click-and-sell-currency', description: 'Sell unused notes at better rates' },
    { name: 'Home Delivery', href: '/currency-home-delivery', description: 'Currency to your door — coming soon' },
    { name: 'Exchange Rates', href: '/money-exchange/currency-exchange-rates', description: "Today's buy and sell rates" },
  ],
  main: [
    { name: 'Money Transfer', href: '/money-transfer' },
    { name: 'About', href: '/about-mta' },
    { name: 'Contact', href: '/contact-us' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ],
} as const;
