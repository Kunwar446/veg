import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './PesticideEditForm.css';
import { useDispatch } from "react-redux";
import { setPesticideEdit } from "../../../redux";

const PesticideEditForm = ({ initialData, onSave, onCancel }) => {
  const dispatch=useDispatch();
  const [imagePreview, setImagePreview] = useState(initialData.picture || null);

  // Cloudinary Upload (replace with your image upload logic)
  const uploadImageToCloudinary = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vegetable"); // Replace with your preset name

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
      pricePerUnit: initialData.pricePerUnit || "",
      availableQuantity: initialData.availableQuantity || "",
      targetPests: initialData.targetPests || [], // Array of pest names
      formulation: initialData.formulation || "",
      safetyDataSheet: initialData.safetyDataSheet || "",
      regulatoryInformation: initialData.regulatoryInformation || "",
      picture: initialData.picture || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      pricePerUnit: Yup.number().required("Price per unit is required"),
      availableQuantity: Yup.number().required("Quantity is required"),
      formulation: Yup.string().required("Formulation is required"),
      safetyDataSheet: Yup.string().required("Safety Data Sheet is required"),
      regulatoryInformation: Yup.string().required("Regulatory Information is required"),
      picture: Yup.string().required("Image is required"),
    }),
    onSubmit: async (values) => {
      const updatedPesticide = {
        ...values,
        // Convert target pests array to comma-separated string
        targetPests: values.targetPests.join(", "),
      };

      // Call API to update pesticide in the database
      try {
        await axios.put(`${process.env.REACT_APP_END_POINT}/pesticide/edit/${initialData._id}`, updatedPesticide)
          .then((res) => {
            console.log(res.data);
            const updatedPesticidePayload = res.data;
            alert("Pesticide updated successfully!");
            onSave(updatedPesticidePayload); // Update the parent component
          })
          .catch((error) => {
            console.log("updating error",error);
          });

      } catch (error) {
        console.error("Error updating pesticide:", error);
        alert("Failed to update pesticide. Please try again.");
      }
    },
  });

  return (
    <div className="formWrapper">
      <h2 style={{ margin: "20px 0", textAlign: "center" }}>Edit Pesticide</h2>
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
        </div>

        {/* Row 2 */}
        <div className="row">
          <div>
            <input
              id="pricePerUnit"
              name="pricePerUnit"
              type="number"
              placeholder="Price per Unit"
              onChange={formik.handleChange}
              value={formik.values.pricePerUnit}
            />
            {formik.errors.pricePerUnit && (
              <div className="error">{formik.errors.pricePerUnit}</div>
            )}
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

        {/* Row 3 */}
        <div className="row">
          <div>
            <input
              id="formulation"
              name="formulation"
              type="text"
              placeholder="Formulation"
              onChange={formik.handleChange}
              value={formik.values.formulation}
            />
            {formik.errors.formulation && (
              <div className="error">{formik.errors.formulation}</div>
            )}
          </div>
        </div>

        {/* Row 4 */}
        <div className="row">
          <div>
            <input
              id="safetyDataSheet"
              name="safetyDataSheet"
              type="text"
              placeholder="Safety Data Sheet"
              onChange={formik.handleChange}
              value={formik.values.safetyDataSheet}
            />
            {formik.errors.safetyDataSheet && (
              <div className="error">{formik.errors.safetyDataSheet}</div>
            )}
          </div>
        </div>

        {/* Row 5 */}
        <div className="row">
          <div>
            <textarea
              id="regulatoryInformation"
              name="regulatoryInformation"
              placeholder="Regulatory Information"
              cols={100}
              rows={5}
              onChange={formik.handleChange}
              value={formik.values.regulatoryInformation}
            />
            {formik.errors.regulatoryInformation && (
              <div className="error">{formik.errors.regulatoryInformation}</div>
            )}
          </div>
        </div>

        {/* Row 6 (Target Pests) */}
        <div className="row">
          <div>
            <label htmlFor="targetPests">Target Pests:</label>
            <textarea
              id="targetPests"
              name="targetPests"
              rows={5}
              cols={100}
              placeholder="Enter target pests, separated by commas"
              onChange={(e) => {
                formik.setFieldValue("targetPests", e.target.value.split(","));
              }}
              value={formik.values.targetPests.join(", ")}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="row">
        <label for="picture" className="pesticidePictureLabel">Pick a Picture</label>
          <input
            id="picture"
            name="picture"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="pesticidePicture"
          />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" style={{ width: "20px", height: "auto" }} />
              <label htmlFor="picture">Change Picture</label>
            </div>
          )}

          {formik.errors.picture && <div className="error">{formik.errors.picture}</div>}
        </div>

        {/* Submit and Cancel */}
        <div className="row">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel} style={{ backgroundColor: "var(--danger)" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PesticideEditForm;