define({ "api": [
  {
    "type": "get",
    "url": "/get-all-sessions/",
    "title": "Get all session details",
    "name": "GetAllSessionDetails",
    "group": "Session",
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "Session"
  },
  {
    "type": "get",
    "url": "/new_session/",
    "title": "Get a new session",
    "name": "GetSession",
    "group": "Session",
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "Session"
  },
  {
    "type": "get",
    "url": "/session_details/",
    "title": "Get the session details",
    "name": "GetSessionDetails",
    "group": "Session",
    "sampleRequest": [
      {
        "url": "/get-session-details/:userid"
      }
    ],
    "version": "0.0.0",
    "filename": "./altanai.js",
    "groupTitle": "Session"
  },
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
        "url": "/user/:email"
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
    "description": "<p>. set details of a user based on email</p> ",
    "sampleRequest": [
      {
        "url": "/user/:email"
      }
    ],
    "version": "0.0.0",
    "filename": "./miljulapi.js",
    "groupTitle": "User"
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
    "group": "_home_altanaibisht_webrtcWSwksppace_miljul_CodeBasemiljul_code_api_doc_main_js",
    "groupTitle": "_home_altanaibisht_webrtcWSwksppace_miljul_CodeBasemiljul_code_api_doc_main_js",
    "name": ""
  }
] });