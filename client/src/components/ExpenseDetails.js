import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './css/ExpenseDetails.css';

function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/expenses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setExpense(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching expense:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      fetch(`http://localhost:8000/api/expenses/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          alert("Expense deleted");
          navigate("/view-list");
        })
        .catch((err) => console.error("Error deleting:", err));
    }
  };

  const handleEdit = () => {
    navigate(`/edit-expense/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const handleBack = () => {
    navigate("/view-list");  // Navigate back to the ViewList page
  };

  if (loading) return <div>Loading...</div>;
  if (!expense) return <div>Expense not found!</div>;

  return (
    <div className="expense-details-container">
      <button
        className="back-button"
        onClick={handleBack}  // Navigate back to the ViewList page
      >
        &#8592; Back
      </button>
      <h2>Expense Details</h2>
      <div className="expense-detail">
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Amount:</strong> ${expense.amount}</p>
        <p><strong>Date:</strong> {formatDate(expense.date)}</p>
      </div>
      <div className="actions">
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default ExpenseDetails;
