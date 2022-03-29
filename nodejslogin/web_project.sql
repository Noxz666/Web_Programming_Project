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

CREATE TABLE `Product`(
	Product_ID	char(32) NOT NULL,
	Product_name varchar(32) NOT NULL,	
	Rating	decimal(2,1) NOT NULL,	
	Age_Restriction	int,	
	Company_name	varchar(32) NOT NULL ,	
	Product_Price	int	NOT NULL,
	Product_type	varchar(32) NOT NULL,
	Product_spec	varchar(32) NOT NULL
);

INSERT INTO `Product` (`Product_ID`, `Product_name`, `Rating`, `Age_Restriction`, `Company_name`, `Product_Price`, `Product_type`, `Product_Spec`) VALUES
('G112350', 'Succubus', 4.1, 18 ,'MadHouse_studio', 250,'Blood','Console'),
('G205443', 'Total War WarhammerII', 4.7, 18 ,'SEGA', 1200,'Fighting','Console'),
('G330123', 'Heros Hours', 3.9, 12 ,'Indie_Software', 90, 'Fighting','Moblie'),
('G220149', 'Sid Meier s Civilization VI',4.6, 12, '2K_studio',300, 'Turn-base', 'Console'),
('S996535', 'Pixel Game Maker MV', 4.2, 9,  'KADOKAWA', 1200, 'RPG','Console'),
('S456888', 'Boba App', 3.1, 5,  'KADOKAWA', 150, 'RPG','Console');
-- New
-- ('S978565', 'Movavi Video Editor', 3.0, 9,  'Movavi Software', 870, 'RPG','Console'),
-- ('G756565', 'Battlefield 2042', 5.0 , 18,  'DICE', 1599, 'Sadistic','Console'),
-- ('G571268', 'Metro Conflict: The Origin', 3.2 , 18,  'RED DUCK', 1799, 'FPS','Moblie'),
-- ('G883205', 'Sekiro™: Shadows Die Twice', 4.0 , 18,  'FromSoftware', 1790, 'Blood','Moblie'),
-- ('S485234', 'Visual Novel Maker', 1.2 , 6,  'Degica', 699, 'Puzzle','Console');


SELECT * FROM Users;
SELECT * FROM Product;