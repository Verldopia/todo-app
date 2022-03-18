import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { SOURCE_PATH } from './consts.js';
import {
  home,
  homePostObject,
  homeDeleteObject,
  homeDeleteCategory,
  homeDeleteAllObjects,
  homeEditObject,
} from './controllers/home.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import entities from './models/index.js';
import {
  getObject,
  postObject,
  deleteObject,
  updateObject,
} from './controllers/api/object.js';
import {
  register,
  postLogin,
  postRegister,
  login,
  logout,
} from './controllers/authentication.js';
import registrationAuth from './middleware/validation/registrationAuth.js';
import loginAuth from './middleware/validation/loginAuth.js';
import { jwtAuth } from './middleware/jwtAuth.js';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import cookie parser
app.use(cookieParser());

// Handlebars Init
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

// App Login routing
app.get('/', jwtAuth, home);
app.get('/register', register);
app.post('/register', ...registrationAuth, postRegister, register);
app.get('/login', login);
app.post('/login', ...loginAuth, postLogin, login);
app.post('/logout', logout);

// App Tasks routing
app.get('/getTasksCategory', jwtAuth, home);
app.post('/postCategory', (req, res, next) =>
  homePostObject('Category', { slug: req.body.title }, req, res, next)
);
app.post('/postTask', (req, res, next) =>
  homePostObject('Task', { checked: false }, req, res, next)
);
app.post('/deleteTask', (req, res, next) =>
  homeDeleteObject('Task', req, res, next)
);
app.post('/deleteCategory', (req, res, next) =>
  homeDeleteCategory(req, res, next)
);
app.post('/deletePendingTasks', (req, res, next) =>
  homeDeleteAllObjects('Task', false, req, res, next)
);
app.post('/deleteDoneTasks', (req, res, next) =>
  homeDeleteAllObjects('Task', true, req, res, next)
);
app.post('/editTask', (req, res, next) =>
  homeEditObject('Task', false, req, res, next)
);
app.post('/finishTask', (req, res, next) =>
  homeEditObject('Task', true, req, res, next)
);

// API routing tasks
app.get('/api/task', (req, res, next) => getObject('User', req, res, next));
app.post('/api/task', (req, res, next) => postObject('User', req, res, next));
app.delete('/api/task/:id', (req, res, next) =>
  deleteObject('User', req, res, next)
);
app.put('/api/task', (req, res, next) => updateObject('User', req, res, next));

// Create database connection and start listening
createConnection({
  type: process.env.TYPE,
  database: process.env.NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Application is running on http://localhost:${process.env.PORT}/login`
    );
  });
});
