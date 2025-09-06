import confi from '../conf/Conf'
import { Client, Storage, ID } from "appwrite";


class StorageService {
    clint = new Client();
    storage;

    constructor() {
        this.clint.setEndpoint(confi.app_write_url)
            .setProject(confi.app_write_project_id);
        this.storage = new Storage(this.clint);
    }

    async uploadFile(imgFile) {
        try {
            return await this.storage.createFile(
                confi.app_write_bucket_id,
                ID.unique(),
                imgFile
            )
        } catch (error) {
             console.log("Appwrite :: uploadFile :: error " , error);
             return false;
        }
    }

    async deleteFile(FileId){
        try {
            await this.storage.deleteFile(
                confi.app_write_bucket_id,
                FileId
            )
            return true;
        } catch (error) {
             console.log("Appwrite :: uploadFile :: error " , error);
             return false;  
        }
    }

    async previewFile(FileId){
        try {
            return await this.storage.getFilePreview(
                confi.app_write_bucket_id,
                FileId
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error " , error);
            return false;
        }
    }
}
export default new StorageService();