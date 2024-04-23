// ************** ROUTES **************

// post input data --> line 13 ('/input')
// calculate hsr score --> line line 208 ('/score')

// Setup express.js
const express = require('express');
const router = express.Router();


// ************** INPUT **************

// Import input validator function
const validate = require("./inputValidator");

// Get input
var inputData;
router.post('/input', (req, res) => {
    const { error } = validate.validateInputData(req.body);
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
        fvnl: req.body.fvnl
    };

    inputData = data;

    res.send(inputData);
});


// ************** DATA LOOKUPS **************

// require data tables
const data = require("./data");

//     --> lookup star conversion divisor
function getStarConversionDivisor() {
    return data.starConversionDivisor.get(inputData.hsrCategory);
}

//     --> lookup num3
function getNum3(){
    return data.num3.get(inputData.hsrCategory);
}

//     --> lookup num2
function getNum2(){
    return data.num2.get(inputData.hsrCategory);
}


//     --> lookup num1
function getNum1(){
    return data.num1.get(inputData.hsrCategory); 
}



// AMMENDED lookups with simplified categories

//     --> lookup NPSC category if given HSR category
function getNpscCategory() {
    return data.npscCategory.get(inputData.hsrCategory);
}

//     --> lookup NPSC group number if given NPSC category
function getNpscGroupNumber() {
    return data.npscGroupNumber.get(inputData.hsrCategory);
}



// Extended tables, category 1 and 2 foods

//     --> lookup cat1and2 energy
function getCategory1_2Energy() {
    i = 0;
    while (inputData.energy >= data.energyCat1_2[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat1and2 satfat
function getCategory1_2SatFat() {
    i = 0;
    while (inputData.satFat >= data.satFatCat1_2[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat1and2 sodium
function getCategory1_2Sodium() {
    i = 0;
    while (inputData.sodium >= data.sodiumCat1_2[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat1and2 totsug
function getCategory1_2TotSug() {
    i = 0;
    while (inputData.totalSugars >= data.totSugCat1_2[i+1]) {
        i++;
    }
    return i;
}



// Extended tables, category 3 foods

//     --> lookup cat3 energy
function getCategory3Energy() {
    i = 0;
    while (inputData.energy >= data.energyCat3[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat3 satfat
function getCategory3SatFat() {
    i = 0;
    while (inputData.satFat >= data.satFatCat3[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat3 sodium
function getCategory3Sodium() {
    i = 0;
    while (inputData.sodium >= data.sodiumCat3[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup cat3 totsug
function getCategory3TotSug() {
    i = 0;
    while (inputData.totalSugars >= data.totSugCat3[i+1]) {
        i++;
    }
    return i;
}



// Daily intake references

//     --> lookup claim - not sure if we want claim to be int (1/0) or string (yes/no) but can easily swapped
function getClaim(){
    if (data.dailyIntakeReferences.get("claim") == 1){
        return "yes";
    } else {
        return "no"; 
    }
}

//     --> lookup A tipping point
function getTippingPoint(){
    return data.dailyIntakeReferences.get("tippingPoint");
}

//     --> lookup fruit/veg tipping point
function getFruitVegTippingPoint(){
    return data.dailyIntakeReferences.get("fruitVegTippingPoint");
}


// NPSC profiler points table C & extended FoPL profiler points table C

//     --> lookup concFVNL
function getNpscPointsConcFVNL(){
    i = 0;
    while (inputData.concFruitVeg >= data.concFVNL[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup FVNL
function getNpscPointsFVNL(){
    i = 0;
    while (inputData.fvnl >= data.FVNL[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup FVNL %
function getNpscPointsFVNLPercentage(fvnlPercentage){
    i = 0;
    while (fvnlPercentage >= data.FVNL[i+1]) {
        i++;
    }
    return Math.min(i, 8);
}

//     --> lookup foodsFibre
function getNpscPointsFoodsFibre(){
    i = 0;
    while (inputData.fibre >= data.foodsFibre[i+1]) {
        i++;
    }
    return i;
}

//     --> lookup foodsProtein
function getNpscPointsFoodsProtein(){
    i = 0;
    while (inputData.protein >= data.foodsProtein[i+1]) {
        i++;
    }
    return i;
}





// ************** CALCULATIONS **************

// Route to calculate HSR profiler score
router.get('/score', (req, res) => {
    const hsrProfilerScore = calculateHSRStarPoints() / 2;
    res.send({ hsrProfilerScore });
});

// Route to get rating image filename
router.get('/rating_image', (req, res) => {
    const hsrProfilerScore = calculateHSRStarPoints() / 2;
    res.send({rating_image: "" + hsrProfilerScore + "stars.svg"});
});



// HSR Profiler Score
function calculateHSRProfilerScore() {
    const baselinePoints = calculateTotalBaselinePoints();
    const modifyingPoints = calculateModifyingPoints();
    const finalHSRScore = baselinePoints - modifyingPoints;
    return finalHSRScore;
}


// HSR Star Points
function calculateHSRStarPoints() {
    const num1 = calculateHSRProfilerScore() - getNum1();
    const num2 = getNum2();
    const num3 = getStarConversionDivisor();
    const result = Math.round(10.499 - (num1 / num2 * num3));

    if (result < 1) {
        return 1;
    } else if (result < 11) {
        return result;
    } else {
        return 10;
    }
}


// All Fruit, Veg concentrated? - *checked ok*
function allFruitVegConcentrated() {
    if (inputData.concFruitVeg  > 0 && inputData.fvnl == 0) {
        return "yes";
    }
    return "no";
}

// Whole Food % --> NOT USED
function calculateWholeFoodPercentage(concentratedFruitVeg, fvnl) {
    return inputData.concFruitVeg + inputData.fvnl;
}

// Fruit Veg. Nuts, Pulses % --> *checked ok*
function calculateFVNLPercentage(concentratedFruitVeg, fvnl) {
    const num1 = inputData.fvnl + (2 * inputData.concFruitVeg);
    const num2 = num1 + (100 - inputData.concFruitVeg - inputData.fvnl);
    const result = 100 * (num1 / num2);
    return Math.round(result * 100) / 100;
}

// Baseline Energy Points - *checked ok*
function calculateBaselineEnergyPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2Energy();
    } else {
        return getCategory3Energy();
    }
}

// Baseline Sat Fat Points - *checked ok*
function calculateBaselineSatFatPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2SatFat();
    } else {
        console.log(getCategory3SatFat());
        return getCategory3SatFat();
    }
}

// Baseline Total Sugars Points - *checked ok*
function calculateBaselineTotalSugarsPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2TotSug();
    } else {
        return getCategory3TotSug();
    }
}

// Baseline Sodium Points - *checked ok*
function calculateBaselineSodiumPoints() {
    if (getNpscGroupNumber() !== 3) {
        return getCategory1_2Sodium();
    } else {
        return getCategory3Sodium();
    }
}

// Total Baseline Points (Table A) - *checked ok*
function calculateTotalBaselinePoints() {
    const energyPoints = calculateBaselineEnergyPoints();
    const satFatPoints = calculateBaselineSatFatPoints();
    const totalSugarsPoints = calculateBaselineTotalSugarsPoints();
    const sodiumPoints = calculateBaselineSodiumPoints();

    const total = energyPoints + satFatPoints + totalSugarsPoints + sodiumPoints;
    return total;
}

// Modifying Points % FVNL - *checked ok*
function calculateModifyingPointsFVNL(){
    if (allFruitVegConcentrated() == getClaim()){
        return getNpscPointsConcFVNL();
    } else {
        const fvnlPercentage = calculateFVNLPercentage();
        const result = getNpscPointsFVNLPercentage(fvnlPercentage);
        return result;
    }
}

// Modifying Points % Fibre - *checked ok*
function calculateModifyingPointsFibre(){
    if (getNpscGroupNumber() == 1){
        return 0;
    } else {
        return getNpscPointsFoodsFibre();
    }
}

// Modifying Points % Protein - *checked ok*
function calculateModifyingPointsProtein(){
    return getNpscPointsFoodsProtein();
}

// Total Modifying Points (Table C) - *checked ok*
function calculateModifyingPoints(){
    if (calculateTotalBaselinePoints() < getTippingPoint()){
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre() + calculateModifyingPointsProtein();
    } else if (calculateModifyingPointsFVNL() >= getFruitVegTippingPoint()){
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre() + calculateModifyingPointsProtein();
    } else {
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre();
    }
}


// export
module.exports = router;