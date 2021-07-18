import ProductStore from "../../../model/Product/Store/InMemoryProductStore.js";
import Product from "../../../model/Product/Product.js";
import express from "express";

const router = express.Router();

const productStore = new ProductStore();

router.get("/", async (req, res) => {
  const { location, category } = req.query;
  try {
    const products = await productStore.getProductByCategoryAndLocation({
      location,
      category,
    });
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "unexpect error occured" });
  }
});

router.get("/detail", async (req, res) => {
  const { id } = req.query;
  try {
    const product = await productStore.getProductById({ id });
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "unexpect error occured" });
  }
});

router.get("/category", async (req, res) => {
  try {
    const categories = await productStore.getCategories();
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ error: "unexpect error occured" });
  }
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
  try {
    const newProduct = await productStore.createProduct(product);
    return res.json(newProduct);
  } catch (err) {
    return res.status(500).json({ error: "unexpect error occured" });
  }
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

  try {
    const result = await productStore.deleteProductById({ id });
    return res.json({ success: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "unexpect error occured" });
  }
});

export default router;
