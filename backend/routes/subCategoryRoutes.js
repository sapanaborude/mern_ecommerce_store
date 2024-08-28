import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  subCategoryControlller,
  createSubCategoryController,
  deleteSubCategoryController,
  singleSubCategoryController,
  updateSubCategoryController,
} from "./../controllers/subCategoryController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
// create category
router.post(
  "/create-subcategory",
  requireSignIn,
  isAdmin,
  formidable(),
  createSubCategoryController
);

//update category
router.put(
  "/update-subcategory/:id",
  requireSignIn,
  isAdmin,
  updateSubCategoryController
);

//getALl category
router.get("/get-subcategory", subCategoryControlller);

//single category
router.get("/single-subcategory/:slug", singleSubCategoryController);

//delete category
router.delete(
  "/delete-subcategory/:id",
  requireSignIn,
  isAdmin,
  deleteSubCategoryController
);

export default router;
