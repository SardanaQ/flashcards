const express = require('express');
const serverConfig = require('./configs/serverConfig');

const app = express();
serverConfig(app);

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});