var inquirer = require("inquirer");
var mysql = require("mysql");
var SQLpassword = require("./mySQLpass");

var userchoices = [
    "View Departments",
    "View Employees",
    "View Roles",
    "Add Department",
    "Add Employee",
    "Add Role",
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
                    if (err) throw err;
                    console.log(`\n`);
                    console.table(result);
                    repeat();        
                })
            }

            else if (answers.choice === "View Employees") {
                connection.query("SELECT * FROM employee", function(err, result) {
                    if (err) throw err;
                    console.log(`\n`);
                    console.table(result);
                    repeat();
                })
            }

            else if (answers.choice === "View Roles") {
                connection.query("SELECT * FROM role", function(err, result) {
                    if (err) throw err;
                    console.log(`\n`);
                    console.table(result);
                    repeat();
                })
            }

            else if (answers.choice === "Add Department") {
                // let depName = answers.addDepName;
                
                
            }

            else if (answers.choice === "Add Employee") {
                
            }

            else if (answers.choice === "Add Role") {
                
            }

            // this one for updating employee roles
            else {

            }
        })

    }
    prompt();

    function repeat() {
        console.log(`\n\n`);
        inquirer
            .prompt([
            {
                type: "confirm",
                name: "repeat",
                message: "Would you like to view or amend data?",
            }
            ])
            .then(function(answers) {

            if (answers.repeat === true) {
                prompt()
            } 
            else {
                connection.end()
            }

        }); 
    }



});
