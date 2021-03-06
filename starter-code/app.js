require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
require('./config/hbs.config');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const createError = require('http-errors');


mongoose
  .connect('mongodb://localhost/celebritiesDB', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';




// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      


const router = require('./config/routes.config');
app.use('/', router);

// app.use((req, res, next) => {
//   next(createError(404, 'Page not found'))
// })

// app.use((error, req, res, next) => {
//   console.error(error);
//   let status = error.status || 500;

//   res.status(status)
//     .render('error', {
//       message: error.message,
//       error: req.app.get('env') === 'development' ? error : {}
//     })
// })




module.exports = app;

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});
