import React from "react";
import "./css/Home.css";
import {  useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

     // Function to handle the button click
  const handleAddExpense = () => {
    navigate('/add-expense');
  };

  const handleViewExpense = () => {
    navigate('/view-list');
  }

  return (
    <div className="home-container">
      <div className="overlay">
        <div className="button-group">
          <button className="expense-button" onClick={handleAddExpense}>Add Expenses</button>
          <button className="expense-button" onClick={handleViewExpense}>View Expenses</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
