
// *** THIS FILE HANDLES DATA INPUT AND VALIDATION ***

// Joi used for data validation
const Joi = require('joi');

// Setup express.js
const express = require('express');
const app = express();
app.use(express.json());


function validateInputData(input) {
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

    return schema.validate(input);
}

module.exports = {
    validateInputData
}