import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './css/EditExpense.css';

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    // Fetch the expense details when the page loads
    fetch(`http://localhost:8000/api/expenses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setExpense({
            amount: data.amount || "",
            category: data.category || "",
            date: data.date || "",
          });
        }
      })
      .catch((err) => console.error("Error loading expense:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Expense updated successfully");
        navigate(`/expense-details/${id}`); // Navigate to details page after update
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="edit-expense-container">
      <h2>Edit Expense</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
}

export default EditExpense;
