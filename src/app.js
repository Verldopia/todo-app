import express from "express";
import  "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import {
  home,
  homePostTask,
  homePostCategory,
  homeDeleteObject,
  homeDeleteAllTasks,
  homeEditTask,
  homeFinishTask
} from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import entities from "./models/index.js";
import { 
  getObject, 
  postObject, 
  deleteObject, 
  updateObject 
} from "./controllers/api/object.js"
import { register, postLogin, postRegister, login, logout } from "./controllers/authentication.js";
import { body } from "express-validator";
import validationAuthentication from "./middleware/validation/authentication.js"
import { jwtAuth } from "./middleware/jwtAuth.js";

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Import cookie parser
app.use(cookieParser());

// Handlebars Init
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs"
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"))

// App Login routing
app.get('/', jwtAuth, home);
app.get('/register', register);
app.post('/register', ...validationAuthentication, postRegister, register);
app.get('/login', login);
app.post('/login', ...validationAuthentication, postLogin, login);
app.post('/logout', logout);

// App Tasks routing
app.post('/postCategory', homePostCategory);
app.post('/postTask', homePostTask);
app.post('/deleteTask', (req, res, next) => homeDeleteObject("Task", req, res, next));
app.post('/deleteCategory', (req, res, next) => homeDeleteObject("Category", req, res, next));
app.post('/deleteAllTasks', homeDeleteAllTasks);
app.post('/editTask', homeEditTask);
app.post('/finishTask', homeFinishTask);

// API routing tasks
app.get('/api/task', (req, res, next) => getObject("Task", req, res, next));
app.post('/api/task', (req, res, next) => postObject("Task", req, res, next));
app.delete('/api/task/:id', (req, res, next) => deleteObject("Task", req, res, next));
app.put('/api/task', (req, res, next) => updateObject("Task", req, res, next));

// Create database connection and start listening
createConnection ({
  type: process.env.TYPE,
  database: process.env.NAME,
  entities,
  synchronize: true
}).then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Application is running on http://localhost:${process.env.PORT}`);
    })
});