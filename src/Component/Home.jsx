import React, { useEffect, useState } from "react";
import AuthService from "../Appwrite/Auth"; // Assuming this is your Appwrite service
import PreviewCard from "./previewcaed";
import Env_variables from "../../env_variables/Env_variables";
import { useNavigate } from "react-router-dom";

function Home() {
  const [documents, setDocuments] = useState([]);
  const [imageMap, setImageMap] = useState({}); // To store image data for each document
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const active = await AuthService.ActiveSession();
      if (!active) {
        navigate("/login"); // Redirect if there's no active session 
      }
    };

    checkSession();
  }, [navigate]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userdata = await AuthService.ListDocument();
        setDocuments(userdata.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const doc of documents) {
        try {
          const file = await AuthService.GetFile(doc.imageId);
          images[doc.$id] = file.$id;
        } catch (error) {
          console.error(`Error fetching image for document ${doc.$id}:`, error);
        }
      }
      setImageMap(images);
    };

    if (documents.length > 0) {
      fetchImages();
    }
  }, [documents]);
  useEffect(()=>{console.log(imageMap);})

  return (
    <div className="h-screen w-screen bg-white max-md:flex flex-col items-center">
      {documents.map((doc) => (
        <PreviewCard
          userId={doc.userId}
          content={doc.content}
          imageid={doc.$id}
          lock={doc.$id}
          key={doc.$id} // Using a stable unique identifier
          title={doc.title}
          image={`https://cloud.appwrite.io/v1/storage/buckets/${Env_variables.Bucketid}/files/${imageMap[doc.$id]}/view?project=${Env_variables.ProjectId}&mode=admin`}
        />
      ))}
    </div>
  );
}

export default Home;



