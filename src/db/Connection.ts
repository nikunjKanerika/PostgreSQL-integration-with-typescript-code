import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import {Client} from 'pg';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT
const HOST = process.env.HOST

export const client = new Client({
    host: HOST,
    port: Number(PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE
})

export const Connection = () =>{

    client.connect()
        .then(()=>console.log('Database connected successfully'))
        .catch(()=>console.log('Error while connection'));
}


