import React, { useState } from "react";
import axios from "axios";
import { environment } from "../../../environments/environment";
import "./UpdateCommunityForm.scss";
import { getBase64 } from "../../../utils/getBase64";
import { toast, ToastContainer } from 'react-toastify';


const UpdateCommunityForm = ({ community }) => {
  const [formData, setFormData] = useState({
    name: community.name || "",
    image: community.image || "",
    size: community.size || "",
    subscription: community.subscription || "",
    members: community.members || [],
    amount: community.amount || "",
    isOpen: community.isOpen || false,
    about: community.about || "",
  });

  const token = localStorage.getItem("accessToken");

  const communitySizeOptions = [
    "Less than 100k",
    "100k-200k",
    "200k-500k",
    "500k+"
  ];

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);
    // Convert image to base64 if it's a file
    if (formData.image instanceof File) {
      const imageBase64 = await getBase64(formData.image);
      formData.image = imageBase64;
    }
    try {
      const response = await axios.patch(
        `${environment.baseUrl}/Communities/updateCommunity/${community._id}`,
        formData,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Community updated successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("Error updating community: " + (error.response?.data?.message || 'Unknown error'));
      console.error("Error updating community:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="update-community-form">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <h2>Update Community Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Community Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter community name"
          />
        </div>

        <div className="form-group">
          <label>Community Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label>Community Size</label>
          <select 
            name="size" 
            value={formData.size}
            onChange={handleChange}
          >
            <option value="">Select community size</option>
            {communitySizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Subscription Type</label>
          <select 
            name="subscription" 
            value={formData.subscription}
            onChange={handleChange}
          >
            <option value="">Select subscription type</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {formData.subscription === 'paid' && (
          <div className="form-group">
            <label>Subscription Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>
        )}

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isOpen"
              checked={formData.isOpen}
              onChange={handleChange}
            />
            Is Community Open?
          </label>
        </div>

        <div className="form-group">
          <label>About Community</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Enter community description"
            rows="4"
          />
        </div>

        <button type="submit" >{isLoading ? ("Updating...") : ( "Update Community")}</button>
      </form>
    </div>
  );
};

export default UpdateCommunityForm; 