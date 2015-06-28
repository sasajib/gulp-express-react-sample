var express = require('express');
var logger = require('morgan');
var path = require('path');
var port = 3000;

var app = express();

app.use(logger('combined'));

var rootDir = path.join(__dirname + '/../', 'client');
app.use('/', express.static(rootDir));

app.get('/', function (request, response) {
    'use strict';
    response.sendFile('index.html', {root: rootDir});
});

app.listen(port, function () {
    'use strict';
    console.log(app.get('env'));
    console.info('express started...');
});


