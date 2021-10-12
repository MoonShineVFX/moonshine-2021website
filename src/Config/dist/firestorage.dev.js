"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = require("firebase/app");

var _firebaseConfig = require("./firebaseConfig");

var _storage = require("firebase/storage");

// Initialize Firebase
var app = (0, _app.initializeApp)(_firebaseConfig.firebaseConfig);

var _default = (0, _storage.getStorage)(app);

exports["default"] = _default;