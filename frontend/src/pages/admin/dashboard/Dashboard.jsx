import React, { useEffect, useState } from 'react'
import "./Dashboard.css"
import Sidebar from '../../../component/admin/sidebar/Sidebar.jsx'
import { FaShoppingCart, FaLeaf, FaUsers, FaSeedling, FaDollarSign } from "react-icons/fa";

 const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalVegetables, setTotalVegetables] = useState(0);
  const [totalPesticides, setTotalPesticides] = useState(0);
  const [totalFarmers, setTotalFarmers] = useState(0);

  useEffect(() => {
    // // Fetch data from your backend API or database
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/api/dashboard-data');
    //     const data = await response.json();
    //     setTotalSales(data.totalSales);
    //     setTotalOrders(data.totalOrders);
    //     setTotalVegetables(data.totalVegetables);
    //     setTotalPesticides(data.totalPesticides);
    //     setTotalFarmers(data.totalFarmers);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    const dashboardData = {
      totalSales: 10000,
      totalOrders: 500,
      totalVegetables: 200,
      totalPesticides: 100,
      totalFarmers: 50
    };

    // fetchData();
  }, []);

  const metrics = [
    { id: 1, title: "Total Sales", value: "$15,000", icon: <FaDollarSign />, color: "#4caf50" },
    { id: 2, title: "Total Orders", value: "120", icon: <FaShoppingCart />, color: "#2196f3" },
    { id: 3, title: "Total Vegetables", value: "35", icon: <FaLeaf />, color: "#ff9800" },
    { id: 4, title: "Total Pesticides", value: "20", icon: <FaSeedling />, color: "#9c27b0" },
    { id: 5, title: "Total Farmers", value: "50", icon: <FaUsers />, color: "#f44336" },
  ];
  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="content">
      <div className="dashboard-container">
      <div className="metrics-container">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.id} style={{ borderColor: metric.color }}>
            <div className="icon-container" style={{ backgroundColor: metric.color }}>
              {metric.icon}
            </div>
            <div className="metric-info">
              <h2 className="metric-value">{metric.value}</h2>
              <p className="metric-title">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

      </div>
    </div>
  )
}


export default Dashboard