import express from "express";

import authApi from "./auth/index.js";

const router = express.Router();

router.post("/signin", authApi.signIn);
router.post("/signup", authApi.signUp);
router.post("/signout", authApi.signOut);

export default router;
