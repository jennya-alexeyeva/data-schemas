import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import session from 'express-session';
import userController from "./controllers/user-controller.js";
import patternController from "./controllers/pattern-controller.js";
import authController from "./controllers/auth-controller.js";
import bookController from "./controllers/book-controller.js";
const app = express();
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.json({limit: '16mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '16mb', extended: true}))
app.use(session({
  secret: 'sekret',
  cookie: {secure: false},
  resave: false,
  saveUninitialized: true
}))
bookController(app);
userController(app);
patternController(app);
authController(app);
mongoose.connect(process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/stitchers');
app.listen(process.env.PORT || 4000);