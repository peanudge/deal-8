import express from "express";
import productApi from "./product/product.js";

const router = express.Router();
// routing

router.get("/", productApi.getProducts);
router.get("/detail", productApi.getProduct);
router.get("/category", productApi.getCategories);
router.put("/media", productApi.uploadFile);
router.post("/", productApi.updateProduct);
router.delete("/", productApi.deleteProduct);
export default router;
