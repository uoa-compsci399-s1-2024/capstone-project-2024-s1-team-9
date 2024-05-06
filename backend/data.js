
// *** THIS FILE HAS ALL THE DATA TABLES


// % flexed foods and end points based on new industry data
// ORIGINAL Lookups with extra categories

const starConversionDivisor = new Map();
starConversionDivisor.set("1D - Dairy beverages", 8.999);
starConversionDivisor.set("2 - Foods", 9.999);
starConversionDivisor.set("2D - Dairy foods", 9.999);
starConversionDivisor.set("3 - Fats, oils", 9.999);
starConversionDivisor.set("3D - Cheese", 9.999);
exports.starConversionDivisor = starConversionDivisor;

const num3 = new Map();
num3.set("1D - Dairy beverages", 6);
num3.set("2 - Foods", 29);
num3.set("2D - Dairy foods", 14);
num3.set("3 - Fats, oils", 45);
num3.set("3D - Cheese", 41);
exports.num3 = num3;


const num1 = new Map();
num1.set("1D - Dairy beverages", -2);
num1.set("2 - Foods", -15);
num1.set("2D - Dairy foods", -3);
num1.set("3 - Fats, oils", 10);
num1.set("3D - Cheese", 23);
exports.num1 = num1;

const num2 = new Map();

for (let key of num3.keys()) {
    const range = Math.abs(num3.get(key) - num1.get(key));
    num2.set(key, range);
}
exports.num2 = num2;

// AMENDED lookups with simplified categories

const npscGroupNumber = new Map();
npscGroupNumber.set("1D - Dairy beverages", 1);
npscGroupNumber.set("2 - Foods", 2);
npscGroupNumber.set("2D - Dairy foods", 2);
npscGroupNumber.set("3 - Fats, oils", 3);
npscGroupNumber.set("3D - Cheese", 3);
exports.npscGroupNumber = npscGroupNumber;

const npscCategory = new Map();
npscCategory.set("1D - Dairy beverages", "Beverages");
npscCategory.set("2 - Foods", "Food");
npscCategory.set("2D - Dairy foods", "Food");
npscCategory.set("3 - Fats, oils", "Fats/Oils/Cheese");
npscCategory.set("3D - Cheese", "Fats/Oils/Cheese");
exports.npscCategory = npscCategory;


// Extended tables, category 1 and 2 foods

const energyCat1_2 = [
    0, 335.01, 670.01, 1005.01, 1340.01, 1675.01, 2010.01, 2345.01,
    2680.01, 3015.01, 3350.01, 3685.01
]
exports.energyCat1_2 = energyCat1_2;

const sodiumCat1_2 = [
    0, 90.01, 180.01, 270.01, 360.01, 450.01, 540.01, 630.01,
    720.01, 810.01, 900.01, 990.01, 1080.01, 1170.01, 1260.01,
    1350.01, 1440.01, 1530.01, 1620.01, 1710.01, 1800.01, 1890.01,
    1980.01, 2070.01, 2160.01, 2250.01, 2340.01, 2430.01, 2520.01,
    2610.01, 2700.01
]
exports.sodiumCat1_2 = sodiumCat1_2;

const satFatCat1_2 = [
	0, 1.01, 2.01, 3.01, 4.01, 5.01, 6.01, 7.01, 8.01, 9.01, 
    10.01, 11.21, 12.51, 13.91, 15.51, 17.31, 19.31, 21.61, 
    24.11, 26.91, 30.01, 33.51, 37.41, 41.71, 46.61, 52.01, 
    58.01, 64.71, 72.31, 80.61, 90.01
]
exports.satFatCat1_2 = satFatCat1_2;

const totSugCat1_2 = [
	0, 5.01, 8.91, 12.81, 16.81, 20.71, 24.61, 28.51, 32.41, 
    36.31, 40.31, 44.21, 48.11, 52.01, 55.91, 59.81, 63.81, 
    67.71, 71.61, 75.51, 79.41, 83.31, 87.31, 91.21, 95.11, 99.01
]
exports.totSugCat1_2 = totSugCat1_2;


// Extended tables, category 3 foods

const energyCat3 = [
    0, 335.01, 670.01, 1005.01, 1340.01, 1675.01, 2010.01, 2345.01,
    2680.01, 3015.01, 3350.01, 3685.01
]
exports.energyCat3 = energyCat3;

const satFatCat3 = values = [
    0, 1.01, 2.01, 3.01, 4.01, 5.01, 6.01, 7.01, 8.01,
    9.01, 10.01, 11.01, 12.01, 13.01, 14.01, 15.01, 16.01,
    17.01, 18.01, 19.01, 20.01, 21.01, 22.01, 23.01, 24.01,
    25.01, 26.01, 27.01, 28.01, 29.01, 30.01
]

exports.satFatCat3 = satFatCat3;

const sodiumCat3 = [
    0, 90.01, 180.01, 270.01, 360.01, 450.01, 540.01, 630.01,
    720.01, 810.01, 900.01, 990.01, 1080.01, 1170.01, 1260.01,
    1350.01, 1440.01, 1530.01, 1620.01, 1710.01, 1800.01, 1890.01,
    1980.01, 2070.01, 2160.01, 2250.01, 2340.01, 2430.01, 2520.01,
    2610.01, 2700.01
]
exports.sodiumCat3 = sodiumCat3;

const totSugCat3 = [
    0, 5.01, 9.01, 13.51, 18.01, 22.51, 27.01, 31.01, 36.01, 40.01, 45.01
]
exports.totSugCat3 = totSugCat3;

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
exports.dailyIntakeReferences = dailyIntakeReferences;

// NPSC profiler points table C & extended FoPL profiler points table C
//NPSC points correlate to the index
const concFVNL = [
	0.00, 25.00, 43.00, 52.00, 63.00, 67.00, 80.00, 90.00, 99.50, 100 
]
exports.concFVNL = concFVNL;

const FVNL = [
	0.00, 40.01, 60.01, 67.01, 75.01, 80.01, 90.01, 95.01, 99.51, 100
]
exports.FVNL = FVNL;

//extended

const foodsFibre = [
	0.00, 0.91, 1.91, 2.81, 3.71, 4.71, 5.41, 6.31, 7.31, 8.41, 9.71, 11.21, 13.01, 15.01, 17.31, 20.01
]
exports.foodsFibre = foodsFibre;

const foodsProtein = [
	0.00, 1.61, 3.20, 4.81, 6.41, 8.01, 9.61, 11.61, 13.91, 16.71, 20.01, 24.01, 28.91, 34.71, 41.61, 50.01
]
exports.foodsProtein = foodsProtein;
