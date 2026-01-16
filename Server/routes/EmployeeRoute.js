import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/employee_login', (req, res) => {
    const sqlQuery = "SELECT * FROM employee WHERE email = ?";
    const { email, password } = req.body;

    db.query(sqlQuery, [email], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ loginStatus: false, error: "Query error" });
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (bcryptErr, isMatch) => {
                if (bcryptErr) {
                    console.error("Error comparing passwords:", bcryptErr);
                    return res.status(500).json({ loginStatus: false, error: "Authentication error" });
                }
                if (isMatch) {
                    const email = result[0].email;
                    const token = jwt.sign({ role: 'employee', email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' });

                    res.cookie('token', token);
                    return res.json({ loginStatus: true, id: result[0].id, message: "Login successful" });
                }
            });
        } else {
            return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});

router.get('/employee_data/:id', (req, res) => {
    const employeeId = req.params.id;
    const sqlQuery = "SELECT * FROM employee WHERE id = ?";

    db.query(sqlQuery, [employeeId], (err, result) => {
        if (err) {
            console.error("MYSQL ERROR:", err);
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        return res.json({ status: true, result: result });
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true, message: "Logout successful" });
});

export { router as EmployeeRouter }