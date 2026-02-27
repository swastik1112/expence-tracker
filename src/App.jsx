import { ExpenseProvider } from './context/ExpenseContext';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

import './index.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="container">
        <h2>Expense Tracker</h2>
        <Balance />
        <IncomeExpenses />
        <ExpenseForm />
        <ExpenseList />
      </div>
    </ExpenseProvider>
  );
}

export default App;