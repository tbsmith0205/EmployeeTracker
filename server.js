const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();
const util = require("util");
const cTable = require("console.table");

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
      switch (answer.mainMenu) {
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

const addDepartment = () => {
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "What department are you adding?",
    })
    .then((answer) => {
      const query = "INSERT INTO department SET ? ";

      connection.query(query, answer.departmentName, (err, res) => {
        if (err) throw err;
        console.log(answer.departmentName + "department has been created.");
      });
    });
};

const addRole = () => {
  const query = "SELECT role.title AS Title, role.salary AS Salary FROM role";
  connection.query(query, (err, res) => {
    inquirer
      .prompt(
        {
          name: "newRole",
          type: "input",
          message: "What is the name of this new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        }
      )
      .then((answer) => {
        const query = "INSERT INTO role SET ? ";
        connection.query(query, {
            title: answer.newRole,
            salary: answer.salary,
        }
        .then((err) => {
            if (err) throw err;
            console.table(answer);
            menu();
        })
      });
  });
};

const addEmployee = () => {};

const viewDepartments = () => {
  const query =
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id";
  connection.promise().query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    menu();
  });
};

const viewRoles = () => {
  const query =
    "SELECT department.id AS id, department.department_name AS department FROM department";
  connection.promise().query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    menu();
  });
};

const viewEmployees = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDERBY employee.id ASC";

  connection.promise().query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    menu();
  });
};

const updateEmployee = () => {};

// I want to know what type of action the user wants to do

// THEN I want to know what the name of the employee

// I want to be able to add departments, roles, employees

// I want to be able to view departments, roles, employees

// I want to be able to update employee roles

// Use inquirer list with choices as the mapped roles
