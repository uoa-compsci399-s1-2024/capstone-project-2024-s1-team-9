import React, { useState } from 'react';
import Joi from 'joi';

// Define the Joi schema for input validation
const schema = Joi.object({
    foodName: Joi.string().required(),
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

const Calculator = ({ hsrCategory }) => {
    const [foodName, setFoodName] = useState("");
    const [company, setCompany] = useState("");
    const [energy, setEnergy] = useState("");
    const [saturatedFat, setSaturatedFat] = useState("");
    const [totalSugars, setTotalSugars] = useState("");
    const [sodium, setSodium] = useState("");
    const [fibre, setFibre] = useState("");
    const [protein, setProtein] = useState("");
    const [concFruitVeg, setConcFruitVeg] = useState("");
    const [fvnl, setFvnl] = useState("");
    const [loading, setLoading] = useState(false); 
    const [hsrScore, setHsrScore] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form data
        const { error } = schema.validate({
            foodName,
            company,
            energy,
            satFat: saturatedFat,
            totalSugars,
            sodium,
            fibre,
            protein,
            concFruitVeg,
            fvnl
        });

        if (error) {
            setError(error.details[0].message);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/hsr/input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hsrCategory,
                    foodName,
                    company,
                    energy: parseFloat(energy),
                    saturatedFat: parseFloat(saturatedFat),
                    totalSugars: parseFloat(totalSugars),
                    sodium: parseFloat(sodium),
                    fibre: parseFloat(fibre),
                    protein: parseFloat(protein),
                    concFruitVeg: parseFloat(concFruitVeg),
                    fvnl: parseFloat(fvnl),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form.');
            }

            const data = await response.json();
            setError(null);

            const scoreResponse = await fetch('/hsr/score');
            if (!scoreResponse.ok) {
                throw new Error('Failed to get HSR score.');
            }
            const scoreData = await scoreResponse.json();
            setHsrScore(scoreData.hsrProfilerScore);
            console.log('HSR score:', scoreData.hsrProfilerScore);
        } catch (error) {
            console.error('Error:', error);
            setError('Error occurred while submitting the form.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Food Name: </label>
                    <input
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Company: </label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Energy (kJ): </label>
                    <input
                        type="number"
                        value={energy}
                        onChange={(e) => setEnergy(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Saturated Fat (g): </label>
                    <input
                        type="number"
                        value={saturatedFat}
                        onChange={(e) => setSaturatedFat(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Total Sugars (g): </label>
                    <input
                        type="number"
                        value={totalSugars}
                        onChange={(e) => setTotalSugars(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sodium (mg): </label>
                    <input
                        type="number"
                        value={sodium}
                        onChange={(e) => setSodium(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fibre (g): </label>
                    <input
                        type="number"
                        value={fibre}
                        onChange={(e) => setFibre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Protein (g): </label>
                    <input
                        type="number"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Concentrate Fruit and Vegetable (%): </label>
                    <input
                        type="number"
                        value={concFruitVeg}
                        onChange={(e) => setConcFruitVeg(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>FVNL (%): </label>
                    <input
                        type="number"
                        value={fvnl}
                        onChange={(e) => setFvnl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Submit</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Calculator;
