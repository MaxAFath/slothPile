const express = require('express');
const session = require('express-session');
const sequlize = require('./config/connection');
const apiRoutes = require('./routes/index');
const inquirer = require('inquirer');
const connection = require('./db/connection');
const mysql = require('mysql2');
const { INTEGER } = require('sequelize');

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
            "Update Employee Role",
            "Add Role",
            "Add Department"
        ]
    }).then(function (answer) {
        switch (answer.choice) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "Add Emplyee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    })
}

function viewAllEmployees(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", (err, res) =>{
        if(err) throw err;
        console.log('----------------------------');
        console.table(res);
        prompt();
    });
}

function viewAllRoles(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", (err, res) =>{
        if(err) throw err;
        console.log('----------------------------');
        console.table(res);
        prompt();
    })
}

function viewAllDepartments(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", (err, res) =>{
        if(err) throw err;
        console.log('----------------------------');
        console.table(res);
        prompt();
    })
}

function updateEmployee(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", (err, res) =>{
        if(err) throw err;
        console.log('----------------------------');
        console.table(res);
        console.log('----------------------------');
        inquirer.prompt({
            type: INTEGER,
            name: 'id',
            message: 'Enter the id of the employee you wnat to change roles.'
        }).then(function(answer){
            let employee = answer.id;
            
            connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", (err, res) =>{
                if(err) throw err;
                console.log('----------------------------');
                console.table(res);
                connection.query
            })

            inquirer.prompt({
                type: INTEGER,
                name: 'role',
                message: 'Enter the id of the role you wish to assing to this employee'
            }).then(function(answer){
                connection.query('UPDATE employee SET WHERE', {id: employee}, {role_id: answer.role},function(err){
                    if(err) throw err;
                    console.log('----------------------------');
                    prompt();
                })                
            })
        })
    })
}

function addDepartment(){
    inquirer.prompt(
        {
            type: String,
            name: 'name',
            message:'What department would you like to add?'
        }
    ).then(function(answer){
        connection.query("INSERT INTO department SET ?",
        {
            name: answer.name
        }, function(err){
            if(err) throw err;
            console.table(res);
            prompt();
        })
    })
}

function addEmployee(){
    inquirer.prompt(
        {
            type:String,
            name: 'first',
            message:'Enter the first name of new employee'
        },{
            type: String,
            name: 'last',
            message: 'entert the last name of new employee'
        },{
            type: INTEGER,
            name: 'role',
            message: 'Enter the id of the role you are assigning to new employee'
        },{
            type: INTEGER,
            name: 'manager',
            message:'Enter the id of the manager assigned this employee'
        }
    ).then(function(answer){
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.role,
            manager_id: answer.manager
        }, function(err){
            if(err) throw err;
            console.log('----------------------------');
            prompt();
        } )
    })
}

function addRole(){
    inquirer.prompt(
        {
            type: String,
            name: 'role',
            message: 'Enter the new role'
        },{
            type: INTEGER,
            name:'salary',
            message: 'Enter salay, without any commas or decimals'
        },{
            type:INTEGER,
            name: 'department',
            message: 'Enter the id of the department that this role belongs to'
        }
    ).then(function(answer){
        connection.query("INSERT INTO role SET ?", 
        {
            title: answer.role,
            salary: answer.salary,
            dept_id: answer.department
        }, function(err){
            if(err) throw err;
            console.log('----------------------------');
            prompt();
        })
    })
}