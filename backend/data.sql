CREATE DATABASE expenses;

CREATE TABLE transactions(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    note VARCHAR(50),
    amount INTEGER
);

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);