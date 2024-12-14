import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PestControlOutlinedIcon from '@mui/icons-material/PestControlOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';

export const packageCardData=[
    {
        packageName: "Beach Paradise",
        description: "Enjoy a week of sun, sand, and sea in the world's most beautiful beaches.",
        packageImage: "https://images.unsplash.com/photo-1465778893808-9b3d1b443be4?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        packageName: "Mountain Adventure",
        description: "Explore the majestic mountains and experience thrilling outdoor activities.",
        packageImage: "https://images.unsplash.com/photo-1617018681623-987895ca1c99?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        packageName: "City Explorer",
        description: "Discover the cultural and historical gems of the world's greatest cities.",
        packageImage: "https://images.unsplash.com/photo-1541300613939-71366b37c92e?q=80&w=2105&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        packageName: "Wildlife Safari",
        description: "Get up close and personal with exotic wildlife on a guided safari adventure.",
        packageImage: "https://images.unsplash.com/photo-1468549940493-46152524296c?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
]

export const menuStructure = [
    {
      id: 1,
      label: 'Dashboard',
      subLabel: 'View overview of your site',
      icon:<MdDashboard/>
    },
    {
      id: 2,
      label: 'Users',
      subLabel: 'Manage users',
      icon:<FaUser/>,
      subMenu: [
        { id: 21, label: 'Add User', subLabel: 'Create a new user' },
        { id: 22, label: 'Edit Users', subLabel: 'Modify existing users' }
      ]
    }
  ];
  
  export const steps = [
    { step: 1, description: "Enjoy fresh vegetables with hot offers.", icon:<LocalOfferOutlinedIcon style={{"fontSize":"40px"}}/> },
    { step: 2, description: "Browse and add groceries to your cart from a wide selection." , icon:<Diversity2OutlinedIcon style={{"fontSize":"40px"}}/>},
    { step: 3, description: "Free home delivery service on festivals." , icon:<DeliveryDiningOutlinedIcon style={{"fontSize":"40px"}}/>},
    { step: 4, description: "Effective, Affordable, Reliable – Your Trusted Pesticide Solution" ,icon:<PestControlOutlinedIcon style={{"fontSize":"40px"}}/>}
  ];
  
export  const benefits = [
    { title: "Fast Delivery", description: "Enjoy quick delivery within 35 minutes." },
    { title: "Quality", description: "Fresh products with daily sourcing and quality checks." },
    { title: "Best Prices", description: "Best prices, cheaper than local stores." },
    { title: "24/7 Support", description: "Our team is ready to assist you anytime." }
  ];
  