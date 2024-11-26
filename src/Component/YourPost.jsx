import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Appwrite/Auth";
import PreviewCard from './previewcaed';
import Env_variables from "../../env_variables/Env_variables";
import { ID } from "appwrite";

function SelfPost() {
  const [documents, setDocuments] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [content, setContent] = useState({});
  const navigate = useNavigate();

  // Fetch the list of documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userdata = await AuthService.UserDocument(localStorage.getItem("userid"));
        setDocuments(userdata.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);
  useEffect(()=>{
    console.log(documents);
  })
  // Map content to document IDs
  useEffect(() => {
    const newContent = documents.reduce((acc, doc) => {
      acc[doc.$id] = doc.content;
      return acc;
    }, {});
    setContent(newContent);
  }, [documents]);


  // Fetch images for each document
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = documents.map(async (doc) => {
          const file = await AuthService.GetFile(doc.imageId);
          return { id: doc.$id, fileId: file.$id };
        });
        const results = await Promise.all(imagePromises);
        const images = results.reduce((acc, { id, fileId }) => {
          acc[id] = fileId;
          return acc;
        }, {});
        setImageMap(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (documents.length > 0) {
      fetchImages();
    }
  }, [documents]);

  const onClickHandler = () => {
    navigate("/createpost");
  };

  return (
    <div className="h-screen w-screen flex flex-wrap">
      <div className="bg-white border-2">
        {documents.map((doc) => (
          <PreviewCard
          userId={doc.userId}
          key={ID.unique()}
          content={content[doc.$id]}
            lock={doc.$id}
            imageid={doc.imageId}
            id={doc.userId}
            title={doc.title}
            image={`https://cloud.appwrite.io/v1/storage/buckets/${Env_variables.Bucketid}/files/${imageMap[doc.$id]}/view?project=${Env_variables.ProjectId}&mode=admin`}
          />
        ))}
      </div>
      <div className="m-2 w-80 h-80 border-2 border-gray-300 rounded-lg flex  justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
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

