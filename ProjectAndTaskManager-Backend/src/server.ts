import express from "express";
import dotenv from "dotenv";
import { connect_database } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import { corsConfig } from "./config/cors";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connect_database();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
