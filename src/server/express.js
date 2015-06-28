var express = require('express');
var logger = require('morgan');
var path = require('path');
var port = 3000;

var app = express();

app.use(logger('combined'));

var rootDir = path.join(__dirname + '/../', 'client');
var bowerPath = path.join(__dirname + '/../../', 'bower_components');

app.use('/', express.static(rootDir));
app.use('/bower_components', express.static(bowerPath));

app.get('/', function (request, response) {
    'use strict';
    response.sendFile('index.html', {root: rootDir});
});

app.listen(port, function () {
    'use strict';
    console.log(app.get('env'));
    console.info('express started...');
});


