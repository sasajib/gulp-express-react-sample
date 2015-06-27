var app = require('express')();
var logger = require('morgan');
var port = 3000;

app.use(logger('combined'));


app.get('/', function (request, response) {
    'use strict';
    response.end('Hello world');
});

app.get('/name/:userName', function (request, response) {
    'use strict';
    response.status(200);
    response.set('Content-Type', 'text/html');
    response.end('<h1>Hello  s' + request.params.userName + '</h1>');
});

app.listen(port, function () {
    'use strict';
    console.log(app.get('env'));
    console.info('express started...');
});


