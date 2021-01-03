const express = require('express');
const Process = require('../models/Process');
const User = require('../models/User');

const router = express.Router();

router.get('/dashboard', async (request, response) => {
    try {
        response.render('dashboard');
    } catch (error) {
        console.log(error);
    }
});

router.get('/processes', async (request, response) => {
    try {
        const dataProcess = await Process.find({ lawyer: '5fe766e5ad692520c4d88b68' }).populate('processes');

        response.render('processes', { dataProcess, lawyer: dataProcess[0].lawyer });
        console.log(dataProcess);
    } catch (error) {
        console.log(error);
    }
});

router.post('/processes/create', async (request, response) => {
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

    response.redirect('/adv/processes');

});

router.get('/users', async (request, response) => {
    try {
        const dataUser = await User.find({ lawyer: '5fe766e5ad692520c4d88b68' }).populate('users');
        console.log(dataUser);
        if(dataUser) {
            response.render('users', { dataUser, lawyer: dataUser[0].lawyer });
        } else {
            response.render('users');
        }

    } catch (error) {
        console.log(error);
        response.render('users');
    }
});

router.post('/users/create', async (request, response) => {
    const { fullName, email, cpf, password, role } = request.body;
    
    const newUser = new User({
        fullName: fullName,
        email: email,
        cpf: cpf,
        password: password,
        role: role,
        lawyer: '5fe766e5ad692520c4d88b68',
    });

    await newUser.save();

    response.redirect('/adv/users');

});

module.exports = router;
