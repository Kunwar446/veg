import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './OrderAdmin.css';
import { setAllOrders } from '../../../redux/index.js';
import Sidebar from '../../../component/admin/sidebar/Sidebar.jsx';

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;
  const loggedInUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [vegetableOrdersResponse, pesticideOrdersResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_END_POINT}/orders/vegetable/all`),
          axios.get(`${process.env.REACT_APP_END_POINT}/orders/pesticide/all`)
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

  const handleToggleStatus = async (orderId, productType, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Delivered' : 'Pending';
      const endpoint = `${process.env.REACT_APP_END_POINT}/orders/${productType}/user/update-status/${orderId}`;
      await axios.put(endpoint, { status: newStatus });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const calculateTotal = () => {
    return orders.reduce(
      (acc, order) =>
        acc + (order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit) * order.quantity,
      0
    );
  };

  // Logic for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const nextPage = () => {
    if (currentPage * ordersPerPage < orders.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="adminOrder-container">
            <div className="table-container">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order.vegetable?.name || order.pesticide?.name}</td>
                      <td>{order.vegetable ? 'Vegetable' : 'Pesticide'}</td>
                      <td>
                        {order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit}
                      </td>
                      <td>
                        {`${order.quantity} ${order.vegetable?.unit || order.pesticide?.unit || ''}`}
                      </td>
                      <td>
                        {order.vegetable?.pricePerKg * order.quantity ||
                          order.pesticide?.pricePerUnit * order.quantity}
                      </td>
                      <td>
                        <button
                          className={`statusBtn ${order.status}`}
                          onClick={() =>
                            handleToggleStatus(
                              order._id,
                              order.vegetable ? 'vegetable' : 'pesticide',
                              order.status
                            )
                          }
                        >
                          {order.status || 'Pending'}
                        </button>
                      </td>
                    </tr>
                  ))}
                   <div className="orderAdminPagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={nextPage} disabled={currentPage * ordersPerPage >= orders.length}>Next</button>
              </div>
                </tbody>
               
              </table>
              <div className="order-summary">
              <h2>Order Summary</h2>
              <p>Total Amount: Rs.{calculateTotal().toFixed(2)}</p>
              <p>Delivery Status: Processing (Estimated Delivery: Tomorrow)</p>
              <p>Payment Method: Cash on Delivery</p>
            </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderAdmin;
