import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV = "development"
}))



export default app;