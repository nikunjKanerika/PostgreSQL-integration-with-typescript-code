import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import {Client} from 'pg';

dotenv.config();

// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;

export const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "userprofile"
})

export const Connection = () =>{

    client.connect()
        .then(()=>console.log('Database connected successfully'))
        .catch(()=>console.log('Error while connection'));
}


