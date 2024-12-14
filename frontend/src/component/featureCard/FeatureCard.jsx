import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeatureCard.css";

const FeatureCard = ({ featureData }) => {
 

  return (
    <div className="featureCard">
      <div className="featureLeft">
        <h1 className="number">{featureData.step}</h1>
        <h1 className="featureTitle">
          {featureData.title && <h1>{featureData.title}</h1>}
        </h1>
        <h3>{featureData.description}</h3>
      </div>
      <div className="featureLogo">{featureData.icon}</div>
    </div>
  );
};

export default FeatureCard;
