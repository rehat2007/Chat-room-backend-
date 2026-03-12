import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// import routs
import router from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js"

//routes declaration
app.use("/api/user", router)
app.use("/api/user/v2", userRouter)

export { app }


