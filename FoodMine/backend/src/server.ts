import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors"; // our frontend 4200 and our backend is 5000
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router"

import { dbConnect } from './configs/database.config';

dbConnect();

const app = express();
app.use(express.json()); // to parse JSON bodies
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port,"0.0.0.0",() => {
   console.log(`Backend running on port ${port}`);
});
