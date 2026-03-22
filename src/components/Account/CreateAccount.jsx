import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountService from '../../services/account.service';
import { toast } from 'react-toastify';
import './Account.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountType: 'SAVINGS',
    currency: 'INR',  
    initialDeposit: 0
  });
  const [loading, setLoading] = useState(false);

  const accountTypes = ['SAVINGS', 'CHECKING', 'FIXED_DEPOSIT'];
  const currencies = ['INR'];  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await accountService.createAccount(formData);
      toast.success('Account created successfully!');
      navigate('/accounts');
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <h2>Open New Account</h2>
      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label>Account Type</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            {accountTypes.map(type => (
              <option key={type} value={type}>{type.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
            disabled
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency} (₹)</option>
            ))}
          </select>
          <small>All accounts are in Indian Rupees (₹)</small>
        </div>
        
        <div className="form-group">
          <label>Initial Deposit (₹)</label>
          <input
            type="number"
            name="initialDeposit"
            value={formData.initialDeposit}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;