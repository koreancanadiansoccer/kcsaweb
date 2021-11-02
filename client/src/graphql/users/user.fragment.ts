import { TEAM_FRAGMENT } from '../teams/team.fragment';

export const USER_FRAGMENT = `
id
name
email
phoneNumber
status
isAdmin
team{
  ${TEAM_FRAGMENT}
}
`;
