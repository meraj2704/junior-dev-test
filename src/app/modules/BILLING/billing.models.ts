import mongoose, { Schema } from "mongoose";
import { BillI } from "./billing.interface";

const BillsSchema = new Schema<BillI>(
  {
    firstName: { type: String, required: true },
    companyName: { type: String },
    streetAddress: { type: String, required: true },
    apartment: { type: Number },
    townOrCity: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    products: [
      {
        _id: { type: Schema.Types.ObjectId, required: true, ref: "ProductModel" },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const BillModel = mongoose.model<BillI>(
  "BillModel",
  BillsSchema
);
