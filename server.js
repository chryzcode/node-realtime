import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
