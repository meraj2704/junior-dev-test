import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import mongoose from "mongoose";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const imageUrl = req.file ? req.file.path : undefined;
  const { name } = req.body;
  try {
    const product = await ProductService.existProduct(name);
    if (product) {
      sendErrorResponse(res, "Product already exists", [], 400);
      return;
    }
    const newProduct = await ProductService.saveProduct(req.body, imageUrl);
    if (newProduct) {
      const data ={
        _id: newProduct._id,
        name: newProduct.name,
        price: newProduct.price,
        discountPercentage: newProduct.discountPercentage,
        discountedPrice: newProduct.discountedPrice,
        description: newProduct.description,
        quantity: newProduct.quantity,
        image: newProduct.image,
      }
      sendSuccessResponse(res, data, "Product created successfully", 201);
      return;
    }
    sendErrorResponse(res, "An error occurred while creating product", [], 500);
    return;
  } catch (err: any) {
    console.error("Error checking product existence : ", err);
    sendErrorResponse(
      res,
      "An error occurred while checking product existence",
      [],
      500
    );
    return;
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.allProducts();
    sendSuccessResponse(res, products, "Products fetched successfully", 200);
    return;
  } catch (err: any) {
    console.error("Error fetching products : ", err);
    sendErrorResponse(
      res,
      "An error occurred while fetching products",
      [],
      500
    );
    return;
  }
};

const getProductDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const product = await ProductService.productDetails(_id);
    if (!product) {
      sendErrorResponse(res, "Product not found", [], 404);
      return;
    }
    console.log("products controller : product details", product);
    sendSuccessResponse(
      res,
      product,
      "Product details fetched successfully",
      200
    );
    return;
  } catch (err: any) {
    console.error("Error fetching product details : ", err);
    sendErrorResponse(
      res,
      "An error occurred while fetching product details",
      [],
      500
    );
    return;
  }
};

// const productUpdate = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const _id = new mongoose.Types.ObjectId(id);
//     const imageUrl = req.file ? req.file.path : undefined;
//     const existProduct = await ProductService.productDetails(_id);
//     if (!existProduct) {
//       sendErrorResponse(res, "Product not found", [], 404);
//       return;
//     }
//     const { name, description, price, quantity, active } = req.body;
//     const updatedProduct = await ProductService.updateProduct(_id, {
//       name,
//       price,
//       description,
//       quantity,
//       active,
//       image: imageUrl || existProduct.image,
//     });
//     if (!updatedProduct) {
//       sendErrorResponse(
//         res,
//         "An error occurred while updating product",
//         [],
//         500
//       );
//       return;
//     }
//     sendSuccessResponse(
//       res,
//       updatedProduct,
//       "Product updated successfully",
//       200
//     );
//     return;
//   } catch (err: any) {
//     console.error("Error updating product : ", err);
//     sendErrorResponse(res, "An error occurred while updating product", [], 500);
//     return;
//   }
// };

const productDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const _id = new mongoose.Types.ObjectId(id);
  try {
    const existProduct = await ProductService.productDetails(_id);
    if (!existProduct) {
      sendErrorResponse(res, "Product not found", [], 404);
      return;
    }
    const deletedProduct = await ProductService.deletedProduct(_id);
    if (!deletedProduct) {
      sendErrorResponse(
        res,
        "An error occurred while deleting product",
        [],
        500
      );
      return;
    }
    sendSuccessResponse(
      res,
      deletedProduct,
      "Product deleted successfully",
      200
    );
    return;
  } catch (err: any) {
    console.error("Error deleting product : ", err);
    sendErrorResponse(res, "An error occurred while deleting product", [], 500);
    return;
  }
};

const addOnWishlist = async(req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const wishlist = await ProductService.addToWishlist(_id);
    if(!wishlist){
      sendErrorResponse(res, "An error occurred while adding product to wishlist", [], 500);
      return;
    }
    sendSuccessResponse(res, wishlist, "Product added to wishlist successfully", 200);
    return;
  }
  catch(err:any){
    console.error("Error adding product to wishlist : ", err);
    sendErrorResponse(res, "An error occurred while adding product to wishlist", [], 500);
    return;
  }
}

const getAllWishListProducts = async(req: Request, res: Response) => {
  try{
    const wishlist = await ProductService.getAllWishlistProducts();
    sendSuccessResponse(res, wishlist, "Wishlist products fetched successfully", 200);
    return;
  }
  catch(err:any){
    console.error("Error fetching wishlist products : ", err);
    sendErrorResponse(res, "An error occurred while fetching wishlist products", [], 500);
    return;
  }
}

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductDetails,
  // productUpdate,
  productDelete,
  addOnWishlist,
  getAllWishListProducts
};
