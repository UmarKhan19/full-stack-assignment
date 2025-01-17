const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const USERS = [];

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5",
      },
    ],
  },
];

const SUBMISSION = [];

app.post("/signup", async function (req, res) {
  // Add logic to decode body
  const { email, password } = req.body;

  // body should have email and password
  if (!email || !password)
    return res.status(404).json({
      success: false,
      message: "Please enter both email and password",
    });

  //   //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

  const exist = USERS.find((e) => e.email === email);

  if (exist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  } else {
    USERS.push({ email, password });
    //   // return back 200 status code to the client
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  }

  //   res.send("Hello World!");
});

app.post("/login", function (req, res) {
  // Add logic to decode body
  const { email, password } = req.body;
  // body should have email and password
  if (!email || !password)
    return res.status(404).json({
      success: false,
      message: "Please enter both email and password",
    });

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const exist = USERS.find((e) => e.email === email);

  if (exist) {
    if (exist.password === password)
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: "dhafbfdhabfhbfhe",
      });
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  res.status(404).json({ success: false, message: "User does not exist" });
});

app.get("/questions", function (req, res) {
  //return the user all the questions in the QUESTIONS array
  res.status(200).json({ success: true, QUESTIONS });
});

app.get("/submissions", function (req, res) {
  // return the users submissions for this problem
  res.status(200).json({ success: true, SUBMISSION });
});

app.post("/submissions", function (req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array above
  const { submission } = req.body;

  const accept = Math.random() < 0.5;

  if (accept) {
    SUBMISSION.push({ submission });
    return res
      .status(200)
      .json({ success: true, message: "Submitted succesfully" });
  }
  res.status(400).json({ success: false, message: "submission rejected" });
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
