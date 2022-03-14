SELECT department.name AS department, role.department_id
FROM role
LEFT JOIN department
ON role.department_id = department.id
SELECT role.title AS role,  employees.role_id
FROM employees
LEFT JOIN role 
on employees.role_id = role.id
SELECT employees.first_name AS employees, employees.manager_id
FROM employees
LEFT JOIN employees
on employees.manager_id = employees.id