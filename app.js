
// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());

// Main page
app.get('/hsr', (req, res) => {
    res.send('This will be the main page for HSR calculator');
});

// Non-dairy beverages calc page
app.get('/non_dairy_beverages', (req, res) => {
    res.send('This will be the page for non-dairy beverages calculator');
});

// Route to get input and calculate HSR profiler score
const calculations = require("./calculations");
app.use("/hsr", calculations);

// Route for non-dairy bevs input and calculate score
const nonDairyBevs = require("./nonDairyBevs");
app.use("/non_dairy_beverages", nonDairyBevs)

// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));