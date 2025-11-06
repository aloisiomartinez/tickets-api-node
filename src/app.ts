import express from "express";
import * as mysql from "mysql2/promise";
import bcrypt from "bcrypt";

function createConnnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tickets",
    port: 33060,
  });
}

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send();
});

app.post("/partners", async (req, res) => {
  const { name, email, password, company_name } = req.body;
  console.log(email, password);

  const connection = await createConnnection();
  try {
    const createdAt = new Date();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const [userResult] = await connection.execute<mysql.ResultSetHeader>(
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, createdAt]
    );

    const userId = userResult.insertId;

    const [partnerResult] = await connection.execute<mysql.ResultSetHeader>(
      "INSERT INTO partners (user_id, company_name, created_at) VALUES (?, ?, ?)",
      [userId, company_name, createdAt]
    );

    res
      .status(201)
      .json({ id: partnerResult.insertId, userId, company_name, createdAt });
  } finally {
    await connection.end();
  }
});

app.post("/customers", (req, res) => {
  const { name, email, password, address, phone } = req.body;
  console.log(email, password);
  res.send();
});

app.post("/partners/events", (req, res) => {
  const { name, description, data, location, phone } = req.body;
  res.send();
});

app.get("/partners/events", (req, res) => {});

app.post("/partners/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  console.log(eventId);
  res.send();
});

app.get("/events", (req, res) => {});

app.post("/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  console.log(eventId);
  res.send();
});

app.listen(3000, () => {
  console.log("Running in PORT 3000");
});
