import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { environment } from "../../../environments/environment";
import "./UpdateCommunityForm.scss";
import { getBase64 } from "../../../utils/getBase64";
import { toast, ToastContainer } from 'react-toastify';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { sendOTP, verifyOTP } from "../../../Service/user";


const UpdateCommunityForm = ({ community }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: community.name || "",
    image: community.image || "",
    size: community.size || "",
    subscription: community.subscription || "",
    members: community.members || [],
    amount: community.amount || "",
    isOpen: community.isOpen || false,
    about: community.about || "",
    terms_and_conditions: community.terms_and_conditions || [""]
  });


  const token = localStorage.getItem("accessToken");

  const communitySizeOptions = [
    "Less than 100k",
    "100k-200k",
    "200k-500k",
    "500k+"
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletionReason, setDeletionReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

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

  const handleTermChange = (index, value) => {
    const newTerms = [...formData.terms_and_conditions];
    newTerms[index] = value;
    setFormData({ ...formData, terms_and_conditions: newTerms });
  };

  const addNewTerm = () => {
    setFormData({
      ...formData,
      terms_and_conditions: [...formData.terms_and_conditions, ""]
    });
  };

  const removeTerm = (index) => {
    const newTerms = formData.terms_and_conditions.filter((_, i) => i !== index);
    setFormData({ ...formData, terms_and_conditions: newTerms });
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    
    try {
      // Send OTP using the same service as Login page
      const response = await sendOTP(community.adminId.phoneNumber);

      if (response?.orderId) {
        setOrderId(response.orderId);
        setOtpDialogOpen(true);
        toast.info('Please enter the OTP sent to your phone');
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send OTP');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsVerifyingOtp(true);
    try {
      const verifyResponse = await verifyOTP({
        otp: otp,
        orderId: orderId,
        phoneNumber: community.adminId.phoneNumber
      });

      if (verifyResponse.isOTPVerified) {
        // If OTP is verified, proceed with community deletion
        const deleteResponse = await axios.delete(
          `${environment.baseUrl}/communities/softDelete/${community._id}`,
          {
            data: { reason: deletionReason },
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (deleteResponse.data.status === 200) {
          toast.success('Community deleted successfully');
          navigate('/ExploreCommunities');
        }
      } else {
        toast.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Invalid OTP or error occurred');
    } finally {
      setIsVerifyingOtp(false);
      setOtpDialogOpen(false);
      setOtp('');
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

        <div className="form-group">
          <label>Terms and Conditions</label>
          {formData.terms_and_conditions.map((term, index) => (
            <div key={index} className="term-input-group">
              <input
                type="text"
                value={term}
                onChange={(e) => handleTermChange(index, e.target.value)}
                placeholder={`Term ${index + 1}`}
              />
              {formData.terms_and_conditions.length > 1 && (
                <button 
                  type="button" 
                  className="remove-term"
                  onClick={() => removeTerm(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            className="add-term"
            onClick={addNewTerm}
          >
            Add Term
          </button>
        </div>

        <button type="submit" >{isLoading ? ("Updating...") : ( "Update Community")}</button>
      </form>

      <button 
        className="delete-button"
        onClick={() => setDeleteDialogOpen(true)}
      >
        Delete Community
      </button>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Community</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this community? This action cannot be undone.</p>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for deletion"
            value={deletionReason}
            onChange={(e) => setDeletionReason(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <p>Please enter the OTP sent to your phone number</p>
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleOtpSubmit}
            color="primary"
            variant="contained"
            disabled={isVerifyingOtp}
          >
            {isVerifyingOtp ? 'Verifying...' : 'Verify & Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateCommunityForm; 