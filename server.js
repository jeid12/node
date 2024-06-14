const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000



const db = mysql.createConnection({
    host: "u404361482_schoolnode",
    user: "u404361482_root",
    password: "NIYOJEan11",
    database: "u404361482_schoolnode",
});

app.post("/add_user", (req, res) => {
    const sql =
      "INSERT INTO studentsnode (`name`,`email`,`age`,`gender`) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student added successfully" });
    });
  });

app.get('/students', (req, res) => {
    const sql = "SELECT * FROM studentsnode";
    db.query(sql, (err, result) => {    
        if (err) res.json({message: "Something unexpected has occured" + err});
        return res.json(result);
    });
});

app.get("/get_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM studentsnode WHERE `id`= ?";
    db.query(sql, [id], (err, result) => {
      if (err) res.json({ message: "Server error" });
      return res.json(result);
    });
  });

  app.post("/edit_user/:id", (req, res) => {
    const id = req.params.id;
    const sql =
      "UPDATE studentsnode SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
    const values = [
      req.body.name,
      req.body.email,
      req.body.age,
      req.body.gender,
      id,
    ];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student updated successfully" });
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student_details WHERE id=?";
    const values = [id];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student updated successfully" });
    });
  });
  

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})