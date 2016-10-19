const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: ${req.method} - ${req.url}`

    fs.appendFile('server.log', log + '\n')
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res, next) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is the welcome message'
    });
});

app.get('/about', (req, res, next)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res, next)=>{
    res.send('Error Handling Request');
})

app.listen(3000, () =>{
    console.log('Listening on port 3000')
});