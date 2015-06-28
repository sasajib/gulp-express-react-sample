var express = require('express');
var logger = require('morgan');
var path = require('path');
var port = 3000;

var app = express();

app.use(logger('combined'));

app.use('/', express.static(path.join(__dirname)));

app.get('/', function (request, response) {
    'use strict';
    response.sendfile('src/client/index.html');
});

app.listen(port, function () {
    'use strict';
    console.log(app.get('env'));
    console.info('express started...');
});


