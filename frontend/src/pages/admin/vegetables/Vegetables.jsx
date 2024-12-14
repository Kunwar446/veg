import React, { useState, useEffect } from "react";
import "./Vegetables.css";
import Sidebar from "../../../component/admin/sidebar/Sidebar.jsx";
import VegetableAddForm from "../../../component/admin/vegetableAddForm/VegetableAddForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import VegetableEditForm from "../../../component/admin/vegetableEditForm/VegetableEditForm.jsx";

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { setDeleteVegetable, setVegetableEdit } from "../../../redux/index.js";
import axios from "axios";
import { Divider } from "@mui/material";



const Vegetables = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editVegetable, setEditVegetable] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const vegetablesPerPage = 6;

  const allVegetables = useSelector((state) => state.vegetables);

  const handleEdit = (veg) => {
    setEditVegetable(veg);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_END_POINT}/vegetable/remove/${id}`);
      dispatch(setDeleteVegetable(id));
      console.log("Vegetable deleted successfully!");
    } catch (error) {
      console.log("Failed to delete vegetable. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditVegetable(null);
  };

  const handleSave = (updatedVegetable) => {
    dispatch(setVegetableEdit(updatedVegetable));
    setEditVegetable(null);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleAdd = (newVegetable) => {
    console.log("Added vegetable:", newVegetable);
    setIsAdding(false);
  };

  const calculateRemainingTime = (expiryDate) => {
    if (!expiryDate) return "--";
    const now = new Date();
    const expiry = new Date(expiryDate);
    const timeDifference = expiry - now;
    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      return `${days}d ${hours}h ${minutes}m`;
    }
    return "Expired";
  };

  const indexOfLastVegetable = currentPage * vegetablesPerPage;
  const indexOfFirstVegetable = indexOfLastVegetable - vegetablesPerPage;
  const currentVegetables = allVegetables?.slice(
    indexOfFirstVegetable,
    indexOfLastVegetable
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(allVegetables.length / vegetablesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="vegetables">
      <Sidebar />
      <div className="content">
        {allVegetables && allVegetables.length > 0 ? (
          <>
            {editVegetable ? (
              <VegetableEditForm
                initialData={editVegetable}
                onSave={handleSave}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                {!isAdding && <div>
                  <table cellPadding="10" cellSpacing="0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price Per Kg</th>
                        <th>Available Quantity</th>
                        <th>Category</th>
                        <th>Produced Location</th>
                        <th>Nutrients</th>
                        <th>Picture</th>
                        <th>Discount</th>
                        <th>Discount Expiry</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentVegetables.map((veg) => (
                        <tr key={veg._id} className="tableRow">
                          <td className="truncate">{veg.name}</td>
                          <td className="truncate">{veg.pricePerKg}</td>
                          <td className="truncate">{veg.availableQuantity}</td>
                          <td className="truncate">{veg.category}</td>
                          <td className="truncate">{veg.producedLocation}</td>
                          <td className="truncate">{veg.nutrients}</td>
                          <td>
                            <img
                              src={veg.picture}
                              alt={veg.name}
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>
                            {veg.discountPrice ? `${veg.discountPrice}` : "--"}
                          </td>
                          <td>{calculateRemainingTime(veg.discountExpiry)}</td>
                          <td style={{ display: "flex", gap: "0px" }}>
                            <button
                              onClick={() => handleEdit(veg)}
                              style={{
                                backgroundColor: "transparent",
                                border: "0",
                              }}
                            >
                              <EditIcon style={{ color: "var(--yellow)" }} />
                            </button>
                            <button
                              onClick={() => handleDelete(veg._id)}
                              style={{
                                backgroundColor: "transparent",
                                border: "0",
                              }}
                            >
                              <DeleteForeverIcon style={{ color: "var(--danger)" }} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="tableControlButton"
                    >
                      <ArrowBackIosIcon />
                    </button>
                    <span className="pageOf">
                      Page {currentPage} of{" "}
                      {Math.ceil(allVegetables.length / vegetablesPerPage)}
                    </span>
                    <button
                      className="tableControlButton"
                      onClick={handleNext}
                      disabled={currentPage === Math.ceil(allVegetables.length / vegetablesPerPage)}
                    >
                      <ArrowForwardIosIcon />
                    </button>
                  </div></div>}


                {/* Add More button */}
                {allVegetables.length > 0 && (
                  <div className="add-more">
                    <button
                      className="add-more-button"
                      onClick={() => setIsAdding(true)}
                    >
                      +
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {!isAdding && <div className="no-vegetables">
              <p>No vegetables added yet.</p>
              <button
                className="add-product-button"
                onClick={() => setIsAdding(true)}
              >
                Add Product
              </button>
            </div>}
          </>
        )}

        {isAdding && !editVegetable && (
          <VegetableAddForm onAdd={handleAdd} onCancel={handleCancelAdd} />
        )}
      </div>
    </div>
  );
};

export default Vegetables;
