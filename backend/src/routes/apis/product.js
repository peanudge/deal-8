import express from "express";
import productApi from "../../apis/product.js";

const router = express.Router();

/*
GET /api/product?location=[주소(동)]&category=[카테고리id]
GET /api/product/detail?id=[productId]
GET /api/product/category
PUT /api/product/media
PUT /api/product
POST /api/product/
DELETE /api/product?id=[상품아이디]
*/

// routing

router.get("/", productApi.getProducts);
router.get("/detail", productApi.getProduct);
router.get("/category", productApi.getCategories);
router.put("/media", productApi.uploadFile);
router.post("/", productApi.updateProduct);
router.delete("/", productApi.deleteProduct);
export default router;
