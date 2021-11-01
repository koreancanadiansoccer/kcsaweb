import map from 'lodash/map';

// Format string into year format.
export const formatYear = (year: string): string =>
  year && year.replace(/[^0-9]/gi, '').substring(0, 4);

/**
 * Format name.
 * Capitalize first letter of each name parts (first name, last name, etc)
 */
export const displayFullName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`;
};
// map(
//   name.split(' '),
//   (name) => name.charAt(0).toUpperCase() + name.slice(1)
// ).join(' ');

/**
 * Format name -> Stanley Dong Moon -> S.D.Moon
 */
export const shortenName = (name: string): string => {
  const names = name.split(' ');
  return map(name.split(' '), (nameTemp, idx) => {
    return idx !== names.length - 1
      ? nameTemp.charAt(0).toUpperCase()
      : nameTemp.charAt(0).toUpperCase() + nameTemp.slice(1);
  }).join('.');
};
