import map from 'lodash/map';

// Format string into year format.
export const formatYear = (year: string): string =>
  year && year.replace(/[^0-9]/gi, '').substring(0, 4);

/**
 * Format name.
 * Capitalize first letter of each name parts (first name, last name, etc)
 */
export const displayName = (name: string): string => {
  const names = name.split(' ');

  return map(
    names,
    (name) => name.charAt(0).toUpperCase() + name.slice(1)
  ).join(' ');
};
