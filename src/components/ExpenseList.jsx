import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const { expenses } = useExpenses();

  return (
    <>
      <h3>History</h3>
      {expenses.length === 0 ? (
        <p className="empty">No transactions yet...</p>
      ) : (
        <ul className="list">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </ul>
      )}
    </>
  );
}