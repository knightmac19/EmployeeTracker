var inquirer = require("inquirer");
var mysql = require("mysql");
var SQLpassword = require("./mySQLpass");

var userchoices = [
    "View Departments",
    "View Employees",
    "View Roles",
    "Add Departments",
    "Add Employees",
    "Add Roles",
    "Update Employee Roles",
];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: SQLpassword,
    database: "employee_trackerDB"
});

connection.connect(function(err) {

    if(err) {
        console.err("error connecting: " + err.stack);
        return;
    }

    console.log("connected as ID: " + connection.threadId);

    function prompt() {
        inquirer.prompt([
            {
                type:"list",
                name:"choice",
                message:"Choose Action",
                choices: userchoices
            }
        ]).then(function(answers) {
            console.log(answers.choice)
            
            if (answers.choice === "View Departments") {
                connection.query("SELECT * FROM department", function(err, result) {
                    console.table(result);
                    connection.end();
                })
            }
        })

    }
    prompt();











});
