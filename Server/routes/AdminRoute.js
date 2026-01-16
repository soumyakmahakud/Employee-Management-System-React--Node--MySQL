import express from 'express';
import db from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sqlQuery = "SELECT * FROM admin WHERE email = ? AND password = ?";
    const { email, password } = req.body;
    db.query(sqlQuery, [email, password], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ loginStatus: false, error: "Query error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: 'admin', email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ loginStatus: true, message: "Login successful" });
        } else {
            return res.status(401).json({ loginStatus: false, error: "Wrong email or password" });
        }
    });
});

router.get('/category', (req, res) => {
    const sqlQuery = "SELECT * FROM category";
    db.query(sqlQuery, (err, result) => {
        if (err) {
            return res.json({ status: false, error: "Query error" });
        }
        return res.json({ status: true, result: result });
    });
});

router.post('/add_category', (req, res) => {
    const sqlQuery = "INSERT INTO category (name) VALUES (?)";
    db.query(sqlQuery, [req.body.category], (err, result) => {
        if (err) {
            return res.json({ status: false, error: "Query error" });
        }
        return res.json({ status: true, message: "Category added successfully" });
    });
});

// Image upload setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



router.post('/add_employee', upload.single('image'), (req, res) => {
    const sqlQuery = `
      INSERT INTO employee 
      (name, email, password, salary, address, category_id, image) 
      VALUES (?)
    `;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: false,
                error: "Error hashing password"
            });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.body.category_id,
            req.file.filename,
        ];

        db.query(sqlQuery, [values], (err, result) => {
            if (err) {
                console.error("MYSQL ERROR:", err);
                return res.status(500).json({
                    status: false,
                    error: err.message
                });
            }

            return res.json({
                status: true,
                message: "Employee added successfully"
            });
        });
    });
});

router.get('/employee', (req, res) => {
    const sqlQuery = `SELECT * FROM employee`;
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
            
            return res.json({ status: false, error: "Query error" });
        }
        return res.json({ status: true, result: result });
    });
});

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = `SELECT * FROM employee WHERE id = ?`;
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ status: false, error: "Query error" });
        }
        return res.json({ status: true, result: result });
    });
    
});

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = `
        UPDATE employee 
        SET name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        WHERE id = ?
    `;
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        id
    ];
    db.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error("MYSQL ERROR:", err);
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        return res.json({
            status: true,
            message: "Employee updated successfully"
        });
    });
});

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = `DELETE FROM employee WHERE id = ?`;

    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error("MYSQL ERROR:", err);
            return res.status(500).json({
                status: false,
                error: err.message
            });
        }
        return res.json({
            status: true,
            message: "Employee deleted successfully"
        });
    });
});





router.get('/admin_count', (req, res) => {
    const sqlQuery = "SELECT COUNT(id) AS admin FROM admin";
    db.query(sqlQuery, (err, result) => {
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

router.get('/employee_count', (req, res) => {
    const sqlQuery = "SELECT COUNT(id) AS employee FROM employee";

    db.query(sqlQuery, (err, result) => {
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

router.get('/salary_count', (req, res) => {
    const sqlQuery = "SELECT SUM(salary) AS salaryOFEmp FROM employee";

    db.query(sqlQuery, (err, result) => {
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

router.get('/admin_records', (req, res) => {
    const sqlQuery = "SELECT * FROM admin"; 

    db.query(sqlQuery, (err, result) => {
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


router.get('/admin_logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true, message: "Logout successful" });
});



export { router as adminRouter }