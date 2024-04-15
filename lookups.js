
// *** THIS FILE HAS THE FUNCTIONS TO LOOKUP DATA FROM TABLES ***


// % flexed foods and end points based on new industry data

//     --> lookup num3
function getNum3(){
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



// AMMENDED lookups with simplified categories

//     --> lookup NPSC category if given HSR category
function getNpscCategory() {
    return npscCategory.get(inputData.hsrCategory);
}

//     --> lookup NPSC group number if given NPSC category
function getNpscGroupNumber() {
    return npscGroupNumber.get(inputData.hsrCategory);
}



// Extended tables, category 1 and 2 foods

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



// Extended tables, category 3 foods

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



// Daily intake references

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


// NPSC profiler points table C & extended FoPL profiler points table C

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