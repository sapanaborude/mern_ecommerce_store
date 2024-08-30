import { useState, useEffect } from "react";
import axios from "axios";

export default function useProducts() {
  const [products, setproducts] = useState([]);

  //get cat
  const getProducts = async () => {
    try {
      const { data } = await axios.get("https://mern-ecommerce-store-37ut.onrender.com/api/v1/product/product-list");
      setproducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return products;
}
