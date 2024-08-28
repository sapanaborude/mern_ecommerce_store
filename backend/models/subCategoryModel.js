import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  subcatName:{
    type: String,
    require:true
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category',
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("SubCategory", subCategorySchema);
