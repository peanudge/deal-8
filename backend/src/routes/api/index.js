import express from "express";

import authRouter from "./auth/index.js";
import accountRouter from "./account/index.js";
import productRouter from "./product/index.js";
import categoryRouter from "./category/index.js";
import chatroomRouter from "./chatroom/index.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/chatroom", chatroomRouter);

export default router;
