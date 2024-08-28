import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-dark text-center">
      <div className="container">
        <div className="row text-white ">
          <div className="col-md-3">
            <h3 className="mt-3">Women</h3>
            <ul className=''>
              <li className="mt-3">Dresses</li>
              <li>Pants</li>
              <li>Skirts</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3 className="mt-3">Men</h3>
            <ul>
              <li className="mt-3">Shirts</li>
              <li>Pants</li>
              <li>Hoodies</li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3 className="mt-3">Kids</h3>
          </div>

          <div className="col-md-3">
            <h3 className="mt-3">Links</h3>
            <ul>
              <li className="mt-3">Home</li>
              <li>Login</li>
              <li>Contact</li>
            </ul>
          </div>

        </div>

        <hr className="text-white" />
        <div className="row mt-5">
          <div className="col-md-12 p-3 text-center">
            <h4 className="font-weight-bold text-white">Copyright@Ecommerce 2022-23</h4>
          </div>
        </div>
      </div>
    </footer>
  )
}



