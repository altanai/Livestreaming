//rest calls for XMPP and wowza 

/*
jQuery.ajax({
         type: "GET",
         url: "http://54.237.199.172:8086/serverinfo",
         //data: contact.toJsonString(),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (data, status, jqXHR) {
              // do something
              alert("success"+data);
         },
     
         error: function (jqXHR, status) {            
              // error handler
              alert(status);
         }

     });*/

var getAuthToken = function (user, pass) {
    var token = "";
    if (user) {
        token = token + encodeURIComponent(user);
    }
    if (pass) {
        token = token + ":" + encodeURIComponent(pass);
    }
    token = $.base64.encode(token);
    return "Basic " + token;
};
/*
 $.ajax({
        //url: "https://" + this.hostname + "/alertusmw/services/rest/" + endPoint,
        
        url: "http://54.237.199.172:8086/serverinfo",
        //type: method,
        type: "GET",
        dataType: 'xml',
        //contentType: 'application/com.alertus-v1.0+json',
        //contentType : "application/x-www-form-urlencoded",
        cache:false,
        //username: this.username,
        //password: this.password,
	    //username: "wowza",
        // password: "i-8e4a5258",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",
                //"Basic " + $.base64.encode(this.username + ":" + this.password)
        		//getAuthToken(this.username, this.password)
        		"Basic d293emE6aS04ZTRhNTI1OA=="
        	);
        },
        //data: options.data
    }).done(function(response) {
        console.log("DONE: " + method + ' completed: ');
        console.log(response);
        options.success( response );
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("FAIL: " + method + " FAILED: " + textStatus + "\n" + "ERROR THROWN: " + errorThrown);
        console.log("jqXHR thing: ", jqXHR);
        options.error(jqXHR,textStatus,errorThrown);
    })
    .always(function(jqXHR, textStatus, errorThrown) {
        console.log("In the always", jqXHR, textStatus, errorThrown);
    });
*/

xmlToJson = function(xml) {
    var obj = {};
    if (xml.nodeType == 1) {                
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { 
        obj = xml.nodeValue;
    }            
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}


//-----------------------------XMPP-------------------------------------


function getXMPPAllUsers(callback){

    var result =null;
    $.ajax({
        url: "http://127.0.0.1:8068/xmppusers",
        type: "GET",
        dataType: 'JSON',
        cache:false,
    }).done(function(response) {
        result = response ;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        result = errorThrown ;
    })
    .always(function(jqXHR, textStatus, errorThrown) {
        result = xmlToJson(jQuery.parseXML(jqXHR.content));
        callback(result);
    });
}

function getXMPPUser(username , callback){
    var result =null;
    $.ajax({
        url: "http://127.0.0.1:8068/xmppuser/testuser",
        type: "GET",
        dataType: 'JSON',
        cache:false,
    }).done(function(response) {
        //options.success( response );
        result = response ;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //options.error( jqXHR,textStatus,errorThrown );
        result = errorThrown ;
    })
    .always(function(jqXHR, textStatus, errorThrown) {
        console.log("========================jqXR--------------");
        console.log( jqXHR);
        console.log("========================err--------------");
        console.log( errorThrown);
        //result=xmlToJson(jqXHR.content);
        result = xmlToJson(jQuery.parseXML(jqXHR.content));
        callback(result);
    });
   // return result;
}



//-----------------------------Wowza-------------------------------------


function getWowza(callback){

    var result =null;
    $.ajax({
        url: "http://127.0.0.1:8068/wowza-settings",
        type: "GET",
        dataType: 'JSON',
        cache:false,
    }).done(function(response) {
        result = response ;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        result = errorThrown ;
    })
    .always(function(jqXHR, textStatus, errorThrown) {
        result = xmlToJson(jQuery.parseXML(jqXHR.content));
        callback(result);
    });
}