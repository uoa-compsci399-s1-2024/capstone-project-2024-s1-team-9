
// Joi used for data validation
const Joi = require('joi');

// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());

// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

// Main page
app.get('/', (req, res) => {
    res.send('This will be the main page for HSR calculator');
});

// Non-dairy beverages calc page
app.get('/non-dairy-beverages', (req, res) => {
    res.send('This will be the page for non-dairy beverages calculator');
});

// ******** GET INPUT DATA ********
var inputData;

app.post('/inputData', (req, res) => {
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
    inputData = data;
    res.send(inputData);
});

app.get('/inputData', (req, res) => {
    res.send(allFruitVegConcentrated());
});

function validateInputData(inputData) {
    const schema = Joi.object({
        hsrCategory: Joi.string().min(1).required(),
        food: Joi.string(),
        company: Joi.string(),
        energy: Joi.number().integer().min(0).max(3685).required(),
        satFat: Joi.number().precision(1).min(0).max(100).required(),
        totalSugars: Joi.number().precision(1).min(0).max(100).required(),
        sodium: Joi.number().integer().min(0).max(2700).required(),
        fibre: Joi.number().precision(1).min(0).max(100).required(),
        protein: Joi.number().precision(1).min(0).max(100).required(),
        concFruitVeg: Joi.number().precision(2).min(0).max(100).required(),
        fvnl: Joi.number().precision(2).min(0).max(100).required(),
    });

    return schema.validate(inputData);
}


// ******** FUNCTIONS/CALCULATIONS ********

// HSR Profiler Score

// HSR Star Points

// NPSC Group Number

// NPSC Category

// All Fruit, Veg concentrated?
function allFruitVegConcentrated() {
    if (inputData.concFruitVeg  > 0 && inputData.fvnl == 0) {
        return "yes";
    }
    return "no";
}

// Whole Food %

// Fruit Veg. Nuts, Pulses %

// Baseline Energy Points

// Baseline Sat Fat Points

// Baseline Total Sugars Points

// Baseline Sodium Points

// Total Baseline Points (Table A)

// Modifying Points % FVNL

// Modifying Points % Fibre

// Modifying Points % Protein

// Total Modifying Points (Table C)





// ******** DATA ********

// % flexed foods and end points based on new industry data

// AMMENDED lookups with simplified categories

// Extended tables, category 1 and 2 foods

const energyIncrementCat1_2 = 335;

const sodiumIncrementCat1_2 = 90;

const satFatCat1_2 = [
	0, 1.01, 2.01, 3.01, 4.01, 5.01, 6.01, 7.01, 8.01, 9.01, 
    10.01, 11.21, 12.51, 13.91, 15.51, 17.31, 19.31, 21.61, 
    24.11, 26.91, 30.01, 33.51, 37.41, 41.71, 46.61, 52.01, 
    58.01, 64.71, 72.31, 80.61, 90.01
]

const totSugCat1_2 = [
	0, 5.01, 8.91, 12.81, 16.81, 20.71, 24.61, 28.51, 32.41, 
    36.31, 40.31, 44.21, 48.11, 52.01, 55.91, 59.81, 63.81, 
    67.71, 71.61, 75.51, 79.41, 83.31, 87.31, 91.21, 95.11, 99.01
]


// Extended tables, category 3 foods

const energyIncrementCat3 = 335;

const satFatIncrementCat3 = 1;

const sodiumIncrementCat3 = 90;

const totSugCat3 = [
    0, 5.01, 9.01, 13.51, 18.01, 22.51, 27.01, 31.01, 36.01, 40.01, 45.01
]

// Daily intake references

// NPSC profiler points table C & extended FoPL profiler points table C