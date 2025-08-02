import mongoose from "mongoose";

export const connect_database = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`Connecting to the database on port: ${url}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
