const express = require('express');
const app = express();
const port = 8088;

app.use(express.json());

const GET_ROUTES = require('./routes/getRoutes');

app.use("/", GET_ROUTES);

app.listen(port, console.log("Ouvindo a porta: " + port));