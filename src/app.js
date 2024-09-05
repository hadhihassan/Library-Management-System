import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import booksRouter from "./routes/booksRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { graphqlHTTP } from "express-graphql";
import schema from './graphql/schema.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(authRouter)
app.use(booksRouter)
app.use(borrowRoutes)
app.use(reportRoutes)
app.use(errorHandler)

export default app;