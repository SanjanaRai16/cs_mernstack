import Post from "../models/Post.js";
import Comment from "../models/Comments.js";
import cloudinary from "../services/cloudinary.js";
import fs from "fs";
import { hasSubscribers } from "diagnostics_channel";

// controllers
/* export const createPost = async (req, res) => {
    try {
        const { caption, location } = req.body;
        const media = req.files.map((file) => {
     e       return {
                mediaType: file.mimetype.startsWith("image") ? "image" : "video",
                mediaUrl: file.path
            }
        })

        const userId = req.user.id;

        const newPost = await Post.create({
            caption,
            userId,
            location,
            media
        })

        res.status(201).json({
            success: true,
            message: "Post Created successfully",
            data: newPost
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in creating Post",
        })

    }
} */


export const createPost = async (req, res) => {
  try {
    const { caption, location } = req.body;

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("USER:", req.user);

    const media = [];
    console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("API_KEY:", process.env.CLOUD_API_KEY);
console.log("API_SECRET:", process.env.CLOUD_API_SECRET);
console.log("SECRET LENGTH:", process.env.CLOUD_API_SECRET.length);
    // ✅ SAFE CHECK
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "social_connect_posts",
        });

        media.push({
          mediaType: file.mimetype.startsWith("image") ? "image" : "video",
          mediaUrl: result.secure_url,
          publicId: result.public_id
        });

        // ✅ safe delete
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    // ✅ SAFE USER CHECK
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const newPost = await Post.create({
      caption,
      location,
      userId: req.user.id,
      media,
    });

    res.status(201).json({
      success: true,
      message: "Post Created successfully",
      data: newPost,
    });
  } catch (error) {
    console.log("ERROR:", error); // 🔥 THIS WILL SHOW EXACT ISSUE
    res.status(500).json({
      success: false,
      message: "Error in creating Post",
    });
  }
};

// export const getAllPosts = async (req, res) => {
//     try {
//         const posts = await Post.find()
//             .populate("userId", "name profilePicture")
//             .sort({createdAt: -1})

//         res.status(200).json({
//             success: true,
//             data: posts
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching posts" });
//     }
// // };
export const getAllPosts = async (req, res) => {
    try {
      // const page =Number(req.query.page) || 1; 
      // // Default to page 1 if not provided
      const page = Math.max( Number(req.query.page) || 1, 1 ); // Ensure page is at least 1.first 1 is for default value, second 1 is to ensure minimum page number is 1
      // const limit = Number(req.query.limit) || 10;
      const limit = Math.min( Number(req.query.limit) || 5, 20 ); //5 is the default value, 20 is the maximum limit to prevent abuse
      const skip = (page - 1) * limit; // Default to 10 posts per page
        const posts = await Post.find()
            .populate("userId", "name profilePicture")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
            const totalPosts = await Post.countDocuments();
            const totalPages = Math.ceil(totalPosts / limit);
        res.status(200).json({    
            success: true,
            data: posts,
            paginatedData:{
                currentPage: page,
                totalPages: totalPages,
                totalPosts: totalPosts , 
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching posts" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id })
        .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user posts" });
    }
};


// export const createPost = async (req, res) => {
//     try {
//         const { caption, location } = req.body;
//         const media = []

//             for (const file of req.files) {
//                 // Upload each file to Cloudinary
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "social_connect_posts"
//                 });
//                 media.push({
//                     mediaType: file.mimetype.startsWith("image") ? "image" : "video",
//                     mediaUrl: result.secure_url
//                 })
//                 // Optionally, you can delete the local file after uploading to Cloudinary
//                 fs.unlinkSync(file.path);

//             }

//         const userId = req.user.id;

//         const newPost = await Post.create({
//             caption,
//             userId,
//             location,
//             media
//         })

//         res.status(201).json({
//             success: true,
//             message: "Post Created successfully",
//             data: newPost
//         })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: "Error in creating Post",
//         })

//     }
// }
export const deletePost= async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const myPost=await Post.findById(postId);

    if(!myPost){
        return res.status(404).json({
            success: false,
            message: "Post not found!"
        })
    }
    if(myPost.userId.toString() !== userId){
        return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this post!"
        })
    }
    //delete media from cloudinary
    for(const media of myPost.media){
        if(media.publicId){
            await cloudinary.uploader.destroy(media.publicId);
        } 

  } 
  const del = await Post.findByIdAndDelete(postId);
  res.status(200).json({
    success: true,
    message: "Post deleted successfully!"
  })}

  catch (error) {
    console.log(error)
    res.status(500).json({  
      success: false,
      message: "Error deleting post"
    })
  }
}