const express = require('express');
const Process = require('../models/Process');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard-adv', async (request, response) => {
    try {
        const data = await Process.find({ lawyer: '5fe766e5ad692520c4d88b68' }).populate('processes');

        response.render('dashboard-adv', { data, lawyer: data[0].lawyer });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/process/create', async (request, response) => {
    const { processNumber, complainer, claimed, description, status } = request.body;
    
    const newProcess = new Process({
        processNumber: processNumber,
        complainer: complainer,
        claimed: claimed,
        description: description,
        status: status,
        lawyer: '5fe766e5ad692520c4d88b68',
    });

    await newProcess.save();

    response.redirect('/dashboard-adv');

});

module.exports = router;
