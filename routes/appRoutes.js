const express = require('express');
const Process = require('../models/Process');

const router = express.Router();

router.get('/dashboard-adv', async (request, response) => {
    try {
        const data = await Process.find();

        response.render('dashboard-adv', { data });
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
    });

    await newProcess.save();

    response.redirect('/dashboard-adv');

});

module.exports = router;