const ThemeService = require('../services/themeService');

// Получить все темы
exports.getAllThemes = async (req, res) => {
  try {
    console.log('Getting all themes...');
    const themes = await ThemeService.getAllThemes();
    res.json(themes);
  } catch (error) {
    console.error('Error in getAllThemes controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Получить тему по ID
exports.getThemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const theme = await ThemeService.getThemeById(id);
    
    if (!theme) {
      return res.status(404).json({ error: 'Theme not found' });
    }
    
    res.json(theme);
  } catch (error) {
    console.error('Error in getThemeById controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
