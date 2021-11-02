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

/**
 * Phone number formatting
 */
export const formatPhone = (num: string, addParentheses = true): string => {
  const p1 = num.slice(0, 3);
  const p2 = num.slice(3, 6);
  const p3 = num.slice(6, 10);

  if (p1.length < 1) {
    return '';
  }
  if (p1.length < 3 || p2.length < 1) {
    return `(${p1}`;
  }
  if (p2.length < 3 || p3.length < 1) {
    return `(${p1}) ${p2}`;
  }

  return addParentheses ? `(${p1}) ${p2} ${p3}` : `${p1} ${p2} ${p3}`;
};

/**
 * Convert formatted phone number into string of numeric digits.
 *
 * @param num
 */
export const unformatPhone = (num: string): string =>
  num.replace(/[^0-9]/g, '').substr(0, 10);
