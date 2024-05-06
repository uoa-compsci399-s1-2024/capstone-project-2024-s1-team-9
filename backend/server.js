
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

// Route to get the list of categories
app.get('/categories', (req, res) => {
    const categories = ["1 - Non-dairy beverages", "1D - Dairy beverages", "2 - Foods", "2D - Dairy foods", "3 - Fats, oils", "3D - Cheese"];
    res.json(categories);
});

// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
