import express from "express";
import authMiddleware from "../../../middlewares/auth.js";

import { upload } from "../../../app.js";

import { ProductStatus } from "../../../model/Product/ProductStatus.js";

import ProductStore from "../../../model/Product/Store/MySQLProductStore.js";

import Product from "../../../model/Product/Product.js";
import {
  SUCCESS_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  UNAUTHORIZED_STATUS,
  BAD_REQUEST,
} from "../../../util/HttpStatus.js";

const router = express.Router();
const productStore = new ProductStore();

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  const username = req.session["username"];
  const product = await productStore.getProductById(id, username);
  if (product === null) {
    return res
      .status(NOT_FOUND_STATUS)
      .json({ success: false, error: "상품을 찾을 수 없습니다." });
  } else {
    return res.status(SUCCESS_STATUS).json({ success: true, product });
  }
});

router.post("/media", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ success: false, error: "Image Upload Fail!" });
    } else {
      const pathList = req.files.map((file) => "/upload/" + file.filename);
      res.json({
        success: true,
        images: pathList,
      });
    }
  });
});

router.put("/:id/status", async (req, res) => {
  if (!req.session["username"]) {
    res
      .status(UNAUTHORIZED_STATUS)
      .json({ success: false, error: "해당 기능에 대한 권한이 없습니다." });
    return;
  }

  const { status } = req.query;
  const { id } = req.params;

  const isExistStatus = ProductStatus.includes(status);
  if (!isExistStatus) {
    res
      .status(BAD_REQUEST)
      .json({ success: false, error: "올바르지않은 상태값입니다." });
    return;
  }

  const isSuccess = await productStore.updateProductStatus(id, status);
  if (isSuccess) {
    res.status(SUCCESS_STATUS).json({ success: true });
  } else {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ success: false, error: "서버 내부 에러입니다." });
  }
});

router.get("/", async (req, res) => {
  const username = req.session["username"];

  const { location, category } = req.query;
  const categoryId = category ? Number(category) : null;

  try {
    const products = await productStore.getProducts({
      location,
      category: categoryId,
      username,
    });
    return res.status(SUCCESS_STATUS).json(products);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { category, title, content, cost, location, images } = req.body;
  const author = req.session.username;
  try {
    const tmpProduct = new Product({
      category,
      title,
      content,
      cost,
      location,
      thumbnail: images && images.length > 0 ? images[0] : "",
      images,
      author,
    });

    const product = await productStore.createProduct(tmpProduct);
    return res.status(SUCCESS_STATUS).json({ success: true, product });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.put("/", async (req, res) => {
  const { id, category, title, content, cost, location, images } = req.body;
  const username = req.session["username"];

  try {
    const targetProduct = await productStore.getProductById(id, username);
    if (targetProduct.author !== username) {
      return res.status(FORBIDDEN_STATUS).json({ success: false });
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ success: false });
  }

  const product = new Product({
    id,
    category,
    title,
    content,
    cost,
    location,
    images,
  });

  try {
    const updatedProduct = await productStore.updateProduct(product);
    return res.status(SUCCESS_STATUS).json(updatedProduct);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ success: false });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query;
  const username = req.session.username;
  try {
    const oldProduct = await productStore.getProductById(id, username);
    if (oldProduct.author !== username) {
      return res.status(402).json({ success: false });
    }
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ success: false });
  }

  try {
    const result = await productStore.deleteProductById(id);
    return res.status(SUCCESS_STATUS).json({ success: result });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

export default router;
