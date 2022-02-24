import express from "express";
import "dotenv/config";
import * as path from "path";
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./consts.js";
import { home } from "./controllers/home.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";

const app = express();
app.use(express.static('public'));

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

app.listen(process.env.PORT, () => {
  console.log(`Application is running on http://localhost:${process.env.PORT}`)
});