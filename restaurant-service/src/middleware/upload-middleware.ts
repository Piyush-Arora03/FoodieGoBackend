import multer from "multer";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";
import { RequestHandler } from "express";

const storage=multer.memoryStorage();

const fileFilter=(req:any,file:any,cb:any)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true);
    }else{
        throw new AppError('Invalid file type , only images are allowed',STATUS_CODE.BAD_REQUEST);
    }
};

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:1024*1024*5}
});

const uploadSingleImage:RequestHandler =upload.single('image');

export default uploadSingleImage;