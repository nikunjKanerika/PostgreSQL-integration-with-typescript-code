"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.saveUserLinks = exports.saveUser = exports.getUsers = void 0;
const cloudinary_config_js_1 = __importDefault(require("../utils/cloudinary-config.js"));
const Connection_js_1 = require("../db/Connection.js");
//Retrieving users 
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Connection_js_1.client.query('select * from users');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error in finding the user' });
    }
});
exports.getUsers = getUsers;
//Saving user in database
const saveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'send the valid data' });
        }
        let profileUrl = '';
        if (req.file && req.file.path) {
            const uploadResult = yield (0, cloudinary_config_js_1.default)(req.file.path);
            if (uploadResult && uploadResult.secure_url) {
                profileUrl = uploadResult.secure_url;
            }
            else {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }
        }
        const result = yield Connection_js_1.client.query('INSERT INTO users(first_name,last_name,email,profile_url) values($1,$2,$3,$4)', [firstName, lastName, email, profileUrl]);
        res.status(201).json({ message: 'user created succesfully', user: result.rows });
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to save user', errorMsg: error.message });
    }
});
exports.saveUser = saveUser;
//Saving each user links
const saveUserLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, userLinks } = req.body;
    try {
        // Find the user by firstName and update their links\
        console.log(firstName);
        const result1 = yield Connection_js_1.client.query('select id from users where first_name=$1', [firstName]);
        // console.log(res.rows[0].id);
        console.log(userLinks);
        userLinks.map((link) => __awaiter(void 0, void 0, void 0, function* () {
            const platform = link.platform;
            const url = link.url;
            const user_id = result1.rows[0].id;
            yield Connection_js_1.client.query('insert into userlinks(platform,url,user_id) values($1,$2,$3)', [platform, url, user_id]);
        }));
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to update user links', error });
    }
});
exports.saveUserLinks = saveUserLinks;
//Retrieving user by first name
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName } = req.params;
    try {
        const result = yield Connection_js_1.client.query('SELECT * FROM USERS WHERE first_name=$1', [firstName]);
        if (result.rowCount)
            res.json(result.rows);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve user links', error });
    }
});
exports.getUser = getUser;
//# sourceMappingURL=user-controller.js.map