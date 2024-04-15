
// *** THIS FILE CONTAINS ALL DATA, LOOKUPS AND CALCULATIONS FOR NON-DAIRY BEVERAGES CALC ***


var inputDataNonDairyBevs;

app.post('/non-dairy-beverages/inputData', (req, res) => {
    const { error } = validateInputDataNonDairyBevs(req.body);
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

function validateInputDataNonDairyBevs(input) {
    const schema = Joi.object({
        product: Joi.string(),
        company: Joi.string(),
        energy: Joi.number().integer().min(0).max(350).required(),
        totalSugars: Joi.number().precision(1).min(0).max(20).required(),
        fvnl: Joi.number().precision(2).min(0).max(100).required(),
    });

    return schema.validate(input);
}

// Energy table
const energyNonDairyBevs = [
    0, 0, 31.01, 61.01, 91.01, 121.01, 151.01, 181.01, 211.01, 241.01, 271.01
]

// Total sugars table
const totSugNonDairyBevs = [
    0, 0.11, 1.61, 3.11, 4.61, 6.11, 7.61, 9.11, 10.61, 12.11, 13.61
]

// fvnl table
const fvnlNonDairyBevs = [
    0, 25, 33, 41, 49, 57, 65, 73, 81, 89, 96
]

// Score to star points
const scoreToStarPoints = [
    -10, 1, 2, 4, 6, 8, 10, 12
]

// Energy lookup
function getNonDairyBevsEnergy() {
    i = 0;
    while (inputDataNonDairyBevs.energy >= energyNonDairyBevs[i+1]) {
        i++;
    }
    return i;
}

// Total suagrs lookup
function getNonDairyBevsTotalSugars() {
    i = 0;
    while (inputDataNonDairyBevs.totalSugars >= totSugNonDairyBevs[i+1]) {
        i++;
    }
    return i;
}

// fvnl lookup
function getNonDairyBevsFvnl() {
    i = 0;
    while (inputDataNonDairyBevs.fvnl >= fvnlNonDairyBevs[i+1]) {
        i++;
    }
    return i;
}

// calculate points
function calculatePoints() {
    return getNonDairyBevsEnergy() + getNonDairyBevsTotalSugars() - getNonDairyBevsFvnl();
}

// star points calculation
function calculateNonDairyBevsStarPoints(score) {
    if (score == "Water") {
        return 10;
    }
    else if (score == "Flavoured water") {
        return 9;
    }
    else {
        i = 0;
        while (score >= scoreToStarPoints[i+1]) {
            i++;
        }
        return i;
    }
}

// Route to calculate non-dairy bevs score
app.get('/non-dairy-beverages/calculateScore', (req, res) => {
    const nonDairyBevsScore = calculateNonDairyBevsStarPoints();
    res.send({ nonDairyBevsScore });
});