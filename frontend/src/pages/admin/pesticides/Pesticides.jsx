import React, { useState, useEffect } from "react";
import "./Pesticides.css";
import Sidebar from "../../../component/admin/sidebar/Sidebar.jsx";
import PesticideAddForm from "../../../component/admin/pesticideAddForm/PesticideAddForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import PesticideEditForm from "../../../component/admin/pesticideEditForm/PesticideEditForm.jsx";

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { setDeletePesticide, setEditPesticide, setPesticideEdit } from "../../../redux/index.js";
import axios from "axios";
import { Divider } from "@mui/material";

const Pesticides = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editPesticide, setEditPesticide] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pesticidesPerPage = 6;

  const allPesticides = useSelector((state) => state.pesticides);

  const handleEdit = (pesticide) => {
    setEditPesticide(pesticide);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_END_POINT}/pesticide/remove/${id}`);
      dispatch(setDeletePesticide(id));
      console.log("Pesticide deleted successfully!");
    } catch (error) {
      console.log("Failed to delete pesticide. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditPesticide(null);
  };

  const handleSave = (updatedPesticide) => {
    console.log(updatedPesticide)
    dispatch(setPesticideEdit(updatedPesticide));
    
    setEditPesticide(null);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleAdd = (newPesticide) => {
    console.log("Added pesticide:", newPesticide);
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

  const indexOfLastPesticide = currentPage * pesticidesPerPage;
  const indexOfFirstPesticide = indexOfLastPesticide - pesticidesPerPage;
  const currentPesticides = allPesticides?.slice(
    indexOfFirstPesticide,
    indexOfLastPesticide
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(allPesticides.length / pesticidesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pesticides">
      <Sidebar />
      <div className="content">
        {allPesticides && allPesticides.length > 0 ? (
          <>
            {editPesticide ? (
              <PesticideEditForm
                initialData={editPesticide}
                onSave={handleSave}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                {!isAdding && (
                  <div>
                    <table cellPadding="10" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Price Per Unit</th>
                          <th>Available Quantity</th>
                          <th>Target Pests</th>
                          <th>Formulation</th>
                          <th>Safety Data Sheet</th>
                          <th>Regulatory Information</th>

                          <th>Photo</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPesticides.map((pesticide) => (
                          <tr key={pesticide._id} className="tableRow">
                            <td className="truncate">{pesticide.name}</td>
                            <td className="truncate">{pesticide.pricePerUnit}</td>
                            <td className="truncate">{pesticide.availableQuantity}</td>
                            <td className="truncate">{pesticide.targetPests.join(', ')}</td>
                            <td className="truncate">{pesticide.formulation}</td>
                            <td className="truncate">{pesticide.safetyDataSheet}</td>
                            <td className="truncate">{pesticide.regulatoryInformation}</td>
                            <td>
                            <img
                              src={pesticide.picture}
                              alt={pesticide.name}
                              width="50"
                              height="50"
                            />
                          </td>
                            <td style={{ display: "flex", gap: "0px" }}>
                              <button
                                onClick={() => handleEdit(pesticide)}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "0",
                                }}
                              >
                                <EditIcon style={{ color: "var(--yellow)" }} />
                              </button>
                              <button
                                onClick={() => handleDelete(pesticide._id)}
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
                        {Math.ceil(allPesticides.length / pesticidesPerPage)}
                      </span>
                      <button
                        className="tableControlButton"
                        onClick={handleNext}
                        disabled={currentPage === Math.ceil(allPesticides.length / pesticidesPerPage)}
                      >
                        <ArrowForwardIosIcon />
                      </button>
                    </div>
                  </div>
                )}

                {/* Add More button */}
                {allPesticides.length > 0 && (
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
            {!isAdding && (
              <div className="no-pesticides">
                <p>No pesticides added yet.</p>
                <button
                  className="add-product-button"
                  onClick={() => setIsAdding(true)}
                >
                  Add Product
                </button>
              </div>
            )}
          </>
        )}

        {isAdding && !editPesticide && (
          <PesticideAddForm onAdd={handleAdd} onCancel={handleCancelAdd} />
        )}
      </div>
    </div>
  );
};

export default Pesticides;