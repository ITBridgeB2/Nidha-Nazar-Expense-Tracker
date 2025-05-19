import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './css/ViewList.css';

function ViewList() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();  // Use useNavigate hook
  const totalSpent = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  useEffect(() => {
    fetch("http://localhost:8000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleBack = () => {
    navigate('/');  // Navigate to the home page (adjust the path if needed)
  };

  return (
    <div className="viewlist-container">
      <button
        className="back-button"
        onClick={handleBack}  // Call the handleBack function to navigate
      >
        &#8592; Back to Home
      </button>
      <h2 align="center">Expenses List</h2>
        <div className="total-box">
        <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
        </div>
      <div className="expense-list">
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          expenses.map((expense) => (
            <Link
              key={expense.id}
              to={`/expense-details/${expense.id}`}
              className="expense-item"
            >
              <div className="expense-item-details">
                <span className="category">{expense.category}</span>
                <span className="amount">${expense.amount}</span>
                <span className="date">{formatDate(expense.date)}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewList;
