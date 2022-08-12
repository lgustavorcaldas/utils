const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 8080;

app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}))

const GET_ROUTES = require('./routes/getRoutes');

app.use("/", GET_ROUTES);

app.listen(port, console.log("Listening to port: " + port));