const mongoose = require('mongoose');
const User = require('./models/User');

const user = {
    fullName: 'Grazielli Pozzi',
    email: 'graziellipozzi@gmail.com',
    cpf: '1111111111',
    password: '123456',
    processes: '5fe76f166fa14e296961039f',
}

mongoose.connect('mongodb://localhost/project-2', { useUnifiedTopology: true, useNewUrlParser: true })
.then(async () => {
    await User.create(user);

    mongoose.connection.close();
})
.catch(error => {
    console.log(error);

    throw new Error('An error occurred when trying to connect with MongoDb');
});