const mysql = require("mysql");
const inquirer = require("inquirer");
const router = require("express").Router();

const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
