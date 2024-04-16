
// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());

// Main page
app.get('/', (req, res) => {
    res.send('This will be the main page for HSR calculator');
});

// Non-dairy beverages calc page
app.get('/non-dairy-beverages', (req, res) => {
    res.send('This will be the page for non-dairy beverages calculator');
});

// Import other files
import calculations from "./calculations.js";
app.use("/HSRcalculator", calculations);

import nonDairyBevs from "./nonDairyBevs.js";
app.use("/nonDairyBeverages/", nonDairyBevs);

// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));