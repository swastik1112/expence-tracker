// src/context/ExpenseContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const isIncome = expense.category === 'Salary';
    const signedAmount = isIncome ? Math.abs(expense.amount) : -Math.abs(expense.amount);

    setExpenses((prev) => [
      ...prev,
      {
        ...expense,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        amount: signedAmount,           // store with correct sign
      },
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const totalIncome = expenses
    .filter((exp) => exp.amount > 0)
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalExpense = Math.abs(
    expenses
      .filter((exp) => exp.amount < 0)
      .reduce((sum, exp) => sum + exp.amount, 0)
  );

  const balance = totalIncome - totalExpense;

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    balance,
    totalIncome,
    totalExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);