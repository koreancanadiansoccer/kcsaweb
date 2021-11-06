'use strict';
// eslint-disable-next-line
const { hash } = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
      {
        firstName: 'admin',
        lastName: 'admin',
        password: await hash('Kcsaadmin2021!', 8),
        email: 'kcsaadmin',
        phone_number: '1234567890',
        is_admin: true,
        type: 'ADMIN',
        status: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        firstName: 'Stanley',
        lastName: 'Moon',
        password: await hash('1234', 8),
        email: 'example@example.com',
        phone_number: '9876543210',
        type: 'CAPTAIN',
        status: 'ACCEPTED',
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
        firstName: 'admin',
        lastName: 'admin',
        password: await hash('Kcsaadmin2021!', 8),
        email: 'kcsaadmin',
        phoneNumber: '123-456-7890',
        is_admin: true,
        type: 'ADMIN',
        status: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        firstName: 'Stanley',
        lastName: 'Moon',
        password: await hash('1234', 8),
        email: 'example@example.com',
        phoneNumber: '987-654-3210',
        type: 'CAPTAIN',
        status: 'ACCEPTED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
