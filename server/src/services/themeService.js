const { Theme } = require('../../db/models');

class ThemeService {
  // Получить все темы
  static async getAllThemes() {
    try {
      const themes = await Theme.findAll();
      return themes;
    } catch (error) {
      console.error('Error in getAllThemes:', error);
      throw error;
    }
  }

  // Получить тему по ID
  static async getThemeById(id) {
    try {
      const theme = await Theme.findByPk(id);
      return theme;
    } catch (error) {
      console.error('Error in getThemeById:', error);
      throw error;
    }
  }
}

module.exports = ThemeService;
