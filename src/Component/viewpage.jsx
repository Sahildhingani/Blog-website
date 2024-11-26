import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../Appwrite/Auth";

function Pageview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, image, content, lock, userId ,imageid} = location.state;
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUserId = localStorage.getItem("userid"); // Get userId from localStorage

  useEffect(() => {
    console.log("Lock:", lock);
    console.log("Title:", title);
    console.log("imageid",imageid);
  }, [lock, title]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const deleteImage = await AuthService.DeletUserImage(imageid);
      if (deleteImage) {
        const deleteData = await AuthService.Deletedata(lock);
        if (deleteData) {
          console.log("User data deleted successfully");
        }
      }
      navigate(-1);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title || "Image"}
          className="max-w-full max-h-[80%] rounded-lg shadow-lg object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between p-8 bg-white shadow-lg rounded-lg m-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 mt-2">
            {title}
          </h1>
          <p className="text-gray-600 text-md md:text-lg leading-relaxed">
            {content}
          </p>
        </div>
        <div className="mt-4">
          {currentUserId === userId && ( // Only render the button if userId matches
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`w-full md:w-auto px-6 py-2 ${
                isDeleting ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
              } text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300`}
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pageview;










