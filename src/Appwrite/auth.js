import confi from '../conf/Conf'
import { Client, Account, ID } from "appwrite";


class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(confi.app_write_url)
        .setProject(confi.app_write_project_id);

        this.account = new Account(this.client);
    }

    async sing_Up({email , password , name}){
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name);
            if(userAccount){
                return this.login({email , password});
            }else return userAccount
        } catch (error) {
            console.log("Appwrite :: Sing Up :: Error"+error);
        }
    }
    
    async login({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password);
        } catch (error) {
            console.log("Appwrite :: Login :: Error"+error);
        }
        return null;
    }
    async getUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite :: getCurrentSection :: Error"+error);
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSession('current');
        }catch(error){
            console.log("Appwrite :: Logout :: Error"+error);
        }
    }
}

export default new AuthService();