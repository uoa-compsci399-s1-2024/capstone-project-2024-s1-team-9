
// *** THIS FILE HAS THE FUNCTIONS TO LOOKUP DATA FROM TABLES ***

// require data tables
const data = require("./data");

// Get input
var input = require("./calculations");
var inputData = input.hsrCategory;

// % flexed foods and end points based on new industry data

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
    return Math.floor((inputData.energy - 0.01) / data.energyIncrementCat1_2)
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
    return Math.floor((inputData.sodium - 0.01) / data.sodiumIncrementCat1_2)
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
    return Math.floor((inputData.energy - 0.01) / data.energyIncrementCat3)
}

//     --> lookup cat3 satfat
function getCategory3SatFat() {
    return Math.floor((inputData.satFat - 0.01) / data.satFatIncrementCat3)
}

//     --> lookup cat3 sodium
function getCategory3Sodium() {
    return Math.floor((inputData.sodium - 0.01) / data.sodiumIncrementCat3)
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

// export
module.exports = {
    getNum1,
    getNum2,
    getNum3,
    getNpscCategory,
    getNpscGroupNumber,
    getCategory1_2Energy,
    getCategory1_2SatFat,
    getCategory1_2Sodium,
    getCategory1_2TotSug,
    getCategory3Energy,
    getCategory3SatFat,
    getCategory3Sodium,
    getCategory3TotSug,
    getClaim,
    getTippingPoint,
    getFruitVegTippingPoint,
    getNpscPointsConcFVNL,
    getNpscPointsFVNL,
    getNpscPointsFoodsFibre,
    getNpscPointsFoodsProtein
};