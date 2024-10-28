import mongoose from "mongoose";
import express from "express";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use("/books", booksRoute);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//Route to get all books

const startServer = async () => {
  try {
    await connectDB(); // Wait for the database to connect

    // Start the server only if the database connection is successful
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Start the process
startServer();
