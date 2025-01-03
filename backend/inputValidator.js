
// Joi used for data validation
const Joi = require('joi');

// Validate input data
function validateInputData(input) {
    const schema = Joi.object({
        hsrCategory: Joi.string().min(1).required(),
        food: Joi.string().min(0),
        company: Joi.string().min(0),
        energy: Joi.number().precision(1).min(0).max(10000).required(), //check if energy is rounded to nearest whole or not
        satFat: Joi.number().precision(1).min(0).max(100).required(),
        totalSugars: Joi.number().precision(1).min(0).max(100).required(),
        sodium: Joi.number().integer().min(0).max(100000).required(),
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
