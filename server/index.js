import nodeJsonDB from "node-json-db";
import nodeJsonDBConfig from "node-json-db/dist/lib/JsonDBConfig.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

var jsonParser = bodyParser.json();
const { JsonDB } = nodeJsonDB;
const { Config } = nodeJsonDBConfig;
var app = express();
var db = new JsonDB(new Config("toDoDB", true, false, "/"));

app.use(cors());

app.get("/todos", (req, res) => {
  res.send(db.getData("/toDos"));
});

app.post("/todos", jsonParser, (req, res) => {
  db.push("/toDos[]", req.body, true);
  res.send();
});

app.put("/todos/index/:index", jsonParser, (req, res) => {
  const i = req.params.index;
  db.push(`/toDos[${i}]`, req.body, true);
  res.send();
});

app.delete("/todos/index/:index", jsonParser, (req, res) => {
  const i = req.params.index;
  db.delete(`/toDos[${i}]`);
  res.send();
});

app.listen(3000);
