DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL(15) NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);



CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)

);

INSERT INTO department (name)
VALUES ("CEO"),
("Corporate Development"),
("Worldwide Consumer"),
("Finance"),
("Human Resources"),
("Global Corporate Affairs"),
("Digital Management"),
("General Counsel"),
("Web Services");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 1681840, 1),
("Senior Vice President", 10000000, 2),
("Senior Vice President", 19000000, 3),
("Senior Vice President", 6900000, 4),
("Senior Vice President", 5000000, 5),
("Senior Vice President", 12000000, 6),
("Senior Vice President", 8000000, 7),
("Senior Vice President", 7000000, 8),
("Senior Vice President", 11000000, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeff", "Bezos", 1, null),
("Jeff", "Blackburn", 2, 1),
("Jeff", "Wilke", 3, 1),
("Brian", "Olsavsky", 4, 1),
("Beth", "Galetti", 5, 1),
("Jay", "Carney", 6, 1),
("Dave", "Limp", 7, 1),
("David", "Zapolsky", 8, 1),
("Andy", "Jassy", 9, 1);

-- SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id;

