// Format string into year format.
export const formatYear = (year: string): string =>
  year && year.replace(/[^0-9]/gi, '').substring(0, 4);
