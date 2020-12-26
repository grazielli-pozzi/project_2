const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/project-2', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected with MongoDB'))
    .catch(error => {
        console.log(error);

        throw new Error('An error occurred when trying to connect with MongoDb');
    });

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', appRoutes);

app.listen(3000, () => console.log('App running on PORT 3000'));