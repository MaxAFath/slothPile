INSERT INTO department (dept_name)
VALUES
('manufacturing'),
('sales'),
('management');

INSERT INTO roles (title, salary, dept_id)
VALUES
('lead', .2, 3),
('laborer', .3, 1),
('sales', .2, 2)
('manager', .1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alpha', 'Alpha', 3, 1),
('beta', 'beta', 3, 1),
('charlie', 'charlie', 1, 1),
('delta', 'delta', 2, 3 ),
('echo', 'echo', 2, 3);