//loads express
const express = require('express');

//loads handlebars/hbs
const hbs = require('hbs');

//loads fs
const fs = require('fs');

//create a new express app; no arguments needed to be passed in to express, we configure things below
var app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n", (err) => {
       if (err) {
           console.log('Unable to append to server log.');
       } 
    });
    next();
});

//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//register a handler--this lets us set up a handler for an http request
//first argument is the url, since we are using the root page we can just put '/'
//the second is tells express what to send back to the person that made the request
//--> this function gets called with two arguments, which are important to how express works
//--> the first is req(uest), which stores information about the request coming in (headers, body information, method, path)
//--> the seocond res(ponse) has a bunch of methods available to customize the response
//--> for now just using send to send information back to te request
app.get('/', (req, res) => {
//    res.send('<h1>Hello Express!</h1>');
//    res.send({
//        name: 'David',
//        likes: [
//            'biking',
//            'hiking'
//        ]
//    });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome Home'
    })
})


//Set up responses for new pages
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

// must call app.listen to bind the app to a port on our machine
// port 3000 is a common port for local development on a machine
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});