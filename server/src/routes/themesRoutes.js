
const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');

// Получить все темы
router.get('/', themeController.getAllThemes);

// Получить тему по ID
router.get('/:id', themeController.getThemeById);

module.exports = router;
