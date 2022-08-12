const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const path = __dirname;
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: __dirname + '/tmp'
}));

const POST_ROUTES = require('./routes/postRoutes');

app.use("/", express.static(path + '/public'));
app.use("/conversor", POST_ROUTES);

app.listen(port, console.log("Listening to port: " + port));