import React from 'react';
import './Pesticide.css';
import { useNavigate } from 'react-router-dom';

const Pesticide = ({ data }) => {
 
    const discountedPrice = data.pricePerKg - data.discountPrice;
    const hasDiscount = data.discountPrice > 0; // Check if there is a discount

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/pesticide/${data._id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="image">
                <img src={data.picture} alt="Pesticide" className="card-img" />
            </div>

            <div className="card-info">
                <h3 className="name">{data.name}</h3>
                <div className="prices">
                  
                        <p className="price">
                            <span className="price-value">Rs.{data.pricePerUnit}</span>
                        </p>
                    
                </div>
                <p className="quantity">Quantity Available: <span className="quantity-value">{data.availableQuantity} Unit</span></p>
            </div>
        </div>
    );
};

export default Pesticide;
