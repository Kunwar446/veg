import React, { useEffect, useState } from 'react'
import "./Navbar.css";
import WidgetsIcon from '@mui/icons-material/Widgets';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { setLogout,setLogin } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"

const Navbar = () => {
  const [menuList, setmenuList] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout
  const hanldeLogout = async (e) => {
    e.preventDefault();
    console.log("logout")
    await axios.get(`${process.env.REACT_APP_END_POINT}/auth/logout`, { withCredentials: true }).then(() => {
      dispatch(setLogout());
      navigate("/login")
    })
  }

  // login
  const handleLogin=()=>{
    navigate("/login")
  }

  // getting loggedin user daa from storage
  const userRole = useSelector(state => state.user?.role);
  
  const isLoggedIn=useSelector(state=>state.isLoggedIn);
  
  
  // const [theme,setTheme]=useState({
  //   c1:"red",
  //   c2:"green",
  //   c3:"blue"
  // });

  const changeTheme = (bgTheme, cardTheme) => {
    document.documentElement.style.setProperty("--bg1", bgTheme)
    document.documentElement.style.setProperty("--cardColor", cardTheme)
  }


  return (
    <div className="navbar">
      <h1 className="logo">vegy
        {/* <span>
          <button onClick={() => changeTheme("#28544B", "#38645b")} className='c1'></button>
          <button onClick={() => changeTheme("#153448", "#3C5B6F")} className='c2'></button>
          <button onClick={() => changeTheme("#212121", "#1a1a1a")} className='c3'></button>
        </span> */}
      </h1>
      <div className="menu">
        <div className="user menuLogo" ><AccountCircleIcon /></div>
        <div className="menuBtn menuLogo" ><WidgetsIcon onClick={() => { setmenuList(!menuList) }} />
          {menuList && <div className='menuList'>

            <NavLink activeClassName="active" to="/">Home</NavLink>
            {userRole=="Seller" && <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>}

            {isLoggedIn && <NavLink activeClassName="active" to="/orders/user">Orders</NavLink>}
            <NavLink activeClassName="active" to="/reviews">Reviews</NavLink>
            <NavLink activeClassName="active" to="/contact">Contact</NavLink>
            
            
            
            
            {userRole === "seller" ? <><NavLink activeClassName="active" to="/postjob">Add vegetable</NavLink>
              <NavLink activeClassName="active" to="/admin/jobs">All Job</NavLink>
              <NavLink activeClassName="active" to="/applications">Applications</NavLink></> : ""}

           {isLoggedIn?<a href="" onClick={hanldeLogout}>Logout</a>:<><a href="" onClick={handleLogin}>Login</a></>}


          </div>}
        </div>
        <div className="cart menuLogo"><ShoppingCartIcon /></div>
      </div>
    </div>

  )
}

export default Navbar