import express from 'express';
import helmet from 'helmet';
import path from 'path'; //node module to handle file paths
import { fileURLToPath } from 'url'; //converts the url to a file path
import cors from 'cors';
import morgan from "morgan";
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';//this is used to store session in mongodb 
import route from './src/routes/routes.js';
import dotenv from 'dotenv';
import './src/authentication/passport.js';
import utils from './src/utils/utils.js';
import cookieParser from 'cookie-parser';
import methodOverride from "method-override";
import flash from 'connect-flash';
import { generalErrorHandler } from './src/handlers/generalErrorHandler.js'; //importing error handler middleware
import { flashValidationErrors } from './src/handlers/routeErrorHanlder.js';
dotenv.config(); //this will load the environment variables from .env file to process.env
const app = express();
app.use(cookieParser());
app.use(helmet());

const __filename = fileURLToPath(import.meta.url); //In ES modules , __filename and __dirname are not available by default.
// So we need to use the fileURLToPath and dirname methods from the url and path modules to get the current file path.
const __dirname = path.dirname(__filename);//this will give you the directory name of the current file
app.set('view engine', 'ejs');//tells express to use ejs as the template engine
app.set('views', path.join(__dirname, 'src', 'views'));//tells express to add src/view to the path and from dirname express already know the path until server.js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//middleware to parse json body
app.use(cors());
app.use(morgan("dev"));
app.use(methodOverride('_method'));


console.log(process.env.SECRET_KEY);

app.use(session({
  secret: process.env.SECRET_KEY,  // You should change this to a secret key for your app
  resave: false,
  saveUninitialized: false,
  key: process.env.PASSPORT_COOKIE_KEY, // If using HTTPS, set `secure: true`
store: MongoStore.create({
      mongoUrl: process.env.DB_CONN, // store session in mongoDB (not in memory)
    }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Make `utils`, `user`, etc. available in all templates
app.use((req, res, next) => {
  res.locals.u = utils;
  res.locals.currentPath = req.path;
  res.locals.user = req.user;
   res.locals.flashes = req.flash();
  next();
});

// Serve static assets
app.use(
  "/css",
  express.static(path.join(__dirname,"node_modules/bootswatch/dist/lux"))
);
app.use(
  "/js",
  express.static(path.join(__dirname,"node_modules/bootstrap/dist/js"))
);
app.use(express.static(path.join(__dirname,'src', "public")));

// Routes
app.use('/', route);



app.use(flashValidationErrors);
app.use(generalErrorHandler);
export default app;

