import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true //allow frontend to send the cookies
    })
);

app.use(express.json());
app.use(cookieParser());

// AUTH ROUTES
app.use("/api/auth", authRoutes)

// USER ROUTES
app.use("/api/users", userRoutes)

// CHAT ROUTES
app.use("/api/chat", chatRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
    connectDB();

})


