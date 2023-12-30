import { config } from "dotenv"
import  express  from "express"
import db_connection from "./DB/connection.js"
import userrouter from "./src/modules/User/user.routes.js"
import taskrouter from "./src/modules/Task/task.routes.js"
import { globalResponce } from "./src/middlewares/globalResponce.js"

config({path:"./config/.env"})

const app=express()
app.use(express.json())
app.use('/user',userrouter)
app.use('/task',taskrouter)

app.use(globalResponce)
db_connection()
app.listen(process.env.port,()=>{
    console.log(`process is running on port ${process.env.port}`);
})