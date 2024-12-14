import React from 'react'
import Navbar from '../navbar/Navbar'
import "./Herosection.css"
import vegy from "../../images/vegy.png"

const Herosection = () => {
  return (
    <div className="herosection">
      <Navbar/>
      <div className="lowerHerosection">
        <div className="heroLeft">
            <div className="heroHeading">
              <h1>Farm Fresh Veggies Delivered with Care!</h1>
            </div>
            <p>Bringing the Freshest, Nutritious Vegetables Straight from the Farm to Your Table, Ensuring Health and Flavor in Every Bite!</p>
            <div className="searchBox">
              <input type="text" placeholder='search For Products' className='searchInput' />
            </div>
            <div className="smallReview">
              <div>
                <h2>1100 <span>+</span></h2>
                <p>Happy Customer</p>
              </div>

              <div>
                <h2>1100 <span>+</span></h2>
                <p>Happy Customer</p>
              </div>

              <div>
                <h2>1100 <span>+</span></h2>
                <p>Happy Customer</p>
              </div>

            </div>
        </div>
        <div className="heroRight">
            <img src={vegy} alt="dfsf" />
            {/* <img src="https://e7.pngegg.com/pngimages/630/617/png-clipart-assorted-product-in-metal-shopping-basket-shopping-cart-grocery-store-retail-supermarket-shopping-cart-food-package-thumbnail.png" alt="" /> */}
        </div>
      </div>
    </div>
    
  )
}

export default Herosection