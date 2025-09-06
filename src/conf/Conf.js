const Conf ={
    app_write_url:String(import.meta.env.VITE_APPWRITE_URL),
    app_write_project_id:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    app_write_database_id:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    app_write_collection_id:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    app_write_bucket_id:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default Conf