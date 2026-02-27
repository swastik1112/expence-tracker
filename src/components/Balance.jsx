import { useExpenses } from '../context/ExpenseContext';   // ← Add this

export default function Balance() {
  const { balance } = useExpenses();
  return (
    <>
      <h4>Your Balance</h4>
      <h1 className="balance">₹{balance.toFixed(2)}</h1>
    </>
  );
}