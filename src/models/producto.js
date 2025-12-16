import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0 },
    fechaIngreso: { type: Date, default: () => new Date().toISOString().split("T")[0] },
}, {
    collection: "productos",
    versionKey: false,
});

export const ProductModel = mongoose.model("Product", ProductSchema);