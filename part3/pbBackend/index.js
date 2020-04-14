const express = require("express");
const app = express();
const PORT = 3001;

const persons = [
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
