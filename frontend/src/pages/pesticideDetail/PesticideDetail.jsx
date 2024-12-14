import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setOrderPlaced } from "../../redux/index.js"; // Assuming this action updates order state
import "./PesticideDetail.css";
import Notification from "../../component/notification/Notification.jsx";
import axios from "axios";
// import Pesticide from "../../models/Pesticide.js"; // Assuming Pesticide model is in models folder

const PesticideDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pesticide, setPesticide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // State for selected quantity
    const [notification, setNotification] = useState(null); // State for notification

    useEffect(() => {
        const fetchPesticide = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/pesticide/${id}`); // Replace with your API endpoint
                const data = response.data;
                setPesticide(data);
            } catch (error) {
                console.error("Error fetching pesticide:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPesticide();
    }, [id]);

    const handleAddToCart = () => {
        // Implement logic to add to cart, likely using Redux actions
        // if (pesticide) {
        //   dispatch(addToCart({ ...pesticide, quantity }));
        // }
    };

    const user = useSelector(state => state.user);

    const handleOrderNow = async () => {
        if (pesticide) {
            try {
                await axios.post(`${process.env.REACT_APP_END_POINT}/orders/pesticide/create`, { pesticideId: pesticide._id, quantity, user: user })
                    .then((res) => {
                        console.log(res);
                        const orderData = res.data;
                        dispatch(setOrderPlaced(orderData)); // Update Redux state
                        // Show success notification
                        setNotification({ status: 'success', text: 'Order Placed successfully!' });

                        // Hide notification after 2 seconds
                        setTimeout(() => {
                            setNotification(null);
                            navigate('/'); // Navigate after the notification disappears
                        }, 2000);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error("Error placing order:", error);
                alert("Failed to place order. Please try again.");
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pesticide) {
        return <div>Pesticide not found.</div>;
    }

    return (
        <>
            {notification && <Notification status={notification.status} text={notification.text} />}

            <div className="productDetails">
                <div className="productImage">
                    <img src={pesticide.picture} alt={pesticide.name} />
                </div>
                <div className="productInfo">
                    <h1 className="productName">{pesticide.name}</h1>
                    <p className="productDescription">
                        {/* Add a description field to your model if needed */}
                    </p>
                    <p className="productFormulation">
                        <strong>Formulation:</strong> {pesticide.formulation}
                    </p>
                    <p className="productTargetPests">
                        <strong>Target Pests:</strong> {pesticide.targetPests.join(", ")}
                    </p>
                    <p className="productAvailability">
                        <strong>Availability:</strong> {pesticide.availableQuantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                    <p className="productPrice">
                        ${pesticide.pricePerUnit} per Unit
                    </p>
                    <label htmlFor="quantity">
                        <strong>Quantity (Units):</strong>
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={pesticide.availableQuantity}
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

export default PesticideDetail;