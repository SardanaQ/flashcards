const { ThemeService } = require('../services/themeService');
class ThemeController {
  static async getThemesAll(req, res) {
    const themes = await ThemeService.getThemesAll();
    return res.json(themes);
  }

  static async getTheme(req, res) {
    const { id } = req.params;
    const result = await ThemeService.getTheme(id);
    return res.json(result);
  }

  static async getQuestionsByTheme(req, res) {
    const { themeId } = req.params;
    try {
      const question = await ThemeService.getQuestionsByTheme(themeId);
      return res.json(question);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  static async getOneQuestion(req, res) {
    const { id } = req.params;
    try {
      const question = await ThemeService.getOneQuestion(id);
      return res.json(question);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

module.exports = ThemeController;
