import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './Orders.css';
import { setAllOrders, setDeleteOrder, setUpdateOrder } from '../../redux';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const loggedInUser = useSelector(state => state.user);
  const dispatch = useDispatch();

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

  const handleUpdateQuantity = async (orderId, newQuantity, productType) => {
    try {
      const endpoint = `${process.env.REACT_APP_END_POINT}/orders/${productType}/user/update/${orderId}`;
      const response = await axios.put(endpoint, { quantity: newQuantity });

      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? {...order, quantity: newQuantity, totalPrice: response.data.totalPrice} : order
        )
      );
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDeleteOrder = async (orderId, productType) => {
    try {
      const endpoint = `${process.env.REACT_APP_END_POINT}/orders/${productType}/user/remove/${orderId}`;
      await axios.delete(endpoint);

      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + (order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit) * order.quantity, 0);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="order-container">
      <h1>My Orders</h1>
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
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.vegetable?.name || order.pesticide?.name}</td>
              <td>{order.vegetable ? 'Vegetable' : 'Pesticide'}</td>
              <td>
                {order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit}
              </td>
              <td>
                {editingOrder === order._id ? (
                  <input
                    type="number"
                    min="1"
                    value={order.quantity}
                    onChange={(e) => {
                      setOrders(prevOrders => 
                        prevOrders.map(o => 
                          o._id === order._id ? {...o, quantity: Number(e.target.value), totalPrice: (order.vegetable?.pricePerKg || order.pesticide?.pricePerUnit) * Number(e.target.value)} : o
                        )
                      );
                    }}
                  />
                ) : (
                  `${order.quantity} ${order.vegetable?.unit || order.pesticide?.unit || ''}`
                )}
              </td>
              <td>
                {order.vegetable?.pricePerKg * order.quantity || order.pesticide?.pricePerUnit * order.quantity}
              </td>
              <td className='btnTd'>
                {editingOrder === order._id ? (
                  <button
                    onClick={() => handleUpdateQuantity(order._id, order.quantity, order.vegetable ? 'vegetable' : 'pesticide')}
                  >
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditingOrder(order._id)} className='editBtn'>
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteOrder(order._id, order.vegetable ? 'vegetable' : 'pesticide')} className='deleteBtn'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Total Amount: ${calculateTotal().toFixed(2)}</p>
        <p>Delivery Status: Processing (Estimated Delivery: Tomorrow)</p>
        <p>Payment Method: Cash on Delivery</p>
      </div>
    </div>
  );
};

export default Orders;