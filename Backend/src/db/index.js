import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import express from "express"
const app = express()

const connectDB = async () => {
    try {
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected to database: ${connectionInstance}  `);
        console.log(`✅ MongoDB connected successfully!`)
        console.log(`🌐 Host: ${connectionInstance.connection.host}`)
        console.log(`📊 Database: ${connectionInstance.connection.name}`)
    } catch (error) {
        console.error("❌ MongoDB connection Failed ERROR: ", error)
        process.exit(1)
    }
}
export default connectDB;