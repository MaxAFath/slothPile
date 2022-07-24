const express = require('express');
const session = require('express-session');
const sequlize = require('./config/connection');
const apiRoutes = require('./routes/index');
const inquirer = require('inquirer');
const connection = require('./db/connection');
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extend: false }));
app.use(express.json());

app.use('/api', apiRoutes);

//default response for any other request (not found)
app.use((req, res) => {
    res.status(404).end();
});

function prompt() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you want to do?',
        name: 'choice',
        choices: [
            "View All Employees",
            "View All Employee's By Role",
            "View All Employees By Department",
            "Add Employee",
            "Update Employee",
            "Add Role",
            "Add Department"
        ]
    }).then(function (answer) {
        switch (answer.choice) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employee's By Role":
                viewAllRoles();
                break;
            case "View All Employees By Department":
                viewAllDepartments();
                break;
            case "Update Employee":
                updateEmployee();
                break;
            case "Add Emplyee":
                addEmployee();
                break;
            case "Add Role",
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    })
}

function viewAllEmployees(){

}