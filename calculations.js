
// *** THIS FILE HAS ALL CALCULATION FUNCTIONS ***

// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());

// Get input
const { inputData } = require("./app");

// HSR Profiler Score
function calculateHSRProfilerScore() {  
    const category = inputData.hsrCategory;
    const baselinePoints = calculateTotalBaselinePoints();
    // modifyingPoints include (HSR V points) (HSR P points if eligible) (HSR F points if eligible)
    const modifyingPoints = calculateModifyingPoints();
    const finalHSRScore = baselinePoints - modifyingPoints;
    return finalHSRScore;
}


// HSR Star Points
function calculateHSRStarPoints() {
    const num1 = getNum1();
    const num2 = getNum2();
    const num3 = getNum3();
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
function calculateModifyingPointsFVNL(){
    if (allFruitVegConcentrated() == getClaim()){
        return getNpscPointsConcFVNL();
    } else {
        return getNpscPointsFVNL();
    }
}

// Modifying Points % Fibre
function calculateModifyingPointsFibre(){
    if (getNpscCategory() == 1){
        return 0;
    } else {
        return getNpscPointsFoodsFibre();
    }
}

// Modifying Points % Protein
function calculateModifyingPointsProtein(){
    return getNpscPointsFoodsProtein();
}

// Total Modifying Points (Table C)
function calculateModifyingPoints(){
    if (calculateTotalBaselinePoints() < getTippingPoint()){
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre() + calculateModifyingPointsProtein();
    } else if (calculateModifyingPointsFVNL() >= getFruitVegTippingPoint()){
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre() + calculateModifyingPointsProtein();
    } else {
        return calculateModifyingPointsFVNL() + calculateModifyingPointsFibre();
    }
}

module.exports = {
    calculateHSRProfilerScore
}