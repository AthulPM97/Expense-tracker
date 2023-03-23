const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./server/util/database");
const cors = require('cors');

const app = express();

const userRoutes = require('./server/routes/user');

//middlewares
app.use(cors());

app.use(bodyParser.json());

app.use("/", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => console.log("server running"));
  })
  .catch((err) => console.log(err));
