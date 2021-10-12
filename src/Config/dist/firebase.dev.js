"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = require("firebase/app");

var _firestore = require("firebase/firestore");

var _firebaseConfig = require("./firebaseConfig");

// Import the functions you need from the SDKs you need
var app = (0, _app.initializeApp)(_firebaseConfig.firebaseConfig);

var _default = (0, _firestore.getFirestore)(app);

exports["default"] = _default;