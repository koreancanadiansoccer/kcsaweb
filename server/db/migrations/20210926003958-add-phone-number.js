"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("user", "phone_number", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "user",
      "phone_number",
      Sequelize.STRING
    );
  },
};
