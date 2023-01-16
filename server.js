import express from "express";
import createDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import songsRoutes from './routes/songsRoutes.js';
import cors from 'cors';
import {User} from "./models/Models.js";
import dotenv from "dotenv"
dotenv.config()
import { authenticateToken } from "./middleware/authenticate.js";

createDB.sync().then(() => {
    console.log("DB is running");
  })
  

const app = express();
app.use(cors())
const PORT = 5000;

app.get('/',(req, res) => {
    res.send('Server is running')
  })

// accepts json
app.use(express.json());

// Accepts body form post request
app.use(express.urlencoded({extended:true}));

// Use the html
app.use(express.static("public"));

app.use("/api", authRoutes);
app.use("/api", playlistRoutes);
app.use("/api", songsRoutes);

app.listen(PORT , (req, res) => {
    console.log('Server running on Port', PORT);
})