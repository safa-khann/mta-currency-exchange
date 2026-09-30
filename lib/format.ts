// Rates are shown with at least 2 and at most 4 decimal places so columns line up.
export const formatRate = (value: number) =>
  Number(value).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
