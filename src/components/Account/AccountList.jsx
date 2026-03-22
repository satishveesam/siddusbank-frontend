import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import accountService from '../../services/account.service';
import { toast } from 'react-toastify';
import './Account.css';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const data = await accountService.getAllAccounts();
      setAccounts(data);
    } catch (error) {
      toast.error('Failed to fetch accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await accountService.deleteAccount(id);
        toast.success('Account deleted successfully');
        fetchAccounts();
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (loading) return <div className="loading">Loading accounts...</div>;

  return (
    <div className="accounts-container">
      <h2>My Accounts</h2>
      {accounts.length === 0 ? (
        <div className="no-accounts">
          <p>You don't have any accounts yet.</p>
          <Link to="/accounts/create" className="btn-primary">Create First Account</Link>
        </div>
      ) : (
        <div className="accounts-grid">
          {accounts.map(account => (
            <div key={account.id} className="account-card">
              <div className="account-header">
                <h3>Account #{account.id}</h3>
                <span className={`account-status ${account.active ? 'active' : 'inactive'}`}>
                  {account.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="account-details">
                <p><strong>Type:</strong> {account.accountType}</p>
                <p><strong>Balance:</strong> {formatCurrency(account.balance, account.currency || 'INR')}</p>
                <p><strong>Currency:</strong> {account.currency || 'INR'}</p>
              </div>
              <div className="account-actions">
                <Link to={`/accounts/${account.id}`} className="btn-secondary">View Details</Link>
                <Link to={`/accounts/${account.id}/transactions`} className="btn-info">Transactions</Link>
                <button onClick={() => handleDelete(account.id)} className="btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountList;