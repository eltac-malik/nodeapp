import { Router } from "express"
const router = Router()

import { getCategory, getCategories, addNewCategory, editCategory, deleteCategory } from "../controllers/categories.controller.js"

router.get("/", getCategories)

router.get("/:id", getCategory)

router.post("/", addNewCategory)

router.put("/:id", editCategory)

router.delete("/:id", deleteCategory)

export default router