import  multer from "multer";
import * as path from 'path';


//Handling file
const storage = multer.diskStorage({
    
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage }) 