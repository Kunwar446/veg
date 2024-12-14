import React from 'react';
import "./Sidebar.css"
import profileimg from "../../../images/profileimg.jpg"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import vegy from "../../../images/vegy.png"
import { NavLink } from 'react-router-dom';
import GrassIcon from '@mui/icons-material/Grass';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PestControlIcon from '@mui/icons-material/PestControl';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="infoSection">
                    {/* <img src={vegy} className='sidebarImg' alt="" /> */}
                    <h1>vegy</h1>

                </div>
                <div className="navSection">
                <NavLink activeClassName="active" to="/dashboard"> <div className='icon'><DashboardIcon/></div><div>Dashboard</div></NavLink>
                <NavLink activeClassName="active" to="/admin/vegetables"> <div className='icon'><GrassIcon/></div><div>Vegetables</div></NavLink>
                <NavLink activeClassName="active" to="/admin/pesticides"><div className='icon'><PestControlIcon/></div><div>pesticides</div></NavLink>
                <NavLink activeClassName="active" to="/admin/orders"><div className='icon'><InventoryIcon/></div><div>Orders</div></NavLink>
                <NavLink activeClassName="active" to="/"><div className='icon'><KeyboardReturnIcon/></div><div>Home</div></NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar