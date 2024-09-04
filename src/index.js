import app from "./app.js";
import { connectDatabase } from "./config/db.js";
const port = process.env.PORT || 4000;

connectDatabase();
app.listen(4000, () => {
    console.log(`Server Status: \t\tRunning on http://localhost:${port}`);
});