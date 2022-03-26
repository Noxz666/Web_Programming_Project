CREATE DATABASE IF NOT EXISTS nodejs_login;
USE nodejs_login;

CREATE TABLE `users` (
	`id` 		int(10) 	PRIMARY KEY AUTO_INCREMENT,
    `name` 		varchar(50),
    `email` 	varchar(50),
    `password` 	varchar(255)
);

SELECT * FROM users;