import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Orders.css';
import { setAllOrders } from '../../redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // Track the current page
  const [loading, setLoading] = useState(true);
  const loggedInUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const itemsPerPage = 6;  // Number of products to display per page

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [vegetableOrdersResponse, pesticideOrdersResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_END_POINT}/orders/vegetable/user/${loggedInUser._id}`),
          axios.get(`${process.env.REACT_APP_END_POINT}/orders/pesticide/user/${loggedInUser._id}`)
        ]);

        const allOrders = [...vegetableOrdersResponse.data, ...pesticideOrdersResponse.data];
        dispatch(setAllOrders(allOrders));
        setOrders(allOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [loggedInUser, dispatch]);

  // Paginate orders based on the current page
  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < orders.length) setCurrentPage(currentPage + 1);
  };

  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + (order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit) * order.quantity, 0);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="order-container">
      {/* <h1>My Orders</h1> */}
      <div className="orders-table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{order.vegetable?.name || order.pesticide?.name}</td>
                <td>{order.vegetable ? 'Vegetable' : 'Pesticide'}</td>
                <td>{order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit}</td>
                <td>{`${order.quantity} ${order.vegetable?.unit || order.pesticide?.unit || ''}`}</td>
                <td>{order.vegetable?.pricePerKg * order.quantity || order.pesticide?.pricePerUnit * order.quantity}</td>
                <td className='tdBtn'>
                  <button className="editBtn">Edit</button>
                  <button className="deleteBtn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="orderPagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={handleNextPage} disabled={currentPage * itemsPerPage >= orders.length}>Next</button>
        </div>
      </div>

      {/* Order Summary on the right */}
      <div className="orderSummary">
        <h2>Order Summary</h2>
        <p>Total Amount: Rs. {calculateTotal().toFixed(2)}</p>
        <p>Delivery Status: Processing (Estimated Delivery: Tomorrow)</p>
        <p>Payment Method: Cash on Delivery</p>
      </div>
    </div>
  );
};

export default Orders;
