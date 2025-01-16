import express from "express"
import cors from "cors"
import userRouter from "./routes/user"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDB } from "./db/db"

dotenv.config({
    path: './.env'
})

const app = express()

async function connect() {
    await connectDB()
}

connect()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/user', userRouter)

app.listen(3000)

export {app}
