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
                
                inquirer.prompt([
                    {
                        type:"input",
                        name:"addDepName",
                        message:"Enter Department Name:"
                    }
                ]).then(function(answers) {
                    connection.query("INSERT INTO department (name) VALUES (?) ", 
                    [
                        answers.addDepName
                    ]
                    ,
                    function(err, result) {
                        if(err) throw err;
                        
                        // console.table(result);
                        console.log(`\n ${result.affectedRows} department updated`);
                        
                        // repeat();
                    })
                }).then(function() {
                    connection.query("SELECT * FROM department", function(err, result) {
                        if (err) throw err;
                        console.log(`\n`);
                        console.table(result);
                        repeat();
                    })
                });
            }

            else if (answers.choice === "Add Employee") {
                inquirer.prompt([
                    {
                        type:"input",
                        name:"empFirst",
                        message:"Enter Employee's First Name:"
                    },
                    {
                        type:"input",
                        name:"empLast",
                        message:"Enter Employee's Last Name:"
                    },
                    {
                        type:"input",
                        name:"empRoleId",
                        message:"Enter Employee's Role ID:"
                    },
                    {
                        type:"input",
                        name:"empManId",
                        message:"Enter Employee's Manager's ID:"
                    }
                ]).then(function(answers) {
                    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?) ", 
                    [
                        answers.empFirst,
                        answers.empLast,
                        answers.empRoleId,
                        answers.empManId
                    ],
                    function(err, result) {
                        if(err) throw err;
                        
                        // console.table(result);
                        console.log(`\n ${result.affectedRows} employee updated`);
                        
                        // repeat();
                    })
                }).then(function() {
                    connection.query("SELECT * FROM employee", function(err, result) {
                        if (err) throw err;
                        console.log(`\n`);
                        console.table(result);
                        repeat();
                    })
                });
            }

            else if (answers.choice === "Add Role") {
                inquirer.prompt([
                    {
                        type:"input",
                        name:"title",
                        message:"Enter Role Title:"
                    },
                    {
                        type:"input",
                        name:"salary",
                        message:"Enter the salary for this role:"
                    },
                    {
                        type:"input",
                        name:"departmentId",
                        message:"Enter this role's department id:"
                    }
                ]).then(function(answers) {
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?) ", 
                    [
                        answers.title,
                        answers.salary,
                        answers.departmentId
                    ],
                    function(err, result) {
                        if(err) throw err;
                        
                        // console.table(result);
                        console.log(`\n ${result.affectedRows} role updated`);
                        
                        // repeat();
                    })
                }).then(function() {
                    connection.query("SELECT * FROM role", function(err, result) {
                        if (err) throw err;
                        console.log(`\n`);
                        console.table(result);
                        repeat();
                    })
                });
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
                    type:"list",
                    name:"choice",
                    message:"Choose Action",
                    choices: ["Return to Main Menu", "Exit"]
                }
            ])
            .then(function(answers) {

            if (answers.choice === "Return to Main Menu") {
                prompt()
            } 
            else {
                connection.end()
            }

        }); 
    }



});
