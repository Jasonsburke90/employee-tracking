const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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

// main inquirer prompt to determine what action to take
function mainPrompt() {
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
        { name: "quit", value: "QUIT" },
      ],
      message: "What action would you like to perform?",
    })
    .then((answers) => {
      if (answers.openingList === "VIEWEMPLOYEES") viewEmployees();
      else if (answers.openingList === "VIEWROLES") viewRoles();
      else if (answers.openingList === "VIEWDEPTS") viewDepartments();
      else if (answers.openingList === "ADDDEPT") addDepartment();
      else if (answers.openingList === "ADDROLE") addRole();
      else if (answers.openingList === "ADDEMPLOYEE") addEmployee();
      else if (answers.openingList === "UPDATEEMPLOYEE") updateEmployee();
      else if (answers.openingList === "QUIT") console.log("exiting program");
      return;
    });
}

// View employees function
function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    mainPrompt();
  });
}
// View roles function
function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    mainPrompt();
  });
}
// View departments function
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    mainPrompt();
  });
}
// Add Employee function
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the new employee's last name?",
      },
    ])
    .then((answers) => {
      db.query("SELECT * FROM role", function (err, results) {
        const role = results.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the new employee's role?",
            choices: role,
          })
          .then((role) => {
            db.query(
              "SELECT * FROM employees where manager_id IS NULL OR manager_id = '1'",
              function (err, results) {
                const manager = results.map(
                  ({ id, first_name, last_name }) => ({
                    name: first_name + " " + last_name,
                    value: id,
                  })
                );
                inquirer
                  .prompt({
                    type: "list",
                    name: "id",
                    message: "What is the new employee's manager's name?",
                    choices: manager,
                  })
                  .then((manager) => {
                    db.query(
                      "INSERT INTO employees(first_name, last_name, role_id, manager_id) values(?,?,?,?)",
                      [answers.firstName, answers.lastName, role.id, manager.id]
                    );
                    console.log("EMPLOYEE ADDED");
                    mainPrompt();
                  });
              }
            );
          });
      });
    });
}
// Add role function
function addRole() {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the new role's title?",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the new role's salary?",
      },
    ])
    .then((answers) => {
      db.query("SELECT * FROM department", function (err, results) {
        const department = results.map(({ id, name }) => ({
          name: name,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "id",
            message: "What is the new role's department?",
            choices: department,
          })
          .then((department) => {
            db.query(
              "INSERT INTO role(title, salary, department_id) values(?,?,?)",
              [answers.roleTitle, answers.roleSalary, department.id]
            );
            console.log("ROLE ADDED");
            mainPrompt();
          });
      });
    });
}
// Add department function
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the new Department's name?",
      },
    ])
    .then((answers) => {
      db.query("INSERT INTO department(name) values(?)", [
        answers.departmentName,
      ]);
      console.log("DEPARTMENT ADDED");
      mainPrompt();
    });
}
// Update employee function
function updateEmployee() {
  db.query("SELECT * FROM employees", function (err, results) {
    const employee = results.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));
    inquirer
      .prompt({
        type: "list",
        name: "id",
        message: "Which employee do you wish to update?",
        choices: employee,
      })
      .then((answers) => {
        db.query("SELECT * FROM role", function (err, results) {
          const role = results.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt({
              type: "list",
              name: "id",
              message: "What should the employee's role be updated to?",
              choices: role,
            })
            .then((role) => {
              db.query("UPDATE employees SET role_id = ? WHERE id = ?", [
                role.id,
                answers.id,
              ]);
              console.log("EMPLOYEE UPDATED");
              mainPrompt();
            });
        });
      });
  });
}
// initialize app
function init() {
  mainPrompt();
}
// call init
init();
