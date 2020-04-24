require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
const PORT = process.env.PORT || 3001;
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());

app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms :body"));

app.use(express.static("build"));

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

app.delete("/api/persons/:id", (req, res) => {
  // Person.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
  //   if (err) console.log("Error: ", err);
  //   console.log();
  // });
  console.log("delete");
});

app.post("/api/persons", (req, res) => {
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

  person.save().then((savedPerson) => {
    res.json(savedPerson.toJSON());
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
