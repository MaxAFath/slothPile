INSERT INTO department (dept_name)
VALUES
('management');

INSERT INTO roles (title, salary, dept_id)
VALUES
('manager', 60000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alpha', 'Alpha', 1, 1);