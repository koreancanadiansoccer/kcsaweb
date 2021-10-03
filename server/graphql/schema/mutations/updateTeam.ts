import { TeamType, TeamInputType } from "../../types/team";
import { Team } from "../../../db/models/team.model";

/**
 * Update team data
 */
export const updateTeam = {
  type: TeamType,
  args: {
    updateTeam: { type: TeamInputType },
  },
  async resolve(parent: object, args: any) {
    const team = await Team.findOne({
      where: { id: args.updateTeam.id },
    });

    if (!team) {
      throw Error("Team to update could not be found");
    }

    await Team.update(args.updateTeam, { where: { id: args.updateTeam.id } });

    const updatedTeam = await Team.findOne({
      where: { id: args.updateTeam.id },
    });

    return updatedTeam;
  },
};
