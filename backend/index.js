const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json())
app.use(cors())

// Database connection configuration
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'sys'
})

// Establish database connection
db.connect((err) => {
    if (!err) {
        console.log("conneted to database successfully");
    }else{
        console.log(err);
    }
})

// API endpoint to add a new task
app.post('/add', (req, res) => {
    // Insert task into database and return updated task list
    const insertQuery = 'INSERT INTO tasklist (task_name, description, status) VALUES (?, ?, ?)';
    const selectQuery = 'SELECT * FROM tasklist';
    const { task, desc } = req.body;

    db.query(insertQuery, [task, desc, 'Not Completed'], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error storing task" });
        }

        // Fetch updated task list after insertion
        db.query(selectQuery, (error, newList) => {
            if (error) {
                return res.status(500).json({ message: "Error fetching updated task list" });
            }
            
            res.status(200).json({ message: "Task added successfully", tasks: newList });
        });
    });
});

// API endpoint to retrieve all tasks
app.get('/show', (req, res) => {
    const q = 'SELECT * from tasklist';
    db.query(q, (err, result) => {
        if (err) {
            console.log("failed to show tasks");
        } else {
            console.log("show tasks successfully");
            res.send(result)
        }
    })
})

// API endpoint to update an existing task
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task, desc } = req.body;

    const updateQuery = 'UPDATE tasklist SET task_name = ?, description = ? WHERE id = ?';
    const selectQuery = 'SELECT * FROM tasklist';

    db.query(updateQuery, [task, desc, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating task" });
        }

        // Fetch updated task list after update
        db.query(selectQuery, (error, updatedList) => {
            if (error) {
                return res.status(500).json({ message: "Error fetching updated task list" });
            }

            res.status(200).json({ message: "Task updated successfully", tasks: updatedList });
        });
    });
});

// API endpoint to delete a task
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM tasklist WHERE id = ?';
    const selectQuery = 'SELECT * FROM tasklist';

    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting task" });
        }

        // Fetch updated task list after deletion
        db.query(selectQuery, (error, updatedList) => {
            if (error) {
                return res.status(500).json({ message: "Error fetching updated task list" });
            }

            res.status(200).json({ message: "Task deleted successfully", tasks: updatedList });
        });
    });
});

// API endpoint to update task status
app.put('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const newStatus = 'Completed';

    const updateQuery = 'UPDATE tasklist SET status = ? WHERE id = ?';
    const selectQuery = 'SELECT * FROM tasklist';

    db.query(updateQuery, [newStatus, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error updating task status" });
        }

        // Fetch updated task list after status change
        db.query(selectQuery, (error, updatedList) => {
            if (error) {
                return res.status(500).json({ message: "Error fetching updated task list" });
            }

            res.status(200).json({ message: "Task status updated successfully", tasks: updatedList });
        });
    });
});

// Start server on port 5000
app.listen(5000, () => {console.log('server started');
})