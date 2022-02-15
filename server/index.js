require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
var cors = require('cors');

const swaggerOptions = require('./swagger');
const logger = require('./logger');

const app = express();
const port = 3001;

expressJSDocSwagger(app)(swaggerOptions);

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.listen(port, () => {
  logger.log(`Server is running: ${process.env.BASE}`);
});

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/links'));
