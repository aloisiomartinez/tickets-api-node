import express from "express";

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

app.post("/partners", (req, res) => {
  const { name, email, password, company_name } = req.body;
  console.log(email, password);
  res.send();
});

app.post("/customers", (req, res) => {
  const { name, email, password, address, phone } = req.body;
  console.log(email, password);
  res.send();
});

app.post("/events", (req, res) => {
  const { name, description, data, location, phone } = req.body;
  console.log(name, description);
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
