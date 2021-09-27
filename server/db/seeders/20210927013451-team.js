"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("team", [
      {
        name: "Gunners",
        emblem_img_link: null,
        season: null,
        played: 2,
        win: 2,
        loss: 0,
        goal_scored: 5,
        goal_conceded: 1,
        team_age_type: "OPEN",
        league_id: 1,
        is_active: true,
        captain_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("team", [
      {
        name: "Gunners",
        emblem_img_link: null,
        season: null,
        played: 2,
        win: 2,
        loss: 0,
        goal_scored: 5,
        goal_conceded: 1,
        team_age_type: "OPEN",
        is_active: true,
        league_id: 1,
        captain_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
