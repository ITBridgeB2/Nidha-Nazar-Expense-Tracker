const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');



const expenseApp = express();

// Load the environment variables
require('dotenv').config();

// MIDDLEWARE
expenseApp.use(cors());
expenseApp.use(express.json());

// MySQL connection using .env
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
  });

 
  // POST /api/expenses
expenseApp.post('/api/expenses/add', (req, res) => {
    const { amount, category, date } = req.body;
  
    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const sql = 'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)';
    db.query(sql, [amount, category, date], (err, result) => {
      if (err) {
        console.error('Error inserting expense:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'Expense added successfully', id: result.insertId });
    });
  });


  // GET /api/expenses - fetch all expenses
expenseApp.get('/api/expenses', (req, res) => {
    db.query('SELECT * FROM expenses ORDER BY date DESC', (err, results) => {
      if (err) {
        console.error('Error fetching expenses:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });



  // GET single expense by ID
expenseApp.get('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM expenses WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ error: 'Expense not found' });
      res.json(results[0]);
    });
  });
  
  // DELETE expense by ID
  expenseApp.delete('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM expenses WHERE id = ?';
    db.query(sql, [id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to delete expense' });
      res.json({ message: 'Expense deleted successfully' });
    });
  });


  // UPDATE expense by ID
expenseApp.put('/api/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { amount, category, date } = req.body;
  
    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const sql = 'UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?';
    db.query(sql, [amount, category, date, id], (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Expense updated successfully' });
    });
  });
  
  






  const PORT = process.env.PORT;
expenseApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));