// /server/server.js

require('dotenv').config();
const express = require('express');
//const session = require('express-session');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();

app.use(cors());
app.use(express.json());

// app.use(session({
//     secret: 'gasgasgas', //secret key
//     resave: false,
//     saveUninitialized: true
// }));

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});