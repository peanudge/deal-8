import express from "express";
import CategoryStore from "../../../model/Category/Store/MySQLCategoryStore.js";
import {
  SUCCESS_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../../../util/HttpStatus.js";

const categoryStore = new CategoryStore();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await categoryStore.getCategories();
    return res.status(SUCCESS_STATUS).json({
      success: true,
      categories,
    });
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryStore.getCategory(id);
    if (category) {
      res.status(SUCCESS_STATUS).json({ success: true, category });
    } else {
      res.status(NOT_FOUND_STATUS).json({ success: false });
    }
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ error: "unexpect error occured" });
  }
});

export default router;
