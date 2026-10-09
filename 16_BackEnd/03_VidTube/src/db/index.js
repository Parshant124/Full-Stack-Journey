import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try{
        console.log("ran")
        const DBInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(DBInstance)
    }catch(err){
        console.log("Database fetching Failed!!!", err)
        process.exit(1)
    }
}

export {connectDB}