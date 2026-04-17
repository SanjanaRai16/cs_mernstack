import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  IconButton
} from "@mui/material";
import {
  FavoriteBorder,
 
  Send,
  Delete,
  Edit
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function MyPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/post/myPosts",
        {
          headers: {
            "auth-token": localStorage.getItem("myToken"),
          },
        }
      );

      if (res.data.success) {
        setAllPosts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this post?")) return;

      const res = await axios.delete(
        `http://localhost:5000/post/deletePost/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("myToken"),
          },
        }
      );

      if (res.data.success) {
        setAllPosts((prev) =>
          prev.filter((post) => post._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        pt: 4,
      }}
    >
      {/* Feed Container */}
      <Box sx={{ width: "100%", maxWidth: 500 }}>

        {allPosts.map((post) => (
          <Card
            key={post._id}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {/* ✅ Header */}
            <CardHeader
              avatar={
                <Avatar>
                  {post.userId?.name?.charAt(0) || "U"}
                </Avatar>
              }
              title={post.userId?.name || "User"}
              subheader={post.location}
              action={
                <>
                  <IconButton onClick={() => navigate(`/editPost/${post._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(post._id)}>
                    <Delete />
                  </IconButton>
                </>
              }
            />

            {/* ✅ Media */}
            {post.media?.length > 0 && (
              <CardMedia
                component={
                  post.media[0].mediaType === "image"
                    ? "img"
                    : "video"
                }
                image={
                  post.media[0].mediaType === "image"
                    ? post.media[0].mediaUrl
                    : undefined
                }
                src={
                  post.media[0].mediaType === "video"
                    ? post.media[0].mediaUrl
                    : undefined
                }
                controls={post.media[0].mediaType === "video"}
                sx={{
                  width: "100%",
                  maxHeight: 500,
                  objectFit: "cover",
                }}
              />
            )}

            {/* ✅ Actions */}
            <Box sx={{ display: "flex", px: 1 }}>
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <IconButton>
             
              </IconButton>
              <IconButton>
                <Send />
              </IconButton>
            </Box>

            {/* ✅ Caption */}
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2">
                <strong>{post.userId?.name || "User"}</strong>{" "}
                {post.caption}
              </Typography>
            </CardContent>

          </Card>
        ))}

      </Box>
    </Box>
  );
}