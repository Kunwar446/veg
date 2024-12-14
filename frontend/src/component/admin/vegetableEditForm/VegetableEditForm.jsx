import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './VegetableEditForm.css';

const VegetableEditForm = ({ initialData, onSave, onCancel }) => {
    const [imagePreview, setImagePreview] = useState(initialData.picture || null);

    // Cloudinary Upload
    const uploadImageToCloudinary = useCallback(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "vegetable");
  
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dancvkguq/image/upload",
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
      }
    }, []);
  
    // Handle image file change
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
  
        try {
          const imageUrl = await uploadImageToCloudinary(file);
          formik.setFieldValue("picture", imageUrl);
        } catch (error) {
          alert("Failed to upload image. Please try again.");
        }
      }
    };
  
    // Formik setup
    const formik = useFormik({
      initialValues: {
        name: initialData.name || "",
        pricePerKg: initialData.pricePerKg || "",
        availableQuantity: initialData.availableQuantity || "",
        nutrients: initialData.nutrients || "",
        category: initialData.category || "vegetable",
        producedLocation: initialData.producedLocation || "",
        picture: initialData.picture || "",
        discountPrice: initialData.discountPrice || "",
        discountExpiry: initialData.discountExpiry
          ? new Date(initialData.discountExpiry).toISOString().split("T")[0]
          : "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
        pricePerKg: Yup.number().required("Price per kg is required"),
        availableQuantity: Yup.number().required("Quantity is required"),
        producedLocation: Yup.string().required("Location is required"),
        picture: Yup.string().required("Image is required"),
        category: Yup.string()
          .required("Category is required")
          .oneOf(["vegetable", "pesticide"], "Invalid category"),
        discountPrice: Yup.number().nullable(),
        discountExpiry: Yup.date().nullable(),
      }),
      onSubmit: async (values) => {
        const updatedVegetable = {
          ...values,
          discountPrice: values.discountPrice || null,
          discountExpiry: values.discountExpiry
            ? new Date(values.discountExpiry).toISOString()
            : null,
        };
  
        // Call API to update vegetable in the database
        try {
          await axios.put(`${process.env.REACT_APP_END_POINT}/vegetable/edit/${initialData._id}`, updatedVegetable).then((res,error)=>{
            console.log(res.data)
            const updatedVegetablePayload=res.data.vegetable;
            alert("Vegetable updated successfully!");
          onSave(updatedVegetablePayload);  // Update the parent component
          }).catch((error)=>{
            console.log("updating error")
          });  // Use your actual API endpoint here
          
        } catch (error) {
          console.error("Error updating vegetable:", error);
          alert("Failed to update vegetable. Please try again.");
        }
      },
    });
  
  
  return (
    <div className="formWrapper">
      <h2 style={{"margin":"20px 0", "textAlign":"center"}}>Edit Vegetable</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Row 1 */}
        <div className="row">
          <div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && <div className="error">{formik.errors.name}</div>}
          </div>
          <div>
            <select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
                <option value="">--Select Category--</option>
              <option value="vegetable">Vegetable</option>
              <option value="pesticide">Pesticide</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div>
            <input
              id="pricePerKg"
              name="pricePerKg"
              type="number"
              placeholder="Price per kg"
              onChange={formik.handleChange}
              value={formik.values.pricePerKg}
            />
            {formik.errors.pricePerKg && <div className="error">{formik.errors.pricePerKg}</div>}
          </div>
          <div>
            <input
              id="availableQuantity"
              name="availableQuantity"
              type="number"
              placeholder="Available Quantity(KG)"
              onChange={formik.handleChange}
              value={formik.values.availableQuantity}
            />
            {formik.errors.availableQuantity && (
              <div className="error">{formik.errors.availableQuantity}</div>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="row">
          <div>
            <input
              id="producedLocation"
              name="producedLocation"
              type="text"
              placeholder="Produced Location"
              onChange={formik.handleChange}
              value={formik.values.producedLocation}
            />
            {formik.errors.producedLocation && (
              <div className="error">{formik.errors.producedLocation}</div>
            )}
          </div>
          <div>
            <input
              id="discountPrice"
              name="discountPrice"
              type="number"
              placeholder="Discount Price"
              onChange={formik.handleChange}
              value={formik.values.discountPrice}
            />
          </div>
        </div>

        {/* Discount Expiry */}
        <div className="row">
          <input
            id="discountExpiry"
            name="discountExpiry"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.discountExpiry}
          />
        </div>

        {/* Image Upload */}
        <div className="row">
          
          <input
            id="picture"
            name="picture"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "auto" }} />
              <label htmlFor="picture">Change Picture</label>
            </div>
          )}
          
          {formik.errors.picture && <div className="error">{formik.errors.picture}</div>}
        </div>

        {/* Submit and Cancel */}
        <div className="row">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel} style={{"backgroundColor":"var(--danger)"}}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VegetableEditForm;
