import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUserId } from '../../../../Store/features/user/userSlice';
import AddProductPopup from './AddProductPopup.jsx';
import './Products.scss';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { toast } from 'react-toastify';
import PurchasePopup from '../../../../components/Shared/PurchasePopup/PurchasePopup';
import { load } from "@cashfreepayments/cashfree-js";

const Products = ({ community }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUrlsPopup, setShowUrlsPopup] = useState(null);
  const [products, setProducts] = useState(community?.products || []);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const isAdmin = community?.adminId._id === loggedInUserId;
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialize Cashfree SDK
  const initializeCashfree = async () => {
    try {
      return await load({ mode: "sandbox" });
    } catch (error) {
      console.error("Failed to initialize Cashfree:", error);
      throw error;
    }
  };

  const handleBuyProduct = async (product) => {
    if (product.is_free) {
      await processPurchase(product._id);
    } else {
      setSelectedProduct(product);
      setShowPaymentModal(true);
    }
  };

  const processPurchase = async (productId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${environment.baseUrl}/communities/buyProduct/${community._id}/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Product acquired successfully!');
      // Update products list to reflect the purchase
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === productId 
            ? { ...p, purchased_by: [...(p.purchased_by || []), loggedInUserId] }
            : p
        )
      );
    } catch (error) {
      toast.error('Error acquiring product');
      console.error('Purchase error:', error);
    }
  };

  const handlePaymentSuccess = async (userDetails) => {
    try {
      const token = localStorage.getItem('accessToken');
      const cashfree = await initializeCashfree();

      const paymentResponse = await axios.post(
        `${environment.baseUrl}/communities/create-payment-session`,
        {
          name: userDetails.name,
          email: userDetails.email,
          mobile: userDetails.mobile,
          amount: selectedProduct.amount,
          entityId: selectedProduct._id,
          entityType: 'product'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { order_id, payment_session_id } = paymentResponse.data.data;

      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      });

      const verificationResponse = await verifyPayment(order_id, selectedProduct._id);
      if (verificationResponse) {
        await processPurchase(selectedProduct._id);
        const updatedCommunity = await fetchCommunityDetails();
        setProducts(updatedCommunity.products || []);
      } else {
        toast.error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment process failed');
    } finally {
      setShowPaymentModal(false);
    }
  };

  const verifyPayment = async (orderId, entityId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const verificationResponse = await axios.post(
        `${environment.baseUrl}/communities/verify-payment`,
        {
          orderId,
          entityId,
          entityType: 'product'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (verificationResponse.data.data.status === "SUCCESS") {
        toast.success('Payment successful!');
        return true;
      } else {
        toast.error('Payment verification failed');
        return false;
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Payment verification failed');
      return false;
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setShowAddProduct(false);
    toast.success('Product added successfully!');
  };

  const fetchCommunityDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${environment.baseUrl}/communities/getCommunity/${community._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching community details:', error);
      toast.error('Failed to refresh community data');
      return null;
    }
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
                  onClick={() => handleBuyProduct(product)}
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

      {showPaymentModal && selectedProduct && (
        <PurchasePopup
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          itemDetails={{
            type: 'product',
            name: selectedProduct.name,
            description: selectedProduct.description,
            resourceCount: selectedProduct.URLS.length,
            amount: selectedProduct.amount,
            is_free: selectedProduct.is_free
          }}
          onProceed={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default Products; 