const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8003;

app.use(bodyParser.json());

const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Obyead13$',
    database: 'cse'
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connected to the Database');
    } else {
        console.log('Not Connected to the Database \n Error: ' + JSON.stringify(err, undefined, 2));
    }
});

app.listen(PORT, () => {
    console.log(`Express server is running at port no: ${PORT}`);
});

app.get('/signupform', (req, res) => {
    mysqlConnection.query('SELECT * FROM signupform', (err, rows, fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
       
    });
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    // Check if user exists
    mysqlConnection.query('SELECT * FROM login WHERE name = ?', [name], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
  
        if (rows.length === 0) {
            return res.send('User not found.');
        }
  
        const foundUser = rows[0];
  
        // Compare passwords
        bcrypt.compare(password, foundUser.password, (bcryptErr, passwordMatch) => {
            if (bcryptErr) {
                console.log(bcryptErr);
                return res.status(500).send('Internal Server Error');
            }
  
            if (!passwordMatch) {
                return res.send('Incorrect password.');
            }
  
            res.send('Login successful!');
        });
   
   
    });
});

mysqlConnection.connect((err) => {
    if (!err) {
      console.log('Connected to the Database');
      
      // Define the SQL query for table creation
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS signupform (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL
        )
      `;
      
      // Execute the table creation query
      mysqlConnection.query(createTableSQL, (err, results) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Table created successfully');
        }
      });
    } else {
      console.log('Not Connected to the Database \n Error: ' + JSON.stringify(err, undefined, 2));
    }
  });