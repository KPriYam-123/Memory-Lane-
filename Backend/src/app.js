import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// CORS configuration for frontend connection
app.use(cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // Vite dev servers
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// for doing crud operations on cookies of the client browser
app.use(cookieParser())



//Routes import
import userRouter from "./routes/user.routes.js"
import oauthRouter from "./routes/oauth.routes.js"

app.use('/api/users', userRouter)
app.use('/api/oauth', oauthRouter)

export {app}