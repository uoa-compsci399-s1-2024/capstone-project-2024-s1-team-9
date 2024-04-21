
// *** THIS FILE HAS ALL CALCULATION FUNCTIONS ***

// Setup express.js
const express = require('express');
const router = express.Router();

// Require lookup functions
const lookup = require("./lookups");

// Require input validator
const inputData = require("./inputValidator");

// Route to calculate HSR profiler score
router.get('/score', (req, res) => {
    console.log(inputData.hsrCategory);
    const hsrProfilerScore = calculateHSRStarPoints();
    res.send({ hsrProfilerScore });
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
    const num1 = calculateHSRProfilerScore() - lookup.getNum1(); 
    const num2 = lookup.getNum2();
    const num3 = lookup.getNum3();
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
function calculateWholeFoodPercentage(concentratedFruitVeg, fvnl) {
    return inputData.concFruitVeg + inputData.fvnl;
}

// Fruit Veg. Nuts, Pulses %
function calculateFVNPPercentage(concentratedFruitVeg, fvnl) {
    const num1 = inputData.fvnl + (2 * inputData.concFruitVeg);
    const num2 = num1 + (100 - inputData.concFruitVeg - inputData.fvnl);
    const result = 100 * (num1 / num2);
    return Math.round(result * 100) / 100;
}

// Baseline Energy Points
function calculateBaselineEnergyPoints() {
    if (lookup.getNpscGroupNumber() !== 3) {
        return lookup.getCategory1_2Energy();
    } else {
        return lookup.getCategory3Energy();
    }
}

// Baseline Sat Fat Points
function calculateBaselineSatFatPoints() {
    if (lookup.getNpscGroupNumber() !== 3) {
        return lookup.getCategory1_2SatFat();
    } else {
        return lookup.getCategory3SatFat();
    }
}

// Baseline Total Sugars Points
function calculateBaselineTotalSugarsPoints() {
    if (lookup.getNpscGroupNumber() !== 3) {
        return lookup.getCategory1_2TotSug();
    } else {
        return lookup.getCategory3TotSug();
    }
}

// Baseline Sodium Points
function calculateBaselineSodiumPoints() {
    if (lookup.getNpscGroupNumber() !== 3) {
        return lookup.getCategory1_2Sodium();
    } else {
        return lookup.getCategory3Sodium();
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
function calculateModifyingPointsFVNL(){
    if (allFruitVegConcentrated() == lookup.getClaim()){
        return lookup.getNpscPointsConcFVNL();
    } else {
        return lookup.getNpscPointsFVNL();
    }
}

// Modifying Points % Fibre
function calculateModifyingPointsFibre(){
    if (lookup.getNpscCategory() == 1){
        return 0;
    } else {
        return lookup.getNpscPointsFoodsFibre();
    }
}

// Modifying Points % Protein
function calculateModifyingPointsProtein(){
    return lookup.getNpscPointsFoodsProtein();
}

// Total Modifying Points (Table C)
function calculateModifyingPoints(){
    if (calculateTotalBaselinePoints() < lookup.getTippingPoint()){
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre() + calculateModifyingPointsProtein();
    } else if (calculateModifyingPointsFVNL() >= lookup.getFruitVegTippingPoint()){
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre() + calculateModifyingPointsProtein();
    } else {
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre();
    }
}


// export
module.exports = router;
