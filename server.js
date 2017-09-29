const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ':' + req.method + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unabble to append to server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //   res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        pageTitle: 'About Page',
        welcomeMassege: 'Welcome to my Home Page',
        currentYear: new Date().getFullYear()
    })
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/bad', (req, res) => {
    res.send({
        erorrMassege: 'Unable to find this page'
    });

});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});