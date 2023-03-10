import { Schema, model } from "mongoose";

const productSchema = new Schema({
    "title": {
        type: String,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "stock": {
        type: Number,
        required: true,
        default: 0
    },
    "sold": {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

productSchema.index({ category: 1 })

export default model("Product", productSchema)