import {Router } from "express"
const router = Router()

import { getProducts, getProduct, editProduct, addProduct, deleteProduct } from "../controllers/products.controller.js"

router.get("/", getProducts)

router.get("/:id", getProduct)

router.post("/", addProduct)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)

export default router