var fs = require('fs');
var _static = require('node-static');
var logger = require('custom-logger').config({ level: 0 });
var mysql  = require('mysql');
var https = require('https');
//var socketio = require('socket.io');
var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var port = process.argv[2] || 8073;
//-------------------------------------property file ----------------------------------------

  var propertyOptions = {
    
    hostname: 'host',
    enviornment: 'production',
    hostip: 'localhost',
    hostport: '5555',

    dbip: 'localhost',
    dbname: 'un',
    dbport: 3306,
    dbuser: "root", 
    dbpass: 'altanaimysql',  // 1234qwer$
    dbdebug: false

  };

  var data = JSON.stringify(propertyOptions);

  fs.writeFile('./config.json', data, function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });




http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
