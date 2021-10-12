import map from 'lodash/map';

export enum ResourceType {
  LOGO = 'LOGO',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export const resourceOptions = map(ResourceType, (resource) => {
  return { value: resource };
});
