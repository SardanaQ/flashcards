'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {

      Question.belongsTo(models.Theme, {
        foreignKey: 'themeId',
        as: 'theme',
      });
    }
  }
  Question.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      themeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Question',
    },
  );
  return Question;
};