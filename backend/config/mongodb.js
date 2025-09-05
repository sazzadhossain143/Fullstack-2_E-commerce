import mongoose from "mongoose";

// const mongodb = "mongodb+srv://sazzad:sazzad103@cluster0.sne1r.mongodb.net/e-commerce"
const DB_NAME = "e-commerce"

const connectDB = async ()=> {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log("DB connected");
  } catch (error) {
    console.log("DB connect Fail",error);
    process.exit(1)
  }

}


export default connectDB;

