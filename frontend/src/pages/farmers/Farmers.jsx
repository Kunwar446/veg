import React from "react";
import "./Farmers.css";

const farmers = [
  {
    name: "Rajesh Kumar",
    location: "Beldiha, Lahan",
    experience: "10 years",
    photo: "https://t4.ftcdn.net/jpg/06/30/06/81/360_F_630068155_RnZI6mC91wz7gUYFVmhzwpl4O6x00Cbh.jpg",
  },
  {
    name: "Suman Thapa",
    location: "Danda, Nawalpur",
    experience: "8 years",
    photo: "https://img.freepik.com/free-photo/woman-working-rural-farming-agriculture-sector-celebrate-women-working-field-labour-day_23-2151251988.jpg",
  },
  {
    name: "Anil Karki",
    location: "Tandi, Chitwan",
    experience: "12 years",
    photo: "https://t4.ftcdn.net/jpg/07/78/36/51/360_F_778365136_sSuZPMpu62l66K20zBuAmJlakbCKadXW.jpg",
  },
  {
    name: "Meera Sen",
    location: "Danabari, Dharan",
    experience: "5 years",
    photo: "https://img.freepik.com/premium-photo/nepali-village-woman-separating-chaff-from-grain-by-winnowing-process-nepalese-harvesting-paddy_999252-10915.jpg",
  },
];

const Farmers = () => {
  return (
    <div className="farmers-page">
      <h1>Our Farmers</h1>
      <div className="farmers-container">
        {farmers.map((farmer, index) => (
          <div className="farmer-card" key={index}>
            <img
              src={farmer.photo}
              alt={`Photo of ${farmer.name}`}
              className="farmer-photo"
            />
            <div className="farmerInfo">
            <h2>{farmer.name}</h2>
            <p>Location: {farmer.location}</p>
            <p>Experience: {farmer.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmers;
