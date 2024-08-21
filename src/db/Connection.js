"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var pg_1 = require("pg");
dotenv.config();
var DB_USERNAME = process.env.DB_USERNAME;
var DB_PASSWORD = process.env.DB_PASSWORD;
var client = new pg_1.Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "userprofile"
});
client.connect()
    .then(function () { return console.log('Database connected successfully'); })
    .catch(function () { return console.log('Error while connection'); });
