import api from './api';

class AccountService {
  async getAllAccounts() {
    try {
      const response = await api.get('/accounts');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getAccountById(id) {
    try {
      const response = await api.get(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async createAccount(accountData) {
    try {
      const response = await api.post('/accounts', accountData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateAccount(id, accountData) {
    try {
      const response = await api.put(`/accounts/${id}`, accountData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deleteAccount(id) {
    try {
      const response = await api.delete(`/accounts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async getTransactions(accountId) {
    try {
      const response = await api.get(`/accounts/${accountId}/transactions`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async deposit(accountId, amount) {
    try {
      const response = await api.post(`/accounts/${accountId}/deposit`, { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async withdraw(accountId, amount) {
    try {
      const response = await api.post(`/accounts/${accountId}/withdraw`, { amount });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async transfer(fromAccountId, toAccountId, amount) {
    try {
      const response = await api.post('/accounts/transfer', {
        fromAccountId,
        toAccountId,
        amount
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default new AccountService();