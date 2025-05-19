import React, { useState } from "react";
import './css/AddExpense.css';
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!amount || !category || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category, date })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Expense added!');
        navigate('/view-list');
      } else {
        alert('Failed to add expense: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="add-expense-container">
      <div className="form-wrapper">
        <h2 className="form-title">Add Expense</h2>
        <div className="form-group">
          <label htmlFor="expenseAmount">Expense Amount</label>
          <input
            type="number"
            id="expenseAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenseCategory">Expense Category</label>
          <input
            type="text"
            id="expenseCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenseDate">Date</label>
          <input
            type="date"
            id="expenseDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
