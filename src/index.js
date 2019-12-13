const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const auth = require('./app/routes/auth');
const post = require('./app/routes/post');
const port = require('./config/config-file').PORT;
const DatabaseConfigService = require('./app/services/database-config.service');
const app = express();


//settings
app.set('port', process.env.PORT || port);

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//routes
app.use(auth);
app.use(post);

//static files

app.listen(app.get('port'), () => {
    config = new DatabaseConfigService();
    config.initializeApp();
    console.log('Listening on port: ' + app.get('port'));
});