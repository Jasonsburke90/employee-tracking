INSERT INTO department (name)
VALUES ("HR"),
("Marketing"),
("Coding"),


INSERT INTO role (title, salary, department_ID)
VALUES ("CEO", 300000, 1),
("Human Resources Manager", 150000, 1),
("Human Resources Employee", 80000, 1),
("Marketing Manager", 150000, 2),
("Marketing Employee", 60000, 2),
("Marketing Intern", 24000, 2),
("Senior Software Engineer", 150000, 3),
("Junior Developer", 65000, 3),
("Software Development Manager", 150000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Big", "Boss", 1, `null`),
("Ron", "Swanson", 2, 1),
("Jim", "Lahey", 4, 1),
("Zapp", "Brannigan", 9, 1),
("April", "Ludgate", 3, 2),
("Ben", "Wyatt", 3, 2),
("Professor", "Farnsworth", 7, 4),
("Philip", "Fry", 8, 4),
("Randy", "Bobandy", 5, 3),
("Julian", "Swayze", 6, 3);
