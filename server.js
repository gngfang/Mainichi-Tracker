/* External Modules */
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

/* Internal Modules */
const controllers = require('./controllers');

/* Instanced Modules */
const app = express();

/* Port for server */
const PORT = 1000;

/* MiddlesWares */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

/* App Configuration */
app.set('view engine', 'ejs');

/* Session Configuration */
app.use(session({
    store: new MongoStore({
        url: "mongodb://localhost:27017/tracker"

    }),
    secret: "Mainichi means everyday",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    },

})
);

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


