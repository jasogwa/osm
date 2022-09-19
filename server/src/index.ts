import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import indexRoutes from "./routes/index";
const app: Application = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json())

//Routes
app.use(indexRoutes);

app.listen(5000);
console.log('Server running on Port 5000');