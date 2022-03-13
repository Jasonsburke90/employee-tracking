const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const PORT = process.env.PORT || 3001;

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
      name: "openingList",
      choices: [
        { name: "view all departments", value: "VIEWDEPTS" },
        { name: "view all roles", value: "VIEWROLES" },
        { name: "view all employees", value: "VIEWEMPLOYEES" },
        { name: "add a department", value: "ADDDEPT" },
        { name: "add a role", value: "ADDROLE" },
        { name: "add an employee", value: "ADDEMPLOYEE" },
        { name: "update an employee role", value: "UPDATEEMPLOYEE" },
      ],
      message: "What action would you like to perform?",
    })
    .then((answers) => {
      console.log(answers);
      viewEmployees();
    });
}

// View employees
function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
  });
}
// View roles
function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
}
// View departments
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}
// Add Employee

// Add role

// Add department

// Update employee

// initialize app
function init() {
  openingPrompt();
}
// call init
init();
