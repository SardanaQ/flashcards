'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',

      [
        {
          question:
            'Как зовут главного героя трилогии, который должен уничтожить Кольцо Всевластья?',
          answer: 'Фродо Бэггинс',
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какое настоящее имя Гэндальфа?',
          answer: 'Олорин',
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Как называется меч, перекованный для Арагорна?',
          answer: 'Андрил',
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Кто такие энты?',
          answer: 'Древние существа, похожие на деревья',
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Как зовут короля роханов, преданного Саруманом?',
          answer: 'Теоден',
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question:
            'Что написал на двери Бэг-Энда Гэндальф, чтобы дверь открывалась только друзьям?',
          answer: 'Скажи "друг" и входи',
          themeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какое растение называют "тещин язык" за длинные острые листья?',
          answer: 'Сансевиерия',
          themeId: 2, 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какой цветок называют "рождественской звездой"?',
          answer: 'Пуансеттия',
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какое растение эффективно очищает воздух от формальдегида?',
          answer: 'Хлорофитум',
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Как называется растение с бархатными листьями, которое "стесняется" при прикосновении?',
          answer: 'Мимоза стыдливая',
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какое растение называют "денежным деревом"?',
          answer: 'Толстянка',
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какой кактус цветет только ночью и всего несколько часов?',
          answer: 'Царица ночи (Селеницереус)',
          themeId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какая каша является традиционным английским завтраком?',
          answer: 'Овсяная каша',
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Из какой страны произошли панкейки?',
          answer: 'США',
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Как называется израильское блюдо из яиц и помидоров, популярное на завтрак?',
          answer: 'Шакшука',
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какой французский завтрак состоит из круассана и кофе?',
          answer: 'Пти-дежене',
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Какая каша готовится из дробленой пшеницы?',
          answer: 'Манная каша',
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question: 'Как называется японский завтрак, обычно включающий рис, суп мисо и рыбу?',
          answer: 'Ичидзю-сансай',
          themeId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
