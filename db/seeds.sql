USE employees_db;

INSERT INTO department (id,name) VALUES (1, "Service"), (2, "Sales"), (3, "Finance and Insurance");

INSERT INTO role (id, title, salary, department_id) VALUES (1, "Service Manager", 70000, 1), (2, "Service Advisor", 60000, 1), (3, "Sales Consultant", 60000, 2), (4, "General Sales Manager", 90000, 2), (5, "F and I Advisor", 100000, 3), (6, "F and I Manager", 120000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "Kenny", "Powers", 1, NULL), (2, "Stevie", "Janowski", 2, 1), (3, "Ashley", "Schaeffer", 4, NULL), (4, "Reg", "Mackworthy", 3, 3), (5, "Shane", "Gerald", 3, 3), (5, "Clegg", "Smith", 3, 3), (6, "Terrence", "Cutler", 3, 3), (7, "Jed", "Forney", 5, 6), (8, "Gabriel", "Schaeffer", 6, NULL);