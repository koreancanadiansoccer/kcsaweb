import { gql } from '@apollo/client';

import { LEAGUE_FRAGMENT } from './league/league.fragment';
import { LEAGUE_TEAM_FRAGMENT } from './teams/team.fragment';
import { LEAGUE_PLAYER_FRAGMENT } from './players/player.fragment';

export const GET_HOME_VIEWER = gql`
  query {
    getHomeViewer {
      user {
        name
        isAdmin
      }
      announcements {
        id
        title
        subtitle
        showOnHomepage
        imageURL
      }
      galleries {
        id
        title
        description
        showOnHomepage
        createdAt
        galleryImages {
          id
          imageURL
        }
      }
      leagues {
        ${LEAGUE_FRAGMENT}
      }
      leagueTeams {
        ${LEAGUE_TEAM_FRAGMENT}
        team{
          teamLogoURL
          name
          teamColor
          foundedDate
        }
      }
      leaguePlayers {
        ${LEAGUE_PLAYER_FRAGMENT}
      }

    }
  }
`;
