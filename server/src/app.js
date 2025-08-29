const express = require('express');
const serverConfig = require('./configs/serverConfig');
const themesRoutes = require("./routes/themesRoutes")
require('dotenv').config()
const app = express();
const cors = require('cors');

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5174', // URL вашего фронтенда
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Или для всех origins (в разработке)
app.use(cors());
serverConfig(app);


app.use("/api", themesRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 