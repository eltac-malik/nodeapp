import Product from "../models/Product.js"

const getProducts = async (req, res) => {
    try {
        if (!req.query) return res.sendStatus(400)
        let skip = 0

        // eslint-disable-next-line prefer-const
        let { category, page = 1, limit = 10 } = req.query

        if (page < 0) page = Math.abs(page)
        if (limit < 0) page = Math.abs(limit)

        const query = {}

        if (category) query.category = category

        const total = await Product.count(query)

        skip = (page - 1) * limit

        const products = await Product.find(query)
            .populate('category')
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })


        res.json({ products, total, page: +page, limit: +limit, category })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id).populate('category')

        if (!product) return res.json({ status: "error", message: "Product with this id does not exist" })

        res.json({ product })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, sold, stock, price, category } = req.body

        const isExist = await Product.findOne({ title })

        if (isExist) return res.json({ status: "error", message: "Product with this title already exists" })

        const newProduct = new Product({ title, sold, price, stock, category })

        await newProduct.save()

        res.json({ status: "success", message: "Product created successfully" })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, sold, price, stock } = req.body

        const product = await Product.findByIdAndUpdate(id, {
            $set: {
                title,
                sold,
                price,
                stock
            }
        })

        if (!product) return res.json({ status: "error", message: "Product with this id does not exist" })

        res.json({ status: "success", message: "Product edited successfully" })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        if (!product) return res.json({ status: "error", message: "Product with this id does not exist" })

        res.json({ status: "success", message: "Product deleted successfully" })
    } catch (err) {
        res.json({ status: "error", message: err.message })
    }
}

export { getProducts, getProduct, addProduct, editProduct, deleteProduct }