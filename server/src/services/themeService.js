const { Theme } = require('../../db/models');
const { Questions } = require('../../db/models');
class ThemeService {
  static async getThemesAll() {
    const themes = await Theme.findAll();
    return themes;
  }

  static async getTheme(id) {
    const theme = await Theme.findByPk(id);
    return theme;
  }

  static async getQuestions(themeId) {
    return Questions.findAll({ where: { themeId } });
  }
  static async getOneQuestion(id) {
    return Question.findByPk(id);
  }
}
module.exports = ThemeService;
