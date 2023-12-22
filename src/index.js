import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Database connection error: ", err)
    })







// another method for connecting to a database
/*
import express from "express";
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error', error => console.error)

        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR", error);
        throw error;
    }
})()

*/