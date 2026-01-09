import mysql from 'mysql2';

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeems"
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("Database Connected Successfully");
  }
});

export default db;
