import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import AuthService from "../Appwrite/Auth";

function CreatePost() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function createSlugHandler() {
    const id = nanoid();
    const formattedTitle = title.trim().replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const slug = `${formattedTitle}-${id}`;
    setSlug(slug);
  }

  async function sentData(e) {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    if (imageFile && !['image/jpeg', 'image/png'].includes(imageFile.type)) {
      alert("Invalid file type. Only JPEG and PNG are allowed.");
      return;
    }

    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userid');
      let image = null;

      // Upload image if provided
      if (imageFile) {
        image = await AuthService.CreateStorage(imageFile);
      }
      const imageId=localStorage.getItem('imageid');

      // Save post to database
      const userData = await AuthService.CreateDatabase({
        userId:localStorage.getItem('userid'),
        title,
        slug,
        content,
        imageId
      });

      if (userData.success) {
        setTitle('');
        setSlug('');
        setContent('');
        setImageFile(null);
        alert("Post created successfully!");
      }
    } catch (error) {
      alert("Error creating post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="border border-gray-300 shadow-lg w-128 p-8 bg-white rounded-xl">
        <h1 className="text-purple-700 font-bold text-3xl mb-6 text-center">
          Create Post
        </h1>
        <form className="space-y-6" onSubmit={sentData}>
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-gray-700 font-medium mb-2">
              Slug
            </label>
            <div className="flex items-center gap-4">
              <input
                id="slug"
                type="text"
                value={slug}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-200 shadow-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={createSlugHandler}
                className="px-5 py-3 bg-purple-500 text-white font-medium rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Create
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="imageUpload" className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              id="uploader"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 font-bold text-lg rounded-lg shadow-lg focus:outline-none focus:ring-4 ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-700 text-white hover:bg-purple-800"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;






