import express from "express";
import dotenv from "dotenv";
import {connect_database} from "./config/db";

/*Connect to DataBase*/
dotenv.config()
connect_database()

/*Create the instance of express*/
const app = express()
export default app