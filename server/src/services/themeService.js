const { Theme } = require('../../db/models');
const { Question } = require('../../db/models/');
class ThemeService {
  static async getThemesAll() {
    const themes = await Theme.findAll();
    return themes;
  }

  static async getTheme(id) {
    const theme = await Theme.findByPk(id);
    return theme;
  }
}
module.exports = ThemeService