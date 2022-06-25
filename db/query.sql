SELECT role.id,role.title,role.salary,department.name as Department 
FROM role
JOIN department ON role.department_id = department.id;


SELECT employee.id,employee.first_name,employee.last_name,manager_id,role.title,role.salary,department.name,manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;


UPDATE employee
SET 
    role_id = 1
WHERE
    id = 4;


INSERT INTO role (department_id,title,salary) VALUES ("32","a","3");