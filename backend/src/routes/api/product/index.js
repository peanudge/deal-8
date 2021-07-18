import ProductStore from "../../../model/Product/Store/InMemoryProductStore.js";
import Product from "../../../model/Product/Product.js";
import express from "express";

const router = express.Router();

const productStore = new ProductStore();

router.get("/", async (req, res) => {
  const { location, category } = req.query;
  const products = await productStore.getProductByCategoryAndLocation({
    location,
    category,
  });

  return res.json(products);
});

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  const product = await productStore.getProductById({ id });
  return res.json(product);
});

router.get("/category", async (req, res) => {
  const categories = await productStore.getCategories();
  return res.json(categories);
});

router.put("/media", async (req, res) => {
  res.send("test");
});

router.put("/", async (req, res) => {
  const { category, title, content, cost, location, images } = req.body;
  // TODO auth middleware
  const author = req.session.user;
  const product = new Product(
    category,
    title,
    content,
    cost,
    location,
    images,
    author,
  );
  const newProduct = await productStore.createProduct(product);
  return res.json(newProduct);
});

router.post("/", async (req, res) => {
  const { id, category, title, content, cost, location, images } = req.body;
  // TODO auth middleware

  const product = new Product({
    id,
    category,
    title,
    content,
    cost,
    location,
    images,
  });

  const updatedProduct = await productStore.updateProduct(product);

  return res.json(updatedProduct);
});

router.delete("/", async (req, res) => {
  const { id } = req.query;

  const result = await productStore.deleteProductById({ id });

  return res.json({ success: result });
});

export default router;
