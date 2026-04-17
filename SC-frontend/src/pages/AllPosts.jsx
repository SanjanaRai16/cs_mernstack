import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';

export default function AllPosts() {
  const { getAllPosts } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData.data); // Store the fetched posts data
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [getAllPosts]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{post.userId.name}</h3>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>

            <p className="text-lg text-gray-700">{post.caption}</p>

            <div className="flex flex-wrap gap-4">
              {post.media.map((media) => (
                <img
                  key={media._id}
                  className="w-full sm:w-1/2 lg:w-1/3 rounded-lg object-cover"
                  src={media.mediaUrl}
                  alt="Post media"
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <p>{post.location}</p>
              <div className="flex space-x-4">
                <p>{post.likesCount} Likes</p>
                <p>{post.commentsCount} Comments</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No posts available</p>
      )}
    </div>
  );
}