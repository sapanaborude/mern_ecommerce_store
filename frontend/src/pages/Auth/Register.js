import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // form function
  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
            <h2 className="text-center">Register</h2>
            <label className='d-flex justify-content-start'>Name:</label>
            <input type="text" className="form-control my-2" placeholder='Enter your Name' onChange={(e) => { setName(e.target.value) }} value={name} />
            <label className='d-flex justify-content-start'>E-mail:</label>
            <input type="email" className="form-control my-2" placeholder='Enter your E-mail' onChange={(e) => { setEmail(e.target.value) }} value={email} />
            <label className='d-flex justify-content-start'>Password:</label>
            <input type="password" className="form-control my-2" placeholder='Enter your Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <div class="row text-center">
              <button className="btn btn-warning my-3" type='' onClick={signupUser}>Register</button>
              <p className='d-flex justify-content-start'>Already Registered? <Link to='/login' style={{ textDecoration: 'none', color: 'orange' }}> Login here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
