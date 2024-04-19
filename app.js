
// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());

// Import other files
const calculations = require("./calculations");
const nonDairyBevsCalcs = require("./nonDairyBevs");

// Main page
app.get('/hsr', (req, res) => {
    res.send('This will be the main page for HSR calculator');
});

// Non-dairy beverages calc page
app.get('/non_dairy_beverages', (req, res) => {
    res.send('This will be the page for non-dairy beverages calculator');
});

// Route to calculate HSR profiler score
app.get('/hsr/score', (req, res) => {
    const hsrProfilerScore = calculations.calculateHSRProfilerScore();
    res.send({ hsrProfilerScore });
});

// Route for input data
var inputValues;

app.post('/hsr/input', (req, res) => {
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

// Route to calculate non-dairy bevs score
app.get('/non_dairy_beverages/score', (req, res) => {
    const nonDairyBevsScore = nonDairyBevsCalcs.calculateNonDairyBevsStarPoints();
    res.send({ nonDairyBevsScore });
});

// Route for non-dairy beverages input
app.post('/non_dairy_beverages/input', (req, res) => {
    const { error } = nonDairyBevsCalcs.validateInputDataNonDairyBevs(req.body);
    if (error) return res.status(400).send(error);

    const data = {
        product: req.body.product,
        company: req.body.company,
        energy: req.body.energy,
        totalSugars: req.body.totalSugars,
        fvnl: req.body.fvnl,
    };
    inputDataNonDairyBevs = data;
    res.send(inputDataNonDairyBevs);
});

// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));