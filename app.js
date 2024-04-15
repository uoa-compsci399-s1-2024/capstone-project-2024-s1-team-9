
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


// ********************************
// ******** GET INPUT DATA ********
// ********************************

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


// ****************************************
// ******** FUNCTIONS/CALCULATIONS ********
// ****************************************


// HSR Profiler Score

function calculateHSRProfilerScore(inputData) {  
    const category = inputData.hsrCategory;
    const baselinePoints = calculateTotalBaselinePoints();
    // modifyingPoints include (HSR V points) (HSR P points if eligible) (HSR F points if eligible)
    const modifyingPoints = calculateModifyingPoints();  // function needs implementation
    const finalHSRScore = baselinePoints - modifyingPoints;
    return finalHSRScore;
}

// Route to calculate HSR profiler score
app.get('/calculateHSRProfilerScore', (req, res) => {
    const hsrProfilerScore = calculateHSRProfilerScore(inputData);
    res.send({ hsrProfilerScore });
});


// HSR Star Points
function calculateHSRStarPoints() {
    // need num1 num2 num3
    const result = 10.499 - (num1 / num2 * num3);
    
    if (result < 1) {
        return 1;
    } else if (result < 11) {
        return Math.floor(result);
    } else {
        return 10;
    }
}


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
function calculateBaselineEnergyPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2Energy();
    } else {
        return getCategory3Energy();
    }
}

// Baseline Sat Fat Points
function calculateBaselineSatFatPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2SatFat();
    } else {
        return getCategory3SatFat();
    }
}

// Baseline Total Sugars Points
function calculateBaselineTotalSugarsPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2TotSug();
    } else {
        return getCategory3TotSug();
    }
}

// Baseline Sodium Points
function calculateBaselineSodiumPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2Sodium();
    } else {
        return getCategory3Sodium();
    }
}

// Total Baseline Points (Table A)
function calculateTotalBaselinePoints() {
    const energyPoints = calculateBaselineEnergyPoints();
    const satFatPoints = calculateBaselineSatFatPoints();
    const totalSugarsPoints = calculateBaselineTotalSugarsPoints();
    const sodiumPoints = calculateBaselineSodiumPoints();
    
    return energyPoints + satFatPoints + totalSugarsPoints + sodiumPoints;
}

// Modifying Points % FVNL

// Modifying Points % Fibre

// Modifying Points % Protein

// Total Modifying Points (Table C)




// **********************
// ******** DATA ********
// **********************

// % flexed foods and end points based on new industry data
// ORIGINAL Lookups with extra categories

const num3 = new Map();
num3.set("1D - Dairy beverages", 6);
num3.set("2 - Foods", 29);
num3.set("2D - Dairy foods", 14);
num3.set("3 - Fats, oils", 45);
num3.set("3D - Cheese", 41);
num3.set("non-dairy-beverages", 3);

const num1 = new Map();
num1.set("1D - Dairy beverages", -2);
num1.set("2 - Foods", -15);
num1.set("2D - Dairy foods", -3);
num1.set("3 - Fats, oils", 10);
num1.set("3D - Cheese", 23);
num1.set("non-dairy-beverages", -6);

const num2 = new Map();

for (let key of num3.keys()) {
    const range = Math.abs(num3.get(key) - num1.get(key));
    num2.set(key, range);
}

// AMENDED lookups with simplified categories

const npscGroupNumber = new Map();
npscGroupNumber.set("1D - Dairy beverages", 1);
npscGroupNumber.set("2 - Foods", 2);
npscGroupNumber.set("2D - Dairy foods", 2);
npscGroupNumber.set("3 - Fats, oils", 3);
npscGroupNumber.set("3D - Cheese", 3);

const npscCategory = new Map();
npscCategory.set("1D - Dairy beverages", "Beverages");
npscCategory.set("2 - Foods", "Food");
npscCategory.set("2D - Dairy foods", "Food");
npscCategory.set("3 - Fats, oils", "Fats/Oils/Cheese");
npscCategory.set("3D - Cheese", "Fats/Oils/Cheese");


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

const dailyIntakeReferences = new Map();
dailyIntakeReferences.set("energy", 8700);
dailyIntakeReferences.set("protein", 50);
dailyIntakeReferences.set("fat", 70);
dailyIntakeReferences.set("fattyAcids", 24);
dailyIntakeReferences.set("carbohydrate", 310);
dailyIntakeReferences.set("sodium", 2300);
dailyIntakeReferences.set("sugars", 90);
dailyIntakeReferences.set("fibre", 30);
dailyIntakeReferences.set("tippingPoint", 13);
dailyIntakeReferences.set("claim", 1); // 1 = yes, 0 = no
dailyIntakeReferences.set("fruitVegTippingPoint", 5);

// NPSC profiler points table C & extended FoPL profiler points table C
//NPSC points correlate to the index
const concFVNL = [
	0.00, 25.00, 43.00, 52.00, 63.00, 67.00, 80.00, 90.00, 99.50, 100 
]

const FVNL = [
	0.00, 40.01, 60.01, 67.01, 75.01, 80.01, 90.01, 95.01, 99.51, 100
]

//extended

const foodsFibre = [
	0.00, 0.91, 1.91, 2.81, 3.71, 4.71, 5.41, 6.31, 7.31, 8.41, 9.71, 11.21, 13.01, 15.01, 17.31, 20.01
]

const foodsProtein = [
	0.00, 1.61, 3.20, 4.81, 6.41, 8.01, 9.61, 11.61, 13.91, 16.71, 20.01, 24.01, 28.91, 34.71, 41.61, 50.01
]


// ******************************
// ******** DATA LOOKUPS ********
// ******************************

// % flexed foods and end points based on new industry data - AHAD - DONE BY RILEY

//     --> lookup num3
function getNum3(){
    const category = inputData.hsrCategory;
    
    return num3.get(inputData.hsrCategory);
}

//     --> lookup num2
function getNum2(){
    return num2.get(inputData.hsrCategory);
}


hsrProfilerScore = 0; //temp variable - take away when function to calc hsrProfilerScore is implemented
//     --> lookup num1
function getNum1(){
    return hsrProfilerScore - num1.get(inputData.hsrCategory); 
}



// AMMENDED lookups with simplified categories - FRASER

//     --> lookup NPSC category if given HSR category

function getNpscCategory() {
    return npscCategory.get(inputData.hsrCategory);
}

//     --> lookup NPSC group number if given NPSC category

function getNpscGroupNumber() {
    return npscGroupNumber.get(inputData.hsrCategory);
}



// Extended tables, category 1 and 2 foods - FRASER

//     --> lookup cat1and2 energy

function getCategory1_2Energy() {
    return Math.floor((inputData.energy - 0.01) / energyIncrementCat1_2)
}

//     --> lookup cat1and2 satfat

function getCategory1_2SatFat() {
    i = 0;
    while (inputData.satFat >= satFatCat1_2[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat1and2 sodium

function getCategory1_2Sodium() {
    return Math.floor((inputData.sodium - 0.01) / sodiumIncrementCat1_2)
}

//     --> lookup cat1and2 totsug

function getCategory1_2TotSug() {
    i = 0;
    while (inputData.totalSugars >= totSugCat1_2[i+1]) {
        i++;
    }
    return i;
}



// Extended tables, category 3 foods - AHAD - DONE BY FRASER

//     --> lookup cat3 energy
function getCategory3Energy() {
    return Math.floor((inputData.energy - 0.01) / energyIncrementCat3)
}

//     --> lookup cat3 satfat
function getCategory3SatFat() {
    return Math.floor((inputData.satFat - 0.01) / satFatIncrementCat3)
}

//     --> lookup cat3 sodium
function getCategory3Sodium() {
    return Math.floor((inputData.sodium - 0.01) / sodiumIncrementCat3)
}

//     --> lookup cat3 totsug
function getCategory3TotSug() {
    i = 0;
    while (inputData.totalSugars >= totSugCat3[i+1]) {
        i++;
    }
    return i;
}



// Daily intake references - RILEY

//     --> lookup claim - not sure if we want claim to be int (1/0) or string (yes/no) but can easily swapped
function getClaim(){
    if (dailyIntakeReferences.get("claim") == 1){
        return "yes";
    } else {
        return "no"; 
    }
}

//     --> lookup A tipping point
function getTippingPoint(){
    return dailyIntakeReferences.get("tippingPoint");
}

//     --> lookup fruit/veg tipping point
function getFruitVegTippingPoint(){
    return dailyIntakeReferences.get("fruitVegTippingPoint");
}


// NPSC profiler points table C & extended FoPL profiler points table C - RILEY

//     --> lookup concFVNL
function getNpscPointsConcFVNL(){
    i = 0;
    while (inputData.concFruitVeg >= concFVNL[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup FVNL
function getNpscPointsFVNL(){
    i = 0;
    while (inputData.fvnl >= FVNL[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup foodsFibre
function getNpscPointsFoodsFibre(){
    i = 0;
    while (inputData.fibre >= foodsFibre[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup foodsProtein
function getNpscPointsFoodsProtein(){
    i = 0;
    while (inputData.protein >= foodsProtein[i+1]) {
        i++;
    }
    return i;
}
