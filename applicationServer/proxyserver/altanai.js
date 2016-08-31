var assert  = require('assert');
var restify = require('restify');
var fs      = require('fs');
var logger  = require('custom-logger').config({ level: 0 });
var mysql   = require('mysql');
var http    = require("http");
//var parser = require('xml2json');
var parseString = require('xml2js').parseString;
//var request = require('request');



//------------------------------property files ----------------------


  var fs = require('fs');

  var data = fs.readFileSync('config.json'),
      properties;

  try {
    properties = JSON.parse(data);
    console.dir(properties);
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
  }

//------------------------------ DB files --------

//Create the MySQL Pool
/*var pool = mysql.createPool({
    connectionLimit : 100, //important
    host        :  properties.hostname,
    port        :  properties.dbport,
    user        :  properties.dbuser,
    password    :  properties.dbpass,
    database    :  properties.dbname,
    debug       :  properties.dbdebug
});

var lib= {};

//creating a new entry into session hostory table
lib.createSessionHistory = function(data, callback){
    
    var roomName = data.room;
    var userName = data.name;
    var userEmail = data.email;

    pool.getConnection(function(err, connection){

        console.log("createSessionHistory - Create new roomName "+ roomName + ' '+ userName+ ' '+userEmail );
        
        var sessionhistoryData  = [roomName,userEmail,userName,new Date(), '', 1];
        
        connection.query('INSERT INTO sessionhistory ( channel ,useremail , username , startAt , endAt ,  status) value (? , ? , ?, ?, ?, ?)', sessionhistoryData, 
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

//reading session hotory for finding the channels presence 
lib.readSessionHistory = function(channel, callback){
    console.log(" read session history for ", channel );
    var presenceflag=false;

    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM sessionhistory WHERE channel like ?', [channel],  
        function(err, rows , fields){ 
            
            if(!err && rows.length > 0){
                console.log("search in sessionhistory for ", channel  , "ran sucessfully ");
                presenceflag=true;
                callback(presenceflag);
            }
            else{
                console.log("search in sessionhistory for ", channel  , " was unsucessfull ");
                callback(presenceflag);
            }
       });
    
       connection.release();       
    
    });
};

//for updating the  users as they join a channel
lib.updateSessionHistoryUsers = function(data,callback){
    var roomName = data.room;
    var userName = data.name;
    var userEmail = data.email;

    pool.getConnection(function(err, connection){
        
        console.log("updateSessionHistoryUsers - Join existing roomName", roomName);

        connection.query('SELECT * FROM sessionhistory WHERE channel like ? AND status = 1', [roomName],  
        function(err, rows , fields){ 
            console.log("rows", rows);
            if(!err && rows.length > 0){
                connection.query('UPDATE sessionhistory SET  ? WHERE channel like ? AND status = 1', 
                    [ { 
                        useremail:  userEmail+","+rows[0].useremail,
                        username: userName+","+rows[0].username
                       }, 
                       roomName
                    ],
                    function(err, rows){
                        callback(err, rows);
                    });
            };
       });
    
       connection.release();       
    
    });
};

//for finding the status of the channels mapped into session history
lib.getSessionHistory = function(channel, callback){
    console.log(" read session history for ", channel );

    pool.getConnection(function(err, connection){
        connection.query('SELECT * FROM sessionhistory WHERE channel like ?', [channel],  
        function(err, rows , fields){ 
            
            if(!err && rows.length > 0){
                console.log("search in sessionhistory for ", channel  , "ran sucessfully ");
                callback(true, rows[0].channel ,rows[0].username , rows[0].useremail , rows[0].startAt , rows[0].endAt, rows[0].status);
            }
            else{
                console.log("search in sessionhistory for ", channel  , " was unsucessfull ");
                callback(false, " " ," " ," " ," "," "," ");
            }
       });
    
       connection.release();       
    
    });
};

module.exports = lib;*/

//-------------------------------------------- SESSION -------------------------------------

/**
 * @api {get} /user/:email Get user details 
 *
 * @apiName Get User
 * @apiGroup User
 * @apiParam {String} email  The emailid of user 
 * @apiDescription 
 * get user details based on email
 *
 * @apiSampleRequest http://127.0.0.1:8068/user/:email
 *
 */
function getUser() { 
  res.setHeader('Access-Control-Allow-Origin','*');
  return "altanai"; 
}

/**
  *
  * @api {post}  /user/:email  Set user details
  *
  * @apiName Set user 
  * @apiGroup User
  * @apiParam {String} email  The emailid of user 
  * @apiParam {String} name  The to be updates username of user 
  * @apiDescription
  * set details of a user based on email
  *
  * @apiSampleRequest http://127.0.0.1:8068/user/:email
  *
  */
function postUser(userid) {
  res.setHeader('Access-Control-Allow-Origin','*');
	return "rvefwfwe";
}


/**
 * @api {get} /get-all-users/ All users details  
 *
 * @apiName Get user
 * @apiGroup User
 * @apiDescription 
 * get all users details 
 *
 * @apiSampleRequest http://127.0.0.1:8068/get-all-user
 *
 */
function getAllUsers(req, res, callback) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json({ "type":true, "name": "allsessions", });
    callback();
}


//-----------------------------REST client XMPP ----------------------------
var auth = 'Basic ' + new Buffer('admin' + ':' + 'admin').toString('base64');




/**
 * @api {get} /xmppusers Get all users 
 *
 * @apiName Get XMPP Users
 * @apiGroup XMPP
 * @apiDescription 
 * get all users in XMPP with details
 *
 * @apiSampleRequest http://127.0.0.1:8068/xmppusers
 *
 */
function getXmppUsers(req,res,callback){
    var options = {
      host: 'tfxserver.above-inc.com',
      port: 9090,
      path: '/plugins/restapi/v1/users',
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
        'Authorization' : auth,
      }
    };

    var xmppreq = http.request(options, function(xmppres) {

        var result=null;

        xmppres.on('data', function (chunk) {
            if(result!=undefined && result!=null)
                result = result + chunk;
            else
                result=chunk;
        });

        xmppres.on('end', function() {
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json({ 
                "type":true, 
                "headers": xmppres.headers,
                "content": String(result)
            });
            callback();
        });
    });

    xmppreq.on('error', function(e) {
        return "no more";
    });

  xmppreq.end();
}

/**
 * @api {get} /xmppuser Get user details 
 * @apiParam {username} username
 *
 * @apiName Get XMPP User
 * @apiGroup XMPP
 * @apiDescription 
 * get one users in XMPP with details
 *
 * @apiSampleRequest http://127.0.0.1:8068/xmppuser/
 *
 */
function getXMPPUser(req,res,callback){

    var options = {
          host: 'tfxserver.above-inc.com',
          port: 9090,
          path: '/plugins/restapi/v1/users/'+req.params.username,
          method: 'GET',
          headers: {
            'Content-Type': 'application/xml',
            'Authorization' : auth,
          }
        };

    var xmppreq = http.request(options, function(xmppres) {
        
        var result;

        xmppres.on('data', function (chunk) {
            if(result!=undefined && result!=null)
                result = result+ chunk;
            else
                result=chunk;
        });

        xmppres.on('end', function() {
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json({ 
                "type":true, 
                "headers": xmppres.headers,
                "content": String(result)
            });
            callback();
        });

      });

      xmppreq.on('error', function(e) {
        return "no more";
      });

    xmppreq.end();
    
}

/**
 * @api {get} /xmpp-settings Get XMPP Settings  
 *
 * @apiName Get XMPP settings
 * @apiGroup XMPP
 * @apiDescription 
 * get all sett8ings
 *
 * @apiSampleRequest http://127.0.0.1:8068/xmpp-settings
 *
 */
function getXmppSettings(req,res,callback){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.json({ "type":true, "name": "amjcbhjsfbhjbfj", });
    callback();
}

//-----------------------------REST client Wowza ----------------------------
var authWowza = 'Basic ' + new Buffer('wowza' + ':' + 'i-8e4a5258').toString('base64');

/**
 * @api {get} /wowza-settings Get wowza details 
 *
 * @apiName Get wowza server info
 * @apiGroup Wowza
 * @apiDescription 
 * get wowza-server settings
 *
 * @apiSampleRequest http://127.0.0.1:8068/wowza-settings
 *
 */

function getWowzaServerInfo(req,res,callback){

    var options = {
      host: '54.237.199.172',
      port: 8086,
      path: '/serverinfo',
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
        'Authorization' : authWowza,
      }
    };

    var wowzareq = http.request(options, function(wowzares) {

        var result=null;

        wowzares.on('data', function (chunk) {

            //console.log("data getWowzaServerInfo"+chunk);
            if(result!=undefined && result!=null)
                result = result + chunk;
            else
                result=chunk;
        });

        wowzares.on('end', function() {
            //console.log("end getWowzaServerInfo");
            //console.log(result);
            res.setHeader('Access-Control-Allow-Origin','*');
            res.json({ 
                "type":true, 
                "headers": wowzares.headers,
                "content": String(result)
            });
            callback();
        });
    });

    wowzareq.on('error', function(e) {
        //console.log("error bgetWowzaServerInfo"+e);
        return "no more";
    });

  wowzareq.end();
}


//-----------------------------------REST server --------------------------------

var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get('/user/:name',getUser);
server.post('/user/:name',postUser);
server.get('/all-users',getAllUsers);

server.get('/xmppusers',getXmppUsers);
server.get('/xmppuser/:username',getXMPPUser);
server.get('/xmpp-settings',getXmppSettings );

server.get('/wowza-settings',getWowzaServerInfo);

server.listen(8068, function() {
  console.log('%s listening at %s', server.name, server.url);
});




// Changes XML to JSON
function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }

    console.log(obj);

    return obj;
};