import map from 'lodash/map';
import CryptoJS from 'crypto-js';

import { MatchPlayer } from '../../db/models/matchplayer.model';
import { LeaguePlayer } from '../../db/models/leagueplayer.model';
import { LeagueTeam } from '../../db/models/leagueteam.model';
import { Team } from '../../db/models/team.model';
import { Match } from '../../db/models/match.model';
import { League } from '../../db/models/league.model';
import { Player } from '../../db/models/player.model';

export const encodeIDBase64 = (id: number): string => {
  const str = `id=${id}`;
  const wordArray = CryptoJS.enc.Utf8.parse(str);
  const base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64;
};

// Decode base 64.
// Once decoded, it will have id={id}
export const decodeIDBase64 = (encodedId: string): number => {
  const parsedWordArray = CryptoJS.enc.Base64.parse(encodedId);
  const parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  const id = parsedStr.split('=');

  return parseInt(id[1], 0);
};

// Return league data to be used on admin - league details page.
export const AdminGetLeauge = async (leagueId: number): Promise<League> => {
  const league = await League.findOne({
    include: [
      {
        model: LeagueTeam,
        as: 'leagueTeams',
        duplicating: false,
        include: [
          { model: LeaguePlayer, duplicating: false, include: [Player] },
          {
            model: Team,
            as: 'team',
          },
        ],
      },
      {
        model: Match,
        as: 'matches',
        duplicating: false,
        include: [
          {
            as: 'homeTeam',
            model: LeagueTeam,
            duplicating: false,
            subQuery: false,
            include: [
              {
                model: Team,
                as: 'team',
                required: true,
              },
            ],
          },
          {
            model: LeagueTeam,
            as: 'awayTeam',
            duplicating: false,
            include: [
              {
                model: Team,
                as: 'team',
              },
            ],
          },
        ],
      },
    ],
    where: { id: leagueId },
    subQuery: false,
  });

  if (!league) {
    throw Error('League could not be found');
  }

  // Get league match players.
  // Looks like sequelize can't handle deeply nested query with conditions.
  await Promise.all(
    map(league.matches, async (match, idx) => {
      const matchId = match.id;
      const { id: homeTeamId } = match.homeTeam;
      const { id: awayTeamId } = match.awayTeam;

      //Find players
      const homeMatchPlayers = await MatchPlayer.findAll({
        include: [Player],
        where: { matchId: matchId, leagueTeamId: homeTeamId },
      });

      const awayMatchPlayers = await MatchPlayer.findAll({
        include: [Player],
        where: { matchId: matchId, leagueTeamId: awayTeamId },
      });

      league.matches[idx].homeTeam.matchPlayers = homeMatchPlayers;
      league.matches[idx].awayTeam.matchPlayers = awayMatchPlayers;
    })
  );
  return league;
};
