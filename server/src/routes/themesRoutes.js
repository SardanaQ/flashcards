const router = require('express').Router();
const ThemeController = require("../controllers/themeController");

router
  .get('/', ThemeController.getThemesAll)
  .get('/:id', ThemeController.getTheme)


module.exports = router;
