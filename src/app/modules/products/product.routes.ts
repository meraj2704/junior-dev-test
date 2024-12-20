import express from "express";
import upload from "../../config/multer.config";
import validate from "../../middlewares/validate";
import { ProductSchema } from "./product.schema";
import { ProductController } from "./product.controller";
const router = express.Router();

router.post(
  "/add-product",
  upload.single("file"),
  validate(ProductSchema),
  ProductController.createProduct
);

router.get("/all-products", ProductController.getAllProducts);
router.get("/product-details/:id", ProductController.getProductDetails);
router.put("/add-to-wish-list/:id", ProductController.addOnWishlist);
router.get("/all-wishList-products", ProductController.getAllWishListProducts);
router.delete("/product-delete/:id", ProductController.productDelete);

export const ProductRouter = router;
