// src/components/ExpenseForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useExpenses } from '../context/ExpenseContext';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvv-0tjBHf6T9fNBJSlzpnnMNKtz08DBFvY5d5UfKQraHaErVwmSfR38ZtvivsV_ZQ/exec';

export default function ExpenseForm() {
  const { addExpense } = useExpenses();

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // {type: 'success'|'error', text}

  const categories = ['Salary', 'Food', 'Transport', 'Shopping', 'Bills', 'Other']; // Salary first!

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return setMessage({ type: 'error', text: 'Enter description' });
    if (!amount || Number(amount) <= 0) return setMessage({ type: 'error', text: 'Enter positive amount' });

    const newExpense = {
      text: text.trim(),
      amount: Number(amount),     // always positive from user
      category,
    };

    setIsSubmitting(true);
    setMessage(null);

    try {
      await axios.post(
        GOOGLE_SCRIPT_URL,
        JSON.stringify(newExpense),
        { headers: { 'Content-Type': 'text/plain;charset=utf-8' } }
      );

      addExpense(newExpense); // context handles + / - 

      setMessage({ type: 'success', text: `Added ${category === 'Salary' ? 'Income' : 'Expense'}!` });
      setText('');
      setAmount('');
      setCategory('Food');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to save – check internet or script' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form animate-fade-in">
      <h3>Add New Transaction</h3>

      {message && (
        <div className={`message ${message.type} animate-slide-in`}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label>Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Salary / Groceries / Netflix..."
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="form-group">
        <label>Amount (always positive)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 4500 or 350"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSubmitting}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`btn ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Add Transaction'}
      </button>
    </form>
  );
}