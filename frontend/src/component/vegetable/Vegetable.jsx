import React from 'react';
import './Vegetable.css';
import { useNavigate } from 'react-router-dom';

const Vegetable = ({ data }) => {
 
    const discountedPrice = data.pricePerKg - data.discountPrice;
    const hasDiscount = data.discountPrice > 0; // Check if there is a discount

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/vegetable/${data._id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="image">
                <img src={data.picture} alt="Vegetable" className="card-img" />
            </div>

            <div className="card-info">
                <h3 className="name">{data.name}</h3>
                <div className="prices">
                    {hasDiscount ? (
                        <>
                            <p className="price">
                                <span className="price-value">Per Kg <span className='through'> ${data.pricePerKg}</span></span>
                            </p>
                            <p className="discount-price">
                                <span className="discount-value">${discountedPrice}</span>
                            </p>
                        </>
                    ) : (
                        <p className="price">
                            <span className="price-value">${data.pricePerKg}</span>
                        </p>
                    )}
                </div>
                <p className="quantity">Quantity Available: <span className="quantity-value">{data.availableQuantity} Kg</span></p>
            </div>
        </div>
    );
};

export default Vegetable;
