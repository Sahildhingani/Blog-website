import React from "react";
import { useLocation } from "react-router-dom";

function Pageview() {
  const location = useLocation();
  const { title, image, slug, content } = location.state || {};

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start p-8 bg-gray-100">
      <img
        className="h-96 shadow-lg"
        src={image}
        alt={title || "Image preview"}
      />
      <h1 className="mt-6 text-purple-950 font-bold text-2xl text-center">
        {title}
      </h1>
      <p className="mt-4 text-black font-medium text-lg text-center max-w-2xl">
        {content}
      </p>
    </div>
  );
}

export default Pageview;

