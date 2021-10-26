'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('gallery', [
      {
        title: '2017 KCSA Presidents Cup',
        description: 'Winner: Gunners',
        show_on_homepage: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '2017 All Community Games Soccer Tournament',
        description: 'Winner: Gunners',
        show_on_homepage: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('gallery', [
      {
        title: '2017 KCSA Presidents Cup',
        description: 'Winner: Gunners',
        show_on_homepage: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: '2017 All Community Games Soccer Tournament',
        description: 'Winner: Gunners',
        show_on_homepage: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
};
