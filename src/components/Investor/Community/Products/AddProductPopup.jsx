import React, { useState } from 'react';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { getBase64 } from '../../../../utils/getBase64';
import { toast } from 'react-toastify';
import './AddProductPopup.scss';

const AddProductPopup = ({ communityId, onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_free: true,
    amount: '',
    image: null,
    URLS: ['']
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...formData.URLS];
    newUrls[index] = value;
    setFormData(prev => ({ ...prev, URLS: newUrls }));
  };

  const addUrlField = () => {
    setFormData(prev => ({ ...prev, URLS: [...prev.URLS, ''] }));
  };

  const removeUrlField = (index) => {
    setFormData(prev => ({
      ...prev,
      URLS: prev.URLS.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setFormData(prev => ({ ...prev, image: base64 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${environment.baseUrl}/communities/addProductToCommunity/${communityId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("productAddResponse", response.data.data.products[response.data.data.products.length - 1])
      onProductAdded(response.data.data.products[response.data.data.products.length - 1]);
      toast.success('Product added successfully!');
      onClose();
    } catch (error) {
      toast.error('Error adding product: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-popup">
      <div className="popup-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="is_free"
                checked={formData.is_free}
                onChange={handleChange}
              />
              Free Resource
            </label>
          </div>

          {!formData.is_free && (
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          )}

          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <div className="form-group">
            <label>Resource URLs</label>
            {formData.URLS.map((url, index) => (
              <div key={index} className="url-input">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="Enter resource URL"
                />
                <button 
                  type="button" 
                  onClick={() => removeUrlField(index)}
                  className="remove-url"
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={addUrlField} className="add-url">
              + Add Another URL
            </button>
          </div>

          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup; 