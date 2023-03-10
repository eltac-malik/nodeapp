import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"

import dbConnect from "./dbConnect.js"

const app = express();

dotenv.config()

app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan("dev"))

app.use(cors())



// =========================================================================
//                                Routes
// =========================================================================

// Products
import products from "./routes/products.js"
app.use("/api/products", products)

// Categories
import categories from "./routes/categories.js"
app.use("/api/categories", categories)



async function run() {
  try {
    await dbConnect()
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server has been run on port ${PORT}`));
  } catch (err) {
    console.error("Server Error", err.message)
    process.exit(1)
  }
}


run()
