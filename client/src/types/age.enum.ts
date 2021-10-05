import map from 'lodash/map';

export enum AgeEnums {
  OPEN = 'OPEN',
  SENIOR = 'SENIOR',
  OVER40 = 'OVER40',
}

export const ageOptions = map(AgeEnums, (age) => {
  return { label: age, value: age };
});
