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
var port = process.argv[2] || 8070;
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



//-------------------------------------DB management ------------------------------------

//Create the MySQL Pool
/*var pool = mysql.createPool({
    connectionLimit : 100, //important
    host        : propertyOptions.dbip,
    port        : propertyOptions.dbport,
    user        : propertyOptions.dbuser,
    password    : propertyOptions.dbpass,
    database    : propertyOptions.dbname,
    debug       : propertyOptions.dbdebug
});

var lib= {};


lib.create = function(data, callback){
    
    pool.getConnection(function(err, connection){
        
        var dataForTable  = [var1,var2,var3,new Date(), '', 1];
        
        connection.query('INSERT INTO table ( field1 ,field2 ,field3, field4) value (? , ? , ?, ?)', dataForTable, 
            function(err, rows){    
                if(!err && rows.affectedRows == 1)  {
                    callback();                         
                }else{
                    callback(err,null);
                }
            });

        connection.release();
    }); 
};


lib.isPresent = function(data, callback){

    var flag=false;

    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM table WHERE val like ?', [data.var],  
        function(err, rows , fields){ 
            
            if(!err && rows.length > 0){
                flag=true;
                callback(flag);
            }
            else{
                callback(flag);
            }
       });
    
       connection.release();       
    
    });
};


lib.updateSessionHistoryUsers = function(data,callback){

    pool.getConnection(function(err, connection){
        
        connection.query('SELECT * FROM table WHERE val like ? AND anotherval = 1', [data.var],  
        function(err, rows , fields){ 
            if(!err && rows.length > 0){
                connection.query('UPDATE table SET  ? WHERE channel like ? AND anotherval = 1', 
                    [ { 
                        field1: data.var1,
                        field2: data.var2
                       }, 
                       data.var
                    ],
                    function(err, rows){
                        callback(err, rows);
                    });
            };
       });
    
       connection.release();       
    
    });
};


lib.read = function(data, callback){

    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM table WHERE val like ?', [data.var],  
        function(err, rows , fields){ 
            if(!err && rows.length > 0){
                callback(true, rows[0].field1);
            }
            else{
                callback(false, " " ," " ," " ," "," "," ");
            }
       });
    
       connection.release();       
    
    });
};

module.exports = lib;*/

//-------------------------------start the file server ------------------------------------

/*var file = new _static.Server('', {
    cache: 3600,
    gzip: true,
    indexFile: "index.html"
});

*/
/*var options = {
  key: fs.readFileSync('ssl/sm.key'),
  cert: fs.readFileSync('ssl/sm.crt'),
  ca: fs.readFileSync('ssl/sm.crt'),
};
*/

//-------------------------------start the https web server ------------------------------------

//start with secure options
/*var app = https.createServer(options, function(request, response){
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();     
});

*/

/*//start w/o secure options
var requestListener = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(index.html);
}

var http = http.createServer(requestListener);
http.listen(8070);
logger.info('Web Server started, waiting for connections...' );*/


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

//-------------------------------start the socketio server ------------------------------------

/*var io = socketio.listen(app, {
    log: false,
    origins: '*:*'
});

io.set('transports', [
    'websocket'
]);

var channels = {};

io.sockets.on('connection', function (socket) {
    if (!io.isConnected) {
        io.isConnected = true;
    }
    socket.on('presence', function (data) {
        logger.info('Socket received - presence ---> ', data.val);
        socket.emit('presence', 'yes');

    });
   
});

*/

