const express = require('express');
const router = express.Router();

router.get('/client/signup', (req, res) => {
    try {
        res.render('auth-views/client-signup');
    } catch (error) {
        
    }
});

const verifyData = (req, res) => {
    const { fullName, email, cpf, password, confirmationPassword } = req.body;

    if(!fullName || !email || !cpf || !password || !confirmationPassword) {
        res.render('auth-views/client-signup', { errorMessage: 'Por favor, preencha todos os campos.' });
    }
}

router.post('/client/signup', async (req, res) => {
    try {
        const { fullName, email, cpf, password, confirmationPassword } = req.body;

        verifyData(req, res);

        // const newClient = new User({
        //     fullName,
        //     email,
        //     cpf,
        //     password,
        // });

        // await newClient.save();
        // res.redirect('/login');
    } catch (error) {
      console.log(error);  
    }
});

module.exports = router;
