const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('./database/connection');
//Port
const PORT = process.env.PORT || 5000;

//Middlewars
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes/
app.use(require('./routes/tasks.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')))


//server
app.listen(PORT, () => {
  console.log('Server on port ' + PORT);
});
