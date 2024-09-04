import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/graphql", graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV = "development"
// }))
// app.use("*",(req,res)=>{console.log("new one request", req.path);res.send({ok:req})})


app.use(authRouter)

export default app;