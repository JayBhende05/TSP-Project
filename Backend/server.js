import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import colors from "colors"
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'

import cors from 'cors'

//configure env 
dotenv.config()

//database config
connectDB();

//rest object
const app = express();


//middleware
app.use(cors());
app.use(express.json());
                           

//routes
app.use('/api/v1/auth', authRoutes );
app.use('/api/v1/category', categoryRoutes );
app.use('/api/v1/product', productRoutes );

//rest api 
app.get("/", (req, res)=>{
    res.send({
        message: "Welcome to WristCrafters"
    });
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`.bgWhite.black);
});