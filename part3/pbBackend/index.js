require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const cors = require("cors");

const errHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "incorrect id format" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: "Unknown Endpoint" });
};

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/api/persons/", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person.map((per) => per.toJSON()));
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((person) => {
    res.json(
      `<p>Phonebook has info for ${
        person.length
      } people <br/> ${new Date()}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person.toJSON());
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: "Content missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((formattedPerson) => {
      res.json(formattedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((err) => next(err));
});

app.use(unknownEndpoint);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
