import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useSubCategory from "../../hooks/useSubCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import useProducts from "../../hooks/useProducts";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  // const subcategories = useSubCategory();
  const categories = useSubCategory();
  const subcategories = categories.filter(cat => cat.category.catName === 'Women');
  const subcategories2 = categories.filter(cat => cat.category.catName === 'Men');

  const products = useProducts();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div className="">
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
            <Link to="/" className="navbar-brand" style={{ fontFamily: 'Lobster, cursive', fontWeight: 'bold', color: 'orange', fontSize: '35px', marginRight:'100px' }}>
            Ecommerce 
            </Link>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Product name, Category name, etc"
                aria-label="Search" style={{width:'400px'}} />
              <button className="btn btn-outline-warning me-2" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">            

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="btn btn-warning mt-2 mx-2">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="btn btn-warning mt-2">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle mt-2"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      
                    >   
                        <FontAwesomeIcon className="cart text-warning ms-3" style={{ fontSize: '35px' }} icon={faUser}></FontAwesomeIcon>           
                      {/* {auth?.user?.name} */}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                  <FontAwesomeIcon className="cart text-warning ms-3 mt-2" style={{ fontSize: '35px' }} icon={faCartShopping}></FontAwesomeIcon>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="col-md-12 category">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapsdata-bs-target#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggnavigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                </li>                 
                          
                <li className="nav-link">
                  <Link to='/allproducts'>All Products</Link>
                </li>
              
                <li className="nav-item dropdown"> 
                  <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" to=''>Women</Link>
                  <div className="dropdown-menu">
                    <li>
                    <Link className="dropdown-item" to="/category/women">All</Link>
                    </li>
                    {subcategories?.map((c) =>
                    (c.category.catName === 'Women' &&
                      <li key={c._id}>
                        <Link className="dropdown-item" to={`/subcategory/${c.slug}`}>{c.subcatName}</Link>
                      </li>)
                    )}
                  </div>
                </li>
                
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" to=''>Men</Link>
                  <div className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/category/men">All</Link>
                    </li>
                    {subcategories2?.map((c) =>
                    (c.category.catName === 'Men' &&
                      <li key={c._id}>
                        <Link className="dropdown-item" to={`/subcategory/${c.slug}`}>{c.subcatName}</Link>
                      </li>)
                    )}
                  </div>
                </li>                

                <li className="nav-link">
                  <Link to={`/category/kids`}>Kids</Link>
                </li>
                <li className="nav-link">
                  <Link to='/contact'>Contact</Link>
                </li>
              </ul>

            </div>
          </div >
        </nav >
      </div >
    </div>
  );
};

export default Header;
