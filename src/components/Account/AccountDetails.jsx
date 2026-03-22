import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import accountService from '../../services/account.service';
import { toast } from 'react-toastify';
import './Account.css';

const AccountDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({
    type: 'deposit',
    amount: '',
    toAccountId: ''
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, [id]);

  const fetchAccount = async () => {
    try {
      const data = await accountService.getAccountById(id);
      setAccount(data);
    } catch (error) {
      toast.error('Failed to fetch account details');
      navigate('/accounts');
    } finally {
      setLoading(false);
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

  const handleTransactionChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value
    });
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      const amount = parseFloat(transaction.amount);
      
      if (transaction.type === 'deposit') {
        await accountService.deposit(id, amount);
        toast.success(`Deposited ${formatCurrency(amount)} successfully!`);
      } else if (transaction.type === 'withdraw') {
        await accountService.withdraw(id, amount);
        toast.success(`Withdrawn ${formatCurrency(amount)} successfully!`);
      } else if (transaction.type === 'transfer') {
        if (!transaction.toAccountId) {
          toast.error('Please specify destination account');
          return;
        }
        await accountService.transfer(id, transaction.toAccountId, amount);
        toast.success(`Transferred ${formatCurrency(amount)} successfully!`);
      }
      
      setTransaction({ type: 'deposit', amount: '', toAccountId: '' });
      fetchAccount();
    } catch (error) {
      toast.error(error.message || 'Transaction failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="loading">Loading account details...</div>;
  if (!account) return <div className="error">Account not found</div>;

  return (
    <div className="account-details-container">
      <h2>Account Details</h2>
      
      <div className="account-info">
        <div className="info-card">
          <h3>Account Information</h3>
          <p><strong>Account ID:</strong> {account.id}</p>
          <p><strong>Type:</strong> {account.accountType}</p>
          <p><strong>Balance:</strong> {formatCurrency(account.balance, account.currency || 'INR')}</p>
          <p><strong>Currency:</strong> {account.currency || 'INR'}</p>
          <p><strong>Status:</strong> {account.active ? 'Active' : 'Inactive'}</p>
          <p><strong>Created Date:</strong> {new Date(account.createdDate).toLocaleDateString()}</p>
        </div>
        
        <div className="transaction-card">
          <h3>New Transaction</h3>
          <form onSubmit={handleTransaction}>
            <div className="form-group">
              <label>Transaction Type</label>
              <select
                name="type"
                value={transaction.type}
                onChange={handleTransactionChange}
                required
              >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleTransactionChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            {transaction.type === 'transfer' && (
              <div className="form-group">
                <label>To Account ID</label>
                <input
                  type="number"
                  name="toAccountId"
                  value={transaction.toAccountId}
                  onChange={handleTransactionChange}
                  required
                />
              </div>
            )}
            
            <button type="submit" disabled={processing}>
              {processing ? 'Processing...' : `Perform ${transaction.type}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;