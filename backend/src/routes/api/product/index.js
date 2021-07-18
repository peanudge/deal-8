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
    const product = await productStore.getProductById(id);
    if (product === null) {
      return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }
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
    return res.json(newProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "unexpect error occured" });
  }
});

router.put("/", async (req, res) => {
  const { id, category, title, content, cost, location, images } = req.body;
  // TODO auth middleware
  const author = req.session.username;

  try {
    const targetProduct = await productStore.getProductById(id);
    if (targetProduct.author !== author) {
      return res.status(402).json({ success: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
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
    return res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
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
    console.log(err);
    return res.status(500).json({ success: false });
  }

  try {
    const result = await productStore.deleteProductById(id);
    return res.json({ success: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "unexpect error occured" });
  }
});

export default router;
