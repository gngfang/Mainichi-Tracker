/* External Modules */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/* Internal Modules */

const controllers = require('./controllers');

/* Instanced Modules */
const app = express();

/* Port for server */

const PORT = 1000;

/* MiddlesWares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

/* App Configuration */
app.set('view engine', 'ejs')


/* ===Routes=== */

/* root route */

app.get('/', function (req, res) {
    res.render('home')
});

/* Account Route */
app.use('/accounts', controllers.account);

/* Transaction Route */
app.use('/transactions', controllers.transaction);

/* Server Bind */

app.listen(PORT, function () {
    console.log(`Server Running in Local Host ${PORT}`)
});


