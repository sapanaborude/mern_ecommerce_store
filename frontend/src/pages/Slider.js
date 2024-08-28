import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";

export default function Slider() {

  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="featured-product">
      <h1 className="text-center my-5">Featured Products</h1>

      <div className="container text-center">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="card-group">

                <div className="cards-wrapper">
                  {products?.map((p) => (

                    <div className="card d-none d-md-block" style={{ width: '200px' }} key={p._id}>
                      <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." style={{ height: '200px', width: '200px' }} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <h6>{p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}</h6>
                        <p className="card-text text-secondary" style={{ height: '40px' }}>{p.description.substring(0, 60)}...
                        </p>
                        <button
                          className="btn btn-warning ms-1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}


                </div>
              </div>

            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-secondary" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span className="carousel-control-next-icon bg-secondary" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

        </div>
      </div>
    </section >
  )
}
