import mongoose, { Schema } from "mongoose";
import { ProductI } from "./product.interface";

const ProductsSchema = new Schema<ProductI>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage:{type:Number, required: true, default: 0,},
    discountedPrice: { type: Number, required: true, default:0 },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    active: { type: Boolean, required: true },
    wishList: { type: Boolean, default:false },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<ProductI>(
  "ProductModel",
  ProductsSchema
);
