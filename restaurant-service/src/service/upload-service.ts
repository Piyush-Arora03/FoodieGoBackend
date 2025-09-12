import { createClient } from "@supabase/supabase-js";
import logger from "../config/logger.config";
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "../config/dotenv.config";
import { AppError } from "../utils/app-error";
import { STATUS_CODE } from "../config/status-code.config";

class UploadService{
    private supabase;

    constructor(){
        this.supabase = createClient(SUPABASE_URL,SUPABASE_SERVICE_KEY);
    }

    async uploadImage(file:Express.Multer.File){
        if(!file){
            throw new AppError('No file provided',STATUS_CODE.BAD_REQUEST);
        }
        try {
            const fileName=`${Date.now()}-${file.originalname}`;
            const bucketName='restaurants';

            logger.info(`Uploading image to Supabase: ${fileName}`);

            const {data,error}=await this.supabase.storage.from(bucketName).upload(fileName,file.buffer,{
                contentType:file.mimetype,
            });

            if(error){
                logger.error(`Error uploading image to Supabase: ${error.message}`);
                throw new AppError('Error uploading image',STATUS_CODE.INTERNAL_SERVER_ERROR);
            }

            const  publicUrl=this.supabase.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl;
            return publicUrl;
        } catch (error:any) {
            logger.error(`Error in uploadImage service: ${error.message}`);
            throw new AppError('Error uploading image',STATUS_CODE.INTERNAL_SERVER_ERROR);
        }
    }
}

export default new UploadService();