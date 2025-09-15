import express from "express";
import dotenv from "dotenv";
import { connect_database } from "./config/database";
import projectRoutes from "./routes/ProjectAndTaskRoutes";
import { corsConfig } from "./config/cors";
import cors from "cors";
import authRoutes from "./routes/AuthenticationAndAuthorizationRoutes";

dotenv.config();
connect_database();

const app = express();
app.use(cors(corsConfig));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/health", (req, res) => {
    res.status(200).send("Connection to the server");
});

const port: number = parseInt(process.env.PORT || "4000", 10);
app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on the port: ${port}`);
});
