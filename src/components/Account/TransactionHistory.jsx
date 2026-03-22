import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import accountService from '../../services/account.service';
import { toast } from 'react-toastify';
import './Account.css';

const TransactionHistory = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchAccount();
  }, [id]);

  const fetchTransactions = async () => {
    try {
      const data = await accountService.getTransactions(id);
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    }
  };

  const fetchAccount = async () => {
    try {
      const data = await accountService.getAccountById(id);
      setAccount(data);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getTransactionTypeColor = (type) => {
    switch(type) {
      case 'DEPOSIT':
        return 'success';
      case 'WITHDRAWAL':
        return 'danger';
      case 'TRANSFER':
        return 'info';
      default:
        return 'secondary';
    }
  };

  if (loading) return <div className="loading">Loading transactions...</div>;

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        <Link to={`/accounts/${id}`} className="btn-secondary">Back to Account</Link>
      </div>
      
      {account && (
        <div className="account-summary">
          <p><strong>Account:</strong> {account.accountType} Account #{account.id}</p>
          <p><strong>Current Balance:</strong> {formatCurrency(account.balance)}</p>
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="no-transactions">
          <p>No transactions found for this account.</p>
        </div>
      ) : (
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-${getTransactionTypeColor(transaction.transactionType)}`}>
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className={transaction.transactionType === 'DEPOSIT' ? 'text-success' : 'text-danger'}>
                    {transaction.transactionType === 'DEPOSIT' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </td>
                  <td>{transaction.description || '-'}</td>
                  <td>
                    <span className={`badge badge-${transaction.status === 'COMPLETED' ? 'success' : 'warning'}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;