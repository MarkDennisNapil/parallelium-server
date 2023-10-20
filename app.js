const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');

const apiRoute = require('./routes/routes');
require('dotenv').config()

const app = express();
app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
  console.log("Connected successfully!");
});
const dir = '../uploads';
try {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log("Directory is created.");
    } else {
        console.log("Directory already exists.");
    }
} catch (err) {
    console.log(err);
}

app.use(cors());
app.use(fileupload());
app.use('/resources', express.static('../uploads' + __dirname + '/public/files'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(apiRoute);

const port = process.env.PORT;

http.createServer(app).listen(port, () => {
    console.log(`Server is running at ${port}`)
})
