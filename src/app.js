import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// import routs
import router from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js"
import chatRouter from "./routes/chat.route.js"

//routes declaration
app.use("/api/user", router)
app.use("/api/user/v2", userRouter)
app.use("/api/chat",chatRouter)

export { app }


