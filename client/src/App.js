import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';

import AddExpense from './components/AddExpense';
import ViewList from './components/viewList';
import ExpenseDetails from './components/ExpenseDetails';
import EditExpense from './components/EditExpense';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/add-expense' element={<AddExpense />} />
          <Route path='/view-list' element= {<ViewList />} />
          <Route path='/expense-details/:id' element={<ExpenseDetails />} /> 
          <Route path="/edit-expense/:id" element={<EditExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
