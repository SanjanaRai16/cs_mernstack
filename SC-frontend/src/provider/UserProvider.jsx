import UserContext from "../context/UserContext";
import axios from "axios";

axios.defaults.withCredentials = true;

const UserProvider = ({ children }) => {
  // ✅ Base URL from .env
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  // ✅ REGISTER
  const handleRegister = async (data) => {
    try {
      const res = await axios.post(`${BaseUrl}/auth/register`, data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // ✅ LOGIN
  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${BaseUrl}/auth/login`, data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // ✅ CREATE POST (with media upload)
  const handleCreatePost = async ({ caption, location, media }) => {
    try {
      const formData = new FormData();

      formData.append("caption", caption);
      formData.append("location", location);

      media.forEach((file) => {
        formData.append("media", file);
      });

      const res = await axios.post(
        `${BaseUrl}/post/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
      throw error; // ✅ fixed typo
    }
  };

  // ✅ GET ALL POSTS
  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/post/all`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // ✅ context value
  const value = {
    handleRegister,
    handleLogin,
    handleCreatePost,
    getAllPosts,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;