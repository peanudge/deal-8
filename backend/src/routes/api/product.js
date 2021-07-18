import express from "express";
import productApi from "./product/index.js";

const router = express.Router();
// routing

router.get("/", productApi.getProducts);
router.get("/detail", productApi.getProduct);
router.get("/category", productApi.getCategories);
router.put("/media", productApi.uploadFile);
router.put("/", productApi.createProduct);
router.post("/", productApi.updateProduct);
router.delete("/", productApi.deleteProduct);
export default router;
