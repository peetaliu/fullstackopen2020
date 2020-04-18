const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.use(cors());

app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body"));

app.use(express.static("build"));

app.get("/api/persons/", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const count = persons.length;
  const currentDate = new Date();
  res.send(
    `<p>Phonebook has info for ${count} people <br/> ${currentDate}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((e) => e.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const names = persons.map((p) => p.name);

  //step6
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or Number cannot be empty",
    });
  } else if (names.includes(body.name)) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const generateId = () => {
  return Math.floor(Math.random() * (100000 - 1)) + 1;
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});