const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();
const util = require("util");

// connection object with my configuration
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  password: process.env.DB_PASS,
  database: "employees_db",
});

// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  menu();
});

const menu = () => {
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "Main Menu",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
      ],
    })
    .then((answer) => {
      switch (answer.answer) {
        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View departments":
          viewDepartments();
          break;

        case "View roles":
          viewRoles();
          break;

        case "View employees":
          viewEmployees();
          break;

        case "Update employee roles":
          updateEmployee();
          break;
      }
    });
};

// I want to know what type of action the user wants to do

// THEN I want to know what the name of the employee

// I want to be able to add departments, roles, employees

// I want to be able to view departments, roles, employees

// I want to be able to update employee roles

// Use inquirer list with choices as the mapped roles
