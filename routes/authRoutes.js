const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateEncryptedPassword = require('../utils/passwordManager');

router.get('/client-signup', (req, res) => {
    try {
        res.render('auth-views/client-signup');
    } catch (error) {
        
    }
});

const verifyData = async (req, res) => {
    const { fullName, email, cpf, password, confirmationPassword } = req.body;

    if(!fullName || !email || !cpf || !password || !confirmationPassword) {
        const errors = {
            fullNameError: !fullName ? 'Campo nome obrigatório' : undefined,
            emailError: !email ? 'Campo email obrigatório' : undefined,
            cpfError: !cpf ? 'Campo CPF obrigatório' : undefined,
            passwordError: !password ? 'Campo senha obrigatório' : undefined,
            confirmationPasswordError: !confirmationPassword ? 'Campo confirmação de senha obrigatório' : undefined,
        }

        console.log(errors);
        res.render('auth-views/client-signup', errors);

        return false;
    }

    if(password.length < 6) {
        const errors = {
            passwordError: password.length < 6 ? 'A senha deve ter, pelo menos, 6 caracteres' : undefined,
        }

        console.log(errors);
        res.render('auth-views/client-signup', errors);

        return false;
    }

    if(!(password === confirmationPassword)) {
        const errors = {
            passwordError: 'Senhas não conferem',
            confirmationPasswordError: 'Senhas não conferem',
        };

        console.log(errors);
        res.render('auth-views/client-signup', errors);

        return false;
    }

    const userEmailExists = await User.find({ email });
    const userCpfExists = await User.find({ cpf });

    if(userEmailExists.length > 0 || userCpfExists.length > 0) {
        const errors = {
            emailError: userEmailExists.length > 0 ? 'Email já cadastrado' : undefined,
            cpfError: userCpfExists.length > 0 ? 'CPF já cadastrado' : undefined,
        };

        res.render('auth-views/client-signup', errors);

        return false;
    }

    return true;
}

router.post('/client-signup', async (req, res) => {
    try {
        const { fullName, email, cpf, password, confirmationPassword } = req.body;

        const isDataValid = await verifyData(req, res);

        if(!isDataValid) return;

        const newClient = new User({
            fullName,
            email,
            cpf,
            password: await generateEncryptedPassword(password),
        });

        console.log(newClient);

        await newClient.save();
        res.redirect('/client-login');

    } catch (error) {
      console.log(error);
    }
});

router.get('/client-login', async (req, res) => {
    res.render('auth-views/client-login')
});

module.exports = router;
