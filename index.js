import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/dbConfig.js";
import authRoute from "./views/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) =>{
    res.status(200).send("Welcome to Backend");
});

app.use("/api/auth", authRoute);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server Started on ${port}`);
})



