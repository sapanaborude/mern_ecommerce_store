import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const signinUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register - Ecommerce App">
    <div className="container-fluid">
      <div className="row mt-5 mb-5 justify-content-center">
        <div className="col-md-4 shadow p-5">
          <h2 className="text-center">Login</h2>
          <label className='d-flex justify-content-start'>E-mail:</label>
          <input type="email" className="form-control my-2" placeholder='Enter your E-mail' onChange={(e) => { setEmail(e.target.value) }} value={email} required />
          <label className='d-flex justify-content-start'>Password:</label>
          <input type="password" className="form-control my-2" placeholder='Enter your Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
          <div className="row text-center">
            <button className="btn btn-warning my-3" type='' onClick={signinUser}>Login</button>
            <p className=''>Don't have account? <Link to='/register' style={{ textDecoration: 'none', color: 'orange' }}> Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
