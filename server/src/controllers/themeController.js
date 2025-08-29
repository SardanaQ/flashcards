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
}
module.exports = ThemeController;
