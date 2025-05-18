import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("mongodb tei amjilttei holbogdloo");
  } catch (error) {
    console.log("mongodb tei holbgdhd aldaa garlaa", error);
  }
};
