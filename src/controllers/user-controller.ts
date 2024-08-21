import { Request, Response } from "express";
import uploadOnCloudinary from "../utils/cloudinary-config.js";
import {client} from '../db/Connection.js'

//Retrieving users 
export const getUsers = async (req:Request,res:Response) => {

    try{
        const result = await client.query('select * from users');
        res.status(200).json(result.rows);
    }catch(error){
        res.status(500).json({message: 'Error in finding the user'});
    }
}


//Saving user in database
export const saveUser = async (req:Request | any,res:Response | any) =>{

    
    try{
        const {firstName, lastName, email } = req.body;
         if(!firstName || !lastName || !email){
            return res.status(400).json({message: 'send the valid data'})
         }
        
        let profileUrl = '';
        
        if (req.file && req.file.path) {
            const uploadResult = await uploadOnCloudinary(req.file.path);

            if (uploadResult && uploadResult.secure_url) {
                profileUrl = uploadResult.secure_url;
            } else {
                return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
            }
        }

        
        const result  = await client.query('INSERT INTO users(first_name,last_name,email,profile_url) values($1,$2,$3,$4)',[firstName,lastName,email,profileUrl])

        res.status(201).json({message: 'user created succesfully',user:result.rows});
    }catch(error: any){
        return res.status(500).json({message: 'Failed to save user', errorMsg:error.message}) 
    }
}


//Saving each user links
export const saveUserLinks = async(req:Request,res:Response) =>{

    const {firstName, userLinks} = req.body;
 
    try {
        // Find the user by firstName and update their links\
        console.log(firstName);
        const result1 = await client.query('select id from users where first_name=$1',[firstName]);

        // console.log(res.rows[0].id);
        console.log(userLinks);
        userLinks.map(async(link:any)=>{
            const platform = link.platform;
            const url = link.url;
            const user_id = result1.rows[0].id;
            await client.query('insert into userlinks(platform,url,user_id) values($1,$2,$3)',[platform,url,user_id]);
        });
    
        
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update user links', error });
    }
}


//Retrieving user by first name
export const getUser = async (req:Request,res:Response) => {
    const { firstName } = req.params;
    try {
        const result = await client.query('SELECT * FROM USERS WHERE first_name=$1',[firstName]);

        if(result.rowCount) res.json(result.rows);
    } catch (error) {

        return res.status(500).json({ message: 'Failed to retrieve user links', error });
    }
};

