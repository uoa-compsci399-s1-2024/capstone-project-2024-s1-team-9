
// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());

// Import calculations
const calculations = require("./calculations");

// Main page
app.get('/', (req, res) => {
    res.send('This will be the main page for HSR calculator');
});

// Non-dairy beverages calc page
app.get('/non-dairy-beverages', (req, res) => {
    res.send('This will be the page for non-dairy beverages calculator');
});

// Route to calculate HSR profiler score
app.get('/calculateHSRProfilerScore', (req, res) => {
    const hsrProfilerScore = calculations.calculateHSRProfilerScore();
    res.send({ hsrProfilerScore });
});

// Route for input data
var inputValues;

app.post('/inputValues', (req, res) => {
    const { error } = validateInputData(req.body);
    if (error) return res.status(400).send(error);

    const data = {
        hsrCategory: req.body.hsrCategory,
        food: req.body.food,
        company: req.body.company,
        energy: req.body.energy,
        satFat: req.body.satFat,
        totalSugars: req.body.totalSugars,
        sodium: req.body.sodium,
        fibre: req.body.fibre,
        protein: req.body.protein,
        concFruitVeg: req.body.concFruitVeg,
        fvnl: req.body.fvnl,
    };
    inputValues = data;
    res.send(inputValues);
});

exports.inputData = inputValues;


// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));