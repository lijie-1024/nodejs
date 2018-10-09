const express = require("express");
const app = express();
app.use(express.static("./views"));
app.use(express.static("./semantic"));
app.use(express.static("./node_modules"));
app.listen(3001);

//Run app, then load http://localhost:3001 in a browser to see the output.
