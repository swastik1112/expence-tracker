import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseItem({ expense }) {
  const { deleteExpense } = useExpenses();
  const { id, text, amount, category, date } = expense;

  const sign = amount < 0 ? '-' : '+';
  const absAmount = Math.abs(amount).toFixed(2);

  return (
   // src/components/ExpenseItem.jsx (small update)
<li className={expense.amount < 0 ? 'minus' : 'plus'}>
  <div className="item-info">
    <span className="item-text">{expense.text}</span>
    <small className="category">{expense.category}</small>
    <small className="date">{new Date(expense.date).toLocaleDateString()}</small>
  </div>
  <div className="right">
    <span>
      {expense.amount > 0 ? '+' : ''}₹{Math.abs(expense.amount).toFixed(2)}
    </span>
    <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
      ×
    </button>
  </div>
</li>
  );
}