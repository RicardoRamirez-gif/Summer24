const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const StudentSchema = new mongoose.Schema(
  {
    myName: String,
    mySID: String,
  },
  { collection: "s24students" }
);

// Create a Model object
const StudentModel = mongoose.model("student", StudentSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/", async (req, res) => {
  // get the data from the form
  const myuri = req.body.myuri;

  try {
    // connect to the database and log the connection
    await mongoose.connect(myuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // add the data to the database
    const student = new StudentModel({
      myName: "Ricardo Ramirez Morales", 
      mySID: "300381941",
    });
    await student.save();

    // send a response to the user
    res.send(`<h1>Document Added</h1>`);
  } catch (error) {
    // handle the error
    console.error("Error occurred:", error);
    res.status(500).send(`<h1>Internal Server Error</h1><p>${error.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
