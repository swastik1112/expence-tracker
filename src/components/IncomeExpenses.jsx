import { useExpenses } from '../context/ExpenseContext';   // ← Add this line

export default function IncomeExpenses() {
  const { totalIncome, totalExpense } = useExpenses();

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+₹{totalIncome.toFixed(2)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-₹{totalExpense.toFixed(2)}</p>
      </div>
    </div>
  );
}