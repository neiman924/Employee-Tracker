INSERT INTO department (name)
VALUES ("Application Development"),
       ("IT Managment"),
       ("IT Security"),
       ("User Support and Service");

INSERT INTO role (title, salary, department_id)
VALUES ("System Analyst",'60', 1),
       ("System Engineer",'70', 1),
       ("Application Developer",'80', 1),
       ("Enteprice Architect",'60', 2),
       ("IT Project Manager",'55', 2),
       ("Business Analyst",'50', 2),
       ("Cyber Security",'70', 3),
       ("Information Security",'60', 3),
       ("Technical Support",'50', 4),
       ("IT Support",'40', 4);
       

INSERT INTO employee (first_name,last_name,role_id, manager_id)
VALUES ("Hossein","Amin Neman", 3, 1);
       
