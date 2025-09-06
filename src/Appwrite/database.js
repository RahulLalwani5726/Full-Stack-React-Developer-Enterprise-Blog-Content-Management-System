import confi from '../conf/Conf'
import { Client, Databases, Query } from "appwrite";


class DatabaseService {
    clint = new Client;
    database;

    constructor() {
        this.clint.setEndpoint(confi.app_write_url)
            .setProject(confi.app_write_project_id);
        this.database = new Databases(this.clint);
    }

    async createPost({ title, slug, content, featuredimage, status, userid }) {
        try {
            return await this.database.createDocument(
                confi.app_write_database_id,
                confi.app_write_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("Appwrite :: CreatePost :: error ", error);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.database.updateDocument(
                confi.app_write_database_id,
                confi.app_write_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: UpdatePost :: error ", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                confi.app_write_database_id,
                confi.app_write_collection_id,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: DeletePost :: error ", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.database.getDocument(
                confi.app_write_database_id,
                confi.app_write_collection_id,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: getPost :: error ", error);
            return false;
        }
    }
    // Query to get Action Post
    async getPosts() {
        try {
            return await this.database.listDocuments(
                confi.app_write_database_id,
                confi.app_write_collection_id,
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error ", error);
            return false;
        }
    }
}

export default new DatabaseService();