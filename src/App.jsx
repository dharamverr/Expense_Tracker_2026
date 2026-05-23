import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseTable from "./Components/ExpenseTable";
import expenseData from "./expenseData";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  //const [expenses, setExpenses] = useState(expenseData);
  // const [expense, setExpense] = useState({
  //     title: "",
  //     category: "",
  //     amount: "",
  //   });
  // const [editable, setEditable] = useState(false)
  // const [rowId, setRowId] = useState('');
  const [expenses, setExpenses] = useLocalStorage('expenses',expenseData);
  const [expense, setExpense] = useLocalStorage('expense',{
      title: "",
      category: "",
      amount: "",
    });
  const [editable, setEditable] = useLocalStorage('editable',false)
  const [rowId, setRowId] = useLocalStorage('rowId','');
  
  return (
    <>
      <main>
        <h1>Track Your Expenses.</h1>
        <section className="form-table-container">
          <ExpenseForm rowid = {[rowId, setRowId]} edit = {[editable, setEditable]} setExpenses={setExpenses} formExpense= {[expense, setExpense] }/>
          <ExpenseTable rowid = {[rowId, setRowId]} edit = {[editable, setEditable]} expenses={expenses} setExpenses={setExpenses} formExpense= {[expense, setExpense] }/>
        </section>
      </main>
    </>
  );
}

export default App;
