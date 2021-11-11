import map from 'lodash/map';

export enum ResourceType {
  LOGO = 'LOGO',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  GAMESHEET = 'GAMESHEET',
}

export const resourceOptions = map(ResourceType, (resource) => {
  return { value: resource };
});
