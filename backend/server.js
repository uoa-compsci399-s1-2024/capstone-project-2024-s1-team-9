
// Setup express.js
const express = require('express');
// Added cors
const cors = require('cors');
const app = express();
app.use(express.json());

// Added cors to allow requests from both frontend service domains
const allowedOrigins = [
    'https://frontend-service-oq9p.onrender.com',
    'https://www.healthstarcalcnz.online',
    // For development
    'http://localhost',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {

        //allowing requests from no origin for local testing
        if (!origin) return callback(null, true);

        if (!allowedOrigins.includes(origin)) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin: ${origin}';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Main page
app.get('/hsr', (req, res) => {
    res.send('This will be the main page for HSR calculator');
});

// Non-dairy beverages calc page
app.get('/non_dairy_beverages', (req, res) => {
    res.send('This will be the page for non-dairy beverages calculator');
});

// Route to get input and calculate HSR profiler score
const calculations = require("./calculations");
app.use("/hsr", calculations);

// Route for non-dairy bevs input and calculate score
const nonDairyBevs = require("./nonDairyBevs");
app.use("/non_dairy_beverages", nonDairyBevs)

// Route to get the list of categories
app.get('/categories', (req, res) => {
    const categories = ["Non-dairy beverages", "Dairy beverages", "Foods", "Dairy foods", "Fats, oils", "Cheese"];
    res.json(categories);
});

// Listen on port 3000 if no other port given
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
