import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function ExpenseForm({ rowid, edit, setExpenses, formExpense }) {
  const [expense, setExpense] = formExpense;
  const [error, setError] = useState({});
  const [editable, setEditable] = edit;
  const [rowId, setRowId] = rowid;

  const validationConfig = {
    title: [
      { required: true, message: "Title is required." },
      { minLength: 3, message: "Title should be 3 character long." },
    ],
    category: [{ required: true, message: "Please select category." }],
    amount: [{ required: true, message: "Please enter an amount." }],
  };

  const validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([keys, values]) => {
      // console.log(keys,values);
      // console.log(validationConfig[keys])
      validationConfig[keys].some((rule) => {
        if (!values && rule.required) {
          errorData[keys] = rule.message;
          return true;
        }

        if (values.length < 3 && rule.minLength) {
          errorData[keys] = rule.message;
          return true;
        }
      });
    });
    // if (!formData.title) {
    //   errorData.title = "Title is required.";
    // }
    // if (!formData.category) {
    //   errorData.category = "Please select category.";
    // }
    // if (!formData.amount) {
    //   errorData.amount = "Amount is required.";
    // }
    setError(errorData);
    return Object.keys(errorData).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(expense);
    //console.log(isValid);
    if (!isValid) return;

    setExpenses((prevState) =>
      editable
        ? prevState.map((item) =>
            item.id === rowId ? { ...expense, id: rowId } : item,
          )
        : [...prevState, { ...expense, id: crypto.randomUUID() }],
    );
    setExpense({ title: "", category: "", amount: "" });
    setEditable(false)
  };

  const handleChange = (e) => {
    setError({});
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <Input
        id="title"
        name="title"
        type="text"
        placeholder="Enter title."
        value={expense.title}
        onChange={handleChange}
        label="Title"
        error={error.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        hiddenOption="Select Category"
        options={["Cloth", "Education", "Medicine", "Bill"]}
        error={error.category}
      />
      <Input
        id="amount"
        name="amount"
        type="number"
        placeholder="Enter an amount."
        value={expense.amount}
        onChange={handleChange}
        label="Amount"
        error={error.amount}
        step="0.01"
        min="0"
      />
      <button>{editable ? "Update" : "Add"}</button>
    </form>
  );
}
