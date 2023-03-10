import Category from "../models/Category.js"
import Product from "../models/Product.js"

const getCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)

        if (!category) return res.json({ status: "error", message: "Category with this id does not exist" })

        res.json({ category })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const getCategories = async (req, res) => {
    try {
        const { limit = 5, page = 1, type } = req.query

        if (type === 'all') {
            const categories = await Category.find().sort({ createdAt: -1 })

            return res.json({ categories })
        }

        const skip = page >= 1 ? (page - 1) * limit : 0

        const total = await Category.count()
        const categories = await Category.find().limit(limit).skip(skip).sort({ createdAt: -1 })

        const body = { categories, total }
        if (+page) body.page = +page
        if (+limit) body.limit = +limit

        res.json(body)
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const addNewCategory = async (req, res) => {
    try {
        const { name } = req.body

        const isExist = await Category.findOne({ name })

        if (isExist) return res.json({ status: "error", message: "Category with this name already exists" })

        await Category.create({ name })

        res.json({ status: "success", message: "Category created successfully" })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const editCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const category = await Category.findByIdAndUpdate(id, {
            $set: { name }
        })

        if (!category) return res.json({ status: "error", message: "Category with this id does not exist" })

        res.json({ status: "success", message: "Category edited successfully" })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findByIdAndDelete(id)

        if (!category) return res.json({ status: "error", message: "Category with this id does not exist" })

        await Product.deleteMany({ category: id })

        res.json({ status: "success", message: "Category deleted successfully" })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

export { getCategory, getCategories, addNewCategory, editCategory, deleteCategory }