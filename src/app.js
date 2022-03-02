import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import entities from "./models/index.js";
import { ppid } from "process";
import { getObject, postObject, deleteObject, updateObject } from "./controllers/api/task.js"

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars init
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

// App routing
app.get('/', home);

// Task routing
app.get('/api/task', (req, res, next) => getObject("Task", req, res, next));
app.post('/api/task', (req, res, next) => postObject("Task", req, res, next));
app.delete('/api/task/:id', (req, res, next) => deleteObject("Task", req, res, next));
app.put('/api/task', (req, res, next) => updateObject("Task", req, res, next));

// Create database connection and start listening

createConnection({
  type: process.env.TYPE,
  database: process.env.NAME,
  entities,
  synchronize: true
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Application is runninig on http://localhost:${process.env.PORT}/.`);
  })
});