const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const corsConfig = require("./corsConfig");

app.use(cors(corsConfig));

const serverConfig = (app) => {
  app.use(morgan('dev'));               // Логирование запросов
  app.use(express.urlencoded({ extended: true }));  // Парсинг форм
  app.use(express.json());              // Парсинг JSON
  app.use(express.static('public'));    // Статические файлы
};

module.exports = serverConfig;