import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({origin: process.env.CORS_ORIGIN,credentials: true}))

// import routs
import  authRouter  from "./routes/auth.route.js";
app.use("/api/user", authRouter)

export { app }
