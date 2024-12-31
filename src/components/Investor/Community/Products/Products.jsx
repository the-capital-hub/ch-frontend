import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUserId } from '../../../../Store/features/user/userSlice';
import AddProductPopup from './AddProductPopup.jsx';
import './Products.scss';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { toast } from 'react-toastify';

const Products = ({ community }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUrlsPopup, setShowUrlsPopup] = useState(null);
  const [products, setProducts] = useState(community?.products || []);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const isAdmin = community?.adminId._id === loggedInUserId;

  const handleBuyProduct = async (productId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${environment.baseUrl}/communities/buyProduct/${community._id}/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProducts(prevProducts => prevProducts.map(product => {
        if (product._id === productId) {
          return {
            ...product,
            purchased_by: [...(product.purchased_by || []), loggedInUserId]
          };
        }
        return product;
      }));
      toast.success('Product purchased successfully!');
    } catch (error) {
      toast.error('Error purchasing product: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setShowAddProduct(false);
    toast.success('Product added successfully!');
  };

  return (
    <div className="products-container">
        {isAdmin && (
        <button 
          className="add-product-btn"
          onClick={() => setShowAddProduct(true)}
        >
          + Add Product
        </button>
      )}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <span className={`badge ${product.is_free ? 'free' : 'paid'}`}>
                {product.is_free ? 'Free' : `₹${product.amount}`}
              </span>
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {product.purchased_by?.includes(loggedInUserId) ? (
                <button 
                  className="access-btn"
                  onClick={() => setShowUrlsPopup(product)}
                >
                  Access Resource
                </button>
              ) : (
                <button 
                  className="access-btn"
                  onClick={() => handleBuyProduct(product._id)}
                >
                  {product.is_free ? 'Buy for Free' : `Buy for ₹${product.amount}`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showUrlsPopup && (
        <div className="urls-popup">
          <div className="popup-content">
            <h3>Resource URLs</h3>
            <div className="urls-list">
              {showUrlsPopup.URLS.map((url, index) => (
                <a 
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resource {index + 1}
                </a>
              ))}
            </div>
            <button onClick={() => setShowUrlsPopup(null)}>Close</button>
          </div>
        </div>
      )}

      {showAddProduct && (
        <AddProductPopup 
          communityId={community._id}
          onClose={() => setShowAddProduct(false)}
          onProductAdded={handleProductAdded}
        />
      )}
    </div>
  );
};

export default Products; 