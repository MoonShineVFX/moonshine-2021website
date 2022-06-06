"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImageUrl = exports.useStorage = void 0;

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

  var resizeFile = function resizeFile(file) {
    return new Promise(function (resolve) {
      _reactImageFileResizer["default"].imageFileResizer(file, 500, 283, "JPEG", 100, 0, function (uri) {
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
        var image, storageRef, uploadTask;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(resizeFile(file.file));

              case 2:
                image = _context.sent;
                _context.next = 5;
                return regeneratorRuntime.awrap((0, _storage.ref)(_firestorage["default"], file.folder + file.filename));

              case 5:
                storageRef = _context.sent;
                uploadTask = (0, _storage.uploadBytesResumable)(storageRef, image);
                uploadTask.on('state_changed', function (snapshot) {
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

                    default:
                      console.log(' ');
                  }
                }, function (error) {
                  setError(error);
                }, function () {
                  (0, _storage.getDownloadURL)(uploadTask.snapshot.ref).then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    setUrl(downloadURL);
                  });
                });

              case 8:
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
    error: error
  };
};

exports.useStorage = useStorage;

var useImageUrl = function useImageUrl(img) {
  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      url = _useState8[0],
      setUrl = _useState8[1];

  var storage = (0, _storage.getStorage)(); //'data/14607268903042.jpg'
  // console.log(`data/${img}`)

  var imagesRef = (0, _storage.ref)(storage, "data/".concat(img));
  (0, _storage.getDownloadURL)(imagesRef).then(function (url) {
    setUrl(url);
  })["catch"](function (error) {
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;

      default:
        console.log('');
    }
  });
  return url;
};

exports.useImageUrl = useImageUrl;