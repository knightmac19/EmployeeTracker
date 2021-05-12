var inquirer = require("inquirer");
var mysql = require("mysql");
var SQLpassword = require("./mySQLpass");


process.setMaxListeners(20);

var userchoices = [
    "View Departments",
    "View Employees",
    "View Roles",
    "View Employees by Role",
    "Add Department",
    "Add Employee",
    "Add Role",
    "Update Employee Roles",
    "Delete Department",
    "Delete Employee",
    "Delete Role"
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
});

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
            });
        }

        else if (answers.choice === "View Roles") {
            connection.query("SELECT * FROM role", function(err, result) {
                if (err) throw err;
                console.log(`\n`);
                console.table(result);
                repeat();
            })
        }

        else if (answers.choice === "View Employees by Role") {
            connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id", function(err, result) {
                if (err) throw err;
                console.log(`\n`);
                console.table(result);
                repeat();
            });
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

        else if (answers.choice === "Delete Department") {
            inquirer.prompt([
                {
                    type:"input",
                    name:"depName",
                    message:"Enter Department Name:"
                }
            ]).then(function(answers) {
                connection.query("DELETE FROM department WHERE name = ?", 
                [
                    answers.depName
                ]
                ,
                function(err, result) {
                    if(err) throw err;
                    
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

        else if (answers.choice === "Delete Employee") {
            inquirer.prompt([
                {
                    type:"input",
                    name:"empLast",
                    message:"Enter Employee Last Name:"
                }
            ]).then(function(answers) {
                connection.query("DELETE FROM employee WHERE last_name = ?", 
                [
                    answers.empLast
                ]
                ,
                function(err, result) {
                    if(err) throw err;
                    
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

        else if (answers.choice === "Delete Role") {
            inquirer.prompt([
                {
                    type:"input",
                    name:"title",
                    message:"Enter Role Title:"
                }
            ]).then(function(answers) {
                connection.query("DELETE FROM role WHERE title = ?", 
                [
                    answers.title
                ]
                ,
                function(err, result) {
                    if(err) throw err;
                    
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
            inquirer.prompt([
                {
                    type:"input",
                    name:"empId",
                    message:"Enter Employee ID:"
                },
                {
                    type:"input",
                    name:"empRole",
                    message:"Enter new role id:"
                }
            ]).then(function(answers) {
                connection.query("UPDATE employee SET role_id = ? WHERE id = ? ", 
                [
                    parseInt(answers.empRole),
                    parseInt(answers.empId)
                    
                ],
                function(err, result) {
                    if(err) throw err;
                })

            }).then(function() {
                connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id", function(err, result) {
                    if (err) throw err;
                    console.log(`\n`);
                    console.table(result);
                    repeat();
                })
            });
        }
    })

}


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

prompt();