'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Themes',
      [
        {
          title: 'Властелин колец',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Комнатные растения',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Завтраки',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  },
};
