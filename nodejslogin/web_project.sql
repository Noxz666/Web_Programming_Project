DROP DATABASE IF EXISTS web_project;
CREATE DATABASE IF NOT EXISTS web_project;
use web_project;

CREATE TABLE `Users` (
	id 			int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username 	varchar(50) NOT NULL,
	password 	varchar(255) NOT NULL,
	email		varchar(100) NOT NULL
);

CREATE TABLE `Admin` (
	id 			int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username 	varchar(50) NOT NULL,
	password 	varchar(255) NOT NULL,
	email		varchar(100) NOT NULL
);

INSERT INTO Users VALUES 
(1, "CBT", "123456", "cbt@gmail.com"),
(2, "ggez", "111111", "ggez@gmail.com"),
(3, "pptiny", "222222", "pptiny@gmail.com");

INSERT INTO Admin VALUES
(1, "admin", "admin", "beluga@gmail.com");


SELECT * FROM Users;