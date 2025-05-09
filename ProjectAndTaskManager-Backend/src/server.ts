import express from "express";
import dotenv from "dotenv";
import {connect_database} from "./config/db";
import projectRoutes from "./routes/projectRoutes";

/*Connect to DataBase*/
dotenv.config()
connect_database()

/*Create the instance of express*/
const app = express()

app.use('/api/projects', projectRoutes)

export default app