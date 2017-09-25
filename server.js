const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();


// Tell Express that we want to use partial for Handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// MIDDLEWARE

// For logging
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log + '\n');

  next();
})

// For maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));
// Register some helpers for hbs
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
  response.render('welcome.hbs', {
    pageTitle: 'Welcome Page',
    welcome: 'Welcome to my server',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad Request!'
  });
});


app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

