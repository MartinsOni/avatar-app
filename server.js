import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";

import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js"
import configurePassport from "./passport-config.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
  credentials:true,
  origin:true
}));


app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());

configurePassport(passport);

// specify your routes here

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
);

console.log("Connecting to database. Put the kettle on while you wait... 🫖");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! 😍☕"))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`The server is listening for requests ${port} ...🐢`)
  });
