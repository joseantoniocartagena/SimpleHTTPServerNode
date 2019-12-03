const express = require('express'),
    app = express();

app.get('/', (req, res) => {
    res.end('Ok');
});

app.listen(8081);