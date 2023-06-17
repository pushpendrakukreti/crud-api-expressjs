const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const PORT_NO = 5000;

const userArr = [
  {
    id: 101,
    name: "Pushpendra",
    age: 27,
  },
  {
    id: 102,
    name: "Priya",
    age: 26,
  },
];

app.use(bodyParse.json());

app.get("/user", (req, res) => {
  res.status(200).json(userArr);
});

app.post("/user", (req, res) => {
  const existingUser = userArr.find((user) => user.id !== req.body.id);
  if (!existingUser) {
    return res.status(409).json({ error: "user already exists!" });
  } else {
    userArr.push(req.body);
    return res.json({ success: "user added succesfully!" });
  }
});

app.put("/user/:id", (req, res) => {
  const data = req.body;
  const checkUser = userArr.findIndex((user) => user.id == req.params.id);

  if (checkUser != -1) {
    userArr[checkUser] = data;
    return res
      .status(201)
      .json({ success: "user details updated!", data: data });
  }
});

app.delete("/user/:id", (req, res) => {
  const checkUser = userArr.findIndex((user) => user.id == req.params.id);

  if (checkUser != -1) {
    const removedElement = userArr.splice(checkUser, 1);
    return res
      .status(201)
      .json({ success: `user removed succesfully!`, data: removedElement });
  }
});

app.listen(PORT_NO, () => {
  console.log(`You server is running on ${PORT_NO}`);
});
