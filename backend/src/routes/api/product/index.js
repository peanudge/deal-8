import express from "express";
import { upload } from "../../../app.js";
import ProductStore from "../../../model/Product/Store/InMemoryProductStore.js";
import Product from "../../../model/Product/Product.js";
import {
  SUCCESS_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../../../util/HttpStatus.js";

const router = express.Router();

export const productStore = new ProductStore();

router.get("/", async (req, res) => {
  const { location, category } = req.query;
  try {
    const products = await productStore.getProductByCategoryAndLocation({
      location,
      category,
    });
    return res.status(SUCCESS_STATUS).json(products);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  try {
    const product = await productStore.getProductById(id);
    if (product === null) {
      return res
        .status(NOT_FOUND_STATUS)
        .json({ error: "상품을 찾을 수 없습니다." });
    }
    return res.status(SUCCESS_STATUS).json(product);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.get("/category", async (req, res) => {
  try {
    const categories = await productStore.getCategories();
    return res.status(SUCCESS_STATUS).json({
      category: categories,
    });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.post("/media", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ success: false, error: "Image Upload Fail!" });
    } else {
      console.log(req.files);
      const pathList = req.files.map((file) => file.filename);
      res.json({
        success: true,
        images: pathList,
      });
    }
  });
});

router.post("/", async (req, res) => {
  const { category, title, content, cost, location, images } = req.body;

  // TODO auth middleware
  const author = req.session.username;
  try {
    const tmpProduct = new Product({
      category,
      title,
      content,
      cost,
      location,
      images,
      author,
    });
    const newProduct = await productStore.createProduct(tmpProduct);
    return res.status(SUCCESS_STATUS).json(newProduct);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.put("/", async (req, res) => {
  const { id, category, title, content, cost, location, images } = req.body;
  // TODO auth middleware
  const author = req.session.username;

  try {
    const targetProduct = await productStore.getProductById(id);
    if (targetProduct.author !== author) {
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
    const oldProduct = await productStore.getProductById(id);
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
