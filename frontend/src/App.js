import React, { useState } from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Login from "./pages/login/Login.jsx";
// import PostJob from "./pages/admin/postJob/PostJob.jsx";
// import Jobs from "./pages/admin/jobs/Jobs.jsx";
import { useSelector } from "react-redux";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import Farmers from "./pages/admin/farmers/Farmers.jsx";
import Pesticides from "./pages/admin/pesticides/Pesticides.jsx";
import Vegetables from "./pages/admin/vegetables/Vegetables.jsx";
import VegetableDetail from "./pages/vegetableDetail/VegetableDetail.jsx";
import Orders from "./pages/orders/Orders.jsx";

import Notification from "./component/notification/Notification.jsx";
import PesticideDetail from "./pages/pesticideDetail/PesticideDetail.jsx";
import AdminOrder from "./pages/admin/orderAdmin/OrderAdmin.jsx";




const App=()=>{

  const [notification, setNotification] = useState(null);

  const showNotification = (status, text) => {
    setNotification({ status, text });
  };

  const handleNotificationClose = () => {
    setNotification(null); // Clear notification
  };

  
  
  return(
    <>

     {/* Notification Box */}
     {notification && (
        <Notification
          status={notification.status}
          text={notification.text}
          onClose={handleNotificationClose}
        />
      )}


    {/* Notification Box */}
    {notification && <Notification status={notification.status} text={notification.text} />}
      <BrowserRouter>
      
        <Routes>
        <Route exact path="/register" element={<Register showNotification={showNotification} />} />
        <Route  path="/login" element={<Login showNotification={showNotification} />} />
          {/* admin mode */}
          {/* <Route exact path="/postjob" element={<PostJob/>}/> */}
          {/* <Route exact path="/admin/jobs" element={<Jobs/>}/> */}
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/dashboard" element ={<Dashboard/>}/>
          <Route exact path="/admin/farmers" element ={<Farmers/>}/>
          <Route exact path="/admin/pesticides" element ={<Pesticides/>}/>
          <Route exact path="/admin/vegetables" element ={<Vegetables/>}/>
          <Route exact path="/admin/orders" element={<AdminOrder/>}/>
          <Route path="/vegetable/:id" element={<VegetableDetail />} />
          <Route path="/pesticide/:id" element={<PesticideDetail />} />
          <Route path="/orders/user" element={<Orders/>}/>
        

          

          
          
          
        </Routes>
      </BrowserRouter>
    </>
  )
};


export default  App;