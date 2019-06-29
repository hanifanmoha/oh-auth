DROP TABLE IF EXISTS users;

CREATE TYPE GENDER AS ENUM ('male', 'female');
DROP TYPE IF EXISTS gender;

CREATE TABLE users (
	email VARCHAR (50) UNIQUE PRIMARY KEY,
	first_name VARCHAR (50),
	last_name VARCHAR (50) UNIQUE,
	phone VARCHAR (20),
	date_of_birth DATE,
	gender GENDER
);

INSERT INTO users VALUES (
	'hanifanmohamad@gmail.com',
	'Hanifan',
	'Mohamad',
	'085720014231',
	'1994-06-01',
	'male'
);

SELECT * FROM users;
