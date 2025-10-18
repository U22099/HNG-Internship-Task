// Importing libraries and configuring environment variables
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const cat_api_url = process.env.API_URL;

// For accessing the documentations file
const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get current directory

// API fetch function
const api_fetch_function = async (url) => {
  try {
    if (!url) {
      return { success: false, error: "API URL not found" };
    }

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Error fetching cat fact",
      };
    }
    return { success: true, fact: data.fact };
  } catch (error) {
    console.error(`An error occurred: ${error.message}`, error);
    return { success: false, error: error.message };
  }
};

app.use(express.json());

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "README.md"));
});

// /me Endpoint
app.get("/me", async (_, res) => {
  // Checking if the environment variables are set
  if (!process.env.NAME || !process.env.EMAIL || !process.env.STACK) {
    return res.status(500).json({
      status: "error",
      error: "Environment variables not found",
    });
  }

  const cat_fact_request = await api_fetch_function(cat_api_url); // Fetchiing the cat fact
  const current_timestamp = new Date().toISOString(); // Getting the current timestamp

  // Constructing the response
  const full_data = {
    user: {
      email: process.env.EMAIL,
      name: process.env.NAME,
      stack: process.env.STACK,
    },
    timestamp: current_timestamp,
  };

  // Checking if the cat fact request was successful and sending a response accordingly
  if (!cat_fact_request.success) {
    res.status(500).json({
      status: "error",
      ...full_data,
      error: cat_fact_request.error,
    });
  } else {
    res.json({
      status: "success",
      ...full_data,
      fact: cat_fact_request.fact,
    });
  }
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
