import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CompareTwo, WishlistTwo } from '@/svg';
import { add_to_wishlist } from '@/redux/features/wishlist-slice';
import { add_to_compare } from '@/redux/features/compareSlice';

const DetailsWrapper = ({ productItem, vendors = [] }) => {
  const { title } = productItem || {};
  const [notificationPrice, setNotificationPrice] = useState('');
  const [notificationDate, setNotificationDate] = useState('');
  const [notificationEmail, setNotificationEmail] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch();

  const sizes = ['36', '37', '38', '39', '40', '41', '42', '43'];

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    console.log(`Notification set for price: ${notificationPrice}, email: ${notificationEmail}, before date: ${notificationDate}`);
    alert(`Notification set for price: $${notificationPrice}, email: ${notificationEmail} before ${notificationDate}`);
  };

  return (
    <div className="tp-product-details-wrapper">
      {/* Product Title */}
      <h3 className="tp-product-details-title">{title}</h3>

      {/* Size Selector Dropdown */}
      <div className="tp-product-size-selector" style={{ margin: '20px 0' }}>
        <h4 style={{ marginBottom: '10px' }}>Select Size</h4>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled>Select a size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Vendors List */}
      <div className="tp-product-vendors-list">
        <h4>Shops & Stores</h4>
        <ul style={{ marginTop: '20px' }}>
          {vendors.map((vendor, index) => (
            <li key={index} className="vendor-item" style={{ marginBottom: '20px' }}>
              <div className="vendor-card" style={{ padding: '15px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                <div className="vendor-info">
                  <h5 className="vendor-name" style={{ marginBottom: '10px' }}>{vendor.name}</h5>
                  <div className="vendor-price" style={{ marginBottom: '10px' }}>${vendor.price.toFixed(2)}</div>
                  <div className="vendor-delivery" style={{ marginBottom: '10px' }}>Delivery by: {vendor.deliveryDate}</div>
                  {vendor.vouchers?.length > 0 && (
                    <div className="vendor-vouchers" style={{ marginBottom: '10px' }}>
                      <span>Available Vouchers: </span>
                      {vendor.vouchers.map((voucher, i) => (
                        <span key={i} className="voucher-item" style={{ marginLeft: '5px' }}>{voucher}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="vendor-actions">
                  <button onClick={() => handleCompareProduct(productItem)} className="vendor-action-btn" style={{ marginRight: '10px' }}>
                    <CompareTwo />
                  </button>
                  <button onClick={() => handleWishlistProduct(productItem)} className="vendor-action-btn">
                    <WishlistTwo />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Notification Module */}
      <div className="tp-product-notification" style={{ marginTop: '30px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '15px' }}>Set a price alert</h4>
        <form onSubmit={handleNotificationSubmit} className="notification-form" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <div className="form-group" style={{ flex: '1 1 30%' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Desired Price</label>
            <input
              type="number"
              className="notification-input"
              value={notificationPrice}
              onChange={(e) => setNotificationPrice(e.target.value)}
              placeholder="e.g. 200"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 30%' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              className="notification-input"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              placeholder="example@email.com"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 30%' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Before Date</label>
            <input
              type="date"
              className="notification-input"
              value={notificationDate}
              onChange={(e) => setNotificationDate(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" className="tp-notification-btn" style={{ flex: '1 1 100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: '600', cursor: 'pointer' }}>
            Set Alert
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsWrapper;
