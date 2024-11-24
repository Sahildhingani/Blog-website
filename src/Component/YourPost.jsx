import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Appwrite/Auth";
import PreviewCard from "./previewcaed";
import Env_variables from "../../env_variables/Env_variables";
function SelfPost() {
  const [documents, setDocuments] = useState([]);
  const [imageMap, setImageMap] = useState({}); // To store image data for each document
  const navigate = useNavigate();

  // Fetch the list of documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userdata = await AuthService.UserDocument(localStorage.getItem("userid"));
        setDocuments(userdata.documents); // Update the documents state
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // Fetch images for each document
  useEffect(() => {
    console.log(documents);
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

  const onClickHandler = () => {
    navigate("/createpost");
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Section for Self Posts */}
      <div className=" bg-white border-2 ">
      {documents.map((doc) => (
        <PreviewCard
          key={doc.$id}
          title={doc.title} // Assuming the title is stored as `title` in the document
          image={`https://cloud.appwrite.io/v1/storage/buckets/${Env_variables.Bucketid}/files/${imageMap[doc.$id]}/view?project=${Env_variables.ProjectId}&project=${Env_variables.ProjectId}&mode=admin`} // Fetch the associated image from the map
        />
      ))}
    </div>

      {/* Create New Post Card */}
      <div className="m-2 w-80 h-80 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
        <button
          onClick={onClickHandler}
          className="flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300"
        >
          <img
            className="h-32 w-32 mb-4"
            src="https://cdn-icons-png.flaticon.com/512/2040/2040520.png"
            alt="Create Post"
          />
          <span className="text-lg font-semibold text-gray-700">Create New Post</span>
        </button>
      </div>
    </div>
  );
}

export default SelfPost;
