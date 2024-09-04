import { useState, useEffect } from "react";
import axios from "axios";

export default function useSubCategory() {
  const [subcategories, setSubCategories] = useState([]);

  //get subcat
  const getSubCategories = async () => {
    try {
      const { data } = await axios.get("https://mern-ecommerce-backend-c87p.onrender.com/api/v1/subcategory/get-subcategory");
      setSubCategories(data?.subcategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  return subcategories;
}
