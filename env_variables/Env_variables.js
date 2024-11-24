const Env_variables={
    Appwriteurl:String(import.meta.env.VITE_APPWRITEURL),
    ProjectId:String(import.meta.env.VITE_PROJECTID),
    Collectionid:String(import.meta.env.VITE_COLLECTIONID),
    Bucketid:String(import.meta.env.VITE_STORAGE),
    Databaseid:String(import.meta.env.VITE_DATABASEID)
}
export default Env_variables;