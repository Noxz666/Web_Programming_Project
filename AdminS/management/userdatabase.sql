DROP DATABASE IF EXISTS `userdatabase.sql`;
CREATE DATABASE IF NOT EXISTS `userdatabase.sql`;
USE `userdatabase.sql`;

CREATE TABLE user_data(
	Username		varchar(15)		PRIMARY KEY,
    ID 				varchar(8),
    GameName 		varchar(20),
    Email 			varchar(40)
);

INSERT INTO user_data
VALUES	('Allah', '00000001', 'AllahAlpha', 'AllahProphecy@Universe.42'),
		('Buddha', '00000002', 'BuddhaBeta', 'BuddhaPeace@Universe.42'),
        ('Christ', '00000003', 'ChristCharlie', 'ChristRedeemer@Universe.42'),
        ('Demon', '00000666', 'DemonDelta', 'DemonHell@Universe.42');
        
SELECT * 
FROM user_data;