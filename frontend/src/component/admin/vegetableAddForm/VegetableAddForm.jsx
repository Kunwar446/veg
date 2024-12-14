import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPostVegetable } from '../../../redux';
import './VegetableAddForm.css';

const VegetableAddForm = ({form, formFun , onAdd,onCancel }) => {

  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vegetable');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dancvkguq/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }, []);

  // Handle file input and image preview
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      try {
        const imageUrl = await uploadImageToCloudinary(file);
        formik.setFieldValue('picture', imageUrl);
      } catch (error) {
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      pricePerKg: '',
      availableQuantity: '',
      nutrients: '',
      category: '',
      producedLocation: '',
      picture: '',
      discountPrice: '',
      discountExpiry: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      pricePerKg: Yup.number().required('Price per kg is required'),
      availableQuantity: Yup.number().required('Quantity is required'),
      producedLocation: Yup.string().required('Location is required'),
      picture: Yup.string().required('Image is required'),
      category: Yup.string()
        .required('Category is required')
        .oneOf(['vegetable', 'pesticide'], 'Invalid category'),
      discountPrice: Yup.number().nullable(),
      discountExpiry: Yup.date().nullable(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_END_POINT}/vegetable/create`, values);
      
        if (data) {
          // Assuming the server sends a success property
          dispatch(setPostVegetable(data));
          
          // Close form and reset
          onAdd(false);
          setSuccessMessage('Vegetable added successfully!');
          setImagePreview(null); // Reset image preview
          resetForm();
      
          // Clear success message after 3 seconds
          setTimeout(() => setSuccessMessage(null), 3000);
        } else {
          // Handle unexpected server response
          console.error('Unexpected server response:', data.success);
          alert('Failed to add vegetable. Please try again.');
        }
      } catch (error) {
        console.log('Error adding vegetable:', error.response || error.message || error);
        alert('Failed to add vegetable. Please try again.');
      }
    }      
  });

  return (
    <div className="formWrapper">
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="form-container">
        <h1 style={{"textAlign":"center" }}>Add Product</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and Category Fields */}
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
                <option>--Select Category--</option>
                <option value="vegetable">Vegetable</option>
                <option value="pesticide">Pesticide</option>
              </select>
              {formik.errors.category && <div className="error">{formik.errors.category}</div>}
            </div>
          </div>

          {/* Price per Kg and Available Quantity Fields */}
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
                placeholder="Available Quantity"
                onChange={formik.handleChange}
                value={formik.values.availableQuantity}
              />
              {formik.errors.availableQuantity && (
                <div className="error">{formik.errors.availableQuantity}</div>
              )}
            </div>
          </div>

          {/* Nutrients and Produced Location Fields */}
          <div className="row">
            <div>
              <input
                id="nutrients"
                name="nutrients"
                type="text"
                placeholder="Nutrients"
                onChange={formik.handleChange}
                value={formik.values.nutrients}
              />
            </div>
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
          </div>

          {/* Image Upload */}
          <div className="row">
            <div>
              <label htmlFor="picture">Upload Picture</label>
              <input
                id="picture"
                name="picture"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {formik.errors.picture && <div className="error">{formik.errors.picture}</div>}
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Selected" style={{ width: '100px', height: 'auto' }} />
            </div>
          )}

          {/* Discount Price and Discount Expiry Fields */}
          <div className="row">
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
            <div>
              <input
                id="discountExpiry"
                name="discountExpiry"
                type="date"
                placeholder="Discount Expiry Date"
                onChange={formik.handleChange}
                value={formik.values.discountExpiry}
              />
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="row">
            <div>
              <button type="submit">Add Vegetable</button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onCancel(false)} // Close the form
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VegetableAddForm;
