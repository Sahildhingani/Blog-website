import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Pageview from "./viewpage";
import { ID } from "appwrite";

function PreviewCard({content,imageid,lock,title,image,userId}) {
    const navigate = useNavigate();

    const onclickhandler = () => {
      // Navigate to the /page route and pass data via state
      navigate("/page", {
        state: { title, image,content,imageid,lock,userId},
      });
    };
  return (
    <>
      <button
        onClick={onclickhandler}
        className="m-4 transition transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md shadow-black"
        key={ID.unique()} // Rename the key prop if not in a list
      >
        <div className="h-80 w-80 border-2 rounded-lg flex flex-col items-center justify-center">
          <img className="h-72 w-72" src={image} alt={title} />
          <h1 className="font-bold text-xl">{title}</h1>
        </div>
      </button>
    </>
  );
}

export default PreviewCard;
