import subCategoryModel from "../models/subCategoryModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createSubCategoryController = async (req, res) => {
  try {
    const { subcatName, category } = req.fields;

    switch (true) {
      case !subcatName:
        return res.status(500).send({ error: "subcatName is Required" });
      case !category:
        return res.status(500).send({ error: "category is Required" });
    }
    
    // const existingSubCategory = await subCategoryModel.findOne({ subcatName });
    // if (existingSubCategory) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "SubCategory Already Exisits",
    //   });
    // }
    const subcategory = new subCategoryModel({...req.fields, slug: slugify(subcatName)});
    await subcategory.save();
    res.status(201).send({
      success: true,
      message: "new sub category created",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Sub Category",
    });
  }
};

//update category
export const updateSubCategoryController = async (req, res) => {
  try {
    const { subcatName } = req.body;
    const { id } = req.params;
    const subcategory = await subCategoryModel.findByIdAndUpdate(
      id,
      { subcatName,catName, slug: slugify(subcatName) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Sub Category Updated Successfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all cat
export const subCategoryControlller = async (req, res) => {
  try {
    const subcategory = await subCategoryModel
    .find({})
    .populate("category");
    res.status(200).send({
      success: true,
      message: "All SubCategories List",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleSubCategoryController = async (req, res) => {
  try {
    const subcategory = await subCategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await subCategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "SubCategry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
