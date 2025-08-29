'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
    
     Theme.hasMany(models.Question, {
      foreignKey: "themeId",
      as: "questions"
     })
    }
  }
  Theme.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};