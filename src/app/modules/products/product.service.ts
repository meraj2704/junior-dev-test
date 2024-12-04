import mongoose from "mongoose";
import { ProductI } from "./product.interface";
import { ProductModel } from "./product.models";

const saveProduct = async (data: ProductI, image: string | undefined) => {

  const newData = {
    ...data,
    image,
  };
  const newProduct = await ProductModel.create(newData);
  return newProduct;
};

const existProduct = async (name: string) => {

  const product = await ProductModel.findOne({ name }).lean();

  return !!product;
};

const allProducts = async () => {

  const products = await ProductModel.find({ isDeleted: false })
    .select("_id name price discountPercentage discountedPrice image")
    .lean();
  return products;
};

const productDetails = async (_id: mongoose.Types.ObjectId) => {

  const productDetails = await ProductModel.findById(_id)
    .select(
      "_id name price discountPercentage discountedPrice description image active"
    )
    .lean();
  return productDetails;
};

const updateProduct = async (_id: mongoose.Types.ObjectId, data: ProductI) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(_id, data, {
    new: true,
  });
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

const addToWishlist = async (id: mongoose.Types.ObjectId) => {

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { wishList: true },
    { new: true }
  );
  return updatedProduct;
};

const getAllWishlistProducts = async() => {
  const products = await ProductModel.find({ wishList: true })
   .select("_id name price discountPercentage discountedPrice image")
   .lean();
  return products;
}

export const ProductService = {
  saveProduct,
  existProduct,
  allProducts,
  productDetails,
  updateProduct,
  deletedProduct,
  addToWishlist,
  getAllWishlistProducts
};
