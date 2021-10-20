"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firebaseConfig = require("./firebaseConfig");

// Import the functions you need from the SDKs you need
var app = (0, _app.initializeApp)(_firebaseConfig.firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;