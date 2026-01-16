import express from 'express';
import cors from 'cors'
import { adminRouter } from './routes/AdminRoute.js';
import { EmployeeRouter } from './routes/EmployeeRoute.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';



const app = express();
const PORT = 3001;

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const verifyuser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: false, error: "Unauthorized" });
  } else {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, error: "Unauthorized" });
      } else {
        req.role = decoded.role;
        req.id = decoded.id;
        next();
      }
    });
  }};

    app.get('/verifyuser', verifyuser, (req, res) => {
      return res.json({ status: true, role: req.role, id: req.id });
    })

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });