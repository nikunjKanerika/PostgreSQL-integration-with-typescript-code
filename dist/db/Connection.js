"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.client = void 0;
const dotenv = __importStar(require("dotenv"));
const pg_1 = require("pg");
dotenv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;
const HOST = process.env.HOST;
exports.client = new pg_1.Client({
    host: HOST,
    port: Number(PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE
});
const Connection = () => {
    exports.client.connect()
        .then(() => console.log('Database connected successfully'))
        .catch(() => console.log('Error while connection'));
};
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map