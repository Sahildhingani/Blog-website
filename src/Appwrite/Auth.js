import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import Env_variables from "../../env_variables/Env_variables";

class Auth {
  constructor() {
    this.client = new Client()
      .setEndpoint(Env_variables.Appwriteurl)
      .setProject(Env_variables.ProjectId);

    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Sign Up
  async SignUp({ email, password }) {
    try {
      const user = await this.account.create(ID.unique(), email, password);
      return { success: true, data: user };
    } catch (error) {
      console.error("Error during sign-up:", error);
      return { success: false, message: error.message || "Sign-up failed" };
    }
  }

  // Login
  async Login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      localStorage.setItem("userid", session.$id);
      return { success: true, data: session };
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: error.message || "Login failed" };
    }
  }

  // Logout
  async LogOut() {
    try {
      await this.account.deleteSession("current");
      console.log("Session deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, message: error.message || "Logout failed" };
    }
  }

  // Get Active Session
  async ActiveSession() {
    try {
      const session = await this.account.getSession("current");
      return { success: true, data: session };
    } catch (error) {
      console.error("Error getting active session:", error);
      return { success: false, message: error.message || "No active session" };
    }
  }

  // Create Database Document
  async CreateDatabase({userId,title,slug,content,imageId}) {
    try {
      const document = await this.database.createDocument(
        Env_variables.Databaseid,
        Env_variables.Collectionid,
        ID.unique(),
        { userId,
          title,
          slug,
          content,
          imageId}
      );
      console.log("Document created successfully:", document);
      return { success: true, data: document };
    } catch (error) {
      console.error("Error creating document:", error);
      return { success: false, message: error.message || "Database error" };
    }
  }

  // Get Data from Database
  async GetData() {
    try {
      const documents = await this.database.listDocuments(
        Env_variables.Databaseid,
        Env_variables.Collectionid
      );
      console.log("Documents retrieved successfully:", documents);
      return { success: true, data: documents };
    } catch (error) {
      console.error("Error retrieving data:", error);
      return { success: false, message: error.message || "Data retrieval error" };
    }
  }

  // Create Storage (File Upload)
  async CreateStorage(file) {
    try {
      if (!file) throw new Error("No file provided");
      const uploadedFile = await this.storage.createFile(
        Env_variables.Bucketid,
        ID.unique(),
        file
      );
      console.log("File uploaded successfully:", uploadedFile);
      localStorage.setItem('imageid',uploadedFile.$id)
      return { success: true, data: uploadedFile };
    } catch (error) {
      console.error("Error uploading file:", error);
      return { success: false, message: error.message || "File upload error" };
    }
  }

  // document list
  async ListDocument(){
    try {
     const user= await this.database.listDocuments(
        Env_variables.Databaseid,
        Env_variables.Collectionid
      );
      if(user){
        return user;
      }
    } catch (error) {
      console.log('get document error',error);
    }
  }
  async GetFile(fileid){
    try {
      const user=await this.storage.getFile(
        Env_variables.Bucketid,
        fileid
      )
      if(user){
        console.log(user);
        return user;
      }
    } catch (error) {
      console.log('get file error',error);
    }
  }
  async UserDocument(id) {
    try {
      const user = await this.database.listDocuments(
        Env_variables.Databaseid,
        Env_variables.Collectionid,
        [Query.equal("userId", id)] // Correctly closed the array
      );
      if (user) {
        return user; // Return the fetched documents
      }
    } catch (error) {
      console.log('get document error', error);
    }
  }
  async Deletedata(id){
    try {
      const response=this.database.deleteDocument(
        Env_variables.Databaseid,
        Env_variables.Collectionid,
        id
      )
      if(response){
        console.log('delete successful',response);
        return response;
      }
    } catch (error) {
      console.log('delete data erroe',error);
    }
  }
}  

// Export the instance
const AuthService = new Auth();
export default AuthService;


