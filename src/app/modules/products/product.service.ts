import mongoose from "mongoose";
import { ProductI } from "./product.interface";
import { ProductModel } from "./product.models";

const saveProduct = async (data: ProductI, image: string | undefined) => {
  console.log("product service : product", data);
  const newData = {
    ...data,
    image,
  };
  const newProduct = await ProductModel.create(newData);
  return newProduct;
};

const existProduct = async (name: string) => {
  console.log("search exist product for name is :", name);
  const product = await ProductModel.findOne({ name }).lean();
  console.log("search product ", product);
  return !!product;
};

const allProducts = async () => {
  console.log("get all products");
  const products = await ProductModel.find({ isDeleted: false }).select("_id name price discountPercentage discountedPrice image").lean();
  console.log("all products ", products);
  return products;
};

const productDetails = async (_id: mongoose.Types.ObjectId) => {
  console.log("product service : product id", _id);
  const productDetails = await ProductModel.findById(_id).select("_id name price discountPercentage discountedPrice description image active").lean();
  console.log("product service : product details", productDetails);
  return productDetails;
};

const updateProduct = async (_id: mongoose.Types.ObjectId, data: ProductI) => {
  console.log("product service : product id", _id);
  console.log("product service : product data", data);
  const updatedProduct = await ProductModel.findByIdAndUpdate(_id, data, {
    new: true,
  });
  console.log("product service : updated product", updatedProduct);
  return updatedProduct;
};

const deletedProduct = async (id: mongoose.Types.ObjectId) => {
  const product = await ProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return product;
};

export const ProductService = {
  saveProduct,
  existProduct,
  allProducts,
  productDetails,
  updateProduct,
  deletedProduct,
};
