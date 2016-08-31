define({ "api": [
  {
    "type": "get",
    "url": "/user/:email",
    "title": "Get user details",
    "name": "Get_User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The emailid of user</p> "
          }
        ]
      }
    },
    "description": "<p>get user details based on email</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/user/:email"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/get-all-users/",
    "title": "All users details",
    "name": "Get_user",
    "group": "User",
    "description": "<p>get all users details</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/get-all-user"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/:email",
    "title": "Set user details",
    "name": "Set_user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The emailid of user</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The to be updates username of user</p> "
          }
        ]
      }
    },
    "description": "<p>set details of a user based on email</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/user/:email"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/wowza-settings",
    "title": "Get wowza details",
    "name": "Get_wowza_server_info",
    "group": "Wowza",
    "description": "<p>get wowza-server settings</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/wowza-settings"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "Wowza"
  },
  {
    "type": "get",
    "url": "/xmppuser",
    "title": "Get user details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>username</p> ",
            "optional": false,
            "field": "unique",
            "description": "<p>username</p> "
          }
        ]
      }
    },
    "name": "Get_XMPP_User",
    "group": "XMPP",
    "description": "<p>get one users in XMPP with details</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/xmppuser/"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "XMPP"
  },
  {
    "type": "get",
    "url": "/xmppusers",
    "title": "Get all users",
    "name": "Get_XMPP_Users",
    "group": "XMPP",
    "description": "<p>get all users in XMPP with details</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/xmppusers"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "XMPP"
  },
  {
    "type": "get",
    "url": "/xmpp-settings",
    "title": "Get XMPP Settings",
    "name": "Get_XMPP_settings",
    "group": "XMPP",
    "description": "<p>get all sett8ings</p> ",
    "sampleRequest": [
      {
        "url": "http://127.0.0.1:8068/xmpp-settings"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "XMPP"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_altanaibisht_broadcastingsolution_mobile_proxyserver_doc_main_js",
    "groupTitle": "_home_altanaibisht_broadcastingsolution_mobile_proxyserver_doc_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p> "
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./main.js",
    "group": "_home_altanaibisht_broadcastingsolution_mobile_proxyserver_main_js",
    "groupTitle": "_home_altanaibisht_broadcastingsolution_mobile_proxyserver_main_js",
    "name": ""
  }
] });