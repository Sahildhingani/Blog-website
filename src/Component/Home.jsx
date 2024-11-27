import React, { useEffect, useState } from "react";
import AuthService from "../Appwrite/Auth"; // Assuming this is your Appwrite service
import PreviewCard from './previewcaed';
import Env_variables from "../../env_variables/Env_variables";
import { Navigate, useNavigate } from "react-router-dom";
import { ID } from "appwrite";

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
  
  // Fetch the list of documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userdata = await AuthService.ListDocument();
        setDocuments(userdata.documents); // Update the documents state
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // Fetch images for each document
  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const doc of documents) {
        try {
          const file = await AuthService.GetFile(doc.imageId); // Fetch the image using imageId
          images[doc.$id] = file.$id; // Map image to the document's $id
        } catch (error) {
          console.error(`Error fetching image for document ${doc.$id}:`, error);
        }
      }
      setImageMap(images); // Update the imageMap state
    };

    if (documents.length > 0) {
      fetchImages();
    }
  }, [documents]);

  return (
    <div className="h-screen w-screen bg-white">
      {documents.map((doc) => (
        <PreviewCard
        userId={doc.userId}
        content={doc.content}
        imageid={doc.imageId}
        lock={doc.$id}
        key={ID.unique()}
        title={doc.title} // Assuming the title is stored as `title` in the document
        image={`https://cloud.appwrite.io/v1/storage/buckets/${Env_variables.Bucketid}/files/${imageMap[doc.$id]}/view?project=${Env_variables.ProjectId}&project=${Env_variables.ProjectId}&mode=admin`} // Fetch the associated image from the map
        />
      ))}
    </div>
  );
}

export default Home;


