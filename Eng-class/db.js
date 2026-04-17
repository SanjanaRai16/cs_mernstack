import mongoose from "mongoose"; 

const mongoConnection = async () => {
  try {
    const mongo_url = process.env.MONGO_URL;
    await mongoose.connect(mongo_url);
    console.log("✅ Database connected!");
  } catch (error) {
    console.log("❌ Error in connection");
    console.log(error);
    throw error; // important
  }
};
export default mongoConnection;