"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("league", [
      {
        name: "KCSA 2021 Outdoor",
        is_active: false,
        league_type: "INDOOR",
        league_age_type: "OPEN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "KCSA 2021 Outdoor",
        league_type: "INDOOR",
        is_active: false,
        league_age_type: "SENIOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("league", [
      {
        name: "KCSA 2021 Outdoor",
        is_active: false,
        league_type: "INDOOR",
        league_age_type: "OPEN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "KCSA 2021 Outdoor",
        is_active: false,
        league_type: "INDOOR",
        league_age_type: "SENIOR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
