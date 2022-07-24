INSERT INTO department (dept_name)
VALUES
('management');

INSERT INTO roles (title, salary, dept_id)
VALUES
('manager', .1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id, department)
VALUES
('Alpha', 'Alpha', 3, 'Alpha', 'mangement');