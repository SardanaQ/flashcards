const express = require('express');
const serverConfig = require('./configs/serverConfig');
const themesRoutes = require("./routes/themesRoutes")
const app = express();
serverConfig(app);

app.use("/api", themesRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 