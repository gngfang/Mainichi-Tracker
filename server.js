/* External Modules */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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











/* Server Bind */

app.listen(PORT, function () {
    console.log(`Server Running in Local Host ${PORT}`)
});


