const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to employee database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "admin",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// inquirer prompts
function openingPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "Opening Question",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update a role",
      ],
      message: "What action would you like to perform?",
    })
    .then((answer) => {
      console.log(answer);
    });
}

// initialize app
function init() {
  openingPrompt();
}
// call init
init();
