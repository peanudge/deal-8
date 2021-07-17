import express from "express";

import authRouter from "./auth.js";
import accountRouter from "./account.js";
import productRouter from "./product.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/product", productRouter);

export default router;
