import express from 'express';
import cors from 'cors'
import { adminRouter } from './routes/AdminRoute.js';


const app = express();
const PORT = 3001;  

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/auth', adminRouter);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
}   );

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});