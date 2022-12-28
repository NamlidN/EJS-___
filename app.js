import express from 'express';
// Davor npm i express-validator, dann body und validationResult importieren
import { body, validationResult } from "express-validator";
import fs from "fs";

const app = express();
const PORT = 9898;
const Contacts = [];

app.set("view engine", "ejs");
app.use(express.static("./public/css"));
app.use(express.urlencoded({ extended: true }));
let loadedData = [];

fs.readFile("./data.json", (err, data) => {
    if (err) console.log(err);
    console.log(data.toString());
    loadedData = JSON.parse(data);
    console.log(loadedData);
    console.log("read shit");
});

// HTTP Methoden
// GET => Lesen
// POST => Erstellen neuer Daten
// PUT => Zum updaten bestehender Daten
// DELETE: zum löschen 

app.get("/", (req, res) => {
    const errors = validationResult(req);
    res.render("index", { loadedData, Error: { errors } });
});

// das body("email").isEmail() ist eine Middleware, die dann ausgeführt wird wenn der app.post ausgeführt wird, bevor die Arrow Function ausgeführt wird.
// mann kann meherere auf einmal angeben ( wird der Reihenfolge nach ausgeführt )
//  body("name").isLength({ min: 1, max: 50 }) prüft die länge des Namens
app.post("/add", body("email").isEmail(), body("firstName").isLength({ min: 1, max: 50 }), body("lastName").isLength({ min: 1, max: 50 }), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("index", { loadedData, Error: { errors } });
    }

    fs.readFile("./data.json", (err, data) => {
        if (err) console.log(err);
        console.log(data.toString());
        loadedData = JSON.parse(data);
        console.log(loadedData);
        console.log("read shit");
        a();
    });

    const a = () => {
        loadedData.push({ firstName: req.body.firstName, eMail: req.body.email, lastName: req.body.lastName, text: req.body.text });
        console.log(loadedData);

        fs.writeFile("./data.json", JSON.stringify(loadedData, null, 2), (err) => {
            if (err) console.log(err);
            console.log("written shit");
            res.render("index", { loadedData, Error: { errors } });
        });
    };

    // let newData = { firstName: req.body.firstName, eMail: req.body.email, lastName: req.body.lastName, text: req.body.text };
    // console.log("LOWLLOWOD", loadedData);





});

app.listen(PORT, () => console.log("Der Server Lauscht auf Port", PORT));