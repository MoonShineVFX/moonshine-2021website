"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStorage = void 0;

var _react = require("react");

var _reactImageFileResizer = _interopRequireDefault(require("react-image-file-resizer"));

var _firestorage = _interopRequireDefault(require("../Config/firestorage"));

var _storage = require("firebase/storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useStorage = function useStorage(file) {
  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      url = _useState6[0],
      setUrl = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      rename = _useState8[0],
      setRename = _useState8[1];

  var resizeFile = function resizeFile(file) {
    return new Promise(function (resolve) {
      _reactImageFileResizer["default"].imageFileResizer(file, 500, 300, "JPEG", 80, 0, function (uri) {
        resolve(uri);
      }, "file");
    });
  }; // runs every time the file value changes
  // 應該先等按下確認後地上傳圖片
  // 選擇圖片後先顯示給使用者看 但還沒上傳 然後按下確定再上傳


  (0, _react.useEffect)(function () {
    if (file) {
      // storage ref
      (function _callee() {
        var newTimeName, image, storageRef, uploadTask;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newTimeName = Date.now();
                _context.next = 3;
                return regeneratorRuntime.awrap(resizeFile(file));

              case 3:
                image = _context.sent;
                _context.next = 6;
                return regeneratorRuntime.awrap((0, _storage.ref)(_firestorage["default"], 'data/' + newTimeName + '.jpg'));

              case 6:
                storageRef = _context.sent;
                uploadTask = (0, _storage.uploadBytesResumable)(storageRef, image);
                uploadTask.on('state_changed', function (snapshot) {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                  console.log('Upload is ' + progress + '% done');
                  setProgress(progress);

                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;

                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                }, function (error) {
                  // Handle unsuccessful uploads
                  setError(error);
                }, function () {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  (0, _storage.getDownloadURL)(uploadTask.snapshot.ref).then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL);
                    setRename(newTimeName + '.jpg');
                  });
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        });
      })();
    }
  }, [file]);
  return {
    progress: progress,
    url: url,
    error: error,
    rename: rename
  };
};

exports.useStorage = useStorage;