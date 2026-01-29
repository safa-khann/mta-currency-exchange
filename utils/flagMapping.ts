// utils/flagMapping.ts
export const getFlagCountryCode = (currencyCode: string, countryName?: string): string => {
  // Special mappings for currencies that don't match country codes
  const specialMappings: Record<string, string> = {
    'EUR': 'eu', // European Union
    'USD': 'us', // United States
    'GBP': 'gb', // United Kingdom
    'CHF': 'ch', // Switzerland
    'JPY': 'jp', // Japan
    'CAD': 'ca', // Canada
    'AUD': 'au', // Australia
    'NZD': 'nz', // New Zealand
    'CNY': 'cn', // China
    'INR': 'in', // India
    'BRL': 'br', // Brazil
    'RUB': 'ru', // Russia
    'ZAR': 'za', // South Africa
    'TRY': 'tr', // Turkey
    'KRW': 'kr', // South Korea
    'MXN': 'mx', // Mexico
    'SGD': 'sg', // Singapore
    'HKD': 'hk', // Hong Kong
    'NOK': 'no', // Norway
    'SEK': 'se', // Sweden
    'DKK': 'dk', // Denmark
    'PLN': 'pl', // Poland
    'CZK': 'cz', // Czech Republic
    'HUF': 'hu', // Hungary
    'RON': 'ro', // Romania
    // Add more mappings as needed
  };

  return specialMappings[currencyCode] || currencyCode.substring(0, 2).toLowerCase();
};