import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setOrderPlaced } from "../../redux/index.js";
import "./VegetableDetail.css";
import Notification from '../../component/notification/Notification.jsx';
import axios from "axios";



const VegetableDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for selected quantity
  const [timeRemaining, setTimeRemaining] = useState("");
  const [notification, setNotification] = useState(null); // State for notification

  useEffect(() => {
    const fetchVegetable = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_END_POINT}/vegetable/${id}`); // Replace with your API endpoint
        const data = await response.json();
        setProduct(data);


        // time
        if (data.discountExpiry) {
          calculateTimeRemaining(data.discountExpiry); // Initial calculation
          const intervalId = setInterval(() => {
            calculateTimeRemaining(data.discountExpiry); // Update every second
          }, 1000);

          // Clean up the interval on component unmount
          return () => clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching vegetable:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchVegetable();
  }, [id]);

  const handleAddToCart = () => {
    // if (product) {
    //   dispatch(addToCart({ ...product, quantity }));
    // }
  };

  const user = useSelector(state => state.user);

  const handleOrderNow = async () => {
    if (product) {
      try {
        await axios.post(`${process.env.REACT_APP_END_POINT}/orders/vegetable/create`, { vegetableId: product._id, quantity, user: user }).then((res) => {
          console.log(res)
          const orderData = res.data
          dispatch(setOrderPlaced(orderData)); // Update Redux state
          // Show success notification
          setNotification({ status: 'success', text: 'Order Placed successfully!' });

          // Hide notification after 2 seconds
          setTimeout(() => {
            setNotification(null);
            navigate('/'); // Navigate after the notification disappears
          }, 2000);
        }).catch((error) => {
          console.log(error)
        })






      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    }
  };

  // Calculate the remaining time for discount expiry
  const calculateTimeRemaining = (expiryDate) => {
    const currentTime = new Date();
    const expiryTime = new Date(expiryDate);
    const timeDifference = expiryTime - currentTime;

    if (timeDifference > 0) {
      const totalHours = Math.floor(timeDifference / (1000 * 60 * 60));
      const hours = totalHours % 24; // Hours part after converting days into hours
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}:${minutes}:${seconds} `);
    } else {
      setTimeRemaining("Discount expired");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Vegetable not found.</div>;
  }

  return (

    <>
      {/* Notification Box */}
      {notification && <Notification status={notification.status} text={notification.text} />}

      <div className="productDetails">
        <div className="productImage">
          <img src={product.picture} alt={product.name} />
        </div>
        <div className="productInfo">
          <h1 className="productName">{product.name}</h1>
          <p className="productCategory">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="productNutrients">
            <strong>Nutrients:</strong> {product.nutrients || "Nutritional information not available."}
          </p>
          <p className="productLocation">
            <strong>Produced Location:</strong> {product.producedLocation}
          </p>
          <p className="productAvailability">
            <strong>Availability:</strong> {product.isAvailable ? "In Stock" : "Out of Stock"}
          </p>
          <p className="productPrice">
            {product.discountPrice ? (
              <>
                <span className="originalPrice">${product.pricePerKg}</span>{" "}
                <span className="discountedPrice">${product.pricePerKg - product.discountPrice}</span>
              </>
            ) : (
              `$${product.pricePerKg}`
            )}{" "}
            per kg
          </p>
          {product.discountExpiry && (
            <p className="discountExpiry">
              <strong>Discount expires in:</strong> {timeRemaining}
            </p>
          )}
          <label htmlFor="quantity">
            <strong>Quantity (kg):</strong>
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.availableQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button className="orderNow" onClick={handleOrderNow}>
            Order Now
          </button>
        </div>
      </div>
    </>


  );
};

export default VegetableDetail;
