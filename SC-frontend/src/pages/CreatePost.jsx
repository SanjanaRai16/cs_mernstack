import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false); // 🔥 NEW

  const { handleCreatePost } = useContext(UserContext);

  const handleFileChange = (e) => {
    setMedia([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await handleCreatePost({ caption, location, media });

      alert("Post created successfully");

      setCaption("");
      setLocation("");
      setMedia([]);
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Post</h2>

        <textarea
          className="w-full border p-2 rounded-md"
          placeholder="Write caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border p-2 rounded-md"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input type="file" multiple onChange={handleFileChange} />

        <div className="flex gap-2 flex-wrap">
          {media.map((file, index) => (
            <p key={index} className="text-sm">{file.name}</p>
          ))}
        </div>

        <button
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
          }`}
        >
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}