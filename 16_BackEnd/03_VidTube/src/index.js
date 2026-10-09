import {app} from "./app.js"
import dotenv from "dotenv"
import {connectDB} from "./db/index.js"

dotenv.config({
    path: './src/.env'
})

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server successfully connected to the port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log("Error from DB side", err)
  })
