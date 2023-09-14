// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'USE YOUR HOST NAME',
  user: ' USE YOUR ROOT USER NAME',
  password: ' USE YOUR PASSWORD',
  database: 'USE YOU OWN DATABASE NAME',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoints
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/api/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  const query = 'INSERT INTO employees (firstName, lastName) VALUES (?, ?)';
  db.query(query, [firstName, lastName], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee added successfully' });
  });
});

app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const query = 'UPDATE employees SET firstName = ?, lastName = ? WHERE id = ?';
  db.query(query, [firstName, lastName, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee updated successfully' });
  });
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Employee deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
