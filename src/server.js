import { app } from "./app.js"
import { connectDb } from "./config/connect.db.js";
import dotenv from "dotenv"
import dns from "node:dns"

dns.setServers(["8.8.8.8"])

dotenv.config({ path: "./.env" })

const PORT = process.env.PORT || 3000;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        })
    })
    .catch((err) => {
        console.log("Mongo DB connection failed ", err);

    })


