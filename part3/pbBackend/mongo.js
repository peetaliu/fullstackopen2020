const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("password must be given as command line argument");
  process.exit(1);
} else {
  const pw = process.argv[2];

  const url = `mongodb+srv://db_admin_1:${pw}@fso20-er8le.mongodb.net/phonebook?retryWrites=true&w=majority`;

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  switch (process.argv.length) {
    case 3:
      console.log("Phonebook:");
      Person.find({}).then((result) => {
        result.forEach((p) => {
          console.log(p);
        });
        mongoose.connection.close();
      });
      break;

    case 5:
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({
        name: name,
        number: number,
      });

      person.save().then((res) => {
        console.log(`${name} has been saved to the phonebook`);
        mongoose.connection.close();
      });

      break;

    default:
      console.log("Improper number of arguments");
      break;
  }
}
