
// *** THIS FILE HAS ALL CALCULATION FUNCTIONS ***


// HSR Profiler Score

function calculateHSRProfilerScore() {  
    const category = inputData.hsrCategory;
    const baselinePoints = calculateTotalBaselinePoints();
    // modifyingPoints include (HSR V points) (HSR P points if eligible) (HSR F points if eligible)
    const modifyingPoints = calculateModifyingPoints();  // function needs implementation
    const finalHSRScore = baselinePoints - modifyingPoints;
    return finalHSRScore;
}

// Route to calculate HSR profiler score
app.get('/calculateHSRProfilerScore', (req, res) => {
    const hsrProfilerScore = calculateHSRProfilerScore();
    res.send({ hsrProfilerScore });
});


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