'use strict';

const { hash } = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('user', [
      {
        name: 'admin',
        password: await hash('1234', 8),
        email: 'example_admin@example.com',
        phoneNumber: '123-456-7890',
        is_admin: true,
        type: 'ADMIN',
        status: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'stanley',
        password: await hash('1234', 8),
        email: 'example@example.com',
        phoneNumber: '987-654-3210',
        type: 'CAPTAIN',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('team', [
      {
        name: 'Gunners',
        emblem_img_link: null,
        season: null,
        played: 2,
        win: 2,
        loss: 0,
        goal_scored: 5,
        goal_conceded: 1,
        league_type: 'OPEN',
        is_active: true,
        captain_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return;
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('user', [
      {
        name: 'admin',
        password: await hash('1234', 8),
        email: 'example_admin@example.com',
        phoneNumber: '123-456-7890',
        is_admin: true,
        type: 'ADMIN',
        status: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'stanley',
        password: await hash('1234', 8),
        email: 'example@example.com',
        phoneNumber: '987-654-3210',
        type: 'CAPTAIN',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkDelete('team', [
      {
        name: 'Gunners',
        emblem_img_link: null,
        season: null,
        played: 2,
        win: 2,
        loss: 0,
        goal_scored: 5,
        goal_conceded: 1,
        league_type: 'OPEN',
        is_active: true,
        captain_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
