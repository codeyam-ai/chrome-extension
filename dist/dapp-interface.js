/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \***********************************************************************/
      /***/ (module) => {
        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          }

          return self;
        }

        (module.exports = _assertThisInitialized),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/asyncToGenerator.js":
      /*!******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \******************************************************************/
      /***/ (module) => {
        function asyncGeneratorStep(
          gen,
          resolve,
          reject,
          _next,
          _throw,
          key,
          arg
        ) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(_next, _throw);
          }
        }

        function _asyncToGenerator(fn) {
          return function () {
            var self = this,
              args = arguments;
            return new Promise(function (resolve, reject) {
              var gen = fn.apply(self, args);

              function _next(value) {
                asyncGeneratorStep(
                  gen,
                  resolve,
                  reject,
                  _next,
                  _throw,
                  "next",
                  value
                );
              }

              function _throw(err) {
                asyncGeneratorStep(
                  gen,
                  resolve,
                  reject,
                  _next,
                  _throw,
                  "throw",
                  err
                );
              }

              _next(undefined);
            });
          };
        }

        (module.exports = _asyncToGenerator),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/classCallCheck.js":
      /*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \****************************************************************/
      /***/ (module) => {
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        (module.exports = _classCallCheck),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/createClass.js":
      /*!*************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/createClass.js ***!
  \*************************************************************/
      /***/ (module) => {
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", {
            writable: false,
          });
          return Constructor;
        }

        (module.exports = _createClass),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js":
      /*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \****************************************************************/
      /***/ (module) => {
        function _getPrototypeOf(o) {
          (module.exports = _getPrototypeOf =
            Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o);
                }),
            (module.exports.__esModule = true),
            (module.exports["default"] = module.exports);
          return _getPrototypeOf(o);
        }

        (module.exports = _getPrototypeOf),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/inherits.js":
      /*!**********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/inherits.js ***!
  \**********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        var setPrototypeOf = __webpack_require__(
          /*! ./setPrototypeOf.js */ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js"
        );

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          }

          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                writable: true,
                configurable: true,
              },
            }
          );
          Object.defineProperty(subClass, "prototype", {
            writable: false,
          });
          if (superClass) setPrototypeOf(subClass, superClass);
        }

        (module.exports = _inherits),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \***********************************************************************/
      /***/ (module) => {
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule
            ? obj
            : {
                default: obj,
              };
        }

        (module.exports = _interopRequireDefault),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \***************************************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        var _typeof = __webpack_require__(
          /*! ./typeof.js */ "../node_modules/@babel/runtime/helpers/typeof.js"
        )["default"];

        var assertThisInitialized = __webpack_require__(
          /*! ./assertThisInitialized.js */ "../node_modules/@babel/runtime/helpers/assertThisInitialized.js"
        );

        function _possibleConstructorReturn(self, call) {
          if (
            call &&
            (_typeof(call) === "object" || typeof call === "function")
          ) {
            return call;
          } else if (call !== void 0) {
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          }

          return assertThisInitialized(self);
        }

        (module.exports = _possibleConstructorReturn),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
      /*!****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \****************************************************************/
      /***/ (module) => {
        function _setPrototypeOf(o, p) {
          (module.exports = _setPrototypeOf =
            Object.setPrototypeOf ||
            function _setPrototypeOf(o, p) {
              o.__proto__ = p;
              return o;
            }),
            (module.exports.__esModule = true),
            (module.exports["default"] = module.exports);
          return _setPrototypeOf(o, p);
        }

        (module.exports = _setPrototypeOf),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/helpers/typeof.js":
      /*!********************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/typeof.js ***!
  \********************************************************/
      /***/ (module) => {
        function _typeof(obj) {
          "@babel/helpers - typeof";

          return (
            ((module.exports = _typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj;
                  }
                : function (obj) {
                    return obj &&
                      "function" == typeof Symbol &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  }),
            (module.exports.__esModule = true),
            (module.exports["default"] = module.exports)),
            _typeof(obj)
          );
        }

        (module.exports = _typeof),
          (module.exports.__esModule = true),
          (module.exports["default"] = module.exports);

        /***/
      },

    /***/ "../node_modules/@babel/runtime/regenerator/index.js":
      /*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/regenerator/index.js ***!
  \***********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        module.exports = __webpack_require__(
          /*! regenerator-runtime */ "../node_modules/regenerator-runtime/runtime.js"
        );

        /***/
      },

    /***/ "../node_modules/base64-js/index.js":
      /*!******************************************!*\
  !*** ../node_modules/base64-js/index.js ***!
  \******************************************/
      /***/ (__unused_webpack_module, exports) => {
        "use strict";

        exports.byteLength = byteLength;
        exports.toByteArray = toByteArray;
        exports.fromByteArray = fromByteArray;

        var lookup = [];
        var revLookup = [];
        var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

        var code =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i];
          revLookup[code.charCodeAt(i)] = i;
        }

        // Support decoding URL-safe base64 strings, as Node.js does.
        // See: https://en.wikipedia.org/wiki/Base64#URL_applications
        revLookup["-".charCodeAt(0)] = 62;
        revLookup["_".charCodeAt(0)] = 63;

        function getLens(b64) {
          var len = b64.length;

          if (len % 4 > 0) {
            throw new Error("Invalid string. Length must be a multiple of 4");
          }

          // Trim off extra bytes after placeholder bytes are found
          // See: https://github.com/beatgammit/base64-js/issues/42
          var validLen = b64.indexOf("=");
          if (validLen === -1) validLen = len;

          var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4);

          return [validLen, placeHoldersLen];
        }

        // base64 is 4/3 + up to two characters of the original data
        function byteLength(b64) {
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
        }

        function _byteLength(b64, validLen, placeHoldersLen) {
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
        }

        function toByteArray(b64) {
          var tmp;
          var lens = getLens(b64);
          var validLen = lens[0];
          var placeHoldersLen = lens[1];

          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

          var curByte = 0;

          // if there are placeholders, only get up to the last complete 4 chars
          var len = placeHoldersLen > 0 ? validLen - 4 : validLen;

          var i;
          for (i = 0; i < len; i += 4) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 18) |
              (revLookup[b64.charCodeAt(i + 1)] << 12) |
              (revLookup[b64.charCodeAt(i + 2)] << 6) |
              revLookup[b64.charCodeAt(i + 3)];
            arr[curByte++] = (tmp >> 16) & 0xff;
            arr[curByte++] = (tmp >> 8) & 0xff;
            arr[curByte++] = tmp & 0xff;
          }

          if (placeHoldersLen === 2) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 2) |
              (revLookup[b64.charCodeAt(i + 1)] >> 4);
            arr[curByte++] = tmp & 0xff;
          }

          if (placeHoldersLen === 1) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 10) |
              (revLookup[b64.charCodeAt(i + 1)] << 4) |
              (revLookup[b64.charCodeAt(i + 2)] >> 2);
            arr[curByte++] = (tmp >> 8) & 0xff;
            arr[curByte++] = tmp & 0xff;
          }

          return arr;
        }

        function tripletToBase64(num) {
          return (
            lookup[(num >> 18) & 0x3f] +
            lookup[(num >> 12) & 0x3f] +
            lookup[(num >> 6) & 0x3f] +
            lookup[num & 0x3f]
          );
        }

        function encodeChunk(uint8, start, end) {
          var tmp;
          var output = [];
          for (var i = start; i < end; i += 3) {
            tmp =
              ((uint8[i] << 16) & 0xff0000) +
              ((uint8[i + 1] << 8) & 0xff00) +
              (uint8[i + 2] & 0xff);
            output.push(tripletToBase64(tmp));
          }
          return output.join("");
        }

        function fromByteArray(uint8) {
          var tmp;
          var len = uint8.length;
          var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
          var parts = [];
          var maxChunkLength = 16383; // must be multiple of 3

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (
            var i = 0, len2 = len - extraBytes;
            i < len2;
            i += maxChunkLength
          ) {
            parts.push(
              encodeChunk(
                uint8,
                i,
                i + maxChunkLength > len2 ? len2 : i + maxChunkLength
              )
            );
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = uint8[len - 1];
            parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + "==");
          } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1];
            parts.push(
              lookup[tmp >> 10] +
                lookup[(tmp >> 4) & 0x3f] +
                lookup[(tmp << 2) & 0x3f] +
                "="
            );
          }

          return parts.join("");
        }

        /***/
      },

    /***/ "../node_modules/bn.js/lib/bn.js":
      /*!***************************************!*\
  !*** ../node_modules/bn.js/lib/bn.js ***!
  \***************************************/
      /***/ function (module, __unused_webpack_exports, __webpack_require__) {
        /* module decorator */ module = __webpack_require__.nmd(module);
        (function (module, exports) {
          "use strict";

          // Utils
          function assert(val, msg) {
            if (!val) throw new Error(msg || "Assertion failed");
          }

          // Could use `inherits` module, but don't want to move from single file
          // architecture yet.
          function inherits(ctor, superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function () {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }

          // BN

          function BN(number, base, endian) {
            if (BN.isBN(number)) {
              return number;
            }

            this.negative = 0;
            this.words = null;
            this.length = 0;

            // Reduction context
            this.red = null;

            if (number !== null) {
              if (base === "le" || base === "be") {
                endian = base;
                base = 10;
              }

              this._init(number || 0, base || 10, endian || "be");
            }
          }
          if (typeof module === "object") {
            module.exports = BN;
          } else {
            exports.BN = BN;
          }

          BN.BN = BN;
          BN.wordSize = 26;

          var Buffer;
          try {
            if (true && typeof window.Buffer !== "undefined") {
              Buffer = window.Buffer;
            } else {
              Buffer = __webpack_require__(/*! buffer */ "?0699").Buffer;
            }
          } catch (e) {}

          BN.isBN = function isBN(num) {
            if (num instanceof BN) {
              return true;
            }

            return (
              num !== null &&
              typeof num === "object" &&
              num.constructor.wordSize === BN.wordSize &&
              Array.isArray(num.words)
            );
          };

          BN.max = function max(left, right) {
            if (left.cmp(right) > 0) return left;
            return right;
          };

          BN.min = function min(left, right) {
            if (left.cmp(right) < 0) return left;
            return right;
          };

          BN.prototype._init = function init(number, base, endian) {
            if (typeof number === "number") {
              return this._initNumber(number, base, endian);
            }

            if (typeof number === "object") {
              return this._initArray(number, base, endian);
            }

            if (base === "hex") {
              base = 16;
            }
            assert(base === (base | 0) && base >= 2 && base <= 36);

            number = number.toString().replace(/\s+/g, "");
            var start = 0;
            if (number[0] === "-") {
              start++;
              this.negative = 1;
            }

            if (start < number.length) {
              if (base === 16) {
                this._parseHex(number, start, endian);
              } else {
                this._parseBase(number, base, start);
                if (endian === "le") {
                  this._initArray(this.toArray(), base, endian);
                }
              }
            }
          };

          BN.prototype._initNumber = function _initNumber(
            number,
            base,
            endian
          ) {
            if (number < 0) {
              this.negative = 1;
              number = -number;
            }
            if (number < 0x4000000) {
              this.words = [number & 0x3ffffff];
              this.length = 1;
            } else if (number < 0x10000000000000) {
              this.words = [
                number & 0x3ffffff,
                (number / 0x4000000) & 0x3ffffff,
              ];
              this.length = 2;
            } else {
              assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
              this.words = [
                number & 0x3ffffff,
                (number / 0x4000000) & 0x3ffffff,
                1,
              ];
              this.length = 3;
            }

            if (endian !== "le") return;

            // Reverse the bytes
            this._initArray(this.toArray(), base, endian);
          };

          BN.prototype._initArray = function _initArray(number, base, endian) {
            // Perhaps a Uint8Array
            assert(typeof number.length === "number");
            if (number.length <= 0) {
              this.words = [0];
              this.length = 1;
              return this;
            }

            this.length = Math.ceil(number.length / 3);
            this.words = new Array(this.length);
            for (var i = 0; i < this.length; i++) {
              this.words[i] = 0;
            }

            var j, w;
            var off = 0;
            if (endian === "be") {
              for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
                w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
                this.words[j] |= (w << off) & 0x3ffffff;
                this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
                off += 24;
                if (off >= 26) {
                  off -= 26;
                  j++;
                }
              }
            } else if (endian === "le") {
              for (i = 0, j = 0; i < number.length; i += 3) {
                w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
                this.words[j] |= (w << off) & 0x3ffffff;
                this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
                off += 24;
                if (off >= 26) {
                  off -= 26;
                  j++;
                }
              }
            }
            return this._strip();
          };

          function parseHex4Bits(string, index) {
            var c = string.charCodeAt(index);
            // '0' - '9'
            if (c >= 48 && c <= 57) {
              return c - 48;
              // 'A' - 'F'
            } else if (c >= 65 && c <= 70) {
              return c - 55;
              // 'a' - 'f'
            } else if (c >= 97 && c <= 102) {
              return c - 87;
            } else {
              assert(false, "Invalid character in " + string);
            }
          }

          function parseHexByte(string, lowerBound, index) {
            var r = parseHex4Bits(string, index);
            if (index - 1 >= lowerBound) {
              r |= parseHex4Bits(string, index - 1) << 4;
            }
            return r;
          }

          BN.prototype._parseHex = function _parseHex(number, start, endian) {
            // Create possibly bigger array to ensure that it fits the number
            this.length = Math.ceil((number.length - start) / 6);
            this.words = new Array(this.length);
            for (var i = 0; i < this.length; i++) {
              this.words[i] = 0;
            }

            // 24-bits chunks
            var off = 0;
            var j = 0;

            var w;
            if (endian === "be") {
              for (i = number.length - 1; i >= start; i -= 2) {
                w = parseHexByte(number, start, i) << off;
                this.words[j] |= w & 0x3ffffff;
                if (off >= 18) {
                  off -= 18;
                  j += 1;
                  this.words[j] |= w >>> 26;
                } else {
                  off += 8;
                }
              }
            } else {
              var parseLength = number.length - start;
              for (
                i = parseLength % 2 === 0 ? start + 1 : start;
                i < number.length;
                i += 2
              ) {
                w = parseHexByte(number, start, i) << off;
                this.words[j] |= w & 0x3ffffff;
                if (off >= 18) {
                  off -= 18;
                  j += 1;
                  this.words[j] |= w >>> 26;
                } else {
                  off += 8;
                }
              }
            }

            this._strip();
          };

          function parseBase(str, start, end, mul) {
            var r = 0;
            var b = 0;
            var len = Math.min(str.length, end);
            for (var i = start; i < len; i++) {
              var c = str.charCodeAt(i) - 48;

              r *= mul;

              // 'a'
              if (c >= 49) {
                b = c - 49 + 0xa;

                // 'A'
              } else if (c >= 17) {
                b = c - 17 + 0xa;

                // '0' - '9'
              } else {
                b = c;
              }
              assert(c >= 0 && b < mul, "Invalid character");
              r += b;
            }
            return r;
          }

          BN.prototype._parseBase = function _parseBase(number, base, start) {
            // Initialize as zero
            this.words = [0];
            this.length = 1;

            // Find length of limb in base
            for (
              var limbLen = 0, limbPow = 1;
              limbPow <= 0x3ffffff;
              limbPow *= base
            ) {
              limbLen++;
            }
            limbLen--;
            limbPow = (limbPow / base) | 0;

            var total = number.length - start;
            var mod = total % limbLen;
            var end = Math.min(total, total - mod) + start;

            var word = 0;
            for (var i = start; i < end; i += limbLen) {
              word = parseBase(number, i, i + limbLen, base);

              this.imuln(limbPow);
              if (this.words[0] + word < 0x4000000) {
                this.words[0] += word;
              } else {
                this._iaddn(word);
              }
            }

            if (mod !== 0) {
              var pow = 1;
              word = parseBase(number, i, number.length, base);

              for (i = 0; i < mod; i++) {
                pow *= base;
              }

              this.imuln(pow);
              if (this.words[0] + word < 0x4000000) {
                this.words[0] += word;
              } else {
                this._iaddn(word);
              }
            }

            this._strip();
          };

          BN.prototype.copy = function copy(dest) {
            dest.words = new Array(this.length);
            for (var i = 0; i < this.length; i++) {
              dest.words[i] = this.words[i];
            }
            dest.length = this.length;
            dest.negative = this.negative;
            dest.red = this.red;
          };

          function move(dest, src) {
            dest.words = src.words;
            dest.length = src.length;
            dest.negative = src.negative;
            dest.red = src.red;
          }

          BN.prototype._move = function _move(dest) {
            move(dest, this);
          };

          BN.prototype.clone = function clone() {
            var r = new BN(null);
            this.copy(r);
            return r;
          };

          BN.prototype._expand = function _expand(size) {
            while (this.length < size) {
              this.words[this.length++] = 0;
            }
            return this;
          };

          // Remove leading `0` from `this`
          BN.prototype._strip = function strip() {
            while (this.length > 1 && this.words[this.length - 1] === 0) {
              this.length--;
            }
            return this._normSign();
          };

          BN.prototype._normSign = function _normSign() {
            // -0 = 0
            if (this.length === 1 && this.words[0] === 0) {
              this.negative = 0;
            }
            return this;
          };

          // Check Symbol.for because not everywhere where Symbol defined
          // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Browser_compatibility
          if (
            typeof Symbol !== "undefined" &&
            typeof Symbol.for === "function"
          ) {
            try {
              BN.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
            } catch (e) {
              BN.prototype.inspect = inspect;
            }
          } else {
            BN.prototype.inspect = inspect;
          }

          function inspect() {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          }

          /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

          var zeros = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ];

          var groupSizes = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ];

          var groupBases = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 10000000, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64000000, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 24300000, 28629151, 33554432, 39135393, 45435424,
            52521875, 60466176,
          ];

          BN.prototype.toString = function toString(base, padding) {
            base = base || 10;
            padding = padding | 0 || 1;

            var out;
            if (base === 16 || base === "hex") {
              out = "";
              var off = 0;
              var carry = 0;
              for (var i = 0; i < this.length; i++) {
                var w = this.words[i];
                var word = (((w << off) | carry) & 0xffffff).toString(16);
                carry = (w >>> (24 - off)) & 0xffffff;
                off += 2;
                if (off >= 26) {
                  off -= 26;
                  i--;
                }
                if (carry !== 0 || i !== this.length - 1) {
                  out = zeros[6 - word.length] + word + out;
                } else {
                  out = word + out;
                }
              }
              if (carry !== 0) {
                out = carry.toString(16) + out;
              }
              while (out.length % padding !== 0) {
                out = "0" + out;
              }
              if (this.negative !== 0) {
                out = "-" + out;
              }
              return out;
            }

            if (base === (base | 0) && base >= 2 && base <= 36) {
              // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
              var groupSize = groupSizes[base];
              // var groupBase = Math.pow(base, groupSize);
              var groupBase = groupBases[base];
              out = "";
              var c = this.clone();
              c.negative = 0;
              while (!c.isZero()) {
                var r = c.modrn(groupBase).toString(base);
                c = c.idivn(groupBase);

                if (!c.isZero()) {
                  out = zeros[groupSize - r.length] + r + out;
                } else {
                  out = r + out;
                }
              }
              if (this.isZero()) {
                out = "0" + out;
              }
              while (out.length % padding !== 0) {
                out = "0" + out;
              }
              if (this.negative !== 0) {
                out = "-" + out;
              }
              return out;
            }

            assert(false, "Base should be between 2 and 36");
          };

          BN.prototype.toNumber = function toNumber() {
            var ret = this.words[0];
            if (this.length === 2) {
              ret += this.words[1] * 0x4000000;
            } else if (this.length === 3 && this.words[2] === 0x01) {
              // NOTE: at this stage it is known that the top bit is set
              ret += 0x10000000000000 + this.words[1] * 0x4000000;
            } else if (this.length > 2) {
              assert(false, "Number can only safely store up to 53 bits");
            }
            return this.negative !== 0 ? -ret : ret;
          };

          BN.prototype.toJSON = function toJSON() {
            return this.toString(16, 2);
          };

          if (Buffer) {
            BN.prototype.toBuffer = function toBuffer(endian, length) {
              return this.toArrayLike(Buffer, endian, length);
            };
          }

          BN.prototype.toArray = function toArray(endian, length) {
            return this.toArrayLike(Array, endian, length);
          };

          var allocate = function allocate(ArrayType, size) {
            if (ArrayType.allocUnsafe) {
              return ArrayType.allocUnsafe(size);
            }
            return new ArrayType(size);
          };

          BN.prototype.toArrayLike = function toArrayLike(
            ArrayType,
            endian,
            length
          ) {
            this._strip();

            var byteLength = this.byteLength();
            var reqLength = length || Math.max(1, byteLength);
            assert(
              byteLength <= reqLength,
              "byte array longer than desired length"
            );
            assert(reqLength > 0, "Requested array length <= 0");

            var res = allocate(ArrayType, reqLength);
            var postfix = endian === "le" ? "LE" : "BE";
            this["_toArrayLike" + postfix](res, byteLength);
            return res;
          };

          BN.prototype._toArrayLikeLE = function _toArrayLikeLE(
            res,
            byteLength
          ) {
            var position = 0;
            var carry = 0;

            for (var i = 0, shift = 0; i < this.length; i++) {
              var word = (this.words[i] << shift) | carry;

              res[position++] = word & 0xff;
              if (position < res.length) {
                res[position++] = (word >> 8) & 0xff;
              }
              if (position < res.length) {
                res[position++] = (word >> 16) & 0xff;
              }

              if (shift === 6) {
                if (position < res.length) {
                  res[position++] = (word >> 24) & 0xff;
                }
                carry = 0;
                shift = 0;
              } else {
                carry = word >>> 24;
                shift += 2;
              }
            }

            if (position < res.length) {
              res[position++] = carry;

              while (position < res.length) {
                res[position++] = 0;
              }
            }
          };

          BN.prototype._toArrayLikeBE = function _toArrayLikeBE(
            res,
            byteLength
          ) {
            var position = res.length - 1;
            var carry = 0;

            for (var i = 0, shift = 0; i < this.length; i++) {
              var word = (this.words[i] << shift) | carry;

              res[position--] = word & 0xff;
              if (position >= 0) {
                res[position--] = (word >> 8) & 0xff;
              }
              if (position >= 0) {
                res[position--] = (word >> 16) & 0xff;
              }

              if (shift === 6) {
                if (position >= 0) {
                  res[position--] = (word >> 24) & 0xff;
                }
                carry = 0;
                shift = 0;
              } else {
                carry = word >>> 24;
                shift += 2;
              }
            }

            if (position >= 0) {
              res[position--] = carry;

              while (position >= 0) {
                res[position--] = 0;
              }
            }
          };

          if (Math.clz32) {
            BN.prototype._countBits = function _countBits(w) {
              return 32 - Math.clz32(w);
            };
          } else {
            BN.prototype._countBits = function _countBits(w) {
              var t = w;
              var r = 0;
              if (t >= 0x1000) {
                r += 13;
                t >>>= 13;
              }
              if (t >= 0x40) {
                r += 7;
                t >>>= 7;
              }
              if (t >= 0x8) {
                r += 4;
                t >>>= 4;
              }
              if (t >= 0x02) {
                r += 2;
                t >>>= 2;
              }
              return r + t;
            };
          }

          BN.prototype._zeroBits = function _zeroBits(w) {
            // Short-cut
            if (w === 0) return 26;

            var t = w;
            var r = 0;
            if ((t & 0x1fff) === 0) {
              r += 13;
              t >>>= 13;
            }
            if ((t & 0x7f) === 0) {
              r += 7;
              t >>>= 7;
            }
            if ((t & 0xf) === 0) {
              r += 4;
              t >>>= 4;
            }
            if ((t & 0x3) === 0) {
              r += 2;
              t >>>= 2;
            }
            if ((t & 0x1) === 0) {
              r++;
            }
            return r;
          };

          // Return number of used bits in a BN
          BN.prototype.bitLength = function bitLength() {
            var w = this.words[this.length - 1];
            var hi = this._countBits(w);
            return (this.length - 1) * 26 + hi;
          };

          function toBitArray(num) {
            var w = new Array(num.bitLength());

            for (var bit = 0; bit < w.length; bit++) {
              var off = (bit / 26) | 0;
              var wbit = bit % 26;

              w[bit] = (num.words[off] >>> wbit) & 0x01;
            }

            return w;
          }

          // Number of trailing zero bits
          BN.prototype.zeroBits = function zeroBits() {
            if (this.isZero()) return 0;

            var r = 0;
            for (var i = 0; i < this.length; i++) {
              var b = this._zeroBits(this.words[i]);
              r += b;
              if (b !== 26) break;
            }
            return r;
          };

          BN.prototype.byteLength = function byteLength() {
            return Math.ceil(this.bitLength() / 8);
          };

          BN.prototype.toTwos = function toTwos(width) {
            if (this.negative !== 0) {
              return this.abs().inotn(width).iaddn(1);
            }
            return this.clone();
          };

          BN.prototype.fromTwos = function fromTwos(width) {
            if (this.testn(width - 1)) {
              return this.notn(width).iaddn(1).ineg();
            }
            return this.clone();
          };

          BN.prototype.isNeg = function isNeg() {
            return this.negative !== 0;
          };

          // Return negative clone of `this`
          BN.prototype.neg = function neg() {
            return this.clone().ineg();
          };

          BN.prototype.ineg = function ineg() {
            if (!this.isZero()) {
              this.negative ^= 1;
            }

            return this;
          };

          // Or `num` with `this` in-place
          BN.prototype.iuor = function iuor(num) {
            while (this.length < num.length) {
              this.words[this.length++] = 0;
            }

            for (var i = 0; i < num.length; i++) {
              this.words[i] = this.words[i] | num.words[i];
            }

            return this._strip();
          };

          BN.prototype.ior = function ior(num) {
            assert((this.negative | num.negative) === 0);
            return this.iuor(num);
          };

          // Or `num` with `this`
          BN.prototype.or = function or(num) {
            if (this.length > num.length) return this.clone().ior(num);
            return num.clone().ior(this);
          };

          BN.prototype.uor = function uor(num) {
            if (this.length > num.length) return this.clone().iuor(num);
            return num.clone().iuor(this);
          };

          // And `num` with `this` in-place
          BN.prototype.iuand = function iuand(num) {
            // b = min-length(num, this)
            var b;
            if (this.length > num.length) {
              b = num;
            } else {
              b = this;
            }

            for (var i = 0; i < b.length; i++) {
              this.words[i] = this.words[i] & num.words[i];
            }

            this.length = b.length;

            return this._strip();
          };

          BN.prototype.iand = function iand(num) {
            assert((this.negative | num.negative) === 0);
            return this.iuand(num);
          };

          // And `num` with `this`
          BN.prototype.and = function and(num) {
            if (this.length > num.length) return this.clone().iand(num);
            return num.clone().iand(this);
          };

          BN.prototype.uand = function uand(num) {
            if (this.length > num.length) return this.clone().iuand(num);
            return num.clone().iuand(this);
          };

          // Xor `num` with `this` in-place
          BN.prototype.iuxor = function iuxor(num) {
            // a.length > b.length
            var a;
            var b;
            if (this.length > num.length) {
              a = this;
              b = num;
            } else {
              a = num;
              b = this;
            }

            for (var i = 0; i < b.length; i++) {
              this.words[i] = a.words[i] ^ b.words[i];
            }

            if (this !== a) {
              for (; i < a.length; i++) {
                this.words[i] = a.words[i];
              }
            }

            this.length = a.length;

            return this._strip();
          };

          BN.prototype.ixor = function ixor(num) {
            assert((this.negative | num.negative) === 0);
            return this.iuxor(num);
          };

          // Xor `num` with `this`
          BN.prototype.xor = function xor(num) {
            if (this.length > num.length) return this.clone().ixor(num);
            return num.clone().ixor(this);
          };

          BN.prototype.uxor = function uxor(num) {
            if (this.length > num.length) return this.clone().iuxor(num);
            return num.clone().iuxor(this);
          };

          // Not ``this`` with ``width`` bitwidth
          BN.prototype.inotn = function inotn(width) {
            assert(typeof width === "number" && width >= 0);

            var bytesNeeded = Math.ceil(width / 26) | 0;
            var bitsLeft = width % 26;

            // Extend the buffer with leading zeroes
            this._expand(bytesNeeded);

            if (bitsLeft > 0) {
              bytesNeeded--;
            }

            // Handle complete words
            for (var i = 0; i < bytesNeeded; i++) {
              this.words[i] = ~this.words[i] & 0x3ffffff;
            }

            // Handle the residue
            if (bitsLeft > 0) {
              this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
            }

            // And remove leading zeroes
            return this._strip();
          };

          BN.prototype.notn = function notn(width) {
            return this.clone().inotn(width);
          };

          // Set `bit` of `this`
          BN.prototype.setn = function setn(bit, val) {
            assert(typeof bit === "number" && bit >= 0);

            var off = (bit / 26) | 0;
            var wbit = bit % 26;

            this._expand(off + 1);

            if (val) {
              this.words[off] = this.words[off] | (1 << wbit);
            } else {
              this.words[off] = this.words[off] & ~(1 << wbit);
            }

            return this._strip();
          };

          // Add `num` to `this` in-place
          BN.prototype.iadd = function iadd(num) {
            var r;

            // negative + positive
            if (this.negative !== 0 && num.negative === 0) {
              this.negative = 0;
              r = this.isub(num);
              this.negative ^= 1;
              return this._normSign();

              // positive + negative
            } else if (this.negative === 0 && num.negative !== 0) {
              num.negative = 0;
              r = this.isub(num);
              num.negative = 1;
              return r._normSign();
            }

            // a.length > b.length
            var a, b;
            if (this.length > num.length) {
              a = this;
              b = num;
            } else {
              a = num;
              b = this;
            }

            var carry = 0;
            for (var i = 0; i < b.length; i++) {
              r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
              this.words[i] = r & 0x3ffffff;
              carry = r >>> 26;
            }
            for (; carry !== 0 && i < a.length; i++) {
              r = (a.words[i] | 0) + carry;
              this.words[i] = r & 0x3ffffff;
              carry = r >>> 26;
            }

            this.length = a.length;
            if (carry !== 0) {
              this.words[this.length] = carry;
              this.length++;
              // Copy the rest of the words
            } else if (a !== this) {
              for (; i < a.length; i++) {
                this.words[i] = a.words[i];
              }
            }

            return this;
          };

          // Add `num` to `this`
          BN.prototype.add = function add(num) {
            var res;
            if (num.negative !== 0 && this.negative === 0) {
              num.negative = 0;
              res = this.sub(num);
              num.negative ^= 1;
              return res;
            } else if (num.negative === 0 && this.negative !== 0) {
              this.negative = 0;
              res = num.sub(this);
              this.negative = 1;
              return res;
            }

            if (this.length > num.length) return this.clone().iadd(num);

            return num.clone().iadd(this);
          };

          // Subtract `num` from `this` in-place
          BN.prototype.isub = function isub(num) {
            // this - (-num) = this + num
            if (num.negative !== 0) {
              num.negative = 0;
              var r = this.iadd(num);
              num.negative = 1;
              return r._normSign();

              // -this - num = -(this + num)
            } else if (this.negative !== 0) {
              this.negative = 0;
              this.iadd(num);
              this.negative = 1;
              return this._normSign();
            }

            // At this point both numbers are positive
            var cmp = this.cmp(num);

            // Optimization - zeroify
            if (cmp === 0) {
              this.negative = 0;
              this.length = 1;
              this.words[0] = 0;
              return this;
            }

            // a > b
            var a, b;
            if (cmp > 0) {
              a = this;
              b = num;
            } else {
              a = num;
              b = this;
            }

            var carry = 0;
            for (var i = 0; i < b.length; i++) {
              r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
              carry = r >> 26;
              this.words[i] = r & 0x3ffffff;
            }
            for (; carry !== 0 && i < a.length; i++) {
              r = (a.words[i] | 0) + carry;
              carry = r >> 26;
              this.words[i] = r & 0x3ffffff;
            }

            // Copy rest of the words
            if (carry === 0 && i < a.length && a !== this) {
              for (; i < a.length; i++) {
                this.words[i] = a.words[i];
              }
            }

            this.length = Math.max(this.length, i);

            if (a !== this) {
              this.negative = 1;
            }

            return this._strip();
          };

          // Subtract `num` from `this`
          BN.prototype.sub = function sub(num) {
            return this.clone().isub(num);
          };

          function smallMulTo(self, num, out) {
            out.negative = num.negative ^ self.negative;
            var len = (self.length + num.length) | 0;
            out.length = len;
            len = (len - 1) | 0;

            // Peel one iteration (compiler can't do it, because of code complexity)
            var a = self.words[0] | 0;
            var b = num.words[0] | 0;
            var r = a * b;

            var lo = r & 0x3ffffff;
            var carry = (r / 0x4000000) | 0;
            out.words[0] = lo;

            for (var k = 1; k < len; k++) {
              // Sum all words with the same `i + j = k` and accumulate `ncarry`,
              // note that ncarry could be >= 0x3ffffff
              var ncarry = carry >>> 26;
              var rword = carry & 0x3ffffff;
              var maxJ = Math.min(k, num.length - 1);
              for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
                var i = (k - j) | 0;
                a = self.words[i] | 0;
                b = num.words[j] | 0;
                r = a * b + rword;
                ncarry += (r / 0x4000000) | 0;
                rword = r & 0x3ffffff;
              }
              out.words[k] = rword | 0;
              carry = ncarry | 0;
            }
            if (carry !== 0) {
              out.words[k] = carry | 0;
            } else {
              out.length--;
            }

            return out._strip();
          }

          // TODO(indutny): it may be reasonable to omit it for users who don't need
          // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
          // multiplication (like elliptic secp256k1).
          var comb10MulTo = function comb10MulTo(self, num, out) {
            var a = self.words;
            var b = num.words;
            var o = out.words;
            var c = 0;
            var lo;
            var mid;
            var hi;
            var a0 = a[0] | 0;
            var al0 = a0 & 0x1fff;
            var ah0 = a0 >>> 13;
            var a1 = a[1] | 0;
            var al1 = a1 & 0x1fff;
            var ah1 = a1 >>> 13;
            var a2 = a[2] | 0;
            var al2 = a2 & 0x1fff;
            var ah2 = a2 >>> 13;
            var a3 = a[3] | 0;
            var al3 = a3 & 0x1fff;
            var ah3 = a3 >>> 13;
            var a4 = a[4] | 0;
            var al4 = a4 & 0x1fff;
            var ah4 = a4 >>> 13;
            var a5 = a[5] | 0;
            var al5 = a5 & 0x1fff;
            var ah5 = a5 >>> 13;
            var a6 = a[6] | 0;
            var al6 = a6 & 0x1fff;
            var ah6 = a6 >>> 13;
            var a7 = a[7] | 0;
            var al7 = a7 & 0x1fff;
            var ah7 = a7 >>> 13;
            var a8 = a[8] | 0;
            var al8 = a8 & 0x1fff;
            var ah8 = a8 >>> 13;
            var a9 = a[9] | 0;
            var al9 = a9 & 0x1fff;
            var ah9 = a9 >>> 13;
            var b0 = b[0] | 0;
            var bl0 = b0 & 0x1fff;
            var bh0 = b0 >>> 13;
            var b1 = b[1] | 0;
            var bl1 = b1 & 0x1fff;
            var bh1 = b1 >>> 13;
            var b2 = b[2] | 0;
            var bl2 = b2 & 0x1fff;
            var bh2 = b2 >>> 13;
            var b3 = b[3] | 0;
            var bl3 = b3 & 0x1fff;
            var bh3 = b3 >>> 13;
            var b4 = b[4] | 0;
            var bl4 = b4 & 0x1fff;
            var bh4 = b4 >>> 13;
            var b5 = b[5] | 0;
            var bl5 = b5 & 0x1fff;
            var bh5 = b5 >>> 13;
            var b6 = b[6] | 0;
            var bl6 = b6 & 0x1fff;
            var bh6 = b6 >>> 13;
            var b7 = b[7] | 0;
            var bl7 = b7 & 0x1fff;
            var bh7 = b7 >>> 13;
            var b8 = b[8] | 0;
            var bl8 = b8 & 0x1fff;
            var bh8 = b8 >>> 13;
            var b9 = b[9] | 0;
            var bl9 = b9 & 0x1fff;
            var bh9 = b9 >>> 13;

            out.negative = self.negative ^ num.negative;
            out.length = 19;
            /* k = 0 */
            lo = Math.imul(al0, bl0);
            mid = Math.imul(al0, bh0);
            mid = (mid + Math.imul(ah0, bl0)) | 0;
            hi = Math.imul(ah0, bh0);
            var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
            w0 &= 0x3ffffff;
            /* k = 1 */
            lo = Math.imul(al1, bl0);
            mid = Math.imul(al1, bh0);
            mid = (mid + Math.imul(ah1, bl0)) | 0;
            hi = Math.imul(ah1, bh0);
            lo = (lo + Math.imul(al0, bl1)) | 0;
            mid = (mid + Math.imul(al0, bh1)) | 0;
            mid = (mid + Math.imul(ah0, bl1)) | 0;
            hi = (hi + Math.imul(ah0, bh1)) | 0;
            var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
            w1 &= 0x3ffffff;
            /* k = 2 */
            lo = Math.imul(al2, bl0);
            mid = Math.imul(al2, bh0);
            mid = (mid + Math.imul(ah2, bl0)) | 0;
            hi = Math.imul(ah2, bh0);
            lo = (lo + Math.imul(al1, bl1)) | 0;
            mid = (mid + Math.imul(al1, bh1)) | 0;
            mid = (mid + Math.imul(ah1, bl1)) | 0;
            hi = (hi + Math.imul(ah1, bh1)) | 0;
            lo = (lo + Math.imul(al0, bl2)) | 0;
            mid = (mid + Math.imul(al0, bh2)) | 0;
            mid = (mid + Math.imul(ah0, bl2)) | 0;
            hi = (hi + Math.imul(ah0, bh2)) | 0;
            var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
            w2 &= 0x3ffffff;
            /* k = 3 */
            lo = Math.imul(al3, bl0);
            mid = Math.imul(al3, bh0);
            mid = (mid + Math.imul(ah3, bl0)) | 0;
            hi = Math.imul(ah3, bh0);
            lo = (lo + Math.imul(al2, bl1)) | 0;
            mid = (mid + Math.imul(al2, bh1)) | 0;
            mid = (mid + Math.imul(ah2, bl1)) | 0;
            hi = (hi + Math.imul(ah2, bh1)) | 0;
            lo = (lo + Math.imul(al1, bl2)) | 0;
            mid = (mid + Math.imul(al1, bh2)) | 0;
            mid = (mid + Math.imul(ah1, bl2)) | 0;
            hi = (hi + Math.imul(ah1, bh2)) | 0;
            lo = (lo + Math.imul(al0, bl3)) | 0;
            mid = (mid + Math.imul(al0, bh3)) | 0;
            mid = (mid + Math.imul(ah0, bl3)) | 0;
            hi = (hi + Math.imul(ah0, bh3)) | 0;
            var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
            w3 &= 0x3ffffff;
            /* k = 4 */
            lo = Math.imul(al4, bl0);
            mid = Math.imul(al4, bh0);
            mid = (mid + Math.imul(ah4, bl0)) | 0;
            hi = Math.imul(ah4, bh0);
            lo = (lo + Math.imul(al3, bl1)) | 0;
            mid = (mid + Math.imul(al3, bh1)) | 0;
            mid = (mid + Math.imul(ah3, bl1)) | 0;
            hi = (hi + Math.imul(ah3, bh1)) | 0;
            lo = (lo + Math.imul(al2, bl2)) | 0;
            mid = (mid + Math.imul(al2, bh2)) | 0;
            mid = (mid + Math.imul(ah2, bl2)) | 0;
            hi = (hi + Math.imul(ah2, bh2)) | 0;
            lo = (lo + Math.imul(al1, bl3)) | 0;
            mid = (mid + Math.imul(al1, bh3)) | 0;
            mid = (mid + Math.imul(ah1, bl3)) | 0;
            hi = (hi + Math.imul(ah1, bh3)) | 0;
            lo = (lo + Math.imul(al0, bl4)) | 0;
            mid = (mid + Math.imul(al0, bh4)) | 0;
            mid = (mid + Math.imul(ah0, bl4)) | 0;
            hi = (hi + Math.imul(ah0, bh4)) | 0;
            var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
            w4 &= 0x3ffffff;
            /* k = 5 */
            lo = Math.imul(al5, bl0);
            mid = Math.imul(al5, bh0);
            mid = (mid + Math.imul(ah5, bl0)) | 0;
            hi = Math.imul(ah5, bh0);
            lo = (lo + Math.imul(al4, bl1)) | 0;
            mid = (mid + Math.imul(al4, bh1)) | 0;
            mid = (mid + Math.imul(ah4, bl1)) | 0;
            hi = (hi + Math.imul(ah4, bh1)) | 0;
            lo = (lo + Math.imul(al3, bl2)) | 0;
            mid = (mid + Math.imul(al3, bh2)) | 0;
            mid = (mid + Math.imul(ah3, bl2)) | 0;
            hi = (hi + Math.imul(ah3, bh2)) | 0;
            lo = (lo + Math.imul(al2, bl3)) | 0;
            mid = (mid + Math.imul(al2, bh3)) | 0;
            mid = (mid + Math.imul(ah2, bl3)) | 0;
            hi = (hi + Math.imul(ah2, bh3)) | 0;
            lo = (lo + Math.imul(al1, bl4)) | 0;
            mid = (mid + Math.imul(al1, bh4)) | 0;
            mid = (mid + Math.imul(ah1, bl4)) | 0;
            hi = (hi + Math.imul(ah1, bh4)) | 0;
            lo = (lo + Math.imul(al0, bl5)) | 0;
            mid = (mid + Math.imul(al0, bh5)) | 0;
            mid = (mid + Math.imul(ah0, bl5)) | 0;
            hi = (hi + Math.imul(ah0, bh5)) | 0;
            var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
            w5 &= 0x3ffffff;
            /* k = 6 */
            lo = Math.imul(al6, bl0);
            mid = Math.imul(al6, bh0);
            mid = (mid + Math.imul(ah6, bl0)) | 0;
            hi = Math.imul(ah6, bh0);
            lo = (lo + Math.imul(al5, bl1)) | 0;
            mid = (mid + Math.imul(al5, bh1)) | 0;
            mid = (mid + Math.imul(ah5, bl1)) | 0;
            hi = (hi + Math.imul(ah5, bh1)) | 0;
            lo = (lo + Math.imul(al4, bl2)) | 0;
            mid = (mid + Math.imul(al4, bh2)) | 0;
            mid = (mid + Math.imul(ah4, bl2)) | 0;
            hi = (hi + Math.imul(ah4, bh2)) | 0;
            lo = (lo + Math.imul(al3, bl3)) | 0;
            mid = (mid + Math.imul(al3, bh3)) | 0;
            mid = (mid + Math.imul(ah3, bl3)) | 0;
            hi = (hi + Math.imul(ah3, bh3)) | 0;
            lo = (lo + Math.imul(al2, bl4)) | 0;
            mid = (mid + Math.imul(al2, bh4)) | 0;
            mid = (mid + Math.imul(ah2, bl4)) | 0;
            hi = (hi + Math.imul(ah2, bh4)) | 0;
            lo = (lo + Math.imul(al1, bl5)) | 0;
            mid = (mid + Math.imul(al1, bh5)) | 0;
            mid = (mid + Math.imul(ah1, bl5)) | 0;
            hi = (hi + Math.imul(ah1, bh5)) | 0;
            lo = (lo + Math.imul(al0, bl6)) | 0;
            mid = (mid + Math.imul(al0, bh6)) | 0;
            mid = (mid + Math.imul(ah0, bl6)) | 0;
            hi = (hi + Math.imul(ah0, bh6)) | 0;
            var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
            w6 &= 0x3ffffff;
            /* k = 7 */
            lo = Math.imul(al7, bl0);
            mid = Math.imul(al7, bh0);
            mid = (mid + Math.imul(ah7, bl0)) | 0;
            hi = Math.imul(ah7, bh0);
            lo = (lo + Math.imul(al6, bl1)) | 0;
            mid = (mid + Math.imul(al6, bh1)) | 0;
            mid = (mid + Math.imul(ah6, bl1)) | 0;
            hi = (hi + Math.imul(ah6, bh1)) | 0;
            lo = (lo + Math.imul(al5, bl2)) | 0;
            mid = (mid + Math.imul(al5, bh2)) | 0;
            mid = (mid + Math.imul(ah5, bl2)) | 0;
            hi = (hi + Math.imul(ah5, bh2)) | 0;
            lo = (lo + Math.imul(al4, bl3)) | 0;
            mid = (mid + Math.imul(al4, bh3)) | 0;
            mid = (mid + Math.imul(ah4, bl3)) | 0;
            hi = (hi + Math.imul(ah4, bh3)) | 0;
            lo = (lo + Math.imul(al3, bl4)) | 0;
            mid = (mid + Math.imul(al3, bh4)) | 0;
            mid = (mid + Math.imul(ah3, bl4)) | 0;
            hi = (hi + Math.imul(ah3, bh4)) | 0;
            lo = (lo + Math.imul(al2, bl5)) | 0;
            mid = (mid + Math.imul(al2, bh5)) | 0;
            mid = (mid + Math.imul(ah2, bl5)) | 0;
            hi = (hi + Math.imul(ah2, bh5)) | 0;
            lo = (lo + Math.imul(al1, bl6)) | 0;
            mid = (mid + Math.imul(al1, bh6)) | 0;
            mid = (mid + Math.imul(ah1, bl6)) | 0;
            hi = (hi + Math.imul(ah1, bh6)) | 0;
            lo = (lo + Math.imul(al0, bl7)) | 0;
            mid = (mid + Math.imul(al0, bh7)) | 0;
            mid = (mid + Math.imul(ah0, bl7)) | 0;
            hi = (hi + Math.imul(ah0, bh7)) | 0;
            var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
            w7 &= 0x3ffffff;
            /* k = 8 */
            lo = Math.imul(al8, bl0);
            mid = Math.imul(al8, bh0);
            mid = (mid + Math.imul(ah8, bl0)) | 0;
            hi = Math.imul(ah8, bh0);
            lo = (lo + Math.imul(al7, bl1)) | 0;
            mid = (mid + Math.imul(al7, bh1)) | 0;
            mid = (mid + Math.imul(ah7, bl1)) | 0;
            hi = (hi + Math.imul(ah7, bh1)) | 0;
            lo = (lo + Math.imul(al6, bl2)) | 0;
            mid = (mid + Math.imul(al6, bh2)) | 0;
            mid = (mid + Math.imul(ah6, bl2)) | 0;
            hi = (hi + Math.imul(ah6, bh2)) | 0;
            lo = (lo + Math.imul(al5, bl3)) | 0;
            mid = (mid + Math.imul(al5, bh3)) | 0;
            mid = (mid + Math.imul(ah5, bl3)) | 0;
            hi = (hi + Math.imul(ah5, bh3)) | 0;
            lo = (lo + Math.imul(al4, bl4)) | 0;
            mid = (mid + Math.imul(al4, bh4)) | 0;
            mid = (mid + Math.imul(ah4, bl4)) | 0;
            hi = (hi + Math.imul(ah4, bh4)) | 0;
            lo = (lo + Math.imul(al3, bl5)) | 0;
            mid = (mid + Math.imul(al3, bh5)) | 0;
            mid = (mid + Math.imul(ah3, bl5)) | 0;
            hi = (hi + Math.imul(ah3, bh5)) | 0;
            lo = (lo + Math.imul(al2, bl6)) | 0;
            mid = (mid + Math.imul(al2, bh6)) | 0;
            mid = (mid + Math.imul(ah2, bl6)) | 0;
            hi = (hi + Math.imul(ah2, bh6)) | 0;
            lo = (lo + Math.imul(al1, bl7)) | 0;
            mid = (mid + Math.imul(al1, bh7)) | 0;
            mid = (mid + Math.imul(ah1, bl7)) | 0;
            hi = (hi + Math.imul(ah1, bh7)) | 0;
            lo = (lo + Math.imul(al0, bl8)) | 0;
            mid = (mid + Math.imul(al0, bh8)) | 0;
            mid = (mid + Math.imul(ah0, bl8)) | 0;
            hi = (hi + Math.imul(ah0, bh8)) | 0;
            var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
            w8 &= 0x3ffffff;
            /* k = 9 */
            lo = Math.imul(al9, bl0);
            mid = Math.imul(al9, bh0);
            mid = (mid + Math.imul(ah9, bl0)) | 0;
            hi = Math.imul(ah9, bh0);
            lo = (lo + Math.imul(al8, bl1)) | 0;
            mid = (mid + Math.imul(al8, bh1)) | 0;
            mid = (mid + Math.imul(ah8, bl1)) | 0;
            hi = (hi + Math.imul(ah8, bh1)) | 0;
            lo = (lo + Math.imul(al7, bl2)) | 0;
            mid = (mid + Math.imul(al7, bh2)) | 0;
            mid = (mid + Math.imul(ah7, bl2)) | 0;
            hi = (hi + Math.imul(ah7, bh2)) | 0;
            lo = (lo + Math.imul(al6, bl3)) | 0;
            mid = (mid + Math.imul(al6, bh3)) | 0;
            mid = (mid + Math.imul(ah6, bl3)) | 0;
            hi = (hi + Math.imul(ah6, bh3)) | 0;
            lo = (lo + Math.imul(al5, bl4)) | 0;
            mid = (mid + Math.imul(al5, bh4)) | 0;
            mid = (mid + Math.imul(ah5, bl4)) | 0;
            hi = (hi + Math.imul(ah5, bh4)) | 0;
            lo = (lo + Math.imul(al4, bl5)) | 0;
            mid = (mid + Math.imul(al4, bh5)) | 0;
            mid = (mid + Math.imul(ah4, bl5)) | 0;
            hi = (hi + Math.imul(ah4, bh5)) | 0;
            lo = (lo + Math.imul(al3, bl6)) | 0;
            mid = (mid + Math.imul(al3, bh6)) | 0;
            mid = (mid + Math.imul(ah3, bl6)) | 0;
            hi = (hi + Math.imul(ah3, bh6)) | 0;
            lo = (lo + Math.imul(al2, bl7)) | 0;
            mid = (mid + Math.imul(al2, bh7)) | 0;
            mid = (mid + Math.imul(ah2, bl7)) | 0;
            hi = (hi + Math.imul(ah2, bh7)) | 0;
            lo = (lo + Math.imul(al1, bl8)) | 0;
            mid = (mid + Math.imul(al1, bh8)) | 0;
            mid = (mid + Math.imul(ah1, bl8)) | 0;
            hi = (hi + Math.imul(ah1, bh8)) | 0;
            lo = (lo + Math.imul(al0, bl9)) | 0;
            mid = (mid + Math.imul(al0, bh9)) | 0;
            mid = (mid + Math.imul(ah0, bl9)) | 0;
            hi = (hi + Math.imul(ah0, bh9)) | 0;
            var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
            w9 &= 0x3ffffff;
            /* k = 10 */
            lo = Math.imul(al9, bl1);
            mid = Math.imul(al9, bh1);
            mid = (mid + Math.imul(ah9, bl1)) | 0;
            hi = Math.imul(ah9, bh1);
            lo = (lo + Math.imul(al8, bl2)) | 0;
            mid = (mid + Math.imul(al8, bh2)) | 0;
            mid = (mid + Math.imul(ah8, bl2)) | 0;
            hi = (hi + Math.imul(ah8, bh2)) | 0;
            lo = (lo + Math.imul(al7, bl3)) | 0;
            mid = (mid + Math.imul(al7, bh3)) | 0;
            mid = (mid + Math.imul(ah7, bl3)) | 0;
            hi = (hi + Math.imul(ah7, bh3)) | 0;
            lo = (lo + Math.imul(al6, bl4)) | 0;
            mid = (mid + Math.imul(al6, bh4)) | 0;
            mid = (mid + Math.imul(ah6, bl4)) | 0;
            hi = (hi + Math.imul(ah6, bh4)) | 0;
            lo = (lo + Math.imul(al5, bl5)) | 0;
            mid = (mid + Math.imul(al5, bh5)) | 0;
            mid = (mid + Math.imul(ah5, bl5)) | 0;
            hi = (hi + Math.imul(ah5, bh5)) | 0;
            lo = (lo + Math.imul(al4, bl6)) | 0;
            mid = (mid + Math.imul(al4, bh6)) | 0;
            mid = (mid + Math.imul(ah4, bl6)) | 0;
            hi = (hi + Math.imul(ah4, bh6)) | 0;
            lo = (lo + Math.imul(al3, bl7)) | 0;
            mid = (mid + Math.imul(al3, bh7)) | 0;
            mid = (mid + Math.imul(ah3, bl7)) | 0;
            hi = (hi + Math.imul(ah3, bh7)) | 0;
            lo = (lo + Math.imul(al2, bl8)) | 0;
            mid = (mid + Math.imul(al2, bh8)) | 0;
            mid = (mid + Math.imul(ah2, bl8)) | 0;
            hi = (hi + Math.imul(ah2, bh8)) | 0;
            lo = (lo + Math.imul(al1, bl9)) | 0;
            mid = (mid + Math.imul(al1, bh9)) | 0;
            mid = (mid + Math.imul(ah1, bl9)) | 0;
            hi = (hi + Math.imul(ah1, bh9)) | 0;
            var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
            w10 &= 0x3ffffff;
            /* k = 11 */
            lo = Math.imul(al9, bl2);
            mid = Math.imul(al9, bh2);
            mid = (mid + Math.imul(ah9, bl2)) | 0;
            hi = Math.imul(ah9, bh2);
            lo = (lo + Math.imul(al8, bl3)) | 0;
            mid = (mid + Math.imul(al8, bh3)) | 0;
            mid = (mid + Math.imul(ah8, bl3)) | 0;
            hi = (hi + Math.imul(ah8, bh3)) | 0;
            lo = (lo + Math.imul(al7, bl4)) | 0;
            mid = (mid + Math.imul(al7, bh4)) | 0;
            mid = (mid + Math.imul(ah7, bl4)) | 0;
            hi = (hi + Math.imul(ah7, bh4)) | 0;
            lo = (lo + Math.imul(al6, bl5)) | 0;
            mid = (mid + Math.imul(al6, bh5)) | 0;
            mid = (mid + Math.imul(ah6, bl5)) | 0;
            hi = (hi + Math.imul(ah6, bh5)) | 0;
            lo = (lo + Math.imul(al5, bl6)) | 0;
            mid = (mid + Math.imul(al5, bh6)) | 0;
            mid = (mid + Math.imul(ah5, bl6)) | 0;
            hi = (hi + Math.imul(ah5, bh6)) | 0;
            lo = (lo + Math.imul(al4, bl7)) | 0;
            mid = (mid + Math.imul(al4, bh7)) | 0;
            mid = (mid + Math.imul(ah4, bl7)) | 0;
            hi = (hi + Math.imul(ah4, bh7)) | 0;
            lo = (lo + Math.imul(al3, bl8)) | 0;
            mid = (mid + Math.imul(al3, bh8)) | 0;
            mid = (mid + Math.imul(ah3, bl8)) | 0;
            hi = (hi + Math.imul(ah3, bh8)) | 0;
            lo = (lo + Math.imul(al2, bl9)) | 0;
            mid = (mid + Math.imul(al2, bh9)) | 0;
            mid = (mid + Math.imul(ah2, bl9)) | 0;
            hi = (hi + Math.imul(ah2, bh9)) | 0;
            var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
            w11 &= 0x3ffffff;
            /* k = 12 */
            lo = Math.imul(al9, bl3);
            mid = Math.imul(al9, bh3);
            mid = (mid + Math.imul(ah9, bl3)) | 0;
            hi = Math.imul(ah9, bh3);
            lo = (lo + Math.imul(al8, bl4)) | 0;
            mid = (mid + Math.imul(al8, bh4)) | 0;
            mid = (mid + Math.imul(ah8, bl4)) | 0;
            hi = (hi + Math.imul(ah8, bh4)) | 0;
            lo = (lo + Math.imul(al7, bl5)) | 0;
            mid = (mid + Math.imul(al7, bh5)) | 0;
            mid = (mid + Math.imul(ah7, bl5)) | 0;
            hi = (hi + Math.imul(ah7, bh5)) | 0;
            lo = (lo + Math.imul(al6, bl6)) | 0;
            mid = (mid + Math.imul(al6, bh6)) | 0;
            mid = (mid + Math.imul(ah6, bl6)) | 0;
            hi = (hi + Math.imul(ah6, bh6)) | 0;
            lo = (lo + Math.imul(al5, bl7)) | 0;
            mid = (mid + Math.imul(al5, bh7)) | 0;
            mid = (mid + Math.imul(ah5, bl7)) | 0;
            hi = (hi + Math.imul(ah5, bh7)) | 0;
            lo = (lo + Math.imul(al4, bl8)) | 0;
            mid = (mid + Math.imul(al4, bh8)) | 0;
            mid = (mid + Math.imul(ah4, bl8)) | 0;
            hi = (hi + Math.imul(ah4, bh8)) | 0;
            lo = (lo + Math.imul(al3, bl9)) | 0;
            mid = (mid + Math.imul(al3, bh9)) | 0;
            mid = (mid + Math.imul(ah3, bl9)) | 0;
            hi = (hi + Math.imul(ah3, bh9)) | 0;
            var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
            w12 &= 0x3ffffff;
            /* k = 13 */
            lo = Math.imul(al9, bl4);
            mid = Math.imul(al9, bh4);
            mid = (mid + Math.imul(ah9, bl4)) | 0;
            hi = Math.imul(ah9, bh4);
            lo = (lo + Math.imul(al8, bl5)) | 0;
            mid = (mid + Math.imul(al8, bh5)) | 0;
            mid = (mid + Math.imul(ah8, bl5)) | 0;
            hi = (hi + Math.imul(ah8, bh5)) | 0;
            lo = (lo + Math.imul(al7, bl6)) | 0;
            mid = (mid + Math.imul(al7, bh6)) | 0;
            mid = (mid + Math.imul(ah7, bl6)) | 0;
            hi = (hi + Math.imul(ah7, bh6)) | 0;
            lo = (lo + Math.imul(al6, bl7)) | 0;
            mid = (mid + Math.imul(al6, bh7)) | 0;
            mid = (mid + Math.imul(ah6, bl7)) | 0;
            hi = (hi + Math.imul(ah6, bh7)) | 0;
            lo = (lo + Math.imul(al5, bl8)) | 0;
            mid = (mid + Math.imul(al5, bh8)) | 0;
            mid = (mid + Math.imul(ah5, bl8)) | 0;
            hi = (hi + Math.imul(ah5, bh8)) | 0;
            lo = (lo + Math.imul(al4, bl9)) | 0;
            mid = (mid + Math.imul(al4, bh9)) | 0;
            mid = (mid + Math.imul(ah4, bl9)) | 0;
            hi = (hi + Math.imul(ah4, bh9)) | 0;
            var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
            w13 &= 0x3ffffff;
            /* k = 14 */
            lo = Math.imul(al9, bl5);
            mid = Math.imul(al9, bh5);
            mid = (mid + Math.imul(ah9, bl5)) | 0;
            hi = Math.imul(ah9, bh5);
            lo = (lo + Math.imul(al8, bl6)) | 0;
            mid = (mid + Math.imul(al8, bh6)) | 0;
            mid = (mid + Math.imul(ah8, bl6)) | 0;
            hi = (hi + Math.imul(ah8, bh6)) | 0;
            lo = (lo + Math.imul(al7, bl7)) | 0;
            mid = (mid + Math.imul(al7, bh7)) | 0;
            mid = (mid + Math.imul(ah7, bl7)) | 0;
            hi = (hi + Math.imul(ah7, bh7)) | 0;
            lo = (lo + Math.imul(al6, bl8)) | 0;
            mid = (mid + Math.imul(al6, bh8)) | 0;
            mid = (mid + Math.imul(ah6, bl8)) | 0;
            hi = (hi + Math.imul(ah6, bh8)) | 0;
            lo = (lo + Math.imul(al5, bl9)) | 0;
            mid = (mid + Math.imul(al5, bh9)) | 0;
            mid = (mid + Math.imul(ah5, bl9)) | 0;
            hi = (hi + Math.imul(ah5, bh9)) | 0;
            var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
            w14 &= 0x3ffffff;
            /* k = 15 */
            lo = Math.imul(al9, bl6);
            mid = Math.imul(al9, bh6);
            mid = (mid + Math.imul(ah9, bl6)) | 0;
            hi = Math.imul(ah9, bh6);
            lo = (lo + Math.imul(al8, bl7)) | 0;
            mid = (mid + Math.imul(al8, bh7)) | 0;
            mid = (mid + Math.imul(ah8, bl7)) | 0;
            hi = (hi + Math.imul(ah8, bh7)) | 0;
            lo = (lo + Math.imul(al7, bl8)) | 0;
            mid = (mid + Math.imul(al7, bh8)) | 0;
            mid = (mid + Math.imul(ah7, bl8)) | 0;
            hi = (hi + Math.imul(ah7, bh8)) | 0;
            lo = (lo + Math.imul(al6, bl9)) | 0;
            mid = (mid + Math.imul(al6, bh9)) | 0;
            mid = (mid + Math.imul(ah6, bl9)) | 0;
            hi = (hi + Math.imul(ah6, bh9)) | 0;
            var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
            w15 &= 0x3ffffff;
            /* k = 16 */
            lo = Math.imul(al9, bl7);
            mid = Math.imul(al9, bh7);
            mid = (mid + Math.imul(ah9, bl7)) | 0;
            hi = Math.imul(ah9, bh7);
            lo = (lo + Math.imul(al8, bl8)) | 0;
            mid = (mid + Math.imul(al8, bh8)) | 0;
            mid = (mid + Math.imul(ah8, bl8)) | 0;
            hi = (hi + Math.imul(ah8, bh8)) | 0;
            lo = (lo + Math.imul(al7, bl9)) | 0;
            mid = (mid + Math.imul(al7, bh9)) | 0;
            mid = (mid + Math.imul(ah7, bl9)) | 0;
            hi = (hi + Math.imul(ah7, bh9)) | 0;
            var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
            w16 &= 0x3ffffff;
            /* k = 17 */
            lo = Math.imul(al9, bl8);
            mid = Math.imul(al9, bh8);
            mid = (mid + Math.imul(ah9, bl8)) | 0;
            hi = Math.imul(ah9, bh8);
            lo = (lo + Math.imul(al8, bl9)) | 0;
            mid = (mid + Math.imul(al8, bh9)) | 0;
            mid = (mid + Math.imul(ah8, bl9)) | 0;
            hi = (hi + Math.imul(ah8, bh9)) | 0;
            var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
            w17 &= 0x3ffffff;
            /* k = 18 */
            lo = Math.imul(al9, bl9);
            mid = Math.imul(al9, bh9);
            mid = (mid + Math.imul(ah9, bl9)) | 0;
            hi = Math.imul(ah9, bh9);
            var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
            c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
            w18 &= 0x3ffffff;
            o[0] = w0;
            o[1] = w1;
            o[2] = w2;
            o[3] = w3;
            o[4] = w4;
            o[5] = w5;
            o[6] = w6;
            o[7] = w7;
            o[8] = w8;
            o[9] = w9;
            o[10] = w10;
            o[11] = w11;
            o[12] = w12;
            o[13] = w13;
            o[14] = w14;
            o[15] = w15;
            o[16] = w16;
            o[17] = w17;
            o[18] = w18;
            if (c !== 0) {
              o[19] = c;
              out.length++;
            }
            return out;
          };

          // Polyfill comb
          if (!Math.imul) {
            comb10MulTo = smallMulTo;
          }

          function bigMulTo(self, num, out) {
            out.negative = num.negative ^ self.negative;
            out.length = self.length + num.length;

            var carry = 0;
            var hncarry = 0;
            for (var k = 0; k < out.length - 1; k++) {
              // Sum all words with the same `i + j = k` and accumulate `ncarry`,
              // note that ncarry could be >= 0x3ffffff
              var ncarry = hncarry;
              hncarry = 0;
              var rword = carry & 0x3ffffff;
              var maxJ = Math.min(k, num.length - 1);
              for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
                var i = k - j;
                var a = self.words[i] | 0;
                var b = num.words[j] | 0;
                var r = a * b;

                var lo = r & 0x3ffffff;
                ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
                lo = (lo + rword) | 0;
                rword = lo & 0x3ffffff;
                ncarry = (ncarry + (lo >>> 26)) | 0;

                hncarry += ncarry >>> 26;
                ncarry &= 0x3ffffff;
              }
              out.words[k] = rword;
              carry = ncarry;
              ncarry = hncarry;
            }
            if (carry !== 0) {
              out.words[k] = carry;
            } else {
              out.length--;
            }

            return out._strip();
          }

          function jumboMulTo(self, num, out) {
            // Temporary disable, see https://github.com/indutny/bn.js/issues/211
            // var fftm = new FFTM();
            // return fftm.mulp(self, num, out);
            return bigMulTo(self, num, out);
          }

          BN.prototype.mulTo = function mulTo(num, out) {
            var res;
            var len = this.length + num.length;
            if (this.length === 10 && num.length === 10) {
              res = comb10MulTo(this, num, out);
            } else if (len < 63) {
              res = smallMulTo(this, num, out);
            } else if (len < 1024) {
              res = bigMulTo(this, num, out);
            } else {
              res = jumboMulTo(this, num, out);
            }

            return res;
          };

          // Cooley-Tukey algorithm for FFT
          // slightly revisited to rely on looping instead of recursion

          function FFTM(x, y) {
            this.x = x;
            this.y = y;
          }

          FFTM.prototype.makeRBT = function makeRBT(N) {
            var t = new Array(N);
            var l = BN.prototype._countBits(N) - 1;
            for (var i = 0; i < N; i++) {
              t[i] = this.revBin(i, l, N);
            }

            return t;
          };

          // Returns binary-reversed representation of `x`
          FFTM.prototype.revBin = function revBin(x, l, N) {
            if (x === 0 || x === N - 1) return x;

            var rb = 0;
            for (var i = 0; i < l; i++) {
              rb |= (x & 1) << (l - i - 1);
              x >>= 1;
            }

            return rb;
          };

          // Performs "tweedling" phase, therefore 'emulating'
          // behaviour of the recursive algorithm
          FFTM.prototype.permute = function permute(
            rbt,
            rws,
            iws,
            rtws,
            itws,
            N
          ) {
            for (var i = 0; i < N; i++) {
              rtws[i] = rws[rbt[i]];
              itws[i] = iws[rbt[i]];
            }
          };

          FFTM.prototype.transform = function transform(
            rws,
            iws,
            rtws,
            itws,
            N,
            rbt
          ) {
            this.permute(rbt, rws, iws, rtws, itws, N);

            for (var s = 1; s < N; s <<= 1) {
              var l = s << 1;

              var rtwdf = Math.cos((2 * Math.PI) / l);
              var itwdf = Math.sin((2 * Math.PI) / l);

              for (var p = 0; p < N; p += l) {
                var rtwdf_ = rtwdf;
                var itwdf_ = itwdf;

                for (var j = 0; j < s; j++) {
                  var re = rtws[p + j];
                  var ie = itws[p + j];

                  var ro = rtws[p + j + s];
                  var io = itws[p + j + s];

                  var rx = rtwdf_ * ro - itwdf_ * io;

                  io = rtwdf_ * io + itwdf_ * ro;
                  ro = rx;

                  rtws[p + j] = re + ro;
                  itws[p + j] = ie + io;

                  rtws[p + j + s] = re - ro;
                  itws[p + j + s] = ie - io;

                  /* jshint maxdepth : false */
                  if (j !== l) {
                    rx = rtwdf * rtwdf_ - itwdf * itwdf_;

                    itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                    rtwdf_ = rx;
                  }
                }
              }
            }
          };

          FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
            var N = Math.max(m, n) | 1;
            var odd = N & 1;
            var i = 0;
            for (N = (N / 2) | 0; N; N = N >>> 1) {
              i++;
            }

            return 1 << (i + 1 + odd);
          };

          FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
            if (N <= 1) return;

            for (var i = 0; i < N / 2; i++) {
              var t = rws[i];

              rws[i] = rws[N - i - 1];
              rws[N - i - 1] = t;

              t = iws[i];

              iws[i] = -iws[N - i - 1];
              iws[N - i - 1] = -t;
            }
          };

          FFTM.prototype.normalize13b = function normalize13b(ws, N) {
            var carry = 0;
            for (var i = 0; i < N / 2; i++) {
              var w =
                Math.round(ws[2 * i + 1] / N) * 0x2000 +
                Math.round(ws[2 * i] / N) +
                carry;

              ws[i] = w & 0x3ffffff;

              if (w < 0x4000000) {
                carry = 0;
              } else {
                carry = (w / 0x4000000) | 0;
              }
            }

            return ws;
          };

          FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
            var carry = 0;
            for (var i = 0; i < len; i++) {
              carry = carry + (ws[i] | 0);

              rws[2 * i] = carry & 0x1fff;
              carry = carry >>> 13;
              rws[2 * i + 1] = carry & 0x1fff;
              carry = carry >>> 13;
            }

            // Pad with zeroes
            for (i = 2 * len; i < N; ++i) {
              rws[i] = 0;
            }

            assert(carry === 0);
            assert((carry & ~0x1fff) === 0);
          };

          FFTM.prototype.stub = function stub(N) {
            var ph = new Array(N);
            for (var i = 0; i < N; i++) {
              ph[i] = 0;
            }

            return ph;
          };

          FFTM.prototype.mulp = function mulp(x, y, out) {
            var N = 2 * this.guessLen13b(x.length, y.length);

            var rbt = this.makeRBT(N);

            var _ = this.stub(N);

            var rws = new Array(N);
            var rwst = new Array(N);
            var iwst = new Array(N);

            var nrws = new Array(N);
            var nrwst = new Array(N);
            var niwst = new Array(N);

            var rmws = out.words;
            rmws.length = N;

            this.convert13b(x.words, x.length, rws, N);
            this.convert13b(y.words, y.length, nrws, N);

            this.transform(rws, _, rwst, iwst, N, rbt);
            this.transform(nrws, _, nrwst, niwst, N, rbt);

            for (var i = 0; i < N; i++) {
              var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
              iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
              rwst[i] = rx;
            }

            this.conjugate(rwst, iwst, N);
            this.transform(rwst, iwst, rmws, _, N, rbt);
            this.conjugate(rmws, _, N);
            this.normalize13b(rmws, N);

            out.negative = x.negative ^ y.negative;
            out.length = x.length + y.length;
            return out._strip();
          };

          // Multiply `this` by `num`
          BN.prototype.mul = function mul(num) {
            var out = new BN(null);
            out.words = new Array(this.length + num.length);
            return this.mulTo(num, out);
          };

          // Multiply employing FFT
          BN.prototype.mulf = function mulf(num) {
            var out = new BN(null);
            out.words = new Array(this.length + num.length);
            return jumboMulTo(this, num, out);
          };

          // In-place Multiplication
          BN.prototype.imul = function imul(num) {
            return this.clone().mulTo(num, this);
          };

          BN.prototype.imuln = function imuln(num) {
            var isNegNum = num < 0;
            if (isNegNum) num = -num;

            assert(typeof num === "number");
            assert(num < 0x4000000);

            // Carry
            var carry = 0;
            for (var i = 0; i < this.length; i++) {
              var w = (this.words[i] | 0) * num;
              var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
              carry >>= 26;
              carry += (w / 0x4000000) | 0;
              // NOTE: lo is 27bit maximum
              carry += lo >>> 26;
              this.words[i] = lo & 0x3ffffff;
            }

            if (carry !== 0) {
              this.words[i] = carry;
              this.length++;
            }

            return isNegNum ? this.ineg() : this;
          };

          BN.prototype.muln = function muln(num) {
            return this.clone().imuln(num);
          };

          // `this` * `this`
          BN.prototype.sqr = function sqr() {
            return this.mul(this);
          };

          // `this` * `this` in-place
          BN.prototype.isqr = function isqr() {
            return this.imul(this.clone());
          };

          // Math.pow(`this`, `num`)
          BN.prototype.pow = function pow(num) {
            var w = toBitArray(num);
            if (w.length === 0) return new BN(1);

            // Skip leading zeroes
            var res = this;
            for (var i = 0; i < w.length; i++, res = res.sqr()) {
              if (w[i] !== 0) break;
            }

            if (++i < w.length) {
              for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
                if (w[i] === 0) continue;

                res = res.mul(q);
              }
            }

            return res;
          };

          // Shift-left in-place
          BN.prototype.iushln = function iushln(bits) {
            assert(typeof bits === "number" && bits >= 0);
            var r = bits % 26;
            var s = (bits - r) / 26;
            var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
            var i;

            if (r !== 0) {
              var carry = 0;

              for (i = 0; i < this.length; i++) {
                var newCarry = this.words[i] & carryMask;
                var c = ((this.words[i] | 0) - newCarry) << r;
                this.words[i] = c | carry;
                carry = newCarry >>> (26 - r);
              }

              if (carry) {
                this.words[i] = carry;
                this.length++;
              }
            }

            if (s !== 0) {
              for (i = this.length - 1; i >= 0; i--) {
                this.words[i + s] = this.words[i];
              }

              for (i = 0; i < s; i++) {
                this.words[i] = 0;
              }

              this.length += s;
            }

            return this._strip();
          };

          BN.prototype.ishln = function ishln(bits) {
            // TODO(indutny): implement me
            assert(this.negative === 0);
            return this.iushln(bits);
          };

          // Shift-right in-place
          // NOTE: `hint` is a lowest bit before trailing zeroes
          // NOTE: if `extended` is present - it will be filled with destroyed bits
          BN.prototype.iushrn = function iushrn(bits, hint, extended) {
            assert(typeof bits === "number" && bits >= 0);
            var h;
            if (hint) {
              h = (hint - (hint % 26)) / 26;
            } else {
              h = 0;
            }

            var r = bits % 26;
            var s = Math.min((bits - r) / 26, this.length);
            var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
            var maskedWords = extended;

            h -= s;
            h = Math.max(0, h);

            // Extended mode, copy masked part
            if (maskedWords) {
              for (var i = 0; i < s; i++) {
                maskedWords.words[i] = this.words[i];
              }
              maskedWords.length = s;
            }

            if (s === 0) {
              // No-op, we should not move anything at all
            } else if (this.length > s) {
              this.length -= s;
              for (i = 0; i < this.length; i++) {
                this.words[i] = this.words[i + s];
              }
            } else {
              this.words[0] = 0;
              this.length = 1;
            }

            var carry = 0;
            for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
              var word = this.words[i] | 0;
              this.words[i] = (carry << (26 - r)) | (word >>> r);
              carry = word & mask;
            }

            // Push carried bits as a mask
            if (maskedWords && carry !== 0) {
              maskedWords.words[maskedWords.length++] = carry;
            }

            if (this.length === 0) {
              this.words[0] = 0;
              this.length = 1;
            }

            return this._strip();
          };

          BN.prototype.ishrn = function ishrn(bits, hint, extended) {
            // TODO(indutny): implement me
            assert(this.negative === 0);
            return this.iushrn(bits, hint, extended);
          };

          // Shift-left
          BN.prototype.shln = function shln(bits) {
            return this.clone().ishln(bits);
          };

          BN.prototype.ushln = function ushln(bits) {
            return this.clone().iushln(bits);
          };

          // Shift-right
          BN.prototype.shrn = function shrn(bits) {
            return this.clone().ishrn(bits);
          };

          BN.prototype.ushrn = function ushrn(bits) {
            return this.clone().iushrn(bits);
          };

          // Test if n bit is set
          BN.prototype.testn = function testn(bit) {
            assert(typeof bit === "number" && bit >= 0);
            var r = bit % 26;
            var s = (bit - r) / 26;
            var q = 1 << r;

            // Fast case: bit is much higher than all existing words
            if (this.length <= s) return false;

            // Check bit and return
            var w = this.words[s];

            return !!(w & q);
          };

          // Return only lowers bits of number (in-place)
          BN.prototype.imaskn = function imaskn(bits) {
            assert(typeof bits === "number" && bits >= 0);
            var r = bits % 26;
            var s = (bits - r) / 26;

            assert(
              this.negative === 0,
              "imaskn works only with positive numbers"
            );

            if (this.length <= s) {
              return this;
            }

            if (r !== 0) {
              s++;
            }
            this.length = Math.min(s, this.length);

            if (r !== 0) {
              var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
              this.words[this.length - 1] &= mask;
            }

            return this._strip();
          };

          // Return only lowers bits of number
          BN.prototype.maskn = function maskn(bits) {
            return this.clone().imaskn(bits);
          };

          // Add plain number `num` to `this`
          BN.prototype.iaddn = function iaddn(num) {
            assert(typeof num === "number");
            assert(num < 0x4000000);
            if (num < 0) return this.isubn(-num);

            // Possible sign change
            if (this.negative !== 0) {
              if (this.length === 1 && (this.words[0] | 0) <= num) {
                this.words[0] = num - (this.words[0] | 0);
                this.negative = 0;
                return this;
              }

              this.negative = 0;
              this.isubn(num);
              this.negative = 1;
              return this;
            }

            // Add without checks
            return this._iaddn(num);
          };

          BN.prototype._iaddn = function _iaddn(num) {
            this.words[0] += num;

            // Carry
            for (
              var i = 0;
              i < this.length && this.words[i] >= 0x4000000;
              i++
            ) {
              this.words[i] -= 0x4000000;
              if (i === this.length - 1) {
                this.words[i + 1] = 1;
              } else {
                this.words[i + 1]++;
              }
            }
            this.length = Math.max(this.length, i + 1);

            return this;
          };

          // Subtract plain number `num` from `this`
          BN.prototype.isubn = function isubn(num) {
            assert(typeof num === "number");
            assert(num < 0x4000000);
            if (num < 0) return this.iaddn(-num);

            if (this.negative !== 0) {
              this.negative = 0;
              this.iaddn(num);
              this.negative = 1;
              return this;
            }

            this.words[0] -= num;

            if (this.length === 1 && this.words[0] < 0) {
              this.words[0] = -this.words[0];
              this.negative = 1;
            } else {
              // Carry
              for (var i = 0; i < this.length && this.words[i] < 0; i++) {
                this.words[i] += 0x4000000;
                this.words[i + 1] -= 1;
              }
            }

            return this._strip();
          };

          BN.prototype.addn = function addn(num) {
            return this.clone().iaddn(num);
          };

          BN.prototype.subn = function subn(num) {
            return this.clone().isubn(num);
          };

          BN.prototype.iabs = function iabs() {
            this.negative = 0;

            return this;
          };

          BN.prototype.abs = function abs() {
            return this.clone().iabs();
          };

          BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
            var len = num.length + shift;
            var i;

            this._expand(len);

            var w;
            var carry = 0;
            for (i = 0; i < num.length; i++) {
              w = (this.words[i + shift] | 0) + carry;
              var right = (num.words[i] | 0) * mul;
              w -= right & 0x3ffffff;
              carry = (w >> 26) - ((right / 0x4000000) | 0);
              this.words[i + shift] = w & 0x3ffffff;
            }
            for (; i < this.length - shift; i++) {
              w = (this.words[i + shift] | 0) + carry;
              carry = w >> 26;
              this.words[i + shift] = w & 0x3ffffff;
            }

            if (carry === 0) return this._strip();

            // Subtraction overflow
            assert(carry === -1);
            carry = 0;
            for (i = 0; i < this.length; i++) {
              w = -(this.words[i] | 0) + carry;
              carry = w >> 26;
              this.words[i] = w & 0x3ffffff;
            }
            this.negative = 1;

            return this._strip();
          };

          BN.prototype._wordDiv = function _wordDiv(num, mode) {
            var shift = this.length - num.length;

            var a = this.clone();
            var b = num;

            // Normalize
            var bhi = b.words[b.length - 1] | 0;
            var bhiBits = this._countBits(bhi);
            shift = 26 - bhiBits;
            if (shift !== 0) {
              b = b.ushln(shift);
              a.iushln(shift);
              bhi = b.words[b.length - 1] | 0;
            }

            // Initialize quotient
            var m = a.length - b.length;
            var q;

            if (mode !== "mod") {
              q = new BN(null);
              q.length = m + 1;
              q.words = new Array(q.length);
              for (var i = 0; i < q.length; i++) {
                q.words[i] = 0;
              }
            }

            var diff = a.clone()._ishlnsubmul(b, 1, m);
            if (diff.negative === 0) {
              a = diff;
              if (q) {
                q.words[m] = 1;
              }
            }

            for (var j = m - 1; j >= 0; j--) {
              var qj =
                (a.words[b.length + j] | 0) * 0x4000000 +
                (a.words[b.length + j - 1] | 0);

              // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
              // (0x7ffffff)
              qj = Math.min((qj / bhi) | 0, 0x3ffffff);

              a._ishlnsubmul(b, qj, j);
              while (a.negative !== 0) {
                qj--;
                a.negative = 0;
                a._ishlnsubmul(b, 1, j);
                if (!a.isZero()) {
                  a.negative ^= 1;
                }
              }
              if (q) {
                q.words[j] = qj;
              }
            }
            if (q) {
              q._strip();
            }
            a._strip();

            // Denormalize
            if (mode !== "div" && shift !== 0) {
              a.iushrn(shift);
            }

            return {
              div: q || null,
              mod: a,
            };
          };

          // NOTE: 1) `mode` can be set to `mod` to request mod only,
          //       to `div` to request div only, or be absent to
          //       request both div & mod
          //       2) `positive` is true if unsigned mod is requested
          BN.prototype.divmod = function divmod(num, mode, positive) {
            assert(!num.isZero());

            if (this.isZero()) {
              return {
                div: new BN(0),
                mod: new BN(0),
              };
            }

            var div, mod, res;
            if (this.negative !== 0 && num.negative === 0) {
              res = this.neg().divmod(num, mode);

              if (mode !== "mod") {
                div = res.div.neg();
              }

              if (mode !== "div") {
                mod = res.mod.neg();
                if (positive && mod.negative !== 0) {
                  mod.iadd(num);
                }
              }

              return {
                div: div,
                mod: mod,
              };
            }

            if (this.negative === 0 && num.negative !== 0) {
              res = this.divmod(num.neg(), mode);

              if (mode !== "mod") {
                div = res.div.neg();
              }

              return {
                div: div,
                mod: res.mod,
              };
            }

            if ((this.negative & num.negative) !== 0) {
              res = this.neg().divmod(num.neg(), mode);

              if (mode !== "div") {
                mod = res.mod.neg();
                if (positive && mod.negative !== 0) {
                  mod.isub(num);
                }
              }

              return {
                div: res.div,
                mod: mod,
              };
            }

            // Both numbers are positive at this point

            // Strip both numbers to approximate shift value
            if (num.length > this.length || this.cmp(num) < 0) {
              return {
                div: new BN(0),
                mod: this,
              };
            }

            // Very short reduction
            if (num.length === 1) {
              if (mode === "div") {
                return {
                  div: this.divn(num.words[0]),
                  mod: null,
                };
              }

              if (mode === "mod") {
                return {
                  div: null,
                  mod: new BN(this.modrn(num.words[0])),
                };
              }

              return {
                div: this.divn(num.words[0]),
                mod: new BN(this.modrn(num.words[0])),
              };
            }

            return this._wordDiv(num, mode);
          };

          // Find `this` / `num`
          BN.prototype.div = function div(num) {
            return this.divmod(num, "div", false).div;
          };

          // Find `this` % `num`
          BN.prototype.mod = function mod(num) {
            return this.divmod(num, "mod", false).mod;
          };

          BN.prototype.umod = function umod(num) {
            return this.divmod(num, "mod", true).mod;
          };

          // Find Round(`this` / `num`)
          BN.prototype.divRound = function divRound(num) {
            var dm = this.divmod(num);

            // Fast case - exact division
            if (dm.mod.isZero()) return dm.div;

            var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

            var half = num.ushrn(1);
            var r2 = num.andln(1);
            var cmp = mod.cmp(half);

            // Round down
            if (cmp < 0 || (r2 === 1 && cmp === 0)) return dm.div;

            // Round up
            return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
          };

          BN.prototype.modrn = function modrn(num) {
            var isNegNum = num < 0;
            if (isNegNum) num = -num;

            assert(num <= 0x3ffffff);
            var p = (1 << 26) % num;

            var acc = 0;
            for (var i = this.length - 1; i >= 0; i--) {
              acc = (p * acc + (this.words[i] | 0)) % num;
            }

            return isNegNum ? -acc : acc;
          };

          // WARNING: DEPRECATED
          BN.prototype.modn = function modn(num) {
            return this.modrn(num);
          };

          // In-place division by number
          BN.prototype.idivn = function idivn(num) {
            var isNegNum = num < 0;
            if (isNegNum) num = -num;

            assert(num <= 0x3ffffff);

            var carry = 0;
            for (var i = this.length - 1; i >= 0; i--) {
              var w = (this.words[i] | 0) + carry * 0x4000000;
              this.words[i] = (w / num) | 0;
              carry = w % num;
            }

            this._strip();
            return isNegNum ? this.ineg() : this;
          };

          BN.prototype.divn = function divn(num) {
            return this.clone().idivn(num);
          };

          BN.prototype.egcd = function egcd(p) {
            assert(p.negative === 0);
            assert(!p.isZero());

            var x = this;
            var y = p.clone();

            if (x.negative !== 0) {
              x = x.umod(p);
            } else {
              x = x.clone();
            }

            // A * x + B * y = x
            var A = new BN(1);
            var B = new BN(0);

            // C * x + D * y = y
            var C = new BN(0);
            var D = new BN(1);

            var g = 0;

            while (x.isEven() && y.isEven()) {
              x.iushrn(1);
              y.iushrn(1);
              ++g;
            }

            var yp = y.clone();
            var xp = x.clone();

            while (!x.isZero()) {
              for (
                var i = 0, im = 1;
                (x.words[0] & im) === 0 && i < 26;
                ++i, im <<= 1
              );
              if (i > 0) {
                x.iushrn(i);
                while (i-- > 0) {
                  if (A.isOdd() || B.isOdd()) {
                    A.iadd(yp);
                    B.isub(xp);
                  }

                  A.iushrn(1);
                  B.iushrn(1);
                }
              }

              for (
                var j = 0, jm = 1;
                (y.words[0] & jm) === 0 && j < 26;
                ++j, jm <<= 1
              );
              if (j > 0) {
                y.iushrn(j);
                while (j-- > 0) {
                  if (C.isOdd() || D.isOdd()) {
                    C.iadd(yp);
                    D.isub(xp);
                  }

                  C.iushrn(1);
                  D.iushrn(1);
                }
              }

              if (x.cmp(y) >= 0) {
                x.isub(y);
                A.isub(C);
                B.isub(D);
              } else {
                y.isub(x);
                C.isub(A);
                D.isub(B);
              }
            }

            return {
              a: C,
              b: D,
              gcd: y.iushln(g),
            };
          };

          // This is reduced incarnation of the binary EEA
          // above, designated to invert members of the
          // _prime_ fields F(p) at a maximal speed
          BN.prototype._invmp = function _invmp(p) {
            assert(p.negative === 0);
            assert(!p.isZero());

            var a = this;
            var b = p.clone();

            if (a.negative !== 0) {
              a = a.umod(p);
            } else {
              a = a.clone();
            }

            var x1 = new BN(1);
            var x2 = new BN(0);

            var delta = b.clone();

            while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
              for (
                var i = 0, im = 1;
                (a.words[0] & im) === 0 && i < 26;
                ++i, im <<= 1
              );
              if (i > 0) {
                a.iushrn(i);
                while (i-- > 0) {
                  if (x1.isOdd()) {
                    x1.iadd(delta);
                  }

                  x1.iushrn(1);
                }
              }

              for (
                var j = 0, jm = 1;
                (b.words[0] & jm) === 0 && j < 26;
                ++j, jm <<= 1
              );
              if (j > 0) {
                b.iushrn(j);
                while (j-- > 0) {
                  if (x2.isOdd()) {
                    x2.iadd(delta);
                  }

                  x2.iushrn(1);
                }
              }

              if (a.cmp(b) >= 0) {
                a.isub(b);
                x1.isub(x2);
              } else {
                b.isub(a);
                x2.isub(x1);
              }
            }

            var res;
            if (a.cmpn(1) === 0) {
              res = x1;
            } else {
              res = x2;
            }

            if (res.cmpn(0) < 0) {
              res.iadd(p);
            }

            return res;
          };

          BN.prototype.gcd = function gcd(num) {
            if (this.isZero()) return num.abs();
            if (num.isZero()) return this.abs();

            var a = this.clone();
            var b = num.clone();
            a.negative = 0;
            b.negative = 0;

            // Remove common factor of two
            for (var shift = 0; a.isEven() && b.isEven(); shift++) {
              a.iushrn(1);
              b.iushrn(1);
            }

            do {
              while (a.isEven()) {
                a.iushrn(1);
              }
              while (b.isEven()) {
                b.iushrn(1);
              }

              var r = a.cmp(b);
              if (r < 0) {
                // Swap `a` and `b` to make `a` always bigger than `b`
                var t = a;
                a = b;
                b = t;
              } else if (r === 0 || b.cmpn(1) === 0) {
                break;
              }

              a.isub(b);
            } while (true);

            return b.iushln(shift);
          };

          // Invert number in the field F(num)
          BN.prototype.invm = function invm(num) {
            return this.egcd(num).a.umod(num);
          };

          BN.prototype.isEven = function isEven() {
            return (this.words[0] & 1) === 0;
          };

          BN.prototype.isOdd = function isOdd() {
            return (this.words[0] & 1) === 1;
          };

          // And first word and num
          BN.prototype.andln = function andln(num) {
            return this.words[0] & num;
          };

          // Increment at the bit position in-line
          BN.prototype.bincn = function bincn(bit) {
            assert(typeof bit === "number");
            var r = bit % 26;
            var s = (bit - r) / 26;
            var q = 1 << r;

            // Fast case: bit is much higher than all existing words
            if (this.length <= s) {
              this._expand(s + 1);
              this.words[s] |= q;
              return this;
            }

            // Add bit and propagate, if needed
            var carry = q;
            for (var i = s; carry !== 0 && i < this.length; i++) {
              var w = this.words[i] | 0;
              w += carry;
              carry = w >>> 26;
              w &= 0x3ffffff;
              this.words[i] = w;
            }
            if (carry !== 0) {
              this.words[i] = carry;
              this.length++;
            }
            return this;
          };

          BN.prototype.isZero = function isZero() {
            return this.length === 1 && this.words[0] === 0;
          };

          BN.prototype.cmpn = function cmpn(num) {
            var negative = num < 0;

            if (this.negative !== 0 && !negative) return -1;
            if (this.negative === 0 && negative) return 1;

            this._strip();

            var res;
            if (this.length > 1) {
              res = 1;
            } else {
              if (negative) {
                num = -num;
              }

              assert(num <= 0x3ffffff, "Number is too big");

              var w = this.words[0] | 0;
              res = w === num ? 0 : w < num ? -1 : 1;
            }
            if (this.negative !== 0) return -res | 0;
            return res;
          };

          // Compare two numbers and return:
          // 1 - if `this` > `num`
          // 0 - if `this` == `num`
          // -1 - if `this` < `num`
          BN.prototype.cmp = function cmp(num) {
            if (this.negative !== 0 && num.negative === 0) return -1;
            if (this.negative === 0 && num.negative !== 0) return 1;

            var res = this.ucmp(num);
            if (this.negative !== 0) return -res | 0;
            return res;
          };

          // Unsigned comparison
          BN.prototype.ucmp = function ucmp(num) {
            // At this point both numbers have the same sign
            if (this.length > num.length) return 1;
            if (this.length < num.length) return -1;

            var res = 0;
            for (var i = this.length - 1; i >= 0; i--) {
              var a = this.words[i] | 0;
              var b = num.words[i] | 0;

              if (a === b) continue;
              if (a < b) {
                res = -1;
              } else if (a > b) {
                res = 1;
              }
              break;
            }
            return res;
          };

          BN.prototype.gtn = function gtn(num) {
            return this.cmpn(num) === 1;
          };

          BN.prototype.gt = function gt(num) {
            return this.cmp(num) === 1;
          };

          BN.prototype.gten = function gten(num) {
            return this.cmpn(num) >= 0;
          };

          BN.prototype.gte = function gte(num) {
            return this.cmp(num) >= 0;
          };

          BN.prototype.ltn = function ltn(num) {
            return this.cmpn(num) === -1;
          };

          BN.prototype.lt = function lt(num) {
            return this.cmp(num) === -1;
          };

          BN.prototype.lten = function lten(num) {
            return this.cmpn(num) <= 0;
          };

          BN.prototype.lte = function lte(num) {
            return this.cmp(num) <= 0;
          };

          BN.prototype.eqn = function eqn(num) {
            return this.cmpn(num) === 0;
          };

          BN.prototype.eq = function eq(num) {
            return this.cmp(num) === 0;
          };

          //
          // A reduce context, could be using montgomery or something better, depending
          // on the `m` itself.
          //
          BN.red = function red(num) {
            return new Red(num);
          };

          BN.prototype.toRed = function toRed(ctx) {
            assert(!this.red, "Already a number in reduction context");
            assert(this.negative === 0, "red works only with positives");
            return ctx.convertTo(this)._forceRed(ctx);
          };

          BN.prototype.fromRed = function fromRed() {
            assert(
              this.red,
              "fromRed works only with numbers in reduction context"
            );
            return this.red.convertFrom(this);
          };

          BN.prototype._forceRed = function _forceRed(ctx) {
            this.red = ctx;
            return this;
          };

          BN.prototype.forceRed = function forceRed(ctx) {
            assert(!this.red, "Already a number in reduction context");
            return this._forceRed(ctx);
          };

          BN.prototype.redAdd = function redAdd(num) {
            assert(this.red, "redAdd works only with red numbers");
            return this.red.add(this, num);
          };

          BN.prototype.redIAdd = function redIAdd(num) {
            assert(this.red, "redIAdd works only with red numbers");
            return this.red.iadd(this, num);
          };

          BN.prototype.redSub = function redSub(num) {
            assert(this.red, "redSub works only with red numbers");
            return this.red.sub(this, num);
          };

          BN.prototype.redISub = function redISub(num) {
            assert(this.red, "redISub works only with red numbers");
            return this.red.isub(this, num);
          };

          BN.prototype.redShl = function redShl(num) {
            assert(this.red, "redShl works only with red numbers");
            return this.red.shl(this, num);
          };

          BN.prototype.redMul = function redMul(num) {
            assert(this.red, "redMul works only with red numbers");
            this.red._verify2(this, num);
            return this.red.mul(this, num);
          };

          BN.prototype.redIMul = function redIMul(num) {
            assert(this.red, "redMul works only with red numbers");
            this.red._verify2(this, num);
            return this.red.imul(this, num);
          };

          BN.prototype.redSqr = function redSqr() {
            assert(this.red, "redSqr works only with red numbers");
            this.red._verify1(this);
            return this.red.sqr(this);
          };

          BN.prototype.redISqr = function redISqr() {
            assert(this.red, "redISqr works only with red numbers");
            this.red._verify1(this);
            return this.red.isqr(this);
          };

          // Square root over p
          BN.prototype.redSqrt = function redSqrt() {
            assert(this.red, "redSqrt works only with red numbers");
            this.red._verify1(this);
            return this.red.sqrt(this);
          };

          BN.prototype.redInvm = function redInvm() {
            assert(this.red, "redInvm works only with red numbers");
            this.red._verify1(this);
            return this.red.invm(this);
          };

          // Return negative clone of `this` % `red modulo`
          BN.prototype.redNeg = function redNeg() {
            assert(this.red, "redNeg works only with red numbers");
            this.red._verify1(this);
            return this.red.neg(this);
          };

          BN.prototype.redPow = function redPow(num) {
            assert(this.red && !num.red, "redPow(normalNum)");
            this.red._verify1(this);
            return this.red.pow(this, num);
          };

          // Prime numbers with efficient reduction
          var primes = {
            k256: null,
            p224: null,
            p192: null,
            p25519: null,
          };

          // Pseudo-Mersenne prime
          function MPrime(name, p) {
            // P = 2 ^ N - K
            this.name = name;
            this.p = new BN(p, 16);
            this.n = this.p.bitLength();
            this.k = new BN(1).iushln(this.n).isub(this.p);

            this.tmp = this._tmp();
          }

          MPrime.prototype._tmp = function _tmp() {
            var tmp = new BN(null);
            tmp.words = new Array(Math.ceil(this.n / 13));
            return tmp;
          };

          MPrime.prototype.ireduce = function ireduce(num) {
            // Assumes that `num` is less than `P^2`
            // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
            var r = num;
            var rlen;

            do {
              this.split(r, this.tmp);
              r = this.imulK(r);
              r = r.iadd(this.tmp);
              rlen = r.bitLength();
            } while (rlen > this.n);

            var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
            if (cmp === 0) {
              r.words[0] = 0;
              r.length = 1;
            } else if (cmp > 0) {
              r.isub(this.p);
            } else {
              if (r.strip !== undefined) {
                // r is a BN v4 instance
                r.strip();
              } else {
                // r is a BN v5 instance
                r._strip();
              }
            }

            return r;
          };

          MPrime.prototype.split = function split(input, out) {
            input.iushrn(this.n, 0, out);
          };

          MPrime.prototype.imulK = function imulK(num) {
            return num.imul(this.k);
          };

          function K256() {
            MPrime.call(
              this,
              "k256",
              "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
            );
          }
          inherits(K256, MPrime);

          K256.prototype.split = function split(input, output) {
            // 256 = 9 * 26 + 22
            var mask = 0x3fffff;

            var outLen = Math.min(input.length, 9);
            for (var i = 0; i < outLen; i++) {
              output.words[i] = input.words[i];
            }
            output.length = outLen;

            if (input.length <= 9) {
              input.words[0] = 0;
              input.length = 1;
              return;
            }

            // Shift by 9 limbs
            var prev = input.words[9];
            output.words[output.length++] = prev & mask;

            for (i = 10; i < input.length; i++) {
              var next = input.words[i] | 0;
              input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
              prev = next;
            }
            prev >>>= 22;
            input.words[i - 10] = prev;
            if (prev === 0 && input.length > 10) {
              input.length -= 10;
            } else {
              input.length -= 9;
            }
          };

          K256.prototype.imulK = function imulK(num) {
            // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
            num.words[num.length] = 0;
            num.words[num.length + 1] = 0;
            num.length += 2;

            // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
            var lo = 0;
            for (var i = 0; i < num.length; i++) {
              var w = num.words[i] | 0;
              lo += w * 0x3d1;
              num.words[i] = lo & 0x3ffffff;
              lo = w * 0x40 + ((lo / 0x4000000) | 0);
            }

            // Fast length reduction
            if (num.words[num.length - 1] === 0) {
              num.length--;
              if (num.words[num.length - 1] === 0) {
                num.length--;
              }
            }
            return num;
          };

          function P224() {
            MPrime.call(
              this,
              "p224",
              "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
            );
          }
          inherits(P224, MPrime);

          function P192() {
            MPrime.call(
              this,
              "p192",
              "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
            );
          }
          inherits(P192, MPrime);

          function P25519() {
            // 2 ^ 255 - 19
            MPrime.call(
              this,
              "25519",
              "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
            );
          }
          inherits(P25519, MPrime);

          P25519.prototype.imulK = function imulK(num) {
            // K = 0x13
            var carry = 0;
            for (var i = 0; i < num.length; i++) {
              var hi = (num.words[i] | 0) * 0x13 + carry;
              var lo = hi & 0x3ffffff;
              hi >>>= 26;

              num.words[i] = lo;
              carry = hi;
            }
            if (carry !== 0) {
              num.words[num.length++] = carry;
            }
            return num;
          };

          // Exported mostly for testing purposes, use plain name instead
          BN._prime = function prime(name) {
            // Cached version of prime
            if (primes[name]) return primes[name];

            var prime;
            if (name === "k256") {
              prime = new K256();
            } else if (name === "p224") {
              prime = new P224();
            } else if (name === "p192") {
              prime = new P192();
            } else if (name === "p25519") {
              prime = new P25519();
            } else {
              throw new Error("Unknown prime " + name);
            }
            primes[name] = prime;

            return prime;
          };

          //
          // Base reduction engine
          //
          function Red(m) {
            if (typeof m === "string") {
              var prime = BN._prime(m);
              this.m = prime.p;
              this.prime = prime;
            } else {
              assert(m.gtn(1), "modulus must be greater than 1");
              this.m = m;
              this.prime = null;
            }
          }

          Red.prototype._verify1 = function _verify1(a) {
            assert(a.negative === 0, "red works only with positives");
            assert(a.red, "red works only with red numbers");
          };

          Red.prototype._verify2 = function _verify2(a, b) {
            assert(
              (a.negative | b.negative) === 0,
              "red works only with positives"
            );
            assert(a.red && a.red === b.red, "red works only with red numbers");
          };

          Red.prototype.imod = function imod(a) {
            if (this.prime) return this.prime.ireduce(a)._forceRed(this);

            move(a, a.umod(this.m)._forceRed(this));
            return a;
          };

          Red.prototype.neg = function neg(a) {
            if (a.isZero()) {
              return a.clone();
            }

            return this.m.sub(a)._forceRed(this);
          };

          Red.prototype.add = function add(a, b) {
            this._verify2(a, b);

            var res = a.add(b);
            if (res.cmp(this.m) >= 0) {
              res.isub(this.m);
            }
            return res._forceRed(this);
          };

          Red.prototype.iadd = function iadd(a, b) {
            this._verify2(a, b);

            var res = a.iadd(b);
            if (res.cmp(this.m) >= 0) {
              res.isub(this.m);
            }
            return res;
          };

          Red.prototype.sub = function sub(a, b) {
            this._verify2(a, b);

            var res = a.sub(b);
            if (res.cmpn(0) < 0) {
              res.iadd(this.m);
            }
            return res._forceRed(this);
          };

          Red.prototype.isub = function isub(a, b) {
            this._verify2(a, b);

            var res = a.isub(b);
            if (res.cmpn(0) < 0) {
              res.iadd(this.m);
            }
            return res;
          };

          Red.prototype.shl = function shl(a, num) {
            this._verify1(a);
            return this.imod(a.ushln(num));
          };

          Red.prototype.imul = function imul(a, b) {
            this._verify2(a, b);
            return this.imod(a.imul(b));
          };

          Red.prototype.mul = function mul(a, b) {
            this._verify2(a, b);
            return this.imod(a.mul(b));
          };

          Red.prototype.isqr = function isqr(a) {
            return this.imul(a, a.clone());
          };

          Red.prototype.sqr = function sqr(a) {
            return this.mul(a, a);
          };

          Red.prototype.sqrt = function sqrt(a) {
            if (a.isZero()) return a.clone();

            var mod3 = this.m.andln(3);
            assert(mod3 % 2 === 1);

            // Fast case
            if (mod3 === 3) {
              var pow = this.m.add(new BN(1)).iushrn(2);
              return this.pow(a, pow);
            }

            // Tonelli-Shanks algorithm (Totally unoptimized and slow)
            //
            // Find Q and S, that Q * 2 ^ S = (P - 1)
            var q = this.m.subn(1);
            var s = 0;
            while (!q.isZero() && q.andln(1) === 0) {
              s++;
              q.iushrn(1);
            }
            assert(!q.isZero());

            var one = new BN(1).toRed(this);
            var nOne = one.redNeg();

            // Find quadratic non-residue
            // NOTE: Max is such because of generalized Riemann hypothesis.
            var lpow = this.m.subn(1).iushrn(1);
            var z = this.m.bitLength();
            z = new BN(2 * z * z).toRed(this);

            while (this.pow(z, lpow).cmp(nOne) !== 0) {
              z.redIAdd(nOne);
            }

            var c = this.pow(z, q);
            var r = this.pow(a, q.addn(1).iushrn(1));
            var t = this.pow(a, q);
            var m = s;
            while (t.cmp(one) !== 0) {
              var tmp = t;
              for (var i = 0; tmp.cmp(one) !== 0; i++) {
                tmp = tmp.redSqr();
              }
              assert(i < m);
              var b = this.pow(c, new BN(1).iushln(m - i - 1));

              r = r.redMul(b);
              c = b.redSqr();
              t = t.redMul(c);
              m = i;
            }

            return r;
          };

          Red.prototype.invm = function invm(a) {
            var inv = a._invmp(this.m);
            if (inv.negative !== 0) {
              inv.negative = 0;
              return this.imod(inv).redNeg();
            } else {
              return this.imod(inv);
            }
          };

          Red.prototype.pow = function pow(a, num) {
            if (num.isZero()) return new BN(1).toRed(this);
            if (num.cmpn(1) === 0) return a.clone();

            var windowSize = 4;
            var wnd = new Array(1 << windowSize);
            wnd[0] = new BN(1).toRed(this);
            wnd[1] = a;
            for (var i = 2; i < wnd.length; i++) {
              wnd[i] = this.mul(wnd[i - 1], a);
            }

            var res = wnd[0];
            var current = 0;
            var currentLen = 0;
            var start = num.bitLength() % 26;
            if (start === 0) {
              start = 26;
            }

            for (i = num.length - 1; i >= 0; i--) {
              var word = num.words[i];
              for (var j = start - 1; j >= 0; j--) {
                var bit = (word >> j) & 1;
                if (res !== wnd[0]) {
                  res = this.sqr(res);
                }

                if (bit === 0 && current === 0) {
                  currentLen = 0;
                  continue;
                }

                current <<= 1;
                current |= bit;
                currentLen++;
                if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

                res = this.mul(res, wnd[current]);
                currentLen = 0;
                current = 0;
              }
              start = 26;
            }

            return res;
          };

          Red.prototype.convertTo = function convertTo(num) {
            var r = num.umod(this.m);

            return r === num ? r.clone() : r;
          };

          Red.prototype.convertFrom = function convertFrom(num) {
            var res = num.clone();
            res.red = null;
            return res;
          };

          //
          // Montgomery method engine
          //

          BN.mont = function mont(num) {
            return new Mont(num);
          };

          function Mont(m) {
            Red.call(this, m);

            this.shift = this.m.bitLength();
            if (this.shift % 26 !== 0) {
              this.shift += 26 - (this.shift % 26);
            }

            this.r = new BN(1).iushln(this.shift);
            this.r2 = this.imod(this.r.sqr());
            this.rinv = this.r._invmp(this.m);

            this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
            this.minv = this.minv.umod(this.r);
            this.minv = this.r.sub(this.minv);
          }
          inherits(Mont, Red);

          Mont.prototype.convertTo = function convertTo(num) {
            return this.imod(num.ushln(this.shift));
          };

          Mont.prototype.convertFrom = function convertFrom(num) {
            var r = this.imod(num.mul(this.rinv));
            r.red = null;
            return r;
          };

          Mont.prototype.imul = function imul(a, b) {
            if (a.isZero() || b.isZero()) {
              a.words[0] = 0;
              a.length = 1;
              return a;
            }

            var t = a.imul(b);
            var c = t
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m);
            var u = t.isub(c).iushrn(this.shift);
            var res = u;

            if (u.cmp(this.m) >= 0) {
              res = u.isub(this.m);
            } else if (u.cmpn(0) < 0) {
              res = u.iadd(this.m);
            }

            return res._forceRed(this);
          };

          Mont.prototype.mul = function mul(a, b) {
            if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

            var t = a.mul(b);
            var c = t
              .maskn(this.shift)
              .mul(this.minv)
              .imaskn(this.shift)
              .mul(this.m);
            var u = t.isub(c).iushrn(this.shift);
            var res = u;
            if (u.cmp(this.m) >= 0) {
              res = u.isub(this.m);
            } else if (u.cmpn(0) < 0) {
              res = u.iadd(this.m);
            }

            return res._forceRed(this);
          };

          Mont.prototype.invm = function invm(a) {
            // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
            var res = this.imod(a._invmp(this.m).mul(this.r2));
            return res._forceRed(this);
          };
        })(false || module, this);

        /***/
      },

    /***/ "../node_modules/buffer/index.js":
      /*!***************************************!*\
  !*** ../node_modules/buffer/index.js ***!
  \***************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        /* eslint-disable no-proto */

        const base64 = __webpack_require__(
          /*! base64-js */ "../node_modules/base64-js/index.js"
        );
        const ieee754 = __webpack_require__(
          /*! ieee754 */ "../node_modules/ieee754/index.js"
        );
        const customInspectSymbol =
          typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
            ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
            : null;

        exports.Buffer = Buffer;
        exports.SlowBuffer = SlowBuffer;
        exports.INSPECT_MAX_BYTES = 50;

        const K_MAX_LENGTH = 0x7fffffff;
        exports.kMaxLength = K_MAX_LENGTH;

        /**
         * If `Buffer.TYPED_ARRAY_SUPPORT`:
         *   === true    Use Uint8Array implementation (fastest)
         *   === false   Print warning and recommend using `buffer` v4.x which has an Object
         *               implementation (most compatible, even IE6)
         *
         * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
         * Opera 11.6+, iOS 4.2+.
         *
         * We report that the browser does not support typed arrays if the are not subclassable
         * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
         * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
         * for __proto__ and has a buggy typed array implementation.
         */
        Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

        if (
          !Buffer.TYPED_ARRAY_SUPPORT &&
          typeof console !== "undefined" &&
          typeof console.error === "function"
        ) {
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by " +
              "`buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          );
        }

        function typedArraySupport() {
          // Can typed array instances can be augmented?
          try {
            const arr = new Uint8Array(1);
            const proto = {
              foo: function () {
                return 42;
              },
            };
            Object.setPrototypeOf(proto, Uint8Array.prototype);
            Object.setPrototypeOf(arr, proto);
            return arr.foo() === 42;
          } catch (e) {
            return false;
          }
        }

        Object.defineProperty(Buffer.prototype, "parent", {
          enumerable: true,
          get: function () {
            if (!Buffer.isBuffer(this)) return undefined;
            return this.buffer;
          },
        });

        Object.defineProperty(Buffer.prototype, "offset", {
          enumerable: true,
          get: function () {
            if (!Buffer.isBuffer(this)) return undefined;
            return this.byteOffset;
          },
        });

        function createBuffer(length) {
          if (length > K_MAX_LENGTH) {
            throw new RangeError(
              'The value "' + length + '" is invalid for option "size"'
            );
          }
          // Return an augmented `Uint8Array` instance
          const buf = new Uint8Array(length);
          Object.setPrototypeOf(buf, Buffer.prototype);
          return buf;
        }

        /**
         * The Buffer constructor returns instances of `Uint8Array` that have their
         * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
         * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
         * and the `Uint8Array` methods. Square bracket notation works as expected -- it
         * returns a single octet.
         *
         * The `Uint8Array` prototype remains unmodified.
         */

        function Buffer(arg, encodingOrOffset, length) {
          // Common case.
          if (typeof arg === "number") {
            if (typeof encodingOrOffset === "string") {
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            }
            return allocUnsafe(arg);
          }
          return from(arg, encodingOrOffset, length);
        }

        Buffer.poolSize = 8192; // not used by this implementation

        function from(value, encodingOrOffset, length) {
          if (typeof value === "string") {
            return fromString(value, encodingOrOffset);
          }

          if (ArrayBuffer.isView(value)) {
            return fromArrayView(value);
          }

          if (value == null) {
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, " +
                "or Array-like Object. Received type " +
                typeof value
            );
          }

          if (
            isInstance(value, ArrayBuffer) ||
            (value && isInstance(value.buffer, ArrayBuffer))
          ) {
            return fromArrayBuffer(value, encodingOrOffset, length);
          }

          if (
            typeof SharedArrayBuffer !== "undefined" &&
            (isInstance(value, SharedArrayBuffer) ||
              (value && isInstance(value.buffer, SharedArrayBuffer)))
          ) {
            return fromArrayBuffer(value, encodingOrOffset, length);
          }

          if (typeof value === "number") {
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          }

          const valueOf = value.valueOf && value.valueOf();
          if (valueOf != null && valueOf !== value) {
            return Buffer.from(valueOf, encodingOrOffset, length);
          }

          const b = fromObject(value);
          if (b) return b;

          if (
            typeof Symbol !== "undefined" &&
            Symbol.toPrimitive != null &&
            typeof value[Symbol.toPrimitive] === "function"
          ) {
            return Buffer.from(
              value[Symbol.toPrimitive]("string"),
              encodingOrOffset,
              length
            );
          }

          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, " +
              "or Array-like Object. Received type " +
              typeof value
          );
        }

        /**
         * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
         * if value is a number.
         * Buffer.from(str[, encoding])
         * Buffer.from(array)
         * Buffer.from(buffer)
         * Buffer.from(arrayBuffer[, byteOffset[, length]])
         **/
        Buffer.from = function (value, encodingOrOffset, length) {
          return from(value, encodingOrOffset, length);
        };

        // Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
        // https://github.com/feross/buffer/pull/148
        Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(Buffer, Uint8Array);

        function assertSize(size) {
          if (typeof size !== "number") {
            throw new TypeError('"size" argument must be of type number');
          } else if (size < 0) {
            throw new RangeError(
              'The value "' + size + '" is invalid for option "size"'
            );
          }
        }

        function alloc(size, fill, encoding) {
          assertSize(size);
          if (size <= 0) {
            return createBuffer(size);
          }
          if (fill !== undefined) {
            // Only pay attention to encoding if it's a string. This
            // prevents accidentally sending in a number that would
            // be interpreted as a start offset.
            return typeof encoding === "string"
              ? createBuffer(size).fill(fill, encoding)
              : createBuffer(size).fill(fill);
          }
          return createBuffer(size);
        }

        /**
         * Creates a new filled Buffer instance.
         * alloc(size[, fill[, encoding]])
         **/
        Buffer.alloc = function (size, fill, encoding) {
          return alloc(size, fill, encoding);
        };

        function allocUnsafe(size) {
          assertSize(size);
          return createBuffer(size < 0 ? 0 : checked(size) | 0);
        }

        /**
         * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
         * */
        Buffer.allocUnsafe = function (size) {
          return allocUnsafe(size);
        };
        /**
         * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
         */
        Buffer.allocUnsafeSlow = function (size) {
          return allocUnsafe(size);
        };

        function fromString(string, encoding) {
          if (typeof encoding !== "string" || encoding === "") {
            encoding = "utf8";
          }

          if (!Buffer.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }

          const length = byteLength(string, encoding) | 0;
          let buf = createBuffer(length);

          const actual = buf.write(string, encoding);

          if (actual !== length) {
            // Writing a hex string, for example, that contains invalid characters will
            // cause everything after the first invalid character to be ignored. (e.g.
            // 'abxxcd' will be treated as 'ab')
            buf = buf.slice(0, actual);
          }

          return buf;
        }

        function fromArrayLike(array) {
          const length = array.length < 0 ? 0 : checked(array.length) | 0;
          const buf = createBuffer(length);
          for (let i = 0; i < length; i += 1) {
            buf[i] = array[i] & 255;
          }
          return buf;
        }

        function fromArrayView(arrayView) {
          if (isInstance(arrayView, Uint8Array)) {
            const copy = new Uint8Array(arrayView);
            return fromArrayBuffer(
              copy.buffer,
              copy.byteOffset,
              copy.byteLength
            );
          }
          return fromArrayLike(arrayView);
        }

        function fromArrayBuffer(array, byteOffset, length) {
          if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError('"offset" is outside of buffer bounds');
          }

          if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError('"length" is outside of buffer bounds');
          }

          let buf;
          if (byteOffset === undefined && length === undefined) {
            buf = new Uint8Array(array);
          } else if (length === undefined) {
            buf = new Uint8Array(array, byteOffset);
          } else {
            buf = new Uint8Array(array, byteOffset, length);
          }

          // Return an augmented `Uint8Array` instance
          Object.setPrototypeOf(buf, Buffer.prototype);

          return buf;
        }

        function fromObject(obj) {
          if (Buffer.isBuffer(obj)) {
            const len = checked(obj.length) | 0;
            const buf = createBuffer(len);

            if (buf.length === 0) {
              return buf;
            }

            obj.copy(buf, 0, 0, len);
            return buf;
          }

          if (obj.length !== undefined) {
            if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
              return createBuffer(0);
            }
            return fromArrayLike(obj);
          }

          if (obj.type === "Buffer" && Array.isArray(obj.data)) {
            return fromArrayLike(obj.data);
          }
        }

        function checked(length) {
          // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
          // length is NaN (which is otherwise coerced to zero.)
          if (length >= K_MAX_LENGTH) {
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum " +
                "size: 0x" +
                K_MAX_LENGTH.toString(16) +
                " bytes"
            );
          }
          return length | 0;
        }

        function SlowBuffer(length) {
          if (+length != length) {
            // eslint-disable-line eqeqeq
            length = 0;
          }
          return Buffer.alloc(+length);
        }

        Buffer.isBuffer = function isBuffer(b) {
          return b != null && b._isBuffer === true && b !== Buffer.prototype; // so Buffer.isBuffer(Buffer.prototype) will be false
        };

        Buffer.compare = function compare(a, b) {
          if (isInstance(a, Uint8Array))
            a = Buffer.from(a, a.offset, a.byteLength);
          if (isInstance(b, Uint8Array))
            b = Buffer.from(b, b.offset, b.byteLength);
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          }

          if (a === b) return 0;

          let x = a.length;
          let y = b.length;

          for (let i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }

          if (x < y) return -1;
          if (y < x) return 1;
          return 0;
        };

        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        };

        Buffer.concat = function concat(list, length) {
          if (!Array.isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }

          if (list.length === 0) {
            return Buffer.alloc(0);
          }

          let i;
          if (length === undefined) {
            length = 0;
            for (i = 0; i < list.length; ++i) {
              length += list[i].length;
            }
          }

          const buffer = Buffer.allocUnsafe(length);
          let pos = 0;
          for (i = 0; i < list.length; ++i) {
            let buf = list[i];
            if (isInstance(buf, Uint8Array)) {
              if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
              } else {
                Uint8Array.prototype.set.call(buffer, buf, pos);
              }
            } else if (!Buffer.isBuffer(buf)) {
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            } else {
              buf.copy(buffer, pos);
            }
            pos += buf.length;
          }
          return buffer;
        };

        function byteLength(string, encoding) {
          if (Buffer.isBuffer(string)) {
            return string.length;
          }
          if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
            return string.byteLength;
          }
          if (typeof string !== "string") {
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
                "Received type " +
                typeof string
            );
          }

          const len = string.length;
          const mustMatch = arguments.length > 2 && arguments[2] === true;
          if (!mustMatch && len === 0) return 0;

          // Use a for loop to avoid recursion
          let loweredCase = false;
          for (;;) {
            switch (encoding) {
              case "ascii":
              case "latin1":
              case "binary":
                return len;
              case "utf8":
              case "utf-8":
                return utf8ToBytes(string).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return len * 2;
              case "hex":
                return len >>> 1;
              case "base64":
                return base64ToBytes(string).length;
              default:
                if (loweredCase) {
                  return mustMatch ? -1 : utf8ToBytes(string).length; // assume utf8
                }
                encoding = ("" + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.byteLength = byteLength;

        function slowToString(encoding, start, end) {
          let loweredCase = false;

          // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
          // property of a typed array.

          // This behaves neither like String nor Uint8Array in that we set start/end
          // to their upper/lower bounds if the value passed is out of range.
          // undefined is handled specially as per ECMA-262 6th Edition,
          // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
          if (start === undefined || start < 0) {
            start = 0;
          }
          // Return early if start > this.length. Done here to prevent potential uint32
          // coercion fail below.
          if (start > this.length) {
            return "";
          }

          if (end === undefined || end > this.length) {
            end = this.length;
          }

          if (end <= 0) {
            return "";
          }

          // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
          end >>>= 0;
          start >>>= 0;

          if (end <= start) {
            return "";
          }

          if (!encoding) encoding = "utf8";

          while (true) {
            switch (encoding) {
              case "hex":
                return hexSlice(this, start, end);

              case "utf8":
              case "utf-8":
                return utf8Slice(this, start, end);

              case "ascii":
                return asciiSlice(this, start, end);

              case "latin1":
              case "binary":
                return latin1Slice(this, start, end);

              case "base64":
                return base64Slice(this, start, end);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return utf16leSlice(this, start, end);

              default:
                if (loweredCase)
                  throw new TypeError("Unknown encoding: " + encoding);
                encoding = (encoding + "").toLowerCase();
                loweredCase = true;
            }
          }
        }

        // This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
        // to detect a Buffer instance. It's not possible to use `instanceof Buffer`
        // reliably in a browserify context because there could be multiple different
        // copies of the 'buffer' package in use. This method works even for Buffer
        // instances that were created from another copy of the `buffer` package.
        // See: https://github.com/feross/buffer/issues/154
        Buffer.prototype._isBuffer = true;

        function swap(b, n, m) {
          const i = b[n];
          b[n] = b[m];
          b[m] = i;
        }

        Buffer.prototype.swap16 = function swap16() {
          const len = this.length;
          if (len % 2 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          }
          for (let i = 0; i < len; i += 2) {
            swap(this, i, i + 1);
          }
          return this;
        };

        Buffer.prototype.swap32 = function swap32() {
          const len = this.length;
          if (len % 4 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          }
          for (let i = 0; i < len; i += 4) {
            swap(this, i, i + 3);
            swap(this, i + 1, i + 2);
          }
          return this;
        };

        Buffer.prototype.swap64 = function swap64() {
          const len = this.length;
          if (len % 8 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          }
          for (let i = 0; i < len; i += 8) {
            swap(this, i, i + 7);
            swap(this, i + 1, i + 6);
            swap(this, i + 2, i + 5);
            swap(this, i + 3, i + 4);
          }
          return this;
        };

        Buffer.prototype.toString = function toString() {
          const length = this.length;
          if (length === 0) return "";
          if (arguments.length === 0) return utf8Slice(this, 0, length);
          return slowToString.apply(this, arguments);
        };

        Buffer.prototype.toLocaleString = Buffer.prototype.toString;

        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError("Argument must be a Buffer");
          if (this === b) return true;
          return Buffer.compare(this, b) === 0;
        };

        Buffer.prototype.inspect = function inspect() {
          let str = "";
          const max = exports.INSPECT_MAX_BYTES;
          str = this.toString("hex", 0, max)
            .replace(/(.{2})/g, "$1 ")
            .trim();
          if (this.length > max) str += " ... ";
          return "<Buffer " + str + ">";
        };
        if (customInspectSymbol) {
          Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
        }

        Buffer.prototype.compare = function compare(
          target,
          start,
          end,
          thisStart,
          thisEnd
        ) {
          if (isInstance(target, Uint8Array)) {
            target = Buffer.from(target, target.offset, target.byteLength);
          }
          if (!Buffer.isBuffer(target)) {
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. ' +
                "Received type " +
                typeof target
            );
          }

          if (start === undefined) {
            start = 0;
          }
          if (end === undefined) {
            end = target ? target.length : 0;
          }
          if (thisStart === undefined) {
            thisStart = 0;
          }
          if (thisEnd === undefined) {
            thisEnd = this.length;
          }

          if (
            start < 0 ||
            end > target.length ||
            thisStart < 0 ||
            thisEnd > this.length
          ) {
            throw new RangeError("out of range index");
          }

          if (thisStart >= thisEnd && start >= end) {
            return 0;
          }
          if (thisStart >= thisEnd) {
            return -1;
          }
          if (start >= end) {
            return 1;
          }

          start >>>= 0;
          end >>>= 0;
          thisStart >>>= 0;
          thisEnd >>>= 0;

          if (this === target) return 0;

          let x = thisEnd - thisStart;
          let y = end - start;
          const len = Math.min(x, y);

          const thisCopy = this.slice(thisStart, thisEnd);
          const targetCopy = target.slice(start, end);

          for (let i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
              x = thisCopy[i];
              y = targetCopy[i];
              break;
            }
          }

          if (x < y) return -1;
          if (y < x) return 1;
          return 0;
        };

        // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
        // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
        //
        // Arguments:
        // - buffer - a Buffer to search
        // - val - a string, Buffer, or number
        // - byteOffset - an index into `buffer`; will be clamped to an int32
        // - encoding - an optional encoding, relevant is val is a string
        // - dir - true for indexOf, false for lastIndexOf
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
          // Empty buffer means no match
          if (buffer.length === 0) return -1;

          // Normalize byteOffset
          if (typeof byteOffset === "string") {
            encoding = byteOffset;
            byteOffset = 0;
          } else if (byteOffset > 0x7fffffff) {
            byteOffset = 0x7fffffff;
          } else if (byteOffset < -0x80000000) {
            byteOffset = -0x80000000;
          }
          byteOffset = +byteOffset; // Coerce to Number.
          if (numberIsNaN(byteOffset)) {
            // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
            byteOffset = dir ? 0 : buffer.length - 1;
          }

          // Normalize byteOffset: negative offsets start from the end of the buffer
          if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
          if (byteOffset >= buffer.length) {
            if (dir) return -1;
            else byteOffset = buffer.length - 1;
          } else if (byteOffset < 0) {
            if (dir) byteOffset = 0;
            else return -1;
          }

          // Normalize val
          if (typeof val === "string") {
            val = Buffer.from(val, encoding);
          }

          // Finally, search either indexOf (if dir is true) or lastIndexOf
          if (Buffer.isBuffer(val)) {
            // Special case: looking for empty string/buffer always fails
            if (val.length === 0) {
              return -1;
            }
            return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
          } else if (typeof val === "number") {
            val = val & 0xff; // Search for a byte value [0-255]
            if (typeof Uint8Array.prototype.indexOf === "function") {
              if (dir) {
                return Uint8Array.prototype.indexOf.call(
                  buffer,
                  val,
                  byteOffset
                );
              } else {
                return Uint8Array.prototype.lastIndexOf.call(
                  buffer,
                  val,
                  byteOffset
                );
              }
            }
            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
          }

          throw new TypeError("val must be string, number or Buffer");
        }

        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
          let indexSize = 1;
          let arrLength = arr.length;
          let valLength = val.length;

          if (encoding !== undefined) {
            encoding = String(encoding).toLowerCase();
            if (
              encoding === "ucs2" ||
              encoding === "ucs-2" ||
              encoding === "utf16le" ||
              encoding === "utf-16le"
            ) {
              if (arr.length < 2 || val.length < 2) {
                return -1;
              }
              indexSize = 2;
              arrLength /= 2;
              valLength /= 2;
              byteOffset /= 2;
            }
          }

          function read(buf, i) {
            if (indexSize === 1) {
              return buf[i];
            } else {
              return buf.readUInt16BE(i * indexSize);
            }
          }

          let i;
          if (dir) {
            let foundIndex = -1;
            for (i = byteOffset; i < arrLength; i++) {
              if (
                read(arr, i) ===
                read(val, foundIndex === -1 ? 0 : i - foundIndex)
              ) {
                if (foundIndex === -1) foundIndex = i;
                if (i - foundIndex + 1 === valLength)
                  return foundIndex * indexSize;
              } else {
                if (foundIndex !== -1) i -= i - foundIndex;
                foundIndex = -1;
              }
            }
          } else {
            if (byteOffset + valLength > arrLength)
              byteOffset = arrLength - valLength;
            for (i = byteOffset; i >= 0; i--) {
              let found = true;
              for (let j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                  found = false;
                  break;
                }
              }
              if (found) return i;
            }
          }

          return -1;
        }

        Buffer.prototype.includes = function includes(
          val,
          byteOffset,
          encoding
        ) {
          return this.indexOf(val, byteOffset, encoding) !== -1;
        };

        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };

        Buffer.prototype.lastIndexOf = function lastIndexOf(
          val,
          byteOffset,
          encoding
        ) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };

        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0;
          const remaining = buf.length - offset;
          if (!length) {
            length = remaining;
          } else {
            length = Number(length);
            if (length > remaining) {
              length = remaining;
            }
          }

          const strLen = string.length;

          if (length > strLen / 2) {
            length = strLen / 2;
          }
          let i;
          for (i = 0; i < length; ++i) {
            const parsed = parseInt(string.substr(i * 2, 2), 16);
            if (numberIsNaN(parsed)) return i;
            buf[offset + i] = parsed;
          }
          return i;
        }

        function utf8Write(buf, string, offset, length) {
          return blitBuffer(
            utf8ToBytes(string, buf.length - offset),
            buf,
            offset,
            length
          );
        }

        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length);
        }

        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length);
        }

        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(
            utf16leToBytes(string, buf.length - offset),
            buf,
            offset,
            length
          );
        }

        Buffer.prototype.write = function write(
          string,
          offset,
          length,
          encoding
        ) {
          // Buffer#write(string)
          if (offset === undefined) {
            encoding = "utf8";
            length = this.length;
            offset = 0;
            // Buffer#write(string, encoding)
          } else if (length === undefined && typeof offset === "string") {
            encoding = offset;
            length = this.length;
            offset = 0;
            // Buffer#write(string, offset[, length][, encoding])
          } else if (isFinite(offset)) {
            offset = offset >>> 0;
            if (isFinite(length)) {
              length = length >>> 0;
              if (encoding === undefined) encoding = "utf8";
            } else {
              encoding = length;
              length = undefined;
            }
          } else {
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          }

          const remaining = this.length - offset;
          if (length === undefined || length > remaining) length = remaining;

          if (
            (string.length > 0 && (length < 0 || offset < 0)) ||
            offset > this.length
          ) {
            throw new RangeError("Attempt to write outside buffer bounds");
          }

          if (!encoding) encoding = "utf8";

          let loweredCase = false;
          for (;;) {
            switch (encoding) {
              case "hex":
                return hexWrite(this, string, offset, length);

              case "utf8":
              case "utf-8":
                return utf8Write(this, string, offset, length);

              case "ascii":
              case "latin1":
              case "binary":
                return asciiWrite(this, string, offset, length);

              case "base64":
                // Warning: maxLength not taken into account in base64Write
                return base64Write(this, string, offset, length);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return ucs2Write(this, string, offset, length);

              default:
                if (loweredCase)
                  throw new TypeError("Unknown encoding: " + encoding);
                encoding = ("" + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        };

        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        };

        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf);
          } else {
            return base64.fromByteArray(buf.slice(start, end));
          }
        }

        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end);
          const res = [];

          let i = start;
          while (i < end) {
            const firstByte = buf[i];
            let codePoint = null;
            let bytesPerSequence =
              firstByte > 0xef
                ? 4
                : firstByte > 0xdf
                ? 3
                : firstByte > 0xbf
                ? 2
                : 1;

            if (i + bytesPerSequence <= end) {
              let secondByte, thirdByte, fourthByte, tempCodePoint;

              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 0x80) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 0xc0) === 0x80) {
                    tempCodePoint =
                      ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f);
                    if (tempCodePoint > 0x7f) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if (
                    (secondByte & 0xc0) === 0x80 &&
                    (thirdByte & 0xc0) === 0x80
                  ) {
                    tempCodePoint =
                      ((firstByte & 0xf) << 0xc) |
                      ((secondByte & 0x3f) << 0x6) |
                      (thirdByte & 0x3f);
                    if (
                      tempCodePoint > 0x7ff &&
                      (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
                    ) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if (
                    (secondByte & 0xc0) === 0x80 &&
                    (thirdByte & 0xc0) === 0x80 &&
                    (fourthByte & 0xc0) === 0x80
                  ) {
                    tempCodePoint =
                      ((firstByte & 0xf) << 0x12) |
                      ((secondByte & 0x3f) << 0xc) |
                      ((thirdByte & 0x3f) << 0x6) |
                      (fourthByte & 0x3f);
                    if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }

            if (codePoint === null) {
              // we did not generate a valid codePoint so insert a
              // replacement char (U+FFFD) and advance only 1 byte
              codePoint = 0xfffd;
              bytesPerSequence = 1;
            } else if (codePoint > 0xffff) {
              // encode to utf16 (surrogate pair dance)
              codePoint -= 0x10000;
              res.push(((codePoint >>> 10) & 0x3ff) | 0xd800);
              codePoint = 0xdc00 | (codePoint & 0x3ff);
            }

            res.push(codePoint);
            i += bytesPerSequence;
          }

          return decodeCodePointsArray(res);
        }

        // Based on http://stackoverflow.com/a/22747272/680742, the browser with
        // the lowest limit is Chrome, with 0x10000 args.
        // We go 1 magnitude less, for safety
        const MAX_ARGUMENTS_LENGTH = 0x1000;

        function decodeCodePointsArray(codePoints) {
          const len = codePoints.length;
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
          }

          // Decode in chunks to avoid "call stack size exceeded".
          let res = "";
          let i = 0;
          while (i < len) {
            res += String.fromCharCode.apply(
              String,
              codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
            );
          }
          return res;
        }

        function asciiSlice(buf, start, end) {
          let ret = "";
          end = Math.min(buf.length, end);

          for (let i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 0x7f);
          }
          return ret;
        }

        function latin1Slice(buf, start, end) {
          let ret = "";
          end = Math.min(buf.length, end);

          for (let i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i]);
          }
          return ret;
        }

        function hexSlice(buf, start, end) {
          const len = buf.length;

          if (!start || start < 0) start = 0;
          if (!end || end < 0 || end > len) end = len;

          let out = "";
          for (let i = start; i < end; ++i) {
            out += hexSliceLookupTable[buf[i]];
          }
          return out;
        }

        function utf16leSlice(buf, start, end) {
          const bytes = buf.slice(start, end);
          let res = "";
          // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
          for (let i = 0; i < bytes.length - 1; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
          }
          return res;
        }

        Buffer.prototype.slice = function slice(start, end) {
          const len = this.length;
          start = ~~start;
          end = end === undefined ? len : ~~end;

          if (start < 0) {
            start += len;
            if (start < 0) start = 0;
          } else if (start > len) {
            start = len;
          }

          if (end < 0) {
            end += len;
            if (end < 0) end = 0;
          } else if (end > len) {
            end = len;
          }

          if (end < start) end = start;

          const newBuf = this.subarray(start, end);
          // Return an augmented `Uint8Array` instance
          Object.setPrototypeOf(newBuf, Buffer.prototype);

          return newBuf;
        };

        /*
         * Need to make sure that buffer isn't trying to write out of bounds.
         */
        function checkOffset(offset, ext, length) {
          if (offset % 1 !== 0 || offset < 0)
            throw new RangeError("offset is not uint");
          if (offset + ext > length)
            throw new RangeError("Trying to access beyond buffer length");
        }

        Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE =
          function readUIntLE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);

            let val = this[offset];
            let mul = 1;
            let i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }

            return val;
          };

        Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE =
          function readUIntBE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length);
            }

            let val = this[offset + --byteLength];
            let mul = 1;
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul;
            }

            return val;
          };

        Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 =
          function readUInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
          };

        Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE =
          function readUInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | (this[offset + 1] << 8);
          };

        Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE =
          function readUInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return (this[offset] << 8) | this[offset + 1];
          };

        Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE =
          function readUInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              (this[offset] |
                (this[offset + 1] << 8) |
                (this[offset + 2] << 16)) +
              this[offset + 3] * 0x1000000
            );
          };

        Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE =
          function readUInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);

            return (
              this[offset] * 0x1000000 +
              ((this[offset + 1] << 16) |
                (this[offset + 2] << 8) |
                this[offset + 3])
            );
          };

        Buffer.prototype.readBigUInt64LE = defineBigIntMethod(
          function readBigUInt64LE(offset) {
            offset = offset >>> 0;
            validateNumber(offset, "offset");
            const first = this[offset];
            const last = this[offset + 7];
            if (first === undefined || last === undefined) {
              boundsError(offset, this.length - 8);
            }

            const lo =
              first +
              this[++offset] * 2 ** 8 +
              this[++offset] * 2 ** 16 +
              this[++offset] * 2 ** 24;

            const hi =
              this[++offset] +
              this[++offset] * 2 ** 8 +
              this[++offset] * 2 ** 16 +
              last * 2 ** 24;

            return BigInt(lo) + (BigInt(hi) << BigInt(32));
          }
        );

        Buffer.prototype.readBigUInt64BE = defineBigIntMethod(
          function readBigUInt64BE(offset) {
            offset = offset >>> 0;
            validateNumber(offset, "offset");
            const first = this[offset];
            const last = this[offset + 7];
            if (first === undefined || last === undefined) {
              boundsError(offset, this.length - 8);
            }

            const hi =
              first * 2 ** 24 +
              this[++offset] * 2 ** 16 +
              this[++offset] * 2 ** 8 +
              this[++offset];

            const lo =
              this[++offset] * 2 ** 24 +
              this[++offset] * 2 ** 16 +
              this[++offset] * 2 ** 8 +
              last;

            return (BigInt(hi) << BigInt(32)) + BigInt(lo);
          }
        );

        Buffer.prototype.readIntLE = function readIntLE(
          offset,
          byteLength,
          noAssert
        ) {
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) checkOffset(offset, byteLength, this.length);

          let val = this[offset];
          let mul = 1;
          let i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          mul *= 0x80;

          if (val >= mul) val -= Math.pow(2, 8 * byteLength);

          return val;
        };

        Buffer.prototype.readIntBE = function readIntBE(
          offset,
          byteLength,
          noAssert
        ) {
          offset = offset >>> 0;
          byteLength = byteLength >>> 0;
          if (!noAssert) checkOffset(offset, byteLength, this.length);

          let i = byteLength;
          let mul = 1;
          let val = this[offset + --i];
          while (i > 0 && (mul *= 0x100)) {
            val += this[offset + --i] * mul;
          }
          mul *= 0x80;

          if (val >= mul) val -= Math.pow(2, 8 * byteLength);

          return val;
        };

        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 1, this.length);
          if (!(this[offset] & 0x80)) return this[offset];
          return (0xff - this[offset] + 1) * -1;
        };

        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 2, this.length);
          const val = this[offset] | (this[offset + 1] << 8);
          return val & 0x8000 ? val | 0xffff0000 : val;
        };

        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 2, this.length);
          const val = this[offset + 1] | (this[offset] << 8);
          return val & 0x8000 ? val | 0xffff0000 : val;
        };

        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);

          return (
            this[offset] |
            (this[offset + 1] << 8) |
            (this[offset + 2] << 16) |
            (this[offset + 3] << 24)
          );
        };

        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);

          return (
            (this[offset] << 24) |
            (this[offset + 1] << 16) |
            (this[offset + 2] << 8) |
            this[offset + 3]
          );
        };

        Buffer.prototype.readBigInt64LE = defineBigIntMethod(
          function readBigInt64LE(offset) {
            offset = offset >>> 0;
            validateNumber(offset, "offset");
            const first = this[offset];
            const last = this[offset + 7];
            if (first === undefined || last === undefined) {
              boundsError(offset, this.length - 8);
            }

            const val =
              this[offset + 4] +
              this[offset + 5] * 2 ** 8 +
              this[offset + 6] * 2 ** 16 +
              (last << 24); // Overflow

            return (
              (BigInt(val) << BigInt(32)) +
              BigInt(
                first +
                  this[++offset] * 2 ** 8 +
                  this[++offset] * 2 ** 16 +
                  this[++offset] * 2 ** 24
              )
            );
          }
        );

        Buffer.prototype.readBigInt64BE = defineBigIntMethod(
          function readBigInt64BE(offset) {
            offset = offset >>> 0;
            validateNumber(offset, "offset");
            const first = this[offset];
            const last = this[offset + 7];
            if (first === undefined || last === undefined) {
              boundsError(offset, this.length - 8);
            }

            const val =
              (first << 24) + // Overflow
              this[++offset] * 2 ** 16 +
              this[++offset] * 2 ** 8 +
              this[++offset];

            return (
              (BigInt(val) << BigInt(32)) +
              BigInt(
                this[++offset] * 2 ** 24 +
                  this[++offset] * 2 ** 16 +
                  this[++offset] * 2 ** 8 +
                  last
              )
            );
          }
        );

        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, true, 23, 4);
        };

        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, false, 23, 4);
        };

        Buffer.prototype.readDoubleLE = function readDoubleLE(
          offset,
          noAssert
        ) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, true, 52, 8);
        };

        Buffer.prototype.readDoubleBE = function readDoubleBE(
          offset,
          noAssert
        ) {
          offset = offset >>> 0;
          if (!noAssert) checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, false, 52, 8);
        };

        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (value > max || value < min)
            throw new RangeError('"value" argument is out of bounds');
          if (offset + ext > buf.length)
            throw new RangeError("Index out of range");
        }

        Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE =
          function writeUIntLE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              const maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            let mul = 1;
            let i = 0;
            this[offset] = value & 0xff;
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

        Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE =
          function writeUIntBE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              const maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }

            let i = byteLength - 1;
            let mul = 1;
            this[offset + i] = value & 0xff;
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff;
            }

            return offset + byteLength;
          };

        Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 =
          function writeUInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            this[offset] = value & 0xff;
            return offset + 1;
          };

        Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE =
          function writeUInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };

        Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE =
          function writeUInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };

        Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE =
          function writeUInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 0xff;
            return offset + 4;
          };

        Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE =
          function writeUInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };

        function wrtBigUInt64LE(buf, value, offset, min, max) {
          checkIntBI(value, min, max, buf, offset, 7);

          let lo = Number(value & BigInt(0xffffffff));
          buf[offset++] = lo;
          lo = lo >> 8;
          buf[offset++] = lo;
          lo = lo >> 8;
          buf[offset++] = lo;
          lo = lo >> 8;
          buf[offset++] = lo;
          let hi = Number((value >> BigInt(32)) & BigInt(0xffffffff));
          buf[offset++] = hi;
          hi = hi >> 8;
          buf[offset++] = hi;
          hi = hi >> 8;
          buf[offset++] = hi;
          hi = hi >> 8;
          buf[offset++] = hi;
          return offset;
        }

        function wrtBigUInt64BE(buf, value, offset, min, max) {
          checkIntBI(value, min, max, buf, offset, 7);

          let lo = Number(value & BigInt(0xffffffff));
          buf[offset + 7] = lo;
          lo = lo >> 8;
          buf[offset + 6] = lo;
          lo = lo >> 8;
          buf[offset + 5] = lo;
          lo = lo >> 8;
          buf[offset + 4] = lo;
          let hi = Number((value >> BigInt(32)) & BigInt(0xffffffff));
          buf[offset + 3] = hi;
          hi = hi >> 8;
          buf[offset + 2] = hi;
          hi = hi >> 8;
          buf[offset + 1] = hi;
          hi = hi >> 8;
          buf[offset] = hi;
          return offset + 8;
        }

        Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(
          function writeBigUInt64LE(value, offset = 0) {
            return wrtBigUInt64LE(
              this,
              value,
              offset,
              BigInt(0),
              BigInt("0xffffffffffffffff")
            );
          }
        );

        Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(
          function writeBigUInt64BE(value, offset = 0) {
            return wrtBigUInt64BE(
              this,
              value,
              offset,
              BigInt(0),
              BigInt("0xffffffffffffffff")
            );
          }
        );

        Buffer.prototype.writeIntLE = function writeIntLE(
          value,
          offset,
          byteLength,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            const limit = Math.pow(2, 8 * byteLength - 1);

            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }

          let i = 0;
          let mul = 1;
          let sub = 0;
          this[offset] = value & 0xff;
          while (++i < byteLength && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
          }

          return offset + byteLength;
        };

        Buffer.prototype.writeIntBE = function writeIntBE(
          value,
          offset,
          byteLength,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            const limit = Math.pow(2, 8 * byteLength - 1);

            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }

          let i = byteLength - 1;
          let mul = 1;
          let sub = 0;
          this[offset + i] = value & 0xff;
          while (--i >= 0 && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (((value / mul) >> 0) - sub) & 0xff;
          }

          return offset + byteLength;
        };

        Buffer.prototype.writeInt8 = function writeInt8(
          value,
          offset,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
          if (value < 0) value = 0xff + value + 1;
          this[offset] = value & 0xff;
          return offset + 1;
        };

        Buffer.prototype.writeInt16LE = function writeInt16LE(
          value,
          offset,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
          return offset + 2;
        };

        Buffer.prototype.writeInt16BE = function writeInt16BE(
          value,
          offset,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          this[offset] = value >>> 8;
          this[offset + 1] = value & 0xff;
          return offset + 2;
        };

        Buffer.prototype.writeInt32LE = function writeInt32LE(
          value,
          offset,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          this[offset] = value & 0xff;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
          return offset + 4;
        };

        Buffer.prototype.writeInt32BE = function writeInt32BE(
          value,
          offset,
          noAssert
        ) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          if (value < 0) value = 0xffffffff + value + 1;
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 0xff;
          return offset + 4;
        };

        Buffer.prototype.writeBigInt64LE = defineBigIntMethod(
          function writeBigInt64LE(value, offset = 0) {
            return wrtBigUInt64LE(
              this,
              value,
              offset,
              -BigInt("0x8000000000000000"),
              BigInt("0x7fffffffffffffff")
            );
          }
        );

        Buffer.prototype.writeBigInt64BE = defineBigIntMethod(
          function writeBigInt64BE(value, offset = 0) {
            return wrtBigUInt64BE(
              this,
              value,
              offset,
              -BigInt("0x8000000000000000"),
              BigInt("0x7fffffffffffffff")
            );
          }
        );

        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (offset + ext > buf.length)
            throw new RangeError("Index out of range");
          if (offset < 0) throw new RangeError("Index out of range");
        }

        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            checkIEEE754(
              buf,
              value,
              offset,
              4,
              3.4028234663852886e38,
              -3.4028234663852886e38
            );
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4);
          return offset + 4;
        }

        Buffer.prototype.writeFloatLE = function writeFloatLE(
          value,
          offset,
          noAssert
        ) {
          return writeFloat(this, value, offset, true, noAssert);
        };

        Buffer.prototype.writeFloatBE = function writeFloatBE(
          value,
          offset,
          noAssert
        ) {
          return writeFloat(this, value, offset, false, noAssert);
        };

        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          value = +value;
          offset = offset >>> 0;
          if (!noAssert) {
            checkIEEE754(
              buf,
              value,
              offset,
              8,
              1.7976931348623157e308,
              -1.7976931348623157e308
            );
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8);
          return offset + 8;
        }

        Buffer.prototype.writeDoubleLE = function writeDoubleLE(
          value,
          offset,
          noAssert
        ) {
          return writeDouble(this, value, offset, true, noAssert);
        };

        Buffer.prototype.writeDoubleBE = function writeDoubleBE(
          value,
          offset,
          noAssert
        ) {
          return writeDouble(this, value, offset, false, noAssert);
        };

        // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!Buffer.isBuffer(target))
            throw new TypeError("argument should be a Buffer");
          if (!start) start = 0;
          if (!end && end !== 0) end = this.length;
          if (targetStart >= target.length) targetStart = target.length;
          if (!targetStart) targetStart = 0;
          if (end > 0 && end < start) end = start;

          // Copy 0 bytes; we're done
          if (end === start) return 0;
          if (target.length === 0 || this.length === 0) return 0;

          // Fatal error conditions
          if (targetStart < 0) {
            throw new RangeError("targetStart out of bounds");
          }
          if (start < 0 || start >= this.length)
            throw new RangeError("Index out of range");
          if (end < 0) throw new RangeError("sourceEnd out of bounds");

          // Are we oob?
          if (end > this.length) end = this.length;
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start;
          }

          const len = end - start;

          if (
            this === target &&
            typeof Uint8Array.prototype.copyWithin === "function"
          ) {
            // Use built-in when available, missing from IE11
            this.copyWithin(targetStart, start, end);
          } else {
            Uint8Array.prototype.set.call(
              target,
              this.subarray(start, end),
              targetStart
            );
          }

          return len;
        };

        // Usage:
        //    buffer.fill(number[, offset[, end]])
        //    buffer.fill(buffer[, offset[, end]])
        //    buffer.fill(string[, offset[, end]][, encoding])
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
          // Handle string cases:
          if (typeof val === "string") {
            if (typeof start === "string") {
              encoding = start;
              start = 0;
              end = this.length;
            } else if (typeof end === "string") {
              encoding = end;
              end = this.length;
            }
            if (encoding !== undefined && typeof encoding !== "string") {
              throw new TypeError("encoding must be a string");
            }
            if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
            if (val.length === 1) {
              const code = val.charCodeAt(0);
              if (
                (encoding === "utf8" && code < 128) ||
                encoding === "latin1"
              ) {
                // Fast path: If `val` fits into a single byte, use that numeric value.
                val = code;
              }
            }
          } else if (typeof val === "number") {
            val = val & 255;
          } else if (typeof val === "boolean") {
            val = Number(val);
          }

          // Invalid ranges are not set to a default, so can range check early.
          if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError("Out of range index");
          }

          if (end <= start) {
            return this;
          }

          start = start >>> 0;
          end = end === undefined ? this.length : end >>> 0;

          if (!val) val = 0;

          let i;
          if (typeof val === "number") {
            for (i = start; i < end; ++i) {
              this[i] = val;
            }
          } else {
            const bytes = Buffer.isBuffer(val)
              ? val
              : Buffer.from(val, encoding);
            const len = bytes.length;
            if (len === 0) {
              throw new TypeError(
                'The value "' + val + '" is invalid for argument "value"'
              );
            }
            for (i = 0; i < end - start; ++i) {
              this[i + start] = bytes[i % len];
            }
          }

          return this;
        };

        // CUSTOM ERRORS
        // =============

        // Simplified versions from Node, changed for Buffer-only usage
        const errors = {};
        function E(sym, getMessage, Base) {
          errors[sym] = class NodeError extends Base {
            constructor() {
              super();

              Object.defineProperty(this, "message", {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true,
              });

              // Add the error code to the name to include it in the stack trace.
              this.name = `${this.name} [${sym}]`;
              // Access the stack to generate the error message including the error code
              // from the name.
              this.stack; // eslint-disable-line no-unused-expressions
              // Reset the name to the actual name.
              delete this.name;
            }

            get code() {
              return sym;
            }

            set code(value) {
              Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value,
                writable: true,
              });
            }

            toString() {
              return `${this.name} [${sym}]: ${this.message}`;
            }
          };
        }

        E(
          "ERR_BUFFER_OUT_OF_BOUNDS",
          function (name) {
            if (name) {
              return `${name} is outside of buffer bounds`;
            }

            return "Attempt to access memory outside buffer bounds";
          },
          RangeError
        );
        E(
          "ERR_INVALID_ARG_TYPE",
          function (name, actual) {
            return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
          },
          TypeError
        );
        E(
          "ERR_OUT_OF_RANGE",
          function (str, range, input) {
            let msg = `The value of "${str}" is out of range.`;
            let received = input;
            if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
              received = addNumericalSeparator(String(input));
            } else if (typeof input === "bigint") {
              received = String(input);
              if (
                input > BigInt(2) ** BigInt(32) ||
                input < -(BigInt(2) ** BigInt(32))
              ) {
                received = addNumericalSeparator(received);
              }
              received += "n";
            }
            msg += ` It must be ${range}. Received ${received}`;
            return msg;
          },
          RangeError
        );

        function addNumericalSeparator(val) {
          let res = "";
          let i = val.length;
          const start = val[0] === "-" ? 1 : 0;
          for (; i >= start + 4; i -= 3) {
            res = `_${val.slice(i - 3, i)}${res}`;
          }
          return `${val.slice(0, i)}${res}`;
        }

        // CHECK FUNCTIONS
        // ===============

        function checkBounds(buf, offset, byteLength) {
          validateNumber(offset, "offset");
          if (
            buf[offset] === undefined ||
            buf[offset + byteLength] === undefined
          ) {
            boundsError(offset, buf.length - (byteLength + 1));
          }
        }

        function checkIntBI(value, min, max, buf, offset, byteLength) {
          if (value > max || value < min) {
            const n = typeof min === "bigint" ? "n" : "";
            let range;
            if (byteLength > 3) {
              if (min === 0 || min === BigInt(0)) {
                range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
              } else {
                range =
                  `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                  `${(byteLength + 1) * 8 - 1}${n}`;
              }
            } else {
              range = `>= ${min}${n} and <= ${max}${n}`;
            }
            throw new errors.ERR_OUT_OF_RANGE("value", range, value);
          }
          checkBounds(buf, offset, byteLength);
        }

        function validateNumber(value, name) {
          if (typeof value !== "number") {
            throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
          }
        }

        function boundsError(value, length, type) {
          if (Math.floor(value) !== value) {
            validateNumber(value, type);
            throw new errors.ERR_OUT_OF_RANGE(
              type || "offset",
              "an integer",
              value
            );
          }

          if (length < 0) {
            throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
          }

          throw new errors.ERR_OUT_OF_RANGE(
            type || "offset",
            `>= ${type ? 1 : 0} and <= ${length}`,
            value
          );
        }

        // HELPER FUNCTIONS
        // ================

        const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

        function base64clean(str) {
          // Node takes equal signs as end of the Base64 encoding
          str = str.split("=")[0];
          // Node strips out invalid characters like \n and \t from the string, base64-js does not
          str = str.trim().replace(INVALID_BASE64_RE, "");
          // Node converts strings with length < 2 to ''
          if (str.length < 2) return "";
          // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
          while (str.length % 4 !== 0) {
            str = str + "=";
          }
          return str;
        }

        function utf8ToBytes(string, units) {
          units = units || Infinity;
          let codePoint;
          const length = string.length;
          let leadSurrogate = null;
          const bytes = [];

          for (let i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i);

            // is surrogate component
            if (codePoint > 0xd7ff && codePoint < 0xe000) {
              // last char was a lead
              if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xdbff) {
                  // unexpected trail
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                  continue;
                } else if (i + 1 === length) {
                  // unpaired lead
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                  continue;
                }

                // valid lead
                leadSurrogate = codePoint;

                continue;
              }

              // 2 leads in a row
              if (codePoint < 0xdc00) {
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
                leadSurrogate = codePoint;
                continue;
              }

              // valid surrogate pair
              codePoint =
                (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) +
                0x10000;
            } else if (leadSurrogate) {
              // valid bmp char, but last char was a lead
              if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd);
            }

            leadSurrogate = null;

            // encode utf8
            if (codePoint < 0x80) {
              if ((units -= 1) < 0) break;
              bytes.push(codePoint);
            } else if (codePoint < 0x800) {
              if ((units -= 2) < 0) break;
              bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80);
            } else if (codePoint < 0x10000) {
              if ((units -= 3) < 0) break;
              bytes.push(
                (codePoint >> 0xc) | 0xe0,
                ((codePoint >> 0x6) & 0x3f) | 0x80,
                (codePoint & 0x3f) | 0x80
              );
            } else if (codePoint < 0x110000) {
              if ((units -= 4) < 0) break;
              bytes.push(
                (codePoint >> 0x12) | 0xf0,
                ((codePoint >> 0xc) & 0x3f) | 0x80,
                ((codePoint >> 0x6) & 0x3f) | 0x80,
                (codePoint & 0x3f) | 0x80
              );
            } else {
              throw new Error("Invalid code point");
            }
          }

          return bytes;
        }

        function asciiToBytes(str) {
          const byteArray = [];
          for (let i = 0; i < str.length; ++i) {
            // Node's code seems to be doing this and not & 0x7F..
            byteArray.push(str.charCodeAt(i) & 0xff);
          }
          return byteArray;
        }

        function utf16leToBytes(str, units) {
          let c, hi, lo;
          const byteArray = [];
          for (let i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0) break;

            c = str.charCodeAt(i);
            hi = c >> 8;
            lo = c % 256;
            byteArray.push(lo);
            byteArray.push(hi);
          }

          return byteArray;
        }

        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str));
        }

        function blitBuffer(src, dst, offset, length) {
          let i;
          for (i = 0; i < length; ++i) {
            if (i + offset >= dst.length || i >= src.length) break;
            dst[i + offset] = src[i];
          }
          return i;
        }

        // ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
        // the `instanceof` check but they should be treated as of that type.
        // See: https://github.com/feross/buffer/issues/166
        function isInstance(obj, type) {
          return (
            obj instanceof type ||
            (obj != null &&
              obj.constructor != null &&
              obj.constructor.name != null &&
              obj.constructor.name === type.name)
          );
        }
        function numberIsNaN(obj) {
          // For IE11 support
          return obj !== obj; // eslint-disable-line no-self-compare
        }

        // Create lookup table for `toString('hex')`
        // See: https://github.com/feross/buffer/issues/219
        const hexSliceLookupTable = (function () {
          const alphabet = "0123456789abcdef";
          const table = new Array(256);
          for (let i = 0; i < 16; ++i) {
            const i16 = i * 16;
            for (let j = 0; j < 16; ++j) {
              table[i16 + j] = alphabet[i] + alphabet[j];
            }
          }
          return table;
        })();

        // Return not function with Error if BigInt not supported
        function defineBigIntMethod(fn) {
          return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
        }

        function BufferBigIntNotDefined() {
          throw new Error("BigInt not supported");
        }

        /***/
      },

    /***/ "../node_modules/cross-fetch/dist/browser-ponyfill.js":
      /*!************************************************************!*\
  !*** ../node_modules/cross-fetch/dist/browser-ponyfill.js ***!
  \************************************************************/
      /***/ function (module, exports) {
        var global = typeof self !== "undefined" ? self : this;
        var __self__ = (function () {
          function F() {
            this.fetch = false;
            this.DOMException = global.DOMException;
          }
          F.prototype = global;
          return new F();
        })();
        (function (self) {
          var irrelevant = (function (exports) {
            var support = {
              searchParams: "URLSearchParams" in self,
              iterable: "Symbol" in self && "iterator" in Symbol,
              blob:
                "FileReader" in self &&
                "Blob" in self &&
                (function () {
                  try {
                    new Blob();
                    return true;
                  } catch (e) {
                    return false;
                  }
                })(),
              formData: "FormData" in self,
              arrayBuffer: "ArrayBuffer" in self,
            };

            function isDataView(obj) {
              return obj && DataView.prototype.isPrototypeOf(obj);
            }

            if (support.arrayBuffer) {
              var viewClasses = [
                "[object Int8Array]",
                "[object Uint8Array]",
                "[object Uint8ClampedArray]",
                "[object Int16Array]",
                "[object Uint16Array]",
                "[object Int32Array]",
                "[object Uint32Array]",
                "[object Float32Array]",
                "[object Float64Array]",
              ];

              var isArrayBufferView =
                ArrayBuffer.isView ||
                function (obj) {
                  return (
                    obj &&
                    viewClasses.indexOf(Object.prototype.toString.call(obj)) >
                      -1
                  );
                };
            }

            function normalizeName(name) {
              if (typeof name !== "string") {
                name = String(name);
              }
              if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
                throw new TypeError("Invalid character in header field name");
              }
              return name.toLowerCase();
            }

            function normalizeValue(value) {
              if (typeof value !== "string") {
                value = String(value);
              }
              return value;
            }

            // Build a destructive iterator for the value list
            function iteratorFor(items) {
              var iterator = {
                next: function () {
                  var value = items.shift();
                  return { done: value === undefined, value: value };
                },
              };

              if (support.iterable) {
                iterator[Symbol.iterator] = function () {
                  return iterator;
                };
              }

              return iterator;
            }

            function Headers(headers) {
              this.map = {};

              if (headers instanceof Headers) {
                headers.forEach(function (value, name) {
                  this.append(name, value);
                }, this);
              } else if (Array.isArray(headers)) {
                headers.forEach(function (header) {
                  this.append(header[0], header[1]);
                }, this);
              } else if (headers) {
                Object.getOwnPropertyNames(headers).forEach(function (name) {
                  this.append(name, headers[name]);
                }, this);
              }
            }

            Headers.prototype.append = function (name, value) {
              name = normalizeName(name);
              value = normalizeValue(value);
              var oldValue = this.map[name];
              this.map[name] = oldValue ? oldValue + ", " + value : value;
            };

            Headers.prototype["delete"] = function (name) {
              delete this.map[normalizeName(name)];
            };

            Headers.prototype.get = function (name) {
              name = normalizeName(name);
              return this.has(name) ? this.map[name] : null;
            };

            Headers.prototype.has = function (name) {
              return this.map.hasOwnProperty(normalizeName(name));
            };

            Headers.prototype.set = function (name, value) {
              this.map[normalizeName(name)] = normalizeValue(value);
            };

            Headers.prototype.forEach = function (callback, thisArg) {
              for (var name in this.map) {
                if (this.map.hasOwnProperty(name)) {
                  callback.call(thisArg, this.map[name], name, this);
                }
              }
            };

            Headers.prototype.keys = function () {
              var items = [];
              this.forEach(function (value, name) {
                items.push(name);
              });
              return iteratorFor(items);
            };

            Headers.prototype.values = function () {
              var items = [];
              this.forEach(function (value) {
                items.push(value);
              });
              return iteratorFor(items);
            };

            Headers.prototype.entries = function () {
              var items = [];
              this.forEach(function (value, name) {
                items.push([name, value]);
              });
              return iteratorFor(items);
            };

            if (support.iterable) {
              Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
            }

            function consumed(body) {
              if (body.bodyUsed) {
                return Promise.reject(new TypeError("Already read"));
              }
              body.bodyUsed = true;
            }

            function fileReaderReady(reader) {
              return new Promise(function (resolve, reject) {
                reader.onload = function () {
                  resolve(reader.result);
                };
                reader.onerror = function () {
                  reject(reader.error);
                };
              });
            }

            function readBlobAsArrayBuffer(blob) {
              var reader = new FileReader();
              var promise = fileReaderReady(reader);
              reader.readAsArrayBuffer(blob);
              return promise;
            }

            function readBlobAsText(blob) {
              var reader = new FileReader();
              var promise = fileReaderReady(reader);
              reader.readAsText(blob);
              return promise;
            }

            function readArrayBufferAsText(buf) {
              var view = new Uint8Array(buf);
              var chars = new Array(view.length);

              for (var i = 0; i < view.length; i++) {
                chars[i] = String.fromCharCode(view[i]);
              }
              return chars.join("");
            }

            function bufferClone(buf) {
              if (buf.slice) {
                return buf.slice(0);
              } else {
                var view = new Uint8Array(buf.byteLength);
                view.set(new Uint8Array(buf));
                return view.buffer;
              }
            }

            function Body() {
              this.bodyUsed = false;

              this._initBody = function (body) {
                this._bodyInit = body;
                if (!body) {
                  this._bodyText = "";
                } else if (typeof body === "string") {
                  this._bodyText = body;
                } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                  this._bodyBlob = body;
                } else if (
                  support.formData &&
                  FormData.prototype.isPrototypeOf(body)
                ) {
                  this._bodyFormData = body;
                } else if (
                  support.searchParams &&
                  URLSearchParams.prototype.isPrototypeOf(body)
                ) {
                  this._bodyText = body.toString();
                } else if (
                  support.arrayBuffer &&
                  support.blob &&
                  isDataView(body)
                ) {
                  this._bodyArrayBuffer = bufferClone(body.buffer);
                  // IE 10-11 can't handle a DataView body.
                  this._bodyInit = new Blob([this._bodyArrayBuffer]);
                } else if (
                  support.arrayBuffer &&
                  (ArrayBuffer.prototype.isPrototypeOf(body) ||
                    isArrayBufferView(body))
                ) {
                  this._bodyArrayBuffer = bufferClone(body);
                } else {
                  this._bodyText = body = Object.prototype.toString.call(body);
                }

                if (!this.headers.get("content-type")) {
                  if (typeof body === "string") {
                    this.headers.set(
                      "content-type",
                      "text/plain;charset=UTF-8"
                    );
                  } else if (this._bodyBlob && this._bodyBlob.type) {
                    this.headers.set("content-type", this._bodyBlob.type);
                  } else if (
                    support.searchParams &&
                    URLSearchParams.prototype.isPrototypeOf(body)
                  ) {
                    this.headers.set(
                      "content-type",
                      "application/x-www-form-urlencoded;charset=UTF-8"
                    );
                  }
                }
              };

              if (support.blob) {
                this.blob = function () {
                  var rejected = consumed(this);
                  if (rejected) {
                    return rejected;
                  }

                  if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob);
                  } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                  } else if (this._bodyFormData) {
                    throw new Error("could not read FormData body as blob");
                  } else {
                    return Promise.resolve(new Blob([this._bodyText]));
                  }
                };

                this.arrayBuffer = function () {
                  if (this._bodyArrayBuffer) {
                    return (
                      consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                    );
                  } else {
                    return this.blob().then(readBlobAsArrayBuffer);
                  }
                };
              }

              this.text = function () {
                var rejected = consumed(this);
                if (rejected) {
                  return rejected;
                }

                if (this._bodyBlob) {
                  return readBlobAsText(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                  return Promise.resolve(
                    readArrayBufferAsText(this._bodyArrayBuffer)
                  );
                } else if (this._bodyFormData) {
                  throw new Error("could not read FormData body as text");
                } else {
                  return Promise.resolve(this._bodyText);
                }
              };

              if (support.formData) {
                this.formData = function () {
                  return this.text().then(decode);
                };
              }

              this.json = function () {
                return this.text().then(JSON.parse);
              };

              return this;
            }

            // HTTP methods whose capitalization should be normalized
            var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];

            function normalizeMethod(method) {
              var upcased = method.toUpperCase();
              return methods.indexOf(upcased) > -1 ? upcased : method;
            }

            function Request(input, options) {
              options = options || {};
              var body = options.body;

              if (input instanceof Request) {
                if (input.bodyUsed) {
                  throw new TypeError("Already read");
                }
                this.url = input.url;
                this.credentials = input.credentials;
                if (!options.headers) {
                  this.headers = new Headers(input.headers);
                }
                this.method = input.method;
                this.mode = input.mode;
                this.signal = input.signal;
                if (!body && input._bodyInit != null) {
                  body = input._bodyInit;
                  input.bodyUsed = true;
                }
              } else {
                this.url = String(input);
              }

              this.credentials =
                options.credentials || this.credentials || "same-origin";
              if (options.headers || !this.headers) {
                this.headers = new Headers(options.headers);
              }
              this.method = normalizeMethod(
                options.method || this.method || "GET"
              );
              this.mode = options.mode || this.mode || null;
              this.signal = options.signal || this.signal;
              this.referrer = null;

              if ((this.method === "GET" || this.method === "HEAD") && body) {
                throw new TypeError(
                  "Body not allowed for GET or HEAD requests"
                );
              }
              this._initBody(body);
            }

            Request.prototype.clone = function () {
              return new Request(this, { body: this._bodyInit });
            };

            function decode(body) {
              var form = new FormData();
              body
                .trim()
                .split("&")
                .forEach(function (bytes) {
                  if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(
                      decodeURIComponent(name),
                      decodeURIComponent(value)
                    );
                  }
                });
              return form;
            }

            function parseHeaders(rawHeaders) {
              var headers = new Headers();
              // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
              // https://tools.ietf.org/html/rfc7230#section-3.2
              var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
              preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
                var parts = line.split(":");
                var key = parts.shift().trim();
                if (key) {
                  var value = parts.join(":").trim();
                  headers.append(key, value);
                }
              });
              return headers;
            }

            Body.call(Request.prototype);

            function Response(bodyInit, options) {
              if (!options) {
                options = {};
              }

              this.type = "default";
              this.status = options.status === undefined ? 200 : options.status;
              this.ok = this.status >= 200 && this.status < 300;
              this.statusText =
                "statusText" in options ? options.statusText : "OK";
              this.headers = new Headers(options.headers);
              this.url = options.url || "";
              this._initBody(bodyInit);
            }

            Body.call(Response.prototype);

            Response.prototype.clone = function () {
              return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url,
              });
            };

            Response.error = function () {
              var response = new Response(null, { status: 0, statusText: "" });
              response.type = "error";
              return response;
            };

            var redirectStatuses = [301, 302, 303, 307, 308];

            Response.redirect = function (url, status) {
              if (redirectStatuses.indexOf(status) === -1) {
                throw new RangeError("Invalid status code");
              }

              return new Response(null, {
                status: status,
                headers: { location: url },
              });
            };

            exports.DOMException = self.DOMException;
            try {
              new exports.DOMException();
            } catch (err) {
              exports.DOMException = function (message, name) {
                this.message = message;
                this.name = name;
                var error = Error(message);
                this.stack = error.stack;
              };
              exports.DOMException.prototype = Object.create(Error.prototype);
              exports.DOMException.prototype.constructor = exports.DOMException;
            }

            function fetch(input, init) {
              return new Promise(function (resolve, reject) {
                var request = new Request(input, init);

                if (request.signal && request.signal.aborted) {
                  return reject(
                    new exports.DOMException("Aborted", "AbortError")
                  );
                }

                var xhr = new XMLHttpRequest();

                function abortXhr() {
                  xhr.abort();
                }

                xhr.onload = function () {
                  var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || ""),
                  };
                  options.url =
                    "responseURL" in xhr
                      ? xhr.responseURL
                      : options.headers.get("X-Request-URL");
                  var body =
                    "response" in xhr ? xhr.response : xhr.responseText;
                  resolve(new Response(body, options));
                };

                xhr.onerror = function () {
                  reject(new TypeError("Network request failed"));
                };

                xhr.ontimeout = function () {
                  reject(new TypeError("Network request failed"));
                };

                xhr.onabort = function () {
                  reject(new exports.DOMException("Aborted", "AbortError"));
                };

                xhr.open(request.method, request.url, true);

                if (request.credentials === "include") {
                  xhr.withCredentials = true;
                } else if (request.credentials === "omit") {
                  xhr.withCredentials = false;
                }

                if ("responseType" in xhr && support.blob) {
                  xhr.responseType = "blob";
                }

                request.headers.forEach(function (value, name) {
                  xhr.setRequestHeader(name, value);
                });

                if (request.signal) {
                  request.signal.addEventListener("abort", abortXhr);

                  xhr.onreadystatechange = function () {
                    // DONE (success or failure)
                    if (xhr.readyState === 4) {
                      request.signal.removeEventListener("abort", abortXhr);
                    }
                  };
                }

                xhr.send(
                  typeof request._bodyInit === "undefined"
                    ? null
                    : request._bodyInit
                );
              });
            }

            fetch.polyfill = true;

            if (!self.fetch) {
              self.fetch = fetch;
              self.Headers = Headers;
              self.Request = Request;
              self.Response = Response;
            }

            exports.Headers = Headers;
            exports.Request = Request;
            exports.Response = Response;
            exports.fetch = fetch;

            Object.defineProperty(exports, "__esModule", { value: true });

            return exports;
          })({});
        })(__self__);
        __self__.fetch.ponyfill = true;
        // Remove "polyfill" property added by whatwg-fetch
        delete __self__.fetch.polyfill;
        // Choose between native implementation (global) or custom implementation (__self__)
        // var ctx = global.fetch ? global : __self__;
        var ctx = __self__; // this line disable service worker support temporarily
        exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
        exports["default"] = ctx.fetch; // For TypeScript consumers without esModuleInterop.
        exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
        exports.Headers = ctx.Headers;
        exports.Request = ctx.Request;
        exports.Response = ctx.Response;
        module.exports = exports;

        /***/
      },

    /***/ "../node_modules/eventemitter3/index.js":
      /*!**********************************************!*\
  !*** ../node_modules/eventemitter3/index.js ***!
  \**********************************************/
      /***/ (module) => {
        "use strict";

        var has = Object.prototype.hasOwnProperty,
          prefix = "~";

        /**
         * Constructor to create a storage for our `EE` objects.
         * An `Events` instance is a plain object whose properties are event names.
         *
         * @constructor
         * @private
         */
        function Events() {}

        //
        // We try to not inherit from `Object.prototype`. In some engines creating an
        // instance in this way is faster than calling `Object.create(null)` directly.
        // If `Object.create(null)` is not supported we prefix the event names with a
        // character to make sure that the built-in object properties are not
        // overridden or used as an attack vector.
        //
        if (Object.create) {
          Events.prototype = Object.create(null);

          //
          // This hack is needed because the `__proto__` property is still inherited in
          // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
          //
          if (!new Events().__proto__) prefix = false;
        }

        /**
         * Representation of a single event listener.
         *
         * @param {Function} fn The listener function.
         * @param {*} context The context to invoke the listener with.
         * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
         * @constructor
         * @private
         */
        function EE(fn, context, once) {
          this.fn = fn;
          this.context = context;
          this.once = once || false;
        }

        /**
         * Add a listener for a given event.
         *
         * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
         * @param {(String|Symbol)} event The event name.
         * @param {Function} fn The listener function.
         * @param {*} context The context to invoke the listener with.
         * @param {Boolean} once Specify if the listener is a one-time listener.
         * @returns {EventEmitter}
         * @private
         */
        function addListener(emitter, event, fn, context, once) {
          if (typeof fn !== "function") {
            throw new TypeError("The listener must be a function");
          }

          var listener = new EE(fn, context || emitter, once),
            evt = prefix ? prefix + event : event;

          if (!emitter._events[evt])
            (emitter._events[evt] = listener), emitter._eventsCount++;
          else if (!emitter._events[evt].fn)
            emitter._events[evt].push(listener);
          else emitter._events[evt] = [emitter._events[evt], listener];

          return emitter;
        }

        /**
         * Clear event by name.
         *
         * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
         * @param {(String|Symbol)} evt The Event name.
         * @private
         */
        function clearEvent(emitter, evt) {
          if (--emitter._eventsCount === 0) emitter._events = new Events();
          else delete emitter._events[evt];
        }

        /**
         * Minimal `EventEmitter` interface that is molded against the Node.js
         * `EventEmitter` interface.
         *
         * @constructor
         * @public
         */
        function EventEmitter() {
          this._events = new Events();
          this._eventsCount = 0;
        }

        /**
         * Return an array listing the events for which the emitter has registered
         * listeners.
         *
         * @returns {Array}
         * @public
         */
        EventEmitter.prototype.eventNames = function eventNames() {
          var names = [],
            events,
            name;

          if (this._eventsCount === 0) return names;

          for (name in (events = this._events)) {
            if (has.call(events, name))
              names.push(prefix ? name.slice(1) : name);
          }

          if (Object.getOwnPropertySymbols) {
            return names.concat(Object.getOwnPropertySymbols(events));
          }

          return names;
        };

        /**
         * Return the listeners registered for a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @returns {Array} The registered listeners.
         * @public
         */
        EventEmitter.prototype.listeners = function listeners(event) {
          var evt = prefix ? prefix + event : event,
            handlers = this._events[evt];

          if (!handlers) return [];
          if (handlers.fn) return [handlers.fn];

          for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
            ee[i] = handlers[i].fn;
          }

          return ee;
        };

        /**
         * Return the number of listeners listening to a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @returns {Number} The number of listeners.
         * @public
         */
        EventEmitter.prototype.listenerCount = function listenerCount(event) {
          var evt = prefix ? prefix + event : event,
            listeners = this._events[evt];

          if (!listeners) return 0;
          if (listeners.fn) return 1;
          return listeners.length;
        };

        /**
         * Calls each of the listeners registered for a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @returns {Boolean} `true` if the event had listeners, else `false`.
         * @public
         */
        EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
          var evt = prefix ? prefix + event : event;

          if (!this._events[evt]) return false;

          var listeners = this._events[evt],
            len = arguments.length,
            args,
            i;

          if (listeners.fn) {
            if (listeners.once)
              this.removeListener(event, listeners.fn, undefined, true);

            switch (len) {
              case 1:
                return listeners.fn.call(listeners.context), true;
              case 2:
                return listeners.fn.call(listeners.context, a1), true;
              case 3:
                return listeners.fn.call(listeners.context, a1, a2), true;
              case 4:
                return listeners.fn.call(listeners.context, a1, a2, a3), true;
              case 5:
                return (
                  listeners.fn.call(listeners.context, a1, a2, a3, a4), true
                );
              case 6:
                return (
                  listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true
                );
            }

            for (i = 1, args = new Array(len - 1); i < len; i++) {
              args[i - 1] = arguments[i];
            }

            listeners.fn.apply(listeners.context, args);
          } else {
            var length = listeners.length,
              j;

            for (i = 0; i < length; i++) {
              if (listeners[i].once)
                this.removeListener(event, listeners[i].fn, undefined, true);

              switch (len) {
                case 1:
                  listeners[i].fn.call(listeners[i].context);
                  break;
                case 2:
                  listeners[i].fn.call(listeners[i].context, a1);
                  break;
                case 3:
                  listeners[i].fn.call(listeners[i].context, a1, a2);
                  break;
                case 4:
                  listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                  break;
                default:
                  if (!args)
                    for (j = 1, args = new Array(len - 1); j < len; j++) {
                      args[j - 1] = arguments[j];
                    }

                  listeners[i].fn.apply(listeners[i].context, args);
              }
            }
          }

          return true;
        };

        /**
         * Add a listener for a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @param {Function} fn The listener function.
         * @param {*} [context=this] The context to invoke the listener with.
         * @returns {EventEmitter} `this`.
         * @public
         */
        EventEmitter.prototype.on = function on(event, fn, context) {
          return addListener(this, event, fn, context, false);
        };

        /**
         * Add a one-time listener for a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @param {Function} fn The listener function.
         * @param {*} [context=this] The context to invoke the listener with.
         * @returns {EventEmitter} `this`.
         * @public
         */
        EventEmitter.prototype.once = function once(event, fn, context) {
          return addListener(this, event, fn, context, true);
        };

        /**
         * Remove the listeners of a given event.
         *
         * @param {(String|Symbol)} event The event name.
         * @param {Function} fn Only remove the listeners that match this function.
         * @param {*} context Only remove the listeners that have this context.
         * @param {Boolean} once Only remove one-time listeners.
         * @returns {EventEmitter} `this`.
         * @public
         */
        EventEmitter.prototype.removeListener = function removeListener(
          event,
          fn,
          context,
          once
        ) {
          var evt = prefix ? prefix + event : event;

          if (!this._events[evt]) return this;
          if (!fn) {
            clearEvent(this, evt);
            return this;
          }

          var listeners = this._events[evt];

          if (listeners.fn) {
            if (
              listeners.fn === fn &&
              (!once || listeners.once) &&
              (!context || listeners.context === context)
            ) {
              clearEvent(this, evt);
            }
          } else {
            for (
              var i = 0, events = [], length = listeners.length;
              i < length;
              i++
            ) {
              if (
                listeners[i].fn !== fn ||
                (once && !listeners[i].once) ||
                (context && listeners[i].context !== context)
              ) {
                events.push(listeners[i]);
              }
            }

            //
            // Reset the array, or remove it completely if we have no more listeners.
            //
            if (events.length)
              this._events[evt] = events.length === 1 ? events[0] : events;
            else clearEvent(this, evt);
          }

          return this;
        };

        /**
         * Remove all listeners, or those of the specified event.
         *
         * @param {(String|Symbol)} [event] The event name.
         * @returns {EventEmitter} `this`.
         * @public
         */
        EventEmitter.prototype.removeAllListeners = function removeAllListeners(
          event
        ) {
          var evt;

          if (event) {
            evt = prefix ? prefix + event : event;
            if (this._events[evt]) clearEvent(this, evt);
          } else {
            this._events = new Events();
            this._eventsCount = 0;
          }

          return this;
        };

        //
        // Alias methods names because people roll like that.
        //
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
        EventEmitter.prototype.addListener = EventEmitter.prototype.on;

        //
        // Expose the prefix.
        //
        EventEmitter.prefixed = prefix;

        //
        // Allow `EventEmitter` to be imported as module namespace.
        //
        EventEmitter.EventEmitter = EventEmitter;

        //
        // Expose the module.
        //
        if (true) {
          module.exports = EventEmitter;
        }

        /***/
      },

    /***/ "../node_modules/ieee754/index.js":
      /*!****************************************!*\
  !*** ../node_modules/ieee754/index.js ***!
  \****************************************/
      /***/ (__unused_webpack_module, exports) => {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        exports.read = function (buffer, offset, isLE, mLen, nBytes) {
          var e, m;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var nBits = -7;
          var i = isLE ? nBytes - 1 : 0;
          var d = isLE ? -1 : 1;
          var s = buffer[offset + i];

          i += d;

          e = s & ((1 << -nBits) - 1);
          s >>= -nBits;
          nBits += eLen;
          for (
            ;
            nBits > 0;
            e = e * 256 + buffer[offset + i], i += d, nBits -= 8
          ) {}

          m = e & ((1 << -nBits) - 1);
          e >>= -nBits;
          nBits += mLen;
          for (
            ;
            nBits > 0;
            m = m * 256 + buffer[offset + i], i += d, nBits -= 8
          ) {}

          if (e === 0) {
            e = 1 - eBias;
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity;
          } else {
            m = m + Math.pow(2, mLen);
            e = e - eBias;
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
        };

        exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c;
          var eLen = nBytes * 8 - mLen - 1;
          var eMax = (1 << eLen) - 1;
          var eBias = eMax >> 1;
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
          var i = isLE ? 0 : nBytes - 1;
          var d = isLE ? 1 : -1;
          var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

          value = Math.abs(value);

          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0;
            e = eMax;
          } else {
            e = Math.floor(Math.log(value) / Math.LN2);
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--;
              c *= 2;
            }
            if (e + eBias >= 1) {
              value += rt / c;
            } else {
              value += rt * Math.pow(2, 1 - eBias);
            }
            if (value * c >= 2) {
              e++;
              c /= 2;
            }

            if (e + eBias >= eMax) {
              m = 0;
              e = eMax;
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen);
              e = e + eBias;
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
              e = 0;
            }
          }

          for (
            ;
            mLen >= 8;
            buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8
          ) {}

          e = (e << mLen) | m;
          eLen += mLen;
          for (
            ;
            eLen > 0;
            buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8
          ) {}

          buffer[offset + i - d] |= s * 128;
        };

        /***/
      },

    /***/ "../node_modules/jayson/lib/client/browser/index.js":
      /*!**********************************************************!*\
  !*** ../node_modules/jayson/lib/client/browser/index.js ***!
  \**********************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";

        const uuid = __webpack_require__(
          /*! uuid */ "../node_modules/uuid/dist/esm-browser/index.js"
        ).v4;
        const generateRequest = __webpack_require__(
          /*! ../../generateRequest */ "../node_modules/jayson/lib/generateRequest.js"
        );

        /**
         * Constructor for a Jayson Browser Client that does not depend any node.js core libraries
         * @class ClientBrowser
         * @param {Function} callServer Method that calls the server, receives the stringified request and a regular node-style callback
         * @param {Object} [options]
         * @param {Function} [options.reviver] Reviver function for JSON
         * @param {Function} [options.replacer] Replacer function for JSON
         * @param {Number} [options.version=2] JSON-RPC version to use (1|2)
         * @param {Function} [options.generator] Function to use for generating request IDs
         *  @param {Boolean} [options.notificationIdNull=false] When true, version 2 requests will set id to null instead of omitting it
         * @return {ClientBrowser}
         */
        const ClientBrowser = function (callServer, options) {
          if (!(this instanceof ClientBrowser)) {
            return new ClientBrowser(callServer, options);
          }

          if (!options) {
            options = {};
          }

          this.options = {
            reviver:
              typeof options.reviver !== "undefined" ? options.reviver : null,
            replacer:
              typeof options.replacer !== "undefined" ? options.replacer : null,
            generator:
              typeof options.generator !== "undefined"
                ? options.generator
                : function () {
                    return uuid();
                  },
            version:
              typeof options.version !== "undefined" ? options.version : 2,
            notificationIdNull:
              typeof options.notificationIdNull === "boolean"
                ? options.notificationIdNull
                : false,
          };

          this.callServer = callServer;
        };

        module.exports = ClientBrowser;

        /**
         *  Creates a request and dispatches it if given a callback.
         *  @param {String|Array} method A batch request if passed an Array, or a method name if passed a String
         *  @param {Array|Object} [params] Parameters for the method
         *  @param {String|Number} [id] Optional id. If undefined an id will be generated. If null it creates a notification request
         *  @param {Function} [callback] Request callback. If specified, executes the request rather than only returning it.
         *  @throws {TypeError} Invalid parameters
         *  @return {Object} JSON-RPC 1.0 or 2.0 compatible request
         */
        ClientBrowser.prototype.request = function (
          method,
          params,
          id,
          callback
        ) {
          const self = this;
          let request = null;

          // is this a batch request?
          const isBatch = Array.isArray(method) && typeof params === "function";

          if (this.options.version === 1 && isBatch) {
            throw new TypeError("JSON-RPC 1.0 does not support batching");
          }

          // is this a raw request?
          const isRaw =
            !isBatch &&
            method &&
            typeof method === "object" &&
            typeof params === "function";

          if (isBatch || isRaw) {
            callback = params;
            request = method;
          } else {
            if (typeof id === "function") {
              callback = id;
              // specifically undefined because "null" is a notification request
              id = undefined;
            }

            const hasCallback = typeof callback === "function";

            try {
              request = generateRequest(method, params, id, {
                generator: this.options.generator,
                version: this.options.version,
                notificationIdNull: this.options.notificationIdNull,
              });
            } catch (err) {
              if (hasCallback) {
                return callback(err);
              }
              throw err;
            }

            // no callback means we should just return a raw request
            if (!hasCallback) {
              return request;
            }
          }

          let message;
          try {
            message = JSON.stringify(request, this.options.replacer);
          } catch (err) {
            return callback(err);
          }

          this.callServer(message, function (err, response) {
            self._parseResponse(err, response, callback);
          });

          // always return the raw request
          return request;
        };

        /**
         * Parses a response from a server
         * @param {Object} err Error to pass on that is unrelated to the actual response
         * @param {String} responseText JSON-RPC 1.0 or 2.0 response
         * @param {Function} callback Callback that will receive different arguments depending on the amount of parameters
         * @private
         */
        ClientBrowser.prototype._parseResponse = function (
          err,
          responseText,
          callback
        ) {
          if (err) {
            callback(err);
            return;
          }

          if (!responseText) {
            // empty response text, assume that is correct because it could be a
            // notification which jayson does not give any body for
            return callback();
          }

          let response;
          try {
            response = JSON.parse(responseText, this.options.reviver);
          } catch (err) {
            return callback(err);
          }

          if (callback.length === 3) {
            // if callback length is 3, we split callback arguments on error and response

            // is batch response?
            if (Array.isArray(response)) {
              // neccesary to split strictly on validity according to spec here
              const isError = function (res) {
                return typeof res.error !== "undefined";
              };

              const isNotError = function (res) {
                return !isError(res);
              };

              return callback(
                null,
                response.filter(isError),
                response.filter(isNotError)
              );
            } else {
              // split regardless of validity
              return callback(null, response.error, response.result);
            }
          }

          callback(null, response);
        };

        /***/
      },

    /***/ "../node_modules/jayson/lib/generateRequest.js":
      /*!*****************************************************!*\
  !*** ../node_modules/jayson/lib/generateRequest.js ***!
  \*****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";

        const uuid = __webpack_require__(
          /*! uuid */ "../node_modules/uuid/dist/esm-browser/index.js"
        ).v4;

        /**
         *  Generates a JSON-RPC 1.0 or 2.0 request
         *  @param {String} method Name of method to call
         *  @param {Array|Object} params Array of parameters passed to the method as specified, or an object of parameter names and corresponding value
         *  @param {String|Number|null} [id] Request ID can be a string, number, null for explicit notification or left out for automatic generation
         *  @param {Object} [options]
         *  @param {Number} [options.version=2] JSON-RPC version to use (1 or 2)
         *  @param {Boolean} [options.notificationIdNull=false] When true, version 2 requests will set id to null instead of omitting it
         *  @param {Function} [options.generator] Passed the request, and the options object and is expected to return a request ID
         *  @throws {TypeError} If any of the parameters are invalid
         *  @return {Object} A JSON-RPC 1.0 or 2.0 request
         *  @memberOf Utils
         */
        const generateRequest = function (method, params, id, options) {
          if (typeof method !== "string") {
            throw new TypeError(method + " must be a string");
          }

          options = options || {};

          // check valid version provided
          const version =
            typeof options.version === "number" ? options.version : 2;
          if (version !== 1 && version !== 2) {
            throw new TypeError(version + " must be 1 or 2");
          }

          const request = {
            method: method,
          };

          if (version === 2) {
            request.jsonrpc = "2.0";
          }

          if (params) {
            // params given, but invalid?
            if (typeof params !== "object" && !Array.isArray(params)) {
              throw new TypeError(
                params + " must be an object, array or omitted"
              );
            }
            request.params = params;
          }

          // if id was left out, generate one (null means explicit notification)
          if (typeof id === "undefined") {
            const generator =
              typeof options.generator === "function"
                ? options.generator
                : function () {
                    return uuid();
                  };
            request.id = generator(request, options);
          } else if (version === 2 && id === null) {
            // we have a version 2 notification
            if (options.notificationIdNull) {
              request.id = null; // id will not be set at all unless option provided
            }
          } else {
            request.id = id;
          }

          return request;
        };

        module.exports = generateRequest;

        /***/
      },

    /***/ "../node_modules/js-sha3/src/sha3.js":
      /*!*******************************************!*\
  !*** ../node_modules/js-sha3/src/sha3.js ***!
  \*******************************************/
      /***/ (module, exports, __webpack_require__) => {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        /**
         * [js-sha3]{@link https://github.com/emn178/js-sha3}
         *
         * @version 0.8.0
         * @author Chen, Yi-Cyuan [emn178@gmail.com]
         * @copyright Chen, Yi-Cyuan 2015-2018
         * @license MIT
         */
        /*jslint bitwise: true */
        (function () {
          "use strict";

          var INPUT_ERROR = "input is invalid type";
          var FINALIZE_ERROR = "finalize already called";
          var WINDOW = "object" === "object";
          var root = WINDOW ? window : {};
          if (root.JS_SHA3_NO_WINDOW) {
            WINDOW = false;
          }
          var WEB_WORKER = !WINDOW && typeof self === "object";
          var NODE_JS =
            !root.JS_SHA3_NO_NODE_JS &&
            typeof process === "object" &&
            process.versions &&
            process.versions.node;
          if (NODE_JS) {
            root = __webpack_require__.g;
          } else if (WEB_WORKER) {
            root = self;
          }
          var COMMON_JS =
            !root.JS_SHA3_NO_COMMON_JS &&
            "object" === "object" &&
            module.exports;
          var AMD = true && __webpack_require__.amdO;
          var ARRAY_BUFFER =
            !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
          var HEX_CHARS = "0123456789abcdef".split("");
          var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
          var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
          var KECCAK_PADDING = [1, 256, 65536, 16777216];
          var PADDING = [6, 1536, 393216, 100663296];
          var SHIFT = [0, 8, 16, 24];
          var RC = [
            1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
            2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0,
            136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139,
            2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648,
            128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545,
            2147483648, 32896, 2147483648, 2147483649, 0, 2147516424,
            2147483648,
          ];
          var BITS = [224, 256, 384, 512];
          var SHAKE_BITS = [128, 256];
          var OUTPUT_TYPES = [
            "hex",
            "buffer",
            "arrayBuffer",
            "array",
            "digest",
          ];
          var CSHAKE_BYTEPAD = {
            128: 168,
            256: 136,
          };

          if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
            Array.isArray = function (obj) {
              return Object.prototype.toString.call(obj) === "[object Array]";
            };
          }

          if (
            ARRAY_BUFFER &&
            (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)
          ) {
            ArrayBuffer.isView = function (obj) {
              return (
                typeof obj === "object" &&
                obj.buffer &&
                obj.buffer.constructor === ArrayBuffer
              );
            };
          }

          var createOutputMethod = function (bits, padding, outputType) {
            return function (message) {
              return new Keccak(bits, padding, bits)
                .update(message)
                [outputType]();
            };
          };

          var createShakeOutputMethod = function (bits, padding, outputType) {
            return function (message, outputBits) {
              return new Keccak(bits, padding, outputBits)
                .update(message)
                [outputType]();
            };
          };

          var createCshakeOutputMethod = function (bits, padding, outputType) {
            return function (message, outputBits, n, s) {
              return methods["cshake" + bits]
                .update(message, outputBits, n, s)
                [outputType]();
            };
          };

          var createKmacOutputMethod = function (bits, padding, outputType) {
            return function (key, message, outputBits, s) {
              return methods["kmac" + bits]
                .update(key, message, outputBits, s)
                [outputType]();
            };
          };

          var createOutputMethods = function (
            method,
            createMethod,
            bits,
            padding
          ) {
            for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
              var type = OUTPUT_TYPES[i];
              method[type] = createMethod(bits, padding, type);
            }
            return method;
          };

          var createMethod = function (bits, padding) {
            var method = createOutputMethod(bits, padding, "hex");
            method.create = function () {
              return new Keccak(bits, padding, bits);
            };
            method.update = function (message) {
              return method.create().update(message);
            };
            return createOutputMethods(
              method,
              createOutputMethod,
              bits,
              padding
            );
          };

          var createShakeMethod = function (bits, padding) {
            var method = createShakeOutputMethod(bits, padding, "hex");
            method.create = function (outputBits) {
              return new Keccak(bits, padding, outputBits);
            };
            method.update = function (message, outputBits) {
              return method.create(outputBits).update(message);
            };
            return createOutputMethods(
              method,
              createShakeOutputMethod,
              bits,
              padding
            );
          };

          var createCshakeMethod = function (bits, padding) {
            var w = CSHAKE_BYTEPAD[bits];
            var method = createCshakeOutputMethod(bits, padding, "hex");
            method.create = function (outputBits, n, s) {
              if (!n && !s) {
                return methods["shake" + bits].create(outputBits);
              } else {
                return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
              }
            };
            method.update = function (message, outputBits, n, s) {
              return method.create(outputBits, n, s).update(message);
            };
            return createOutputMethods(
              method,
              createCshakeOutputMethod,
              bits,
              padding
            );
          };

          var createKmacMethod = function (bits, padding) {
            var w = CSHAKE_BYTEPAD[bits];
            var method = createKmacOutputMethod(bits, padding, "hex");
            method.create = function (key, outputBits, s) {
              return new Kmac(bits, padding, outputBits)
                .bytepad(["KMAC", s], w)
                .bytepad([key], w);
            };
            method.update = function (key, message, outputBits, s) {
              return method.create(key, outputBits, s).update(message);
            };
            return createOutputMethods(
              method,
              createKmacOutputMethod,
              bits,
              padding
            );
          };

          var algorithms = [
            {
              name: "keccak",
              padding: KECCAK_PADDING,
              bits: BITS,
              createMethod: createMethod,
            },
            {
              name: "sha3",
              padding: PADDING,
              bits: BITS,
              createMethod: createMethod,
            },
            {
              name: "shake",
              padding: SHAKE_PADDING,
              bits: SHAKE_BITS,
              createMethod: createShakeMethod,
            },
            {
              name: "cshake",
              padding: CSHAKE_PADDING,
              bits: SHAKE_BITS,
              createMethod: createCshakeMethod,
            },
            {
              name: "kmac",
              padding: CSHAKE_PADDING,
              bits: SHAKE_BITS,
              createMethod: createKmacMethod,
            },
          ];

          var methods = {},
            methodNames = [];

          for (var i = 0; i < algorithms.length; ++i) {
            var algorithm = algorithms[i];
            var bits = algorithm.bits;
            for (var j = 0; j < bits.length; ++j) {
              var methodName = algorithm.name + "_" + bits[j];
              methodNames.push(methodName);
              methods[methodName] = algorithm.createMethod(
                bits[j],
                algorithm.padding
              );
              if (algorithm.name !== "sha3") {
                var newMethodName = algorithm.name + bits[j];
                methodNames.push(newMethodName);
                methods[newMethodName] = methods[methodName];
              }
            }
          }

          function Keccak(bits, padding, outputBits) {
            this.blocks = [];
            this.s = [];
            this.padding = padding;
            this.outputBits = outputBits;
            this.reset = true;
            this.finalized = false;
            this.block = 0;
            this.start = 0;
            this.blockCount = (1600 - (bits << 1)) >> 5;
            this.byteCount = this.blockCount << 2;
            this.outputBlocks = outputBits >> 5;
            this.extraBytes = (outputBits & 31) >> 3;

            for (var i = 0; i < 50; ++i) {
              this.s[i] = 0;
            }
          }

          Keccak.prototype.update = function (message) {
            if (this.finalized) {
              throw new Error(FINALIZE_ERROR);
            }
            var notString,
              type = typeof message;
            if (type !== "string") {
              if (type === "object") {
                if (message === null) {
                  throw new Error(INPUT_ERROR);
                } else if (
                  ARRAY_BUFFER &&
                  message.constructor === ArrayBuffer
                ) {
                  message = new Uint8Array(message);
                } else if (!Array.isArray(message)) {
                  if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                    throw new Error(INPUT_ERROR);
                  }
                }
              } else {
                throw new Error(INPUT_ERROR);
              }
              notString = true;
            }
            var blocks = this.blocks,
              byteCount = this.byteCount,
              length = message.length,
              blockCount = this.blockCount,
              index = 0,
              s = this.s,
              i,
              code;

            while (index < length) {
              if (this.reset) {
                this.reset = false;
                blocks[0] = this.block;
                for (i = 1; i < blockCount + 1; ++i) {
                  blocks[i] = 0;
                }
              }
              if (notString) {
                for (i = this.start; index < length && i < byteCount; ++index) {
                  blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                }
              } else {
                for (i = this.start; index < length && i < byteCount; ++index) {
                  code = message.charCodeAt(index);
                  if (code < 0x80) {
                    blocks[i >> 2] |= code << SHIFT[i++ & 3];
                  } else if (code < 0x800) {
                    blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                  } else if (code < 0xd800 || code >= 0xe000) {
                    blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |=
                      (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                  } else {
                    code =
                      0x10000 +
                      (((code & 0x3ff) << 10) |
                        (message.charCodeAt(++index) & 0x3ff));
                    blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |=
                      (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |=
                      (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                  }
                }
              }
              this.lastByteIndex = i;
              if (i >= byteCount) {
                this.start = i - byteCount;
                this.block = blocks[blockCount];
                for (i = 0; i < blockCount; ++i) {
                  s[i] ^= blocks[i];
                }
                f(s);
                this.reset = true;
              } else {
                this.start = i;
              }
            }
            return this;
          };

          Keccak.prototype.encode = function (x, right) {
            var o = x & 255,
              n = 1;
            var bytes = [o];
            x = x >> 8;
            o = x & 255;
            while (o > 0) {
              bytes.unshift(o);
              x = x >> 8;
              o = x & 255;
              ++n;
            }
            if (right) {
              bytes.push(n);
            } else {
              bytes.unshift(n);
            }
            this.update(bytes);
            return bytes.length;
          };

          Keccak.prototype.encodeString = function (str) {
            var notString,
              type = typeof str;
            if (type !== "string") {
              if (type === "object") {
                if (str === null) {
                  throw new Error(INPUT_ERROR);
                } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
                  str = new Uint8Array(str);
                } else if (!Array.isArray(str)) {
                  if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                    throw new Error(INPUT_ERROR);
                  }
                }
              } else {
                throw new Error(INPUT_ERROR);
              }
              notString = true;
            }
            var bytes = 0,
              length = str.length;
            if (notString) {
              bytes = length;
            } else {
              for (var i = 0; i < str.length; ++i) {
                var code = str.charCodeAt(i);
                if (code < 0x80) {
                  bytes += 1;
                } else if (code < 0x800) {
                  bytes += 2;
                } else if (code < 0xd800 || code >= 0xe000) {
                  bytes += 3;
                } else {
                  code =
                    0x10000 +
                    (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
                  bytes += 4;
                }
              }
            }
            bytes += this.encode(bytes * 8);
            this.update(str);
            return bytes;
          };

          Keccak.prototype.bytepad = function (strs, w) {
            var bytes = this.encode(w);
            for (var i = 0; i < strs.length; ++i) {
              bytes += this.encodeString(strs[i]);
            }
            var paddingBytes = w - (bytes % w);
            var zeros = [];
            zeros.length = paddingBytes;
            this.update(zeros);
            return this;
          };

          Keccak.prototype.finalize = function () {
            if (this.finalized) {
              return;
            }
            this.finalized = true;
            var blocks = this.blocks,
              i = this.lastByteIndex,
              blockCount = this.blockCount,
              s = this.s;
            blocks[i >> 2] |= this.padding[i & 3];
            if (this.lastByteIndex === this.byteCount) {
              blocks[0] = blocks[blockCount];
              for (i = 1; i < blockCount + 1; ++i) {
                blocks[i] = 0;
              }
            }
            blocks[blockCount - 1] |= 0x80000000;
            for (i = 0; i < blockCount; ++i) {
              s[i] ^= blocks[i];
            }
            f(s);
          };

          Keccak.prototype.toString = Keccak.prototype.hex = function () {
            this.finalize();

            var blockCount = this.blockCount,
              s = this.s,
              outputBlocks = this.outputBlocks,
              extraBytes = this.extraBytes,
              i = 0,
              j = 0;
            var hex = "",
              block;
            while (j < outputBlocks) {
              for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                block = s[i];
                hex +=
                  HEX_CHARS[(block >> 4) & 0x0f] +
                  HEX_CHARS[block & 0x0f] +
                  HEX_CHARS[(block >> 12) & 0x0f] +
                  HEX_CHARS[(block >> 8) & 0x0f] +
                  HEX_CHARS[(block >> 20) & 0x0f] +
                  HEX_CHARS[(block >> 16) & 0x0f] +
                  HEX_CHARS[(block >> 28) & 0x0f] +
                  HEX_CHARS[(block >> 24) & 0x0f];
              }
              if (j % blockCount === 0) {
                f(s);
                i = 0;
              }
            }
            if (extraBytes) {
              block = s[i];
              hex += HEX_CHARS[(block >> 4) & 0x0f] + HEX_CHARS[block & 0x0f];
              if (extraBytes > 1) {
                hex +=
                  HEX_CHARS[(block >> 12) & 0x0f] +
                  HEX_CHARS[(block >> 8) & 0x0f];
              }
              if (extraBytes > 2) {
                hex +=
                  HEX_CHARS[(block >> 20) & 0x0f] +
                  HEX_CHARS[(block >> 16) & 0x0f];
              }
            }
            return hex;
          };

          Keccak.prototype.arrayBuffer = function () {
            this.finalize();

            var blockCount = this.blockCount,
              s = this.s,
              outputBlocks = this.outputBlocks,
              extraBytes = this.extraBytes,
              i = 0,
              j = 0;
            var bytes = this.outputBits >> 3;
            var buffer;
            if (extraBytes) {
              buffer = new ArrayBuffer((outputBlocks + 1) << 2);
            } else {
              buffer = new ArrayBuffer(bytes);
            }
            var array = new Uint32Array(buffer);
            while (j < outputBlocks) {
              for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                array[j] = s[i];
              }
              if (j % blockCount === 0) {
                f(s);
              }
            }
            if (extraBytes) {
              array[i] = s[i];
              buffer = buffer.slice(0, bytes);
            }
            return buffer;
          };

          Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

          Keccak.prototype.digest = Keccak.prototype.array = function () {
            this.finalize();

            var blockCount = this.blockCount,
              s = this.s,
              outputBlocks = this.outputBlocks,
              extraBytes = this.extraBytes,
              i = 0,
              j = 0;
            var array = [],
              offset,
              block;
            while (j < outputBlocks) {
              for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                offset = j << 2;
                block = s[i];
                array[offset] = block & 0xff;
                array[offset + 1] = (block >> 8) & 0xff;
                array[offset + 2] = (block >> 16) & 0xff;
                array[offset + 3] = (block >> 24) & 0xff;
              }
              if (j % blockCount === 0) {
                f(s);
              }
            }
            if (extraBytes) {
              offset = j << 2;
              block = s[i];
              array[offset] = block & 0xff;
              if (extraBytes > 1) {
                array[offset + 1] = (block >> 8) & 0xff;
              }
              if (extraBytes > 2) {
                array[offset + 2] = (block >> 16) & 0xff;
              }
            }
            return array;
          };

          function Kmac(bits, padding, outputBits) {
            Keccak.call(this, bits, padding, outputBits);
          }

          Kmac.prototype = new Keccak();

          Kmac.prototype.finalize = function () {
            this.encode(this.outputBits, true);
            return Keccak.prototype.finalize.call(this);
          };

          var f = function (s) {
            var h,
              l,
              n,
              c0,
              c1,
              c2,
              c3,
              c4,
              c5,
              c6,
              c7,
              c8,
              c9,
              b0,
              b1,
              b2,
              b3,
              b4,
              b5,
              b6,
              b7,
              b8,
              b9,
              b10,
              b11,
              b12,
              b13,
              b14,
              b15,
              b16,
              b17,
              b18,
              b19,
              b20,
              b21,
              b22,
              b23,
              b24,
              b25,
              b26,
              b27,
              b28,
              b29,
              b30,
              b31,
              b32,
              b33,
              b34,
              b35,
              b36,
              b37,
              b38,
              b39,
              b40,
              b41,
              b42,
              b43,
              b44,
              b45,
              b46,
              b47,
              b48,
              b49;
            for (n = 0; n < 48; n += 2) {
              c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
              c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
              c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
              c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
              c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
              c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
              c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
              c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
              c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
              c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

              h = c8 ^ ((c2 << 1) | (c3 >>> 31));
              l = c9 ^ ((c3 << 1) | (c2 >>> 31));
              s[0] ^= h;
              s[1] ^= l;
              s[10] ^= h;
              s[11] ^= l;
              s[20] ^= h;
              s[21] ^= l;
              s[30] ^= h;
              s[31] ^= l;
              s[40] ^= h;
              s[41] ^= l;
              h = c0 ^ ((c4 << 1) | (c5 >>> 31));
              l = c1 ^ ((c5 << 1) | (c4 >>> 31));
              s[2] ^= h;
              s[3] ^= l;
              s[12] ^= h;
              s[13] ^= l;
              s[22] ^= h;
              s[23] ^= l;
              s[32] ^= h;
              s[33] ^= l;
              s[42] ^= h;
              s[43] ^= l;
              h = c2 ^ ((c6 << 1) | (c7 >>> 31));
              l = c3 ^ ((c7 << 1) | (c6 >>> 31));
              s[4] ^= h;
              s[5] ^= l;
              s[14] ^= h;
              s[15] ^= l;
              s[24] ^= h;
              s[25] ^= l;
              s[34] ^= h;
              s[35] ^= l;
              s[44] ^= h;
              s[45] ^= l;
              h = c4 ^ ((c8 << 1) | (c9 >>> 31));
              l = c5 ^ ((c9 << 1) | (c8 >>> 31));
              s[6] ^= h;
              s[7] ^= l;
              s[16] ^= h;
              s[17] ^= l;
              s[26] ^= h;
              s[27] ^= l;
              s[36] ^= h;
              s[37] ^= l;
              s[46] ^= h;
              s[47] ^= l;
              h = c6 ^ ((c0 << 1) | (c1 >>> 31));
              l = c7 ^ ((c1 << 1) | (c0 >>> 31));
              s[8] ^= h;
              s[9] ^= l;
              s[18] ^= h;
              s[19] ^= l;
              s[28] ^= h;
              s[29] ^= l;
              s[38] ^= h;
              s[39] ^= l;
              s[48] ^= h;
              s[49] ^= l;

              b0 = s[0];
              b1 = s[1];
              b32 = (s[11] << 4) | (s[10] >>> 28);
              b33 = (s[10] << 4) | (s[11] >>> 28);
              b14 = (s[20] << 3) | (s[21] >>> 29);
              b15 = (s[21] << 3) | (s[20] >>> 29);
              b46 = (s[31] << 9) | (s[30] >>> 23);
              b47 = (s[30] << 9) | (s[31] >>> 23);
              b28 = (s[40] << 18) | (s[41] >>> 14);
              b29 = (s[41] << 18) | (s[40] >>> 14);
              b20 = (s[2] << 1) | (s[3] >>> 31);
              b21 = (s[3] << 1) | (s[2] >>> 31);
              b2 = (s[13] << 12) | (s[12] >>> 20);
              b3 = (s[12] << 12) | (s[13] >>> 20);
              b34 = (s[22] << 10) | (s[23] >>> 22);
              b35 = (s[23] << 10) | (s[22] >>> 22);
              b16 = (s[33] << 13) | (s[32] >>> 19);
              b17 = (s[32] << 13) | (s[33] >>> 19);
              b48 = (s[42] << 2) | (s[43] >>> 30);
              b49 = (s[43] << 2) | (s[42] >>> 30);
              b40 = (s[5] << 30) | (s[4] >>> 2);
              b41 = (s[4] << 30) | (s[5] >>> 2);
              b22 = (s[14] << 6) | (s[15] >>> 26);
              b23 = (s[15] << 6) | (s[14] >>> 26);
              b4 = (s[25] << 11) | (s[24] >>> 21);
              b5 = (s[24] << 11) | (s[25] >>> 21);
              b36 = (s[34] << 15) | (s[35] >>> 17);
              b37 = (s[35] << 15) | (s[34] >>> 17);
              b18 = (s[45] << 29) | (s[44] >>> 3);
              b19 = (s[44] << 29) | (s[45] >>> 3);
              b10 = (s[6] << 28) | (s[7] >>> 4);
              b11 = (s[7] << 28) | (s[6] >>> 4);
              b42 = (s[17] << 23) | (s[16] >>> 9);
              b43 = (s[16] << 23) | (s[17] >>> 9);
              b24 = (s[26] << 25) | (s[27] >>> 7);
              b25 = (s[27] << 25) | (s[26] >>> 7);
              b6 = (s[36] << 21) | (s[37] >>> 11);
              b7 = (s[37] << 21) | (s[36] >>> 11);
              b38 = (s[47] << 24) | (s[46] >>> 8);
              b39 = (s[46] << 24) | (s[47] >>> 8);
              b30 = (s[8] << 27) | (s[9] >>> 5);
              b31 = (s[9] << 27) | (s[8] >>> 5);
              b12 = (s[18] << 20) | (s[19] >>> 12);
              b13 = (s[19] << 20) | (s[18] >>> 12);
              b44 = (s[29] << 7) | (s[28] >>> 25);
              b45 = (s[28] << 7) | (s[29] >>> 25);
              b26 = (s[38] << 8) | (s[39] >>> 24);
              b27 = (s[39] << 8) | (s[38] >>> 24);
              b8 = (s[48] << 14) | (s[49] >>> 18);
              b9 = (s[49] << 14) | (s[48] >>> 18);

              s[0] = b0 ^ (~b2 & b4);
              s[1] = b1 ^ (~b3 & b5);
              s[10] = b10 ^ (~b12 & b14);
              s[11] = b11 ^ (~b13 & b15);
              s[20] = b20 ^ (~b22 & b24);
              s[21] = b21 ^ (~b23 & b25);
              s[30] = b30 ^ (~b32 & b34);
              s[31] = b31 ^ (~b33 & b35);
              s[40] = b40 ^ (~b42 & b44);
              s[41] = b41 ^ (~b43 & b45);
              s[2] = b2 ^ (~b4 & b6);
              s[3] = b3 ^ (~b5 & b7);
              s[12] = b12 ^ (~b14 & b16);
              s[13] = b13 ^ (~b15 & b17);
              s[22] = b22 ^ (~b24 & b26);
              s[23] = b23 ^ (~b25 & b27);
              s[32] = b32 ^ (~b34 & b36);
              s[33] = b33 ^ (~b35 & b37);
              s[42] = b42 ^ (~b44 & b46);
              s[43] = b43 ^ (~b45 & b47);
              s[4] = b4 ^ (~b6 & b8);
              s[5] = b5 ^ (~b7 & b9);
              s[14] = b14 ^ (~b16 & b18);
              s[15] = b15 ^ (~b17 & b19);
              s[24] = b24 ^ (~b26 & b28);
              s[25] = b25 ^ (~b27 & b29);
              s[34] = b34 ^ (~b36 & b38);
              s[35] = b35 ^ (~b37 & b39);
              s[44] = b44 ^ (~b46 & b48);
              s[45] = b45 ^ (~b47 & b49);
              s[6] = b6 ^ (~b8 & b0);
              s[7] = b7 ^ (~b9 & b1);
              s[16] = b16 ^ (~b18 & b10);
              s[17] = b17 ^ (~b19 & b11);
              s[26] = b26 ^ (~b28 & b20);
              s[27] = b27 ^ (~b29 & b21);
              s[36] = b36 ^ (~b38 & b30);
              s[37] = b37 ^ (~b39 & b31);
              s[46] = b46 ^ (~b48 & b40);
              s[47] = b47 ^ (~b49 & b41);
              s[8] = b8 ^ (~b0 & b2);
              s[9] = b9 ^ (~b1 & b3);
              s[18] = b18 ^ (~b10 & b12);
              s[19] = b19 ^ (~b11 & b13);
              s[28] = b28 ^ (~b20 & b22);
              s[29] = b29 ^ (~b21 & b23);
              s[38] = b38 ^ (~b30 & b32);
              s[39] = b39 ^ (~b31 & b33);
              s[48] = b48 ^ (~b40 & b42);
              s[49] = b49 ^ (~b41 & b43);

              s[0] ^= RC[n];
              s[1] ^= RC[n + 1];
            }
          };

          if (COMMON_JS) {
            module.exports = methods;
          } else {
            for (i = 0; i < methodNames.length; ++i) {
              root[methodNames[i]] = methods[methodNames[i]];
            }
            if (AMD) {
              !((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return methods;
              }.call(exports, __webpack_require__, exports, module)),
              __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }
          }
        })();

        /***/
      },

    /***/ "../node_modules/lossless-json/dist/lossless-json.js":
      /*!***********************************************************!*\
  !*** ../node_modules/lossless-json/dist/lossless-json.js ***!
  \***********************************************************/
      /***/ function (__unused_webpack_module, exports) {
        !(function (r, e) {
          true ? e(exports) : 0;
        })(this, function (r) {
          "use strict";
          var e = !0;
          function o(r) {
            return (
              r &&
                void 0 !== r.circularRefs &&
                null !== r.circularRefs &&
                (e = !0 === r.circularRefs),
              { circularRefs: e }
            );
          }
          function i(r) {
            return (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (r) {
                    return typeof r;
                  }
                : function (r) {
                    return r &&
                      "function" == typeof Symbol &&
                      r.constructor === Symbol &&
                      r !== Symbol.prototype
                      ? "symbol"
                      : typeof r;
                  })(r);
          }
          function f(r, e) {
            for (var n = 0; n < e.length; n++) {
              var t = e[n];
              (t.enumerable = t.enumerable || !1),
                (t.configurable = !0),
                "value" in t && (t.writable = !0),
                Object.defineProperty(r, t.key, t);
            }
          }
          var u = (function () {
            function e(r) {
              !(function (r, e) {
                if (!(r instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
                (this.value = (function r(e) {
                  {
                    if ("string" == typeof e) {
                      if (!l(e))
                        throw new Error('Invalid number (value: "' + e + '")');
                      return e;
                    }
                    if ("number" != typeof e) return r(e && e.valueOf());
                    if (15 < a(e + "").length)
                      throw new Error(
                        "Invalid number: contains more than 15 digits (value: " +
                          e +
                          ")"
                      );
                    if (isNaN(e)) throw new Error("Invalid number: NaN");
                    if (!isFinite(e))
                      throw new Error("Invalid number: Infinity");
                    return e + "";
                  }
                })(r)),
                (this.type = "LosslessNumber"),
                (this.isLosslessNumber = !0);
            }
            var r, n, t;
            return (
              (r = e),
              (n = [
                {
                  key: "valueOf",
                  value: function () {
                    var r = parseFloat(this.value),
                      e = a(this.value);
                    if (15 < e.length)
                      throw new Error(
                        "Cannot convert to number: number would be truncated (value: " +
                          this.value +
                          ")"
                      );
                    if (!isFinite(r))
                      throw new Error(
                        "Cannot convert to number: number would overflow (value: " +
                          this.value +
                          ")"
                      );
                    if (Math.abs(r) < Number.MIN_VALUE && !/^0*$/.test(e))
                      throw new Error(
                        "Cannot convert to number: number would underflow (value: " +
                          this.value +
                          ")"
                      );
                    return r;
                  },
                },
                {
                  key: "toString",
                  value: function () {
                    return this.value;
                  },
                },
              ]) && f(r.prototype, n),
              t && f(r, t),
              e
            );
          })();
          function a(r) {
            return ("string" != typeof r ? r + "" : r)
              .replace(/^-/, "")
              .replace(/e.*$/, "")
              .replace(/^0\.?0*|\./, "");
          }
          function l(r) {
            return /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(r);
          }
          function c(r, e, n, t) {
            return Array.isArray(n)
              ? t.call(
                  r,
                  e,
                  (function (r, e) {
                    for (var n = [], t = 0; t < r.length; t++)
                      n[t] = c(r, t + "", r[t], e);
                    return n;
                  })(n, t)
                )
              : n && "object" === i(n) && !n.isLosslessNumber
              ? t.call(
                  r,
                  e,
                  (function (r, e) {
                    var n,
                      t = {};
                    for (n in r)
                      r.hasOwnProperty(n) && (t[n] = c(r, n, r[n], e));
                    return t;
                  })(n, t)
                )
              : t.call(r, e, n);
          }
          function n(r) {
            return encodeURIComponent(
              r.replace(/\//g, "~1").replace(/~/g, "~0")
            );
          }
          function s(r) {
            return decodeURIComponent(r)
              .replace(/~1/g, "/")
              .replace(/~0/g, "~");
          }
          function h(r) {
            return "#/" + r.map(n).join("/");
          }
          var v = {
              NULL: 0,
              DELIMITER: 1,
              NUMBER: 2,
              STRING: 3,
              SYMBOL: 4,
              UNKNOWN: 5,
            },
            t = {
              "": !0,
              "{": !0,
              "}": !0,
              "[": !0,
              "]": !0,
              ":": !0,
              ",": !0,
            },
            p = {
              '"': '"',
              "\\": "\\",
              "/": "/",
              b: "\b",
              f: "\f",
              n: "\n",
              r: "\r",
              t: "\t",
            },
            d = "",
            y = 0,
            b = "",
            g = "",
            m = v.NULL,
            w = [],
            I = [];
          function E() {
            y++, (b = d.charAt(y));
          }
          function N() {
            for (
              m = v.NULL, g = "";
              " " === b || "\t" === b || "\n" === b || "\r" === b;

            )
              E();
            if (t[b]) return (m = v.DELIMITER), (g = b), void E();
            if (R(b) || "-" === b) {
              if (((m = v.NUMBER), "-" === b)) {
                if (((g += b), E(), !R(b)))
                  throw S("Invalid number, digit expected", y);
              } else "0" === b && ((g += b), E());
              for (; R(b); ) (g += b), E();
              if ("." === b) {
                if (((g += b), E(), !R(b)))
                  throw S("Invalid number, digit expected", y);
                for (; R(b); ) (g += b), E();
              }
              if ("e" === b || "E" === b) {
                if (
                  ((g += b),
                  E(),
                  ("+" !== b && "-" !== b) || ((g += b), E()),
                  !R(b))
                )
                  throw S("Invalid number, digit expected", y);
                for (; R(b); ) (g += b), E();
              }
            } else if ('"' !== b) {
              if (!L(b)) {
                for (m = v.UNKNOWN; "" !== b; ) (g += b), E();
                throw S('Syntax error in part "' + g + '"');
              }
              for (m = v.SYMBOL; L(b); ) (g += b), E();
            } else {
              for (m = v.STRING, E(); "" !== b && '"' !== b; )
                if ("\\" === b) {
                  E();
                  var r = p[b];
                  if (void 0 !== r) (g += r), E();
                  else {
                    if ("u" !== b)
                      throw S('Invalid escape character "\\' + b + '"', y);
                    E();
                    for (var e = "", n = 0; n < 4; n++) {
                      if (!/^[0-9a-fA-F]/.test(b))
                        throw S("Invalid unicode character");
                      (e += b), E();
                    }
                    g += String.fromCharCode(parseInt(e, 16));
                  }
                } else (g += b), E();
              if ('"' !== b) throw S("End of string expected");
              E();
            }
          }
          function L(r) {
            return /^[a-zA-Z_]/.test(r);
          }
          function R(r) {
            return "0" <= r && r <= "9";
          }
          function S(r, e) {
            void 0 === e && (e = y - g.length);
            r = new SyntaxError(r + " (char " + e + ")");
            return (r.char = e), r;
          }
          function O() {
            if (m !== v.DELIMITER || "{" !== g)
              return (function () {
                if (m !== v.DELIMITER || "[" !== g)
                  return (function () {
                    if (m !== v.STRING)
                      return (function () {
                        if (m !== v.NUMBER)
                          return (function () {
                            if (m !== v.SYMBOL)
                              return (function () {
                                throw S(
                                  "" === g
                                    ? "Unexpected end of json string"
                                    : "Value expected"
                                );
                              })();
                            if ("true" === g) return N(), !0;
                            if ("false" === g) return N(), !1;
                            if ("null" !== g)
                              throw S('Unknown symbol "' + g + '"');
                            return N(), null;
                          })();
                        var r = new u(g);
                        return N(), r;
                      })();
                    var r = g;
                    return N(), r;
                  })();
                N();
                var r = [];
                if (m === v.DELIMITER && "]" === g) return N(), r;
                var e = I.length;
                I[e] = r;
                for (
                  ;
                  (w[e] = r.length + ""),
                    r.push(O()),
                    m === v.DELIMITER && "," === g;

                )
                  N();
                if (m === v.DELIMITER && "]" === g)
                  return N(), (I.length = e), (w.length = e), r;
                throw S('Comma or end of array "]" expected');
              })();
            var r, e;
            N();
            var n = {};
            if (m === v.DELIMITER && "}" === g) return N(), n;
            var t = I.length;
            for (I[t] = n; ; ) {
              if (m !== v.STRING) throw S("Object key expected");
              if (((e = g), N(), m !== v.DELIMITER || ":" !== g))
                throw S("Colon expected");
              if ((N(), (n[(w[t] = e)] = O()), m !== v.DELIMITER || "," !== g))
                break;
              N();
            }
            if (m !== v.DELIMITER || "}" !== g)
              throw S('Comma or end of object "}" expected');
            return (
              N(),
              "string" == typeof (r = n).$ref && 1 === Object.keys(r).length
                ? (function (r) {
                    if (!o().circularRefs) return r;
                    for (
                      var e = (function (r) {
                          if ("#" !== (r = r.split("/").map(s)).shift())
                            throw SyntaxError(
                              "Cannot parse JSON Pointer: no valid URI fragment"
                            );
                          return "" === r[r.length - 1] && r.pop(), r;
                        })(r.$ref),
                        n = 0;
                      n < e.length;
                      n++
                    )
                      if (e[n] !== w[n])
                        throw new Error(
                          'Invalid circular reference "' + r.$ref + '"'
                        );
                    return I[e.length];
                  })(n)
                : ((I.length = t), (w.length = t), n)
            );
          }
          var M = [],
            x = [];
          function T(r, e, n) {
            (x = []), (M = []);
            var t,
              r = "function" == typeof e ? e.call({ "": r }, "", r) : r;
            return (
              "number" == typeof n
                ? 10 < n
                  ? (t = j(" ", 10))
                  : 1 <= n && (t = j(" ", n))
                : "string" == typeof n && "" !== n && (t = n),
              U(r, e, t, "")
            );
          }
          function U(r, e, n, t) {
            return "boolean" == typeof r ||
              r instanceof Boolean ||
              null === r ||
              "number" == typeof r ||
              r instanceof Number ||
              "string" == typeof r ||
              r instanceof String ||
              r instanceof Date
              ? JSON.stringify(r)
              : r && r.isLosslessNumber
              ? r.value
              : Array.isArray(r)
              ? (function (r, e, n, t) {
                  var o = n ? t + n : void 0,
                    i = n ? "[\n" : "[";
                  if (D(r)) return A(r, e, n, t);
                  var f = x.length;
                  x[f] = r;
                  for (var u = 0; u < r.length; u++) {
                    var a = u + "",
                      l = "function" == typeof e ? e.call(r, a, r[u]) : r[u];
                    n && (i += o),
                      void 0 !== l && "function" != typeof l
                        ? ((M[f] = a), (i += U(l, e, n, o)))
                        : (i += "null"),
                      u < r.length - 1 && (i += n ? ",\n" : ",");
                  }
                  return (
                    (x.length = f),
                    (M.length = f),
                    (i += n ? "\n" + t + "]" : "]")
                  );
                })(r, e, n, t)
              : r && "object" === i(r)
              ? C(r, e, n, t)
              : void 0;
          }
          function C(r, e, n, t) {
            var o = n ? t + n : void 0,
              i = !0,
              f = n ? "{\n" : "{";
            if ("function" == typeof r.toJSON) return T(r.toJSON(), e, n);
            if (D(r)) return A(r, e, n, t);
            var u,
              a,
              l,
              c,
              s,
              h = x.length;
            for (u in (x[h] = r))
              r.hasOwnProperty(u) &&
                ((a = "function" == typeof e ? e.call(r, u, r[u]) : r[u]),
                (l = u),
                (s = e),
                void 0 === (c = a) ||
                  "function" == typeof c ||
                  (Array.isArray(s) &&
                    !(function (r, e) {
                      for (var n = 0; n < r.length; n++)
                        if (r[n] == e) return !0;
                      return !1;
                    })(s, l)) ||
                  (i ? (i = !1) : (f += n ? ",\n" : ","),
                  (l = JSON.stringify(u)),
                  (f += n ? o + l + ": " : l + ":"),
                  (M[h] = u),
                  (f += U(a, e, n, o))));
            return (
              (x.length = h), (M.length = h), (f += n ? "\n" + t + "}" : "}")
            );
          }
          function D(r) {
            return -1 !== x.indexOf(r);
          }
          function A(r, e, n, t) {
            if (!o().circularRefs)
              throw new Error('Circular reference at "' + h(M) + '"');
            r = x.indexOf(r);
            return C({ $ref: h(M.slice(0, r)) }, e, n, t);
          }
          function j(r, e) {
            for (var n = ""; 0 < e--; ) n += r;
            return n;
          }
          (r.LosslessNumber = u),
            (r.config = o),
            (r.parse = function (r, e) {
              (y = 0),
                (b = (d = r).charAt(0)),
                (g = ""),
                (m = v.NULL),
                (I = []),
                (w = []),
                N();
              var n = O();
              if ("" !== g) throw S("Unexpected characters");
              return e ? c({ "": (r = n) }, "", r, e) : n;
            }),
            (r.stringify = T),
            Object.defineProperty(r, "__esModule", { value: !0 });
        });
        //# sourceMappingURL=lossless-json.js.map

        /***/
      },

    /***/ "../node_modules/regenerator-runtime/runtime.js":
      /*!******************************************************!*\
  !*** ../node_modules/regenerator-runtime/runtime.js ***!
  \******************************************************/
      /***/ (module) => {
        /**
         * Copyright (c) 2014-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        var runtime = (function (exports) {
          "use strict";

          var Op = Object.prototype;
          var hasOwn = Op.hasOwnProperty;
          var undefined; // More compressible than void 0.
          var $Symbol = typeof Symbol === "function" ? Symbol : {};
          var iteratorSymbol = $Symbol.iterator || "@@iterator";
          var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
          var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

          function define(obj, key, value) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
            return obj[key];
          }
          try {
            // IE 8 has a broken Object.defineProperty that only works on DOM objects.
            define({}, "");
          } catch (err) {
            define = function (obj, key, value) {
              return (obj[key] = value);
            };
          }

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator =
              outerFn && outerFn.prototype instanceof Generator
                ? outerFn
                : Generator;
            var generator = Object.create(protoGenerator.prototype);
            var context = new Context(tryLocsList || []);

            // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context);

            return generator;
          }
          exports.wrap = wrap;

          // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.
          function tryCatch(fn, obj, arg) {
            try {
              return { type: "normal", arg: fn.call(obj, arg) };
            } catch (err) {
              return { type: "throw", arg: err };
            }
          }

          var GenStateSuspendedStart = "suspendedStart";
          var GenStateSuspendedYield = "suspendedYield";
          var GenStateExecuting = "executing";
          var GenStateCompleted = "completed";

          // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.
          var ContinueSentinel = {};

          // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}

          // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.
          var IteratorPrototype = {};
          define(IteratorPrototype, iteratorSymbol, function () {
            return this;
          });

          var getProto = Object.getPrototypeOf;
          var NativeIteratorPrototype =
            getProto && getProto(getProto(values([])));
          if (
            NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
          ) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype;
          }

          var Gp =
            (GeneratorFunctionPrototype.prototype =
            Generator.prototype =
              Object.create(IteratorPrototype));
          GeneratorFunction.prototype = GeneratorFunctionPrototype;
          define(Gp, "constructor", GeneratorFunctionPrototype);
          define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
          GeneratorFunction.displayName = define(
            GeneratorFunctionPrototype,
            toStringTagSymbol,
            "GeneratorFunction"
          );

          // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.
          function defineIteratorMethods(prototype) {
            ["next", "throw", "return"].forEach(function (method) {
              define(prototype, method, function (arg) {
                return this._invoke(method, arg);
              });
            });
          }

          exports.isGeneratorFunction = function (genFun) {
            var ctor = typeof genFun === "function" && genFun.constructor;
            return ctor
              ? ctor === GeneratorFunction ||
                  // For the native GeneratorFunction constructor, the best we can
                  // do is to check its .name property.
                  (ctor.displayName || ctor.name) === "GeneratorFunction"
              : false;
          };

          exports.mark = function (genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype;
              define(genFun, toStringTagSymbol, "GeneratorFunction");
            }
            genFun.prototype = Object.create(Gp);
            return genFun;
          };

          // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.
          exports.awrap = function (arg) {
            return { __await: arg };
          };

          function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg);
              if (record.type === "throw") {
                reject(record.arg);
              } else {
                var result = record.arg;
                var value = result.value;
                if (
                  value &&
                  typeof value === "object" &&
                  hasOwn.call(value, "__await")
                ) {
                  return PromiseImpl.resolve(value.__await).then(
                    function (value) {
                      invoke("next", value, resolve, reject);
                    },
                    function (err) {
                      invoke("throw", err, resolve, reject);
                    }
                  );
                }

                return PromiseImpl.resolve(value).then(
                  function (unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                  },
                  function (error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                  }
                );
              }
            }

            var previousPromise;

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function (resolve, reject) {
                  invoke(method, arg, resolve, reject);
                });
              }

              return (previousPromise =
                // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise
                  ? previousPromise.then(
                      callInvokeWithMethodAndArg,
                      // Avoid propagating failures to Promises returned by later
                      // invocations of the iterator.
                      callInvokeWithMethodAndArg
                    )
                  : callInvokeWithMethodAndArg());
            }

            // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).
            this._invoke = enqueue;
          }

          defineIteratorMethods(AsyncIterator.prototype);
          define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
            return this;
          });
          exports.AsyncIterator = AsyncIterator;

          // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.
          exports.async = function (
            innerFn,
            outerFn,
            self,
            tryLocsList,
            PromiseImpl
          ) {
            if (PromiseImpl === void 0) PromiseImpl = Promise;

            var iter = new AsyncIterator(
              wrap(innerFn, outerFn, self, tryLocsList),
              PromiseImpl
            );

            return exports.isGeneratorFunction(outerFn)
              ? iter // If outerFn is a generator, return the full iterator.
              : iter.next().then(function (result) {
                  return result.done ? result.value : iter.next();
                });
          };

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart;

            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error("Generator is already running");
              }

              if (state === GenStateCompleted) {
                if (method === "throw") {
                  throw arg;
                }

                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
              }

              context.method = method;
              context.arg = arg;

              while (true) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }

                if (context.method === "next") {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg;
                } else if (context.method === "throw") {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted;
                    throw context.arg;
                  }

                  context.dispatchException(context.arg);
                } else if (context.method === "return") {
                  context.abrupt("return", context.arg);
                }

                state = GenStateExecuting;

                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done
                    ? GenStateCompleted
                    : GenStateSuspendedYield;

                  if (record.arg === ContinueSentinel) {
                    continue;
                  }

                  return {
                    value: record.arg,
                    done: context.done,
                  };
                } else if (record.type === "throw") {
                  state = GenStateCompleted;
                  // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.
                  context.method = "throw";
                  context.arg = record.arg;
                }
              }
            };
          }

          // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.
          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method];
            if (method === undefined) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null;

              if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = "return";
                  context.arg = undefined;
                  maybeInvokeDelegate(delegate, context);

                  if (context.method === "throw") {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                  }
                }

                context.method = "throw";
                context.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                );
              }

              return ContinueSentinel;
            }

            var record = tryCatch(method, delegate.iterator, context.arg);

            if (record.type === "throw") {
              context.method = "throw";
              context.arg = record.arg;
              context.delegate = null;
              return ContinueSentinel;
            }

            var info = record.arg;

            if (!info) {
              context.method = "throw";
              context.arg = new TypeError("iterator result is not an object");
              context.delegate = null;
              return ContinueSentinel;
            }

            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value;

              // Resume execution at the desired location (see delegateYield).
              context.next = delegate.nextLoc;

              // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.
              if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info;
            }

            // The delegate iterator is finished, so forget it and continue with
            // the outer generator.
            context.delegate = null;
            return ContinueSentinel;
          }

          // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.
          defineIteratorMethods(Gp);

          define(Gp, toStringTagSymbol, "Generator");

          // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.
          define(Gp, iteratorSymbol, function () {
            return this;
          });

          define(Gp, "toString", function () {
            return "[object Generator]";
          });

          function pushTryEntry(locs) {
            var entry = { tryLoc: locs[0] };

            if (1 in locs) {
              entry.catchLoc = locs[1];
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2];
              entry.afterLoc = locs[3];
            }

            this.tryEntries.push(entry);
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal";
            delete record.arg;
            entry.completion = record;
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{ tryLoc: "root" }];
            tryLocsList.forEach(pushTryEntry, this);
            this.reset(true);
          }

          exports.keys = function (object) {
            var keys = [];
            for (var key in object) {
              keys.push(key);
            }
            keys.reverse();

            // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
              while (keys.length) {
                var key = keys.pop();
                if (key in object) {
                  next.value = key;
                  next.done = false;
                  return next;
                }
              }

              // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.
              next.done = true;
              return next;
            };
          };

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol];
              if (iteratorMethod) {
                return iteratorMethod.call(iterable);
              }

              if (typeof iterable.next === "function") {
                return iterable;
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                  next = function next() {
                    while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                      }
                    }

                    next.value = undefined;
                    next.done = true;

                    return next;
                  };

                return (next.next = next);
              }
            }

            // Return an iterator with no values.
            return { next: doneResult };
          }
          exports.values = values;

          function doneResult() {
            return { value: undefined, done: true };
          }

          Context.prototype = {
            constructor: Context,

            reset: function (skipTempReset) {
              this.prev = 0;
              this.next = 0;
              // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.
              this.sent = this._sent = undefined;
              this.done = false;
              this.delegate = null;

              this.method = "next";
              this.arg = undefined;

              this.tryEntries.forEach(resetTryEntry);

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (
                    name.charAt(0) === "t" &&
                    hasOwn.call(this, name) &&
                    !isNaN(+name.slice(1))
                  ) {
                    this[name] = undefined;
                  }
                }
              }
            },

            stop: function () {
              this.done = true;

              var rootEntry = this.tryEntries[0];
              var rootRecord = rootEntry.completion;
              if (rootRecord.type === "throw") {
                throw rootRecord.arg;
              }

              return this.rval;
            },

            dispatchException: function (exception) {
              if (this.done) {
                throw exception;
              }

              var context = this;
              function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;

                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = "next";
                  context.arg = undefined;
                }

                return !!caught;
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                var record = entry.completion;

                if (entry.tryLoc === "root") {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle("end");
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, "catchLoc");
                  var hasFinally = hasOwn.call(entry, "finallyLoc");

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true);
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc);
                    }
                  } else {
                    throw new Error("try statement without catch or finally");
                  }
                }
              }
            },

            abrupt: function (type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (
                  entry.tryLoc <= this.prev &&
                  hasOwn.call(entry, "finallyLoc") &&
                  this.prev < entry.finallyLoc
                ) {
                  var finallyEntry = entry;
                  break;
                }
              }

              if (
                finallyEntry &&
                (type === "break" || type === "continue") &&
                finallyEntry.tryLoc <= arg &&
                arg <= finallyEntry.finallyLoc
              ) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null;
              }

              var record = finallyEntry ? finallyEntry.completion : {};
              record.type = type;
              record.arg = arg;

              if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
              }

              return this.complete(record);
            },

            complete: function (record, afterLoc) {
              if (record.type === "throw") {
                throw record.arg;
              }

              if (record.type === "break" || record.type === "continue") {
                this.next = record.arg;
              } else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
              } else if (record.type === "normal" && afterLoc) {
                this.next = afterLoc;
              }

              return ContinueSentinel;
            },

            finish: function (finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc);
                  resetTryEntry(entry);
                  return ContinueSentinel;
                }
              }
            },

            catch: function (tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion;
                  if (record.type === "throw") {
                    var thrown = record.arg;
                    resetTryEntry(entry);
                  }
                  return thrown;
                }
              }

              // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.
              throw new Error("illegal catch attempt");
            },

            delegateYield: function (iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
              };

              if (this.method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined;
              }

              return ContinueSentinel;
            },
          };

          // Regardless of whether this script is executing as a CommonJS module
          // or not, return the runtime object so that we can declare the variable
          // regeneratorRuntime in the outer scope, which allows this module to be
          // injected easily by `bin/regenerator --include-runtime script.js`.
          return exports;
        })(
          // If this script is executing as a CommonJS module, use module.exports
          // as the regeneratorRuntime namespace. Otherwise create a new empty
          // object. Either way, the resulting object will be used to initialize
          // the regeneratorRuntime variable at the top of this file.
          true ? module.exports : 0
        );

        try {
          regeneratorRuntime = runtime;
        } catch (accidentalStrictMode) {
          // This module should not be running in strict mode, so the above
          // assignment should always work unless something is misconfigured. Just
          // in case runtime.js accidentally runs in strict mode, in modern engines
          // we can explicitly access globalThis. In older engines we can escape
          // strict mode using a global Function call. This could conceivably fail
          // if a Content Security Policy forbids using Function, but in that case
          // the proper solution is to fix the accidental strict mode problem. If
          // you've misconfigured your bundler to force strict mode and applied a
          // CSP to forbid Function, and you're not willing to fix either of those
          // problems, please detail your unique predicament in a GitHub issue.
          if (typeof globalThis === "object") {
            globalThis.regeneratorRuntime = runtime;
          } else {
            Function("r", "regeneratorRuntime = r")(runtime);
          }
        }

        /***/
      },

    /***/ "../node_modules/rpc-websockets/dist/index.browser.js":
      /*!************************************************************!*\
  !*** ../node_modules/rpc-websockets/dist/index.browser.js ***!
  \************************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";

        var _interopRequireDefault = __webpack_require__(
          /*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js"
        );

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports.Client = void 0;

        var _createClass2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"
          )
        );

        var _classCallCheck2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"
          )
        );

        var _inherits2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"
          )
        );

        var _possibleConstructorReturn2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"
          )
        );

        var _getPrototypeOf2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"
          )
        );

        var _websocket = _interopRequireDefault(
          __webpack_require__(
            /*! ./lib/client/websocket.browser */ "../node_modules/rpc-websockets/dist/lib/client/websocket.browser.js"
          )
        );

        var _client = _interopRequireDefault(
          __webpack_require__(
            /*! ./lib/client */ "../node_modules/rpc-websockets/dist/lib/client.js"
          )
        );

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();
          return function _createSuperInternal() {
            var Super = (0, _getPrototypeOf2["default"])(Derived),
              result;
            if (hasNativeReflectConstruct) {
              var NewTarget = (0, _getPrototypeOf2["default"])(
                this
              ).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return (0, _possibleConstructorReturn2["default"])(this, result);
          };
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct)
            return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;
          try {
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
            return true;
          } catch (e) {
            return false;
          }
        }

        var Client = /*#__PURE__*/ (function (_CommonClient) {
          (0, _inherits2["default"])(Client, _CommonClient);

          var _super = _createSuper(Client);

          function Client() {
            var address =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "ws://localhost:8080";

            var _ref =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : {},
              _ref$autoconnect = _ref.autoconnect,
              autoconnect =
                _ref$autoconnect === void 0 ? true : _ref$autoconnect,
              _ref$reconnect = _ref.reconnect,
              reconnect = _ref$reconnect === void 0 ? true : _ref$reconnect,
              _ref$reconnect_interv = _ref.reconnect_interval,
              reconnect_interval =
                _ref$reconnect_interv === void 0 ? 1000 : _ref$reconnect_interv,
              _ref$max_reconnects = _ref.max_reconnects,
              max_reconnects =
                _ref$max_reconnects === void 0 ? 5 : _ref$max_reconnects;

            var generate_request_id =
              arguments.length > 2 ? arguments[2] : undefined;
            (0, _classCallCheck2["default"])(this, Client);
            return _super.call(
              this,
              _websocket["default"],
              address,
              {
                autoconnect: autoconnect,
                reconnect: reconnect,
                reconnect_interval: reconnect_interval,
                max_reconnects: max_reconnects,
              },
              generate_request_id
            );
          }

          return (0, _createClass2["default"])(Client);
        })(_client["default"]);

        exports.Client = Client;

        /***/
      },

    /***/ "../node_modules/rpc-websockets/dist/lib/client.js":
      /*!*********************************************************!*\
  !*** ../node_modules/rpc-websockets/dist/lib/client.js ***!
  \*********************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        /* provided dependency */ var Buffer = __webpack_require__(
          /*! buffer */ "../node_modules/buffer/index.js"
        )["Buffer"];
        /**
         * "Client" wraps "ws" or a browser-implemented "WebSocket" library
         * according to the environment providing JSON RPC 2.0 support on top.
         * @module Client
         */

        var _interopRequireDefault = __webpack_require__(
          /*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js"
        );

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports["default"] = void 0;

        var _regenerator = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js"
          )
        );

        var _asyncToGenerator2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/asyncToGenerator.js"
          )
        );

        var _typeof2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/typeof */ "../node_modules/@babel/runtime/helpers/typeof.js"
          )
        );

        var _classCallCheck2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"
          )
        );

        var _createClass2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"
          )
        );

        var _inherits2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"
          )
        );

        var _possibleConstructorReturn2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"
          )
        );

        var _getPrototypeOf2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"
          )
        );

        var _eventemitter = __webpack_require__(
          /*! eventemitter3 */ "../node_modules/eventemitter3/index.js"
        );

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();
          return function _createSuperInternal() {
            var Super = (0, _getPrototypeOf2["default"])(Derived),
              result;
            if (hasNativeReflectConstruct) {
              var NewTarget = (0, _getPrototypeOf2["default"])(
                this
              ).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return (0, _possibleConstructorReturn2["default"])(this, result);
          };
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct)
            return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;
          try {
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
            return true;
          } catch (e) {
            return false;
          }
        }

        var __rest =
          (void 0 && (void 0).__rest) ||
          function (s, e) {
            var t = {};

            for (var p in s) {
              if (
                Object.prototype.hasOwnProperty.call(s, p) &&
                e.indexOf(p) < 0
              )
                t[p] = s[p];
            }

            if (s != null && typeof Object.getOwnPropertySymbols === "function")
              for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
              ) {
                if (
                  e.indexOf(p[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                  t[p[i]] = s[p[i]];
              }
            return t;
          }; // @ts-ignore

        var CommonClient = /*#__PURE__*/ (function (_EventEmitter) {
          (0, _inherits2["default"])(CommonClient, _EventEmitter);

          var _super = _createSuper(CommonClient);

          /**
           * Instantiate a Client class.
           * @constructor
           * @param {webSocketFactory} webSocketFactory - factory method for WebSocket
           * @param {String} address - url to a websocket server
           * @param {Object} options - ws options object with reconnect parameters
           * @param {Function} generate_request_id - custom generation request Id
           * @return {CommonClient}
           */
          function CommonClient(webSocketFactory) {
            var _this;

            var address =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : "ws://localhost:8080";

            var _a =
              arguments.length > 2 && arguments[2] !== undefined
                ? arguments[2]
                : {};

            var generate_request_id =
              arguments.length > 3 ? arguments[3] : undefined;
            (0, _classCallCheck2["default"])(this, CommonClient);

            var _a$autoconnect = _a.autoconnect,
              autoconnect = _a$autoconnect === void 0 ? true : _a$autoconnect,
              _a$reconnect = _a.reconnect,
              reconnect = _a$reconnect === void 0 ? true : _a$reconnect,
              _a$reconnect_interval = _a.reconnect_interval,
              reconnect_interval =
                _a$reconnect_interval === void 0 ? 1000 : _a$reconnect_interval,
              _a$max_reconnects = _a.max_reconnects,
              max_reconnects =
                _a$max_reconnects === void 0 ? 5 : _a$max_reconnects,
              rest_options = __rest(_a, [
                "autoconnect",
                "reconnect",
                "reconnect_interval",
                "max_reconnects",
              ]);

            _this = _super.call(this);
            _this.webSocketFactory = webSocketFactory;
            _this.queue = {};
            _this.rpc_id = 0;
            _this.address = address;
            _this.autoconnect = autoconnect;
            _this.ready = false;
            _this.reconnect = reconnect;
            _this.reconnect_interval = reconnect_interval;
            _this.max_reconnects = max_reconnects;
            _this.rest_options = rest_options;
            _this.current_reconnects = 0;

            _this.generate_request_id =
              generate_request_id ||
              function () {
                return ++_this.rpc_id;
              };

            if (_this.autoconnect)
              _this._connect(
                _this.address,
                Object.assign(
                  {
                    autoconnect: _this.autoconnect,
                    reconnect: _this.reconnect,
                    reconnect_interval: _this.reconnect_interval,
                    max_reconnects: _this.max_reconnects,
                  },
                  _this.rest_options
                )
              );
            return _this;
          }
          /**
           * Connects to a defined server if not connected already.
           * @method
           * @return {Undefined}
           */

          (0, _createClass2["default"])(CommonClient, [
            {
              key: "connect",
              value: function connect() {
                if (this.socket) return;

                this._connect(
                  this.address,
                  Object.assign(
                    {
                      autoconnect: this.autoconnect,
                      reconnect: this.reconnect,
                      reconnect_interval: this.reconnect_interval,
                      max_reconnects: this.max_reconnects,
                    },
                    this.rest_options
                  )
                );
              },
              /**
               * Calls a registered RPC method on server.
               * @method
               * @param {String} method - RPC method name
               * @param {Object|Array} params - optional method parameters
               * @param {Number} timeout - RPC reply timeout value
               * @param {Object} ws_opts - options passed to ws
               * @return {Promise}
               */
            },
            {
              key: "call",
              value: function call(method, params, timeout, ws_opts) {
                var _this2 = this;

                if (
                  !ws_opts &&
                  "object" === (0, _typeof2["default"])(timeout)
                ) {
                  ws_opts = timeout;
                  timeout = null;
                }

                return new Promise(function (resolve, reject) {
                  if (!_this2.ready)
                    return reject(new Error("socket not ready"));

                  var rpc_id = _this2.generate_request_id(method, params);

                  var message = {
                    jsonrpc: "2.0",
                    method: method,
                    params: params || null,
                    id: rpc_id,
                  };

                  _this2.socket.send(
                    JSON.stringify(message),
                    ws_opts,
                    function (error) {
                      if (error) return reject(error);
                      _this2.queue[rpc_id] = {
                        promise: [resolve, reject],
                      };

                      if (timeout) {
                        _this2.queue[rpc_id].timeout = setTimeout(function () {
                          delete _this2.queue[rpc_id];
                          reject(new Error("reply timeout"));
                        }, timeout);
                      }
                    }
                  );
                });
              },
              /**
               * Logins with the other side of the connection.
               * @method
               * @param {Object} params - Login credentials object
               * @return {Promise}
               */
            },
            {
              key: "login",
              value: (function () {
                var _login = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/ _regenerator["default"].mark(function _callee(
                    params
                  ) {
                    var resp;
                    return _regenerator["default"].wrap(
                      function _callee$(_context) {
                        while (1) {
                          switch ((_context.prev = _context.next)) {
                            case 0:
                              _context.next = 2;
                              return this.call("rpc.login", params);

                            case 2:
                              resp = _context.sent;

                              if (resp) {
                                _context.next = 5;
                                break;
                              }

                              throw new Error("authentication failed");

                            case 5:
                              return _context.abrupt("return", resp);

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      },
                      _callee,
                      this
                    );
                  })
                );

                function login(_x) {
                  return _login.apply(this, arguments);
                }

                return login;
              })(),
              /**
               * Fetches a list of client's methods registered on server.
               * @method
               * @return {Array}
               */
            },
            {
              key: "listMethods",
              value: (function () {
                var _listMethods = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/ _regenerator["default"].mark(
                    function _callee2() {
                      return _regenerator["default"].wrap(
                        function _callee2$(_context2) {
                          while (1) {
                            switch ((_context2.prev = _context2.next)) {
                              case 0:
                                _context2.next = 2;
                                return this.call("__listMethods");

                              case 2:
                                return _context2.abrupt(
                                  "return",
                                  _context2.sent
                                );

                              case 3:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        },
                        _callee2,
                        this
                      );
                    }
                  )
                );

                function listMethods() {
                  return _listMethods.apply(this, arguments);
                }

                return listMethods;
              })(),
              /**
               * Sends a JSON-RPC 2.0 notification to server.
               * @method
               * @param {String} method - RPC method name
               * @param {Object} params - optional method parameters
               * @return {Promise}
               */
            },
            {
              key: "notify",
              value: function notify(method, params) {
                var _this3 = this;

                return new Promise(function (resolve, reject) {
                  if (!_this3.ready)
                    return reject(new Error("socket not ready"));
                  var message = {
                    jsonrpc: "2.0",
                    method: method,
                    params: params || null,
                  };

                  _this3.socket.send(JSON.stringify(message), function (error) {
                    if (error) return reject(error);
                    resolve();
                  });
                });
              },
              /**
               * Subscribes for a defined event.
               * @method
               * @param {String|Array} event - event name
               * @return {Undefined}
               * @throws {Error}
               */
            },
            {
              key: "subscribe",
              value: (function () {
                var _subscribe = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/ _regenerator["default"].mark(function _callee3(
                    event
                  ) {
                    var result;
                    return _regenerator["default"].wrap(
                      function _callee3$(_context3) {
                        while (1) {
                          switch ((_context3.prev = _context3.next)) {
                            case 0:
                              if (typeof event === "string") event = [event];
                              _context3.next = 3;
                              return this.call("rpc.on", event);

                            case 3:
                              result = _context3.sent;

                              if (
                                !(
                                  typeof event === "string" &&
                                  result[event] !== "ok"
                                )
                              ) {
                                _context3.next = 6;
                                break;
                              }

                              throw new Error(
                                "Failed subscribing to an event '" +
                                  event +
                                  "' with: " +
                                  result[event]
                              );

                            case 6:
                              return _context3.abrupt("return", result);

                            case 7:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      },
                      _callee3,
                      this
                    );
                  })
                );

                function subscribe(_x2) {
                  return _subscribe.apply(this, arguments);
                }

                return subscribe;
              })(),
              /**
               * Unsubscribes from a defined event.
               * @method
               * @param {String|Array} event - event name
               * @return {Undefined}
               * @throws {Error}
               */
            },
            {
              key: "unsubscribe",
              value: (function () {
                var _unsubscribe = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/ _regenerator["default"].mark(function _callee4(
                    event
                  ) {
                    var result;
                    return _regenerator["default"].wrap(
                      function _callee4$(_context4) {
                        while (1) {
                          switch ((_context4.prev = _context4.next)) {
                            case 0:
                              if (typeof event === "string") event = [event];
                              _context4.next = 3;
                              return this.call("rpc.off", event);

                            case 3:
                              result = _context4.sent;

                              if (
                                !(
                                  typeof event === "string" &&
                                  result[event] !== "ok"
                                )
                              ) {
                                _context4.next = 6;
                                break;
                              }

                              throw new Error(
                                "Failed unsubscribing from an event with: " +
                                  result
                              );

                            case 6:
                              return _context4.abrupt("return", result);

                            case 7:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      },
                      _callee4,
                      this
                    );
                  })
                );

                function unsubscribe(_x3) {
                  return _unsubscribe.apply(this, arguments);
                }

                return unsubscribe;
              })(),
              /**
               * Closes a WebSocket connection gracefully.
               * @method
               * @param {Number} code - socket close code
               * @param {String} data - optional data to be sent before closing
               * @return {Undefined}
               */
            },
            {
              key: "close",
              value: function close(code, data) {
                this.socket.close(code || 1000, data);
              },
              /**
               * Connection/Message handler.
               * @method
               * @private
               * @param {String} address - WebSocket API address
               * @param {Object} options - ws options object
               * @return {Undefined}
               */
            },
            {
              key: "_connect",
              value: function _connect(address, options) {
                var _this4 = this;

                this.socket = this.webSocketFactory(address, options);
                this.socket.addEventListener("open", function () {
                  _this4.ready = true;

                  _this4.emit("open");

                  _this4.current_reconnects = 0;
                });
                this.socket.addEventListener("message", function (_ref) {
                  var message = _ref.data;
                  if (message instanceof ArrayBuffer)
                    message = Buffer.from(message).toString();

                  try {
                    message = JSON.parse(message);
                  } catch (error) {
                    return;
                  } // check if any listeners are attached and forward event

                  if (
                    message.notification &&
                    _this4.listeners(message.notification).length
                  ) {
                    if (!Object.keys(message.params).length)
                      return _this4.emit(message.notification);
                    var args = [message.notification];
                    if (message.params.constructor === Object)
                      args.push(message.params);
                    // using for-loop instead of unshift/spread because performance is better
                    else
                      for (var i = 0; i < message.params.length; i++) {
                        args.push(message.params[i]);
                      } // run as microtask so that pending queue messages are resolved first
                    // eslint-disable-next-line prefer-spread

                    return Promise.resolve().then(function () {
                      _this4.emit.apply(_this4, args);
                    });
                  }

                  if (!_this4.queue[message.id]) {
                    // general JSON RPC 2.0 events
                    if (message.method && message.params) {
                      // run as microtask so that pending queue messages are resolved first
                      return Promise.resolve().then(function () {
                        _this4.emit(message.method, message.params);
                      });
                    }

                    return;
                  } // reject early since server's response is invalid

                  if ("error" in message === "result" in message)
                    _this4.queue[message.id].promise[1](
                      new Error(
                        'Server response malformed. Response must include either "result"' +
                          ' or "error", but not both.'
                      )
                    );
                  if (_this4.queue[message.id].timeout)
                    clearTimeout(_this4.queue[message.id].timeout);
                  if (message.error)
                    _this4.queue[message.id].promise[1](message.error);
                  else _this4.queue[message.id].promise[0](message.result);
                  delete _this4.queue[message.id];
                });
                this.socket.addEventListener("error", function (error) {
                  return _this4.emit("error", error);
                });
                this.socket.addEventListener("close", function (_ref2) {
                  var code = _ref2.code,
                    reason = _ref2.reason;
                  if (_this4.ready)
                    // Delay close event until internal state is updated
                    setTimeout(function () {
                      return _this4.emit("close", code, reason);
                    }, 0);
                  _this4.ready = false;
                  _this4.socket = undefined;
                  if (code === 1000) return;
                  _this4.current_reconnects++;
                  if (
                    _this4.reconnect &&
                    (_this4.max_reconnects > _this4.current_reconnects ||
                      _this4.max_reconnects === 0)
                  )
                    setTimeout(function () {
                      return _this4._connect(address, options);
                    }, _this4.reconnect_interval);
                });
              },
            },
          ]);
          return CommonClient;
        })(_eventemitter.EventEmitter);

        exports["default"] = CommonClient;

        /***/
      },

    /***/ "../node_modules/rpc-websockets/dist/lib/client/websocket.browser.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rpc-websockets/dist/lib/client/websocket.browser.js ***!
  \***************************************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        /**
         * WebSocket implements a browser-side WebSocket specification.
         * @module Client
         */

        var _interopRequireDefault = __webpack_require__(
          /*! @babel/runtime/helpers/interopRequireDefault */ "../node_modules/@babel/runtime/helpers/interopRequireDefault.js"
        );

        Object.defineProperty(exports, "__esModule", {
          value: true,
        });
        exports["default"] = _default;

        var _classCallCheck2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/classCallCheck */ "../node_modules/@babel/runtime/helpers/classCallCheck.js"
          )
        );

        var _createClass2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/createClass */ "../node_modules/@babel/runtime/helpers/createClass.js"
          )
        );

        var _inherits2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/inherits */ "../node_modules/@babel/runtime/helpers/inherits.js"
          )
        );

        var _possibleConstructorReturn2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/possibleConstructorReturn */ "../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"
          )
        );

        var _getPrototypeOf2 = _interopRequireDefault(
          __webpack_require__(
            /*! @babel/runtime/helpers/getPrototypeOf */ "../node_modules/@babel/runtime/helpers/getPrototypeOf.js"
          )
        );

        var _eventemitter = __webpack_require__(
          /*! eventemitter3 */ "../node_modules/eventemitter3/index.js"
        );

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();
          return function _createSuperInternal() {
            var Super = (0, _getPrototypeOf2["default"])(Derived),
              result;
            if (hasNativeReflectConstruct) {
              var NewTarget = (0, _getPrototypeOf2["default"])(
                this
              ).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return (0, _possibleConstructorReturn2["default"])(this, result);
          };
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct)
            return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;
          try {
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
            return true;
          } catch (e) {
            return false;
          }
        }

        var WebSocketBrowserImpl = /*#__PURE__*/ (function (_EventEmitter) {
          (0, _inherits2["default"])(WebSocketBrowserImpl, _EventEmitter);

          var _super = _createSuper(WebSocketBrowserImpl);

          /** Instantiate a WebSocket class
           * @constructor
           * @param {String} address - url to a websocket server
           * @param {(Object)} options - websocket options
           * @param {(String|Array)} protocols - a list of protocols
           * @return {WebSocketBrowserImpl} - returns a WebSocket instance
           */
          function WebSocketBrowserImpl(address, options, protocols) {
            var _this;

            (0, _classCallCheck2["default"])(this, WebSocketBrowserImpl);
            _this = _super.call(this);
            _this.socket = new window.WebSocket(address, protocols);

            _this.socket.onopen = function () {
              return _this.emit("open");
            };

            _this.socket.onmessage = function (event) {
              return _this.emit("message", event.data);
            };

            _this.socket.onerror = function (error) {
              return _this.emit("error", error);
            };

            _this.socket.onclose = function (event) {
              _this.emit("close", event.code, event.reason);
            };

            return _this;
          }
          /**
           * Sends data through a websocket connection
           * @method
           * @param {(String|Object)} data - data to be sent via websocket
           * @param {Object} optionsOrCallback - ws options
           * @param {Function} callback - a callback called once the data is sent
           * @return {Undefined}
           */

          (0, _createClass2["default"])(WebSocketBrowserImpl, [
            {
              key: "send",
              value: function send(data, optionsOrCallback, callback) {
                var cb = callback || optionsOrCallback;

                try {
                  this.socket.send(data);
                  cb();
                } catch (error) {
                  cb(error);
                }
              },
              /**
               * Closes an underlying socket
               * @method
               * @param {Number} code - status code explaining why the connection is being closed
               * @param {String} reason - a description why the connection is closing
               * @return {Undefined}
               * @throws {Error}
               */
            },
            {
              key: "close",
              value: function close(code, reason) {
                this.socket.close(code, reason);
              },
            },
            {
              key: "addEventListener",
              value: function addEventListener(type, listener, options) {
                this.socket.addEventListener(type, listener, options);
              },
            },
          ]);
          return WebSocketBrowserImpl;
        })(_eventemitter.EventEmitter);
        /**
         * factory method for common WebSocket instance
         * @method
         * @param {String} address - url to a websocket server
         * @param {(Object)} options - websocket options
         * @return {Undefined}
         */

        function _default(address, options) {
          return new WebSocketBrowserImpl(address, options);
        }

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":
      /*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ COMPLETE_NOTIFICATION: () =>
            /* binding */ COMPLETE_NOTIFICATION,
          /* harmony export */ createNotification: () =>
            /* binding */ createNotification,
          /* harmony export */ errorNotification: () =>
            /* binding */ errorNotification,
          /* harmony export */ nextNotification: () =>
            /* binding */ nextNotification,
          /* harmony export */
        });
        var COMPLETE_NOTIFICATION = (function () {
          return createNotification("C", undefined, undefined);
        })();
        function errorNotification(error) {
          return createNotification("E", undefined, error);
        }
        function nextNotification(value) {
          return createNotification("N", value, undefined);
        }
        function createNotification(kind, value, error) {
          return {
            kind: kind,
            value: value,
            error: error,
          };
        }
        //# sourceMappingURL=NotificationFactories.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Observable.js":
      /*!*************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Observable.js ***!
  \*************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Observable: () => /* binding */ Observable,
          /* harmony export */
        });
        /* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js"
          );
        /* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js"
          );
        /* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js"
          );
        /* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./util/pipe */ "../node_modules/rxjs/dist/esm5/internal/util/pipe.js"
          );
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"
          );

        var Observable = (function () {
          function Observable(subscribe) {
            if (subscribe) {
              this._subscribe = subscribe;
            }
          }
          Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
          };
          Observable.prototype.subscribe = function (
            observerOrNext,
            error,
            complete
          ) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext)
              ? observerOrNext
              : new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber(
                  observerOrNext,
                  error,
                  complete
                );
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_1__.errorContext)(
              function () {
                var _a = _this,
                  operator = _a.operator,
                  source = _a.source;
                subscriber.add(
                  operator
                    ? operator.call(subscriber, source)
                    : source
                    ? _this._subscribe(subscriber)
                    : _this._trySubscribe(subscriber)
                );
              }
            );
            return subscriber;
          };
          Observable.prototype._trySubscribe = function (sink) {
            try {
              return this._subscribe(sink);
            } catch (err) {
              sink.error(err);
            }
          };
          Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
              var subscriber =
                new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
                  next: function (value) {
                    try {
                      next(value);
                    } catch (err) {
                      reject(err);
                      subscriber.unsubscribe();
                    }
                  },
                  error: reject,
                  complete: resolve,
                });
              _this.subscribe(subscriber);
            });
          };
          Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0
              ? void 0
              : _a.subscribe(subscriber);
          };
          Observable.prototype[
            _symbol_observable__WEBPACK_IMPORTED_MODULE_2__.observable
          ] = function () {
            return this;
          };
          Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
            }
            return (0, _util_pipe__WEBPACK_IMPORTED_MODULE_3__.pipeFromArray)(
              operations
            )(this);
          };
          Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(
                function (x) {
                  return (value = x);
                },
                function (err) {
                  return reject(err);
                },
                function () {
                  return resolve(value);
                }
              );
            });
          };
          Observable.create = function (subscribe) {
            return new Observable(subscribe);
          };
          return Observable;
        })();

        function getPromiseCtor(promiseCtor) {
          var _a;
          return (_a =
            promiseCtor !== null && promiseCtor !== void 0
              ? promiseCtor
              : _config__WEBPACK_IMPORTED_MODULE_4__.config.Promise) !== null &&
            _a !== void 0
            ? _a
            : Promise;
        }
        function isObserver(value) {
          return (
            value &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(
              value.next
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(
              value.error
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_5__.isFunction)(
              value.complete
            )
          );
        }
        function isSubscriber(value) {
          return (
            (value &&
              value instanceof
                _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) ||
            (isObserver(value) &&
              (0, _Subscription__WEBPACK_IMPORTED_MODULE_6__.isSubscription)(
                value
              ))
          );
        }
        //# sourceMappingURL=Observable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js":
      /*!*************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subscriber.js ***!
  \*************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EMPTY_OBSERVER: () =>
            /* binding */ EMPTY_OBSERVER,
          /* harmony export */ SafeSubscriber: () =>
            /* binding */ SafeSubscriber,
          /* harmony export */ Subscriber: () => /* binding */ Subscriber,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./Subscription */ "../node_modules/rxjs/dist/esm5/internal/Subscription.js"
          );
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );
        /* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./util/reportUnhandledError */ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js"
          );
        /* harmony import */ var _util_noop__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./util/noop */ "../node_modules/rxjs/dist/esm5/internal/util/noop.js"
          );
        /* harmony import */ var _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./NotificationFactories */ "../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js"
          );
        /* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./scheduler/timeoutProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js"
          );
        /* harmony import */ var _util_errorContext__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./util/errorContext */ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"
          );

        var Subscriber = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Subscriber, _super);
          function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
              _this.destination = destination;
              if (
                (0, _Subscription__WEBPACK_IMPORTED_MODULE_1__.isSubscription)(
                  destination
                )
              ) {
                destination.add(_this);
              }
            } else {
              _this.destination = EMPTY_OBSERVER;
            }
            return _this;
          }
          Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
          };
          Subscriber.prototype.next = function (value) {
            if (this.isStopped) {
              handleStoppedNotification(
                (0,
                _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.nextNotification)(
                  value
                ),
                this
              );
            } else {
              this._next(value);
            }
          };
          Subscriber.prototype.error = function (err) {
            if (this.isStopped) {
              handleStoppedNotification(
                (0,
                _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.errorNotification)(
                  err
                ),
                this
              );
            } else {
              this.isStopped = true;
              this._error(err);
            }
          };
          Subscriber.prototype.complete = function () {
            if (this.isStopped) {
              handleStoppedNotification(
                _NotificationFactories__WEBPACK_IMPORTED_MODULE_2__.COMPLETE_NOTIFICATION,
                this
              );
            } else {
              this.isStopped = true;
              this._complete();
            }
          };
          Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
              this.isStopped = true;
              _super.prototype.unsubscribe.call(this);
              this.destination = null;
            }
          };
          Subscriber.prototype._next = function (value) {
            this.destination.next(value);
          };
          Subscriber.prototype._error = function (err) {
            try {
              this.destination.error(err);
            } finally {
              this.unsubscribe();
            }
          };
          Subscriber.prototype._complete = function () {
            try {
              this.destination.complete();
            } finally {
              this.unsubscribe();
            }
          };
          return Subscriber;
        })(_Subscription__WEBPACK_IMPORTED_MODULE_1__.Subscription);

        var _bind = Function.prototype.bind;
        function bind(fn, thisArg) {
          return _bind.call(fn, thisArg);
        }
        var ConsumerObserver = (function () {
          function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
          }
          ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
              try {
                partialObserver.next(value);
              } catch (error) {
                handleUnhandledError(error);
              }
            }
          };
          ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
              try {
                partialObserver.error(err);
              } catch (error) {
                handleUnhandledError(error);
              }
            } else {
              handleUnhandledError(err);
            }
          };
          ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
              try {
                partialObserver.complete();
              } catch (error) {
                handleUnhandledError(error);
              }
            }
          };
          return ConsumerObserver;
        })();
        var SafeSubscriber = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(
            SafeSubscriber,
            _super
          );
          function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction)(
                observerOrNext
              ) ||
              !observerOrNext
            ) {
              partialObserver = {
                next:
                  observerOrNext !== null && observerOrNext !== void 0
                    ? observerOrNext
                    : undefined,
                error: error !== null && error !== void 0 ? error : undefined,
                complete:
                  complete !== null && complete !== void 0
                    ? complete
                    : undefined,
              };
            } else {
              var context_1;
              if (
                _this &&
                _config__WEBPACK_IMPORTED_MODULE_4__.config
                  .useDeprecatedNextContext
              ) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () {
                  return _this.unsubscribe();
                };
                partialObserver = {
                  next:
                    observerOrNext.next && bind(observerOrNext.next, context_1),
                  error:
                    observerOrNext.error &&
                    bind(observerOrNext.error, context_1),
                  complete:
                    observerOrNext.complete &&
                    bind(observerOrNext.complete, context_1),
                };
              } else {
                partialObserver = observerOrNext;
              }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
          }
          return SafeSubscriber;
        })(Subscriber);

        function handleUnhandledError(error) {
          if (
            _config__WEBPACK_IMPORTED_MODULE_4__.config
              .useDeprecatedSynchronousErrorHandling
          ) {
            (0, _util_errorContext__WEBPACK_IMPORTED_MODULE_5__.captureError)(
              error
            );
          } else {
            (0,
            _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_6__.reportUnhandledError)(
              error
            );
          }
        }
        function defaultErrorHandler(err) {
          throw err;
        }
        function handleStoppedNotification(notification, subscriber) {
          var onStoppedNotification =
            _config__WEBPACK_IMPORTED_MODULE_4__.config.onStoppedNotification;
          onStoppedNotification &&
            _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_7__.timeoutProvider.setTimeout(
              function () {
                return onStoppedNotification(notification, subscriber);
              }
            );
        }
        var EMPTY_OBSERVER = {
          closed: true,
          next: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
          error: defaultErrorHandler,
          complete: _util_noop__WEBPACK_IMPORTED_MODULE_8__.noop,
        };
        //# sourceMappingURL=Subscriber.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/Subscription.js":
      /*!***************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/Subscription.js ***!
  \***************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EMPTY_SUBSCRIPTION: () =>
            /* binding */ EMPTY_SUBSCRIPTION,
          /* harmony export */ Subscription: () => /* binding */ Subscription,
          /* harmony export */ isSubscription: () =>
            /* binding */ isSubscription,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./util/UnsubscriptionError */ "../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js"
          );
        /* harmony import */ var _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./util/arrRemove */ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"
          );

        var Subscription = (function () {
          function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
          }
          Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
              this.closed = true;
              var _parentage = this._parentage;
              if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                  try {
                    for (
                      var _parentage_1 = (0,
                        tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(
                          _parentage
                        ),
                        _parentage_1_1 = _parentage_1.next();
                      !_parentage_1_1.done;
                      _parentage_1_1 = _parentage_1.next()
                    ) {
                      var parent_1 = _parentage_1_1.value;
                      parent_1.remove(this);
                    }
                  } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                  } finally {
                    try {
                      if (
                        _parentage_1_1 &&
                        !_parentage_1_1.done &&
                        (_a = _parentage_1.return)
                      )
                        _a.call(_parentage_1);
                    } finally {
                      if (e_1) throw e_1.error;
                    }
                  }
                } else {
                  _parentage.remove(this);
                }
              }
              var initialFinalizer = this.initialTeardown;
              if (
                (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                  initialFinalizer
                )
              ) {
                try {
                  initialFinalizer();
                } catch (e) {
                  errors =
                    e instanceof
                    _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError
                      ? e.errors
                      : [e];
                }
              }
              var _finalizers = this._finalizers;
              if (_finalizers) {
                this._finalizers = null;
                try {
                  for (
                    var _finalizers_1 = (0,
                      tslib__WEBPACK_IMPORTED_MODULE_0__.__values)(_finalizers),
                      _finalizers_1_1 = _finalizers_1.next();
                    !_finalizers_1_1.done;
                    _finalizers_1_1 = _finalizers_1.next()
                  ) {
                    var finalizer = _finalizers_1_1.value;
                    try {
                      execFinalizer(finalizer);
                    } catch (err) {
                      errors =
                        errors !== null && errors !== void 0 ? errors : [];
                      if (
                        err instanceof
                        _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError
                      ) {
                        errors = (0,
                        tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                            [],
                            (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(
                              errors
                            )
                          ),
                          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(
                            err.errors
                          )
                        );
                      } else {
                        errors.push(err);
                      }
                    }
                  }
                } catch (e_2_1) {
                  e_2 = { error: e_2_1 };
                } finally {
                  try {
                    if (
                      _finalizers_1_1 &&
                      !_finalizers_1_1.done &&
                      (_b = _finalizers_1.return)
                    )
                      _b.call(_finalizers_1);
                  } finally {
                    if (e_2) throw e_2.error;
                  }
                }
              }
              if (errors) {
                throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_2__.UnsubscriptionError(
                  errors
                );
              }
            }
          };
          Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
              if (this.closed) {
                execFinalizer(teardown);
              } else {
                if (teardown instanceof Subscription) {
                  if (teardown.closed || teardown._hasParent(this)) {
                    return;
                  }
                  teardown._addParent(this);
                }
                (this._finalizers =
                  (_a = this._finalizers) !== null && _a !== void 0
                    ? _a
                    : []).push(teardown);
              }
            }
          };
          Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return (
              _parentage === parent ||
              (Array.isArray(_parentage) && _parentage.includes(parent))
            );
          };
          Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage)
              ? (_parentage.push(parent), _parentage)
              : _parentage
              ? [_parentage, parent]
              : parent;
          };
          Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
              this._parentage = null;
            } else if (Array.isArray(_parentage)) {
              (0, _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(
                _parentage,
                parent
              );
            }
          };
          Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers &&
              (0, _util_arrRemove__WEBPACK_IMPORTED_MODULE_3__.arrRemove)(
                _finalizers,
                teardown
              );
            if (teardown instanceof Subscription) {
              teardown._removeParent(this);
            }
          };
          Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
          })();
          return Subscription;
        })();

        var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
        function isSubscription(value) {
          return (
            value instanceof Subscription ||
            (value &&
              "closed" in value &&
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                value.remove
              ) &&
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                value.add
              ) &&
              (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
                value.unsubscribe
              ))
          );
        }
        function execFinalizer(finalizer) {
          if (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
              finalizer
            )
          ) {
            finalizer();
          } else {
            finalizer.unsubscribe();
          }
        }
        //# sourceMappingURL=Subscription.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/config.js":
      /*!*********************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/config.js ***!
  \*********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ config: () => /* binding */ config,
          /* harmony export */
        });
        var config = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: undefined,
          useDeprecatedSynchronousErrorHandling: false,
          useDeprecatedNextContext: false,
        };
        //# sourceMappingURL=config.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/lastValueFrom.js":
      /*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/lastValueFrom.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ lastValueFrom: () => /* binding */ lastValueFrom,
          /* harmony export */
        });
        /* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./util/EmptyError */ "../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"
          );

        function lastValueFrom(source, config) {
          var hasConfig = typeof config === "object";
          return new Promise(function (resolve, reject) {
            var _hasValue = false;
            var _value;
            source.subscribe({
              next: function (value) {
                _value = value;
                _hasValue = true;
              },
              error: reject,
              complete: function () {
                if (_hasValue) {
                  resolve(_value);
                } else if (hasConfig) {
                  resolve(config.defaultValue);
                } else {
                  reject(
                    new _util_EmptyError__WEBPACK_IMPORTED_MODULE_0__.EmptyError()
                  );
                }
              },
            });
          });
        }
        //# sourceMappingURL=lastValueFrom.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js":
      /*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/empty.js ***!
  \*******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EMPTY: () => /* binding */ EMPTY,
          /* harmony export */ empty: () => /* binding */ empty,
          /* harmony export */
        });
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );

        var EMPTY = new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
          function (subscriber) {
            return subscriber.complete();
          }
        );
        function empty(scheduler) {
          return scheduler ? emptyScheduled(scheduler) : EMPTY;
        }
        function emptyScheduled(scheduler) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              return scheduler.schedule(function () {
                return subscriber.complete();
              });
            }
          );
        }
        //# sourceMappingURL=empty.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fromEvent: () => /* binding */ fromEvent,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );
        /* harmony import */ var _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../operators/mergeMap */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"
          );
        /* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/mapOneOrManyArgs */ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"
          );

        var nodeEventEmitterMethods = ["addListener", "removeListener"];
        var eventTargetMethods = ["addEventListener", "removeEventListener"];
        var jqueryMethods = ["on", "off"];
        function fromEvent(target, eventName, options, resultSelector) {
          if (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              options
            )
          ) {
            resultSelector = options;
            options = undefined;
          }
          if (resultSelector) {
            return fromEvent(target, eventName, options).pipe(
              (0,
              _util_mapOneOrManyArgs__WEBPACK_IMPORTED_MODULE_1__.mapOneOrManyArgs)(
                resultSelector
              )
            );
          }
          var _a = (0, tslib__WEBPACK_IMPORTED_MODULE_2__.__read)(
              isEventTarget(target)
                ? eventTargetMethods.map(function (methodName) {
                    return function (handler) {
                      return target[methodName](eventName, handler, options);
                    };
                  })
                : isNodeStyleEventEmitter(target)
                ? nodeEventEmitterMethods.map(
                    toCommonHandlerRegistry(target, eventName)
                  )
                : isJQueryStyleEventEmitter(target)
                ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName))
                : [],
              2
            ),
            add = _a[0],
            remove = _a[1];
          if (!add) {
            if (
              (0, _util_isArrayLike__WEBPACK_IMPORTED_MODULE_3__.isArrayLike)(
                target
              )
            ) {
              return (0,
              _operators_mergeMap__WEBPACK_IMPORTED_MODULE_4__.mergeMap)(
                function (subTarget) {
                  return fromEvent(subTarget, eventName, options);
                }
              )(
                (0,
                _observable_innerFrom__WEBPACK_IMPORTED_MODULE_5__.innerFrom)(
                  target
                )
              );
            }
          }
          if (!add) {
            throw new TypeError("Invalid event target");
          }
          return new _Observable__WEBPACK_IMPORTED_MODULE_6__.Observable(
            function (subscriber) {
              var handler = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                return subscriber.next(1 < args.length ? args : args[0]);
              };
              add(handler);
              return function () {
                return remove(handler);
              };
            }
          );
        }
        function toCommonHandlerRegistry(target, eventName) {
          return function (methodName) {
            return function (handler) {
              return target[methodName](eventName, handler);
            };
          };
        }
        function isNodeStyleEventEmitter(target) {
          return (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.addListener
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.removeListener
            )
          );
        }
        function isJQueryStyleEventEmitter(target) {
          return (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.on
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.off
            )
          );
        }
        function isEventTarget(target) {
          return (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.addEventListener
            ) &&
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              target.removeEventListener
            )
          );
        }
        //# sourceMappingURL=fromEvent.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ fromArrayLike: () => /* binding */ fromArrayLike,
          /* harmony export */ fromAsyncIterable: () =>
            /* binding */ fromAsyncIterable,
          /* harmony export */ fromInteropObservable: () =>
            /* binding */ fromInteropObservable,
          /* harmony export */ fromIterable: () => /* binding */ fromIterable,
          /* harmony export */ fromPromise: () => /* binding */ fromPromise,
          /* harmony export */ fromReadableStreamLike: () =>
            /* binding */ fromReadableStreamLike,
          /* harmony export */ innerFrom: () => /* binding */ innerFrom,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../util/isArrayLike */ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js"
          );
        /* harmony import */ var _util_isPromise__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/isPromise */ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js"
          );
        /* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../Observable */ "../node_modules/rxjs/dist/esm5/internal/Observable.js"
          );
        /* harmony import */ var _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/isInteropObservable */ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js"
          );
        /* harmony import */ var _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../util/isAsyncIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js"
          );
        /* harmony import */ var _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ../util/throwUnobservableError */ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js"
          );
        /* harmony import */ var _util_isIterable__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../util/isIterable */ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js"
          );
        /* harmony import */ var _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ../util/isReadableStreamLike */ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );
        /* harmony import */ var _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! ../util/reportUnhandledError */ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js"
          );
        /* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js"
          );

        function innerFrom(input) {
          if (
            input instanceof _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable
          ) {
            return input;
          }
          if (input != null) {
            if (
              (0,
              _util_isInteropObservable__WEBPACK_IMPORTED_MODULE_1__.isInteropObservable)(
                input
              )
            ) {
              return fromInteropObservable(input);
            }
            if (
              (0, _util_isArrayLike__WEBPACK_IMPORTED_MODULE_2__.isArrayLike)(
                input
              )
            ) {
              return fromArrayLike(input);
            }
            if (
              (0, _util_isPromise__WEBPACK_IMPORTED_MODULE_3__.isPromise)(input)
            ) {
              return fromPromise(input);
            }
            if (
              (0,
              _util_isAsyncIterable__WEBPACK_IMPORTED_MODULE_4__.isAsyncIterable)(
                input
              )
            ) {
              return fromAsyncIterable(input);
            }
            if (
              (0, _util_isIterable__WEBPACK_IMPORTED_MODULE_5__.isIterable)(
                input
              )
            ) {
              return fromIterable(input);
            }
            if (
              (0,
              _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.isReadableStreamLike)(
                input
              )
            ) {
              return fromReadableStreamLike(input);
            }
          }
          throw (0,
          _util_throwUnobservableError__WEBPACK_IMPORTED_MODULE_7__.createInvalidObservableTypeError)(
            input
          );
        }
        function fromInteropObservable(obj) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              var obs =
                obj[
                  _symbol_observable__WEBPACK_IMPORTED_MODULE_8__.observable
                ]();
              if (
                (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_9__.isFunction)(
                  obs.subscribe
                )
              ) {
                return obs.subscribe(subscriber);
              }
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            }
          );
        }
        function fromArrayLike(array) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              for (var i = 0; i < array.length && !subscriber.closed; i++) {
                subscriber.next(array[i]);
              }
              subscriber.complete();
            }
          );
        }
        function fromPromise(promise) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              promise
                .then(
                  function (value) {
                    if (!subscriber.closed) {
                      subscriber.next(value);
                      subscriber.complete();
                    }
                  },
                  function (err) {
                    return subscriber.error(err);
                  }
                )
                .then(
                  null,
                  _util_reportUnhandledError__WEBPACK_IMPORTED_MODULE_10__.reportUnhandledError
                );
            }
          );
        }
        function fromIterable(iterable) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              var e_1, _a;
              try {
                for (
                  var iterable_1 = (0,
                    tslib__WEBPACK_IMPORTED_MODULE_11__.__values)(iterable),
                    iterable_1_1 = iterable_1.next();
                  !iterable_1_1.done;
                  iterable_1_1 = iterable_1.next()
                ) {
                  var value = iterable_1_1.value;
                  subscriber.next(value);
                  if (subscriber.closed) {
                    return;
                  }
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (
                    iterable_1_1 &&
                    !iterable_1_1.done &&
                    (_a = iterable_1.return)
                  )
                    _a.call(iterable_1);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              subscriber.complete();
            }
          );
        }
        function fromAsyncIterable(asyncIterable) {
          return new _Observable__WEBPACK_IMPORTED_MODULE_0__.Observable(
            function (subscriber) {
              process(asyncIterable, subscriber).catch(function (err) {
                return subscriber.error(err);
              });
            }
          );
        }
        function fromReadableStreamLike(readableStream) {
          return fromAsyncIterable(
            (0,
            _util_isReadableStreamLike__WEBPACK_IMPORTED_MODULE_6__.readableStreamLikeToAsyncGenerator)(
              readableStream
            )
          );
        }
        function process(asyncIterable, subscriber) {
          var asyncIterable_1, asyncIterable_1_1;
          var e_2, _a;
          return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(
            this,
            void 0,
            void 0,
            function () {
              var value, e_2_1;
              return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__generator)(
                this,
                function (_b) {
                  switch (_b.label) {
                    case 0:
                      _b.trys.push([0, 5, 6, 11]);
                      asyncIterable_1 = (0,
                      tslib__WEBPACK_IMPORTED_MODULE_11__.__asyncValues)(
                        asyncIterable
                      );
                      _b.label = 1;
                    case 1:
                      return [4, asyncIterable_1.next()];
                    case 2:
                      if (
                        !((asyncIterable_1_1 = _b.sent()),
                        !asyncIterable_1_1.done)
                      )
                        return [3, 4];
                      value = asyncIterable_1_1.value;
                      subscriber.next(value);
                      if (subscriber.closed) {
                        return [2];
                      }
                      _b.label = 3;
                    case 3:
                      return [3, 1];
                    case 4:
                      return [3, 11];
                    case 5:
                      e_2_1 = _b.sent();
                      e_2 = { error: e_2_1 };
                      return [3, 11];
                    case 6:
                      _b.trys.push([6, , 9, 10]);
                      if (
                        !(
                          asyncIterable_1_1 &&
                          !asyncIterable_1_1.done &&
                          (_a = asyncIterable_1.return)
                        )
                      )
                        return [3, 8];
                      return [4, _a.call(asyncIterable_1)];
                    case 7:
                      _b.sent();
                      _b.label = 8;
                    case 8:
                      return [3, 10];
                    case 9:
                      if (e_2) throw e_2.error;
                      return [7];
                    case 10:
                      return [7];
                    case 11:
                      subscriber.complete();
                      return [2];
                  }
                }
              );
            }
          );
        }
        //# sourceMappingURL=innerFrom.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":
      /*!*******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js ***!
  \*******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ OperatorSubscriber: () =>
            /* binding */ OperatorSubscriber,
          /* harmony export */ createOperatorSubscriber: () =>
            /* binding */ createOperatorSubscriber,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../Subscriber */ "../node_modules/rxjs/dist/esm5/internal/Subscriber.js"
          );

        function createOperatorSubscriber(
          destination,
          onNext,
          onComplete,
          onError,
          onFinalize
        ) {
          return new OperatorSubscriber(
            destination,
            onNext,
            onComplete,
            onError,
            onFinalize
          );
        }
        var OperatorSubscriber = (function (_super) {
          (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(
            OperatorSubscriber,
            _super
          );
          function OperatorSubscriber(
            destination,
            onNext,
            onComplete,
            onError,
            onFinalize,
            shouldUnsubscribe
          ) {
            var _this = _super.call(this, destination) || this;
            _this.onFinalize = onFinalize;
            _this.shouldUnsubscribe = shouldUnsubscribe;
            _this._next = onNext
              ? function (value) {
                  try {
                    onNext(value);
                  } catch (err) {
                    destination.error(err);
                  }
                }
              : _super.prototype._next;
            _this._error = onError
              ? function (err) {
                  try {
                    onError(err);
                  } catch (err) {
                    destination.error(err);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : _super.prototype._error;
            _this._complete = onComplete
              ? function () {
                  try {
                    onComplete();
                  } catch (err) {
                    destination.error(err);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : _super.prototype._complete;
            return _this;
          }
          OperatorSubscriber.prototype.unsubscribe = function () {
            var _a;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
              var closed_1 = this.closed;
              _super.prototype.unsubscribe.call(this);
              !closed_1 &&
                ((_a = this.onFinalize) === null || _a === void 0
                  ? void 0
                  : _a.call(this));
            }
          };
          return OperatorSubscriber;
        })(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber);

        //# sourceMappingURL=OperatorSubscriber.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js":
      /*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/filter.js ***!
  \*******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ filter: () => /* binding */ filter,
          /* harmony export */
        });
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function filter(predicate, thisArg) {
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (
            source,
            subscriber
          ) {
            var index = 0;
            source.subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
                subscriber,
                function (value) {
                  return (
                    predicate.call(thisArg, value, index++) &&
                    subscriber.next(value)
                  );
                }
              )
            );
          });
        }
        //# sourceMappingURL=filter.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/map.js":
      /*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/map.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ map: () => /* binding */ map,
          /* harmony export */
        });
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function map(project, thisArg) {
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_0__.operate)(function (
            source,
            subscriber
          ) {
            var index = 0;
            source.subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
                subscriber,
                function (value) {
                  subscriber.next(project.call(thisArg, value, index++));
                }
              )
            );
          });
        }
        //# sourceMappingURL=map.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js ***!
  \***************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ mergeInternals: () =>
            /* binding */ mergeInternals,
          /* harmony export */
        });
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../util/executeSchedule */ "../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function mergeInternals(
          source,
          subscriber,
          project,
          concurrent,
          onBeforeNext,
          expand,
          innerSubScheduler,
          additionalFinalizer
        ) {
          var buffer = [];
          var active = 0;
          var index = 0;
          var isComplete = false;
          var checkComplete = function () {
            if (isComplete && !buffer.length && !active) {
              subscriber.complete();
            }
          };
          var outerNext = function (value) {
            return active < concurrent ? doInnerSub(value) : buffer.push(value);
          };
          var doInnerSub = function (value) {
            expand && subscriber.next(value);
            active++;
            var innerComplete = false;
            (0, _observable_innerFrom__WEBPACK_IMPORTED_MODULE_0__.innerFrom)(
              project(value, index++)
            ).subscribe(
              (0,
              _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
                subscriber,
                function (innerValue) {
                  onBeforeNext === null || onBeforeNext === void 0
                    ? void 0
                    : onBeforeNext(innerValue);
                  if (expand) {
                    outerNext(innerValue);
                  } else {
                    subscriber.next(innerValue);
                  }
                },
                function () {
                  innerComplete = true;
                },
                undefined,
                function () {
                  if (innerComplete) {
                    try {
                      active--;
                      var _loop_1 = function () {
                        var bufferedValue = buffer.shift();
                        if (innerSubScheduler) {
                          (0,
                          _util_executeSchedule__WEBPACK_IMPORTED_MODULE_2__.executeSchedule)(
                            subscriber,
                            innerSubScheduler,
                            function () {
                              return doInnerSub(bufferedValue);
                            }
                          );
                        } else {
                          doInnerSub(bufferedValue);
                        }
                      };
                      while (buffer.length && active < concurrent) {
                        _loop_1();
                      }
                      checkComplete();
                    } catch (err) {
                      subscriber.error(err);
                    }
                  }
                }
              )
            );
          };
          source.subscribe(
            (0,
            _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__.createOperatorSubscriber)(
              subscriber,
              outerNext,
              function () {
                isComplete = true;
                checkComplete();
              }
            )
          );
          return function () {
            additionalFinalizer === null || additionalFinalizer === void 0
              ? void 0
              : additionalFinalizer();
          };
        }
        //# sourceMappingURL=mergeInternals.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":
      /*!*********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js ***!
  \*********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ mergeMap: () => /* binding */ mergeMap,
          /* harmony export */
        });
        /* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );
        /* harmony import */ var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../observable/innerFrom */ "../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"
          );
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _mergeInternals__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./mergeInternals */ "../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js"
          );
        /* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../util/isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function mergeMap(project, resultSelector, concurrent) {
          if (concurrent === void 0) {
            concurrent = Infinity;
          }
          if (
            (0, _util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              resultSelector
            )
          ) {
            return mergeMap(function (a, i) {
              return (0, _map__WEBPACK_IMPORTED_MODULE_1__.map)(function (
                b,
                ii
              ) {
                return resultSelector(a, b, i, ii);
              })(
                (0,
                _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.innerFrom)(
                  project(a, i)
                )
              );
            }, concurrent);
          } else if (typeof resultSelector === "number") {
            concurrent = resultSelector;
          }
          return (0, _util_lift__WEBPACK_IMPORTED_MODULE_3__.operate)(function (
            source,
            subscriber
          ) {
            return (0,
            _mergeInternals__WEBPACK_IMPORTED_MODULE_4__.mergeInternals)(
              source,
              subscriber,
              project,
              concurrent
            );
          });
        }
        //# sourceMappingURL=mergeMap.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/operators/take.js":
      /*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/operators/take.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ take: () => /* binding */ take,
          /* harmony export */
        });
        /* harmony import */ var _observable_empty__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../observable/empty */ "../node_modules/rxjs/dist/esm5/internal/observable/empty.js"
          );
        /* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../util/lift */ "../node_modules/rxjs/dist/esm5/internal/util/lift.js"
          );
        /* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./OperatorSubscriber */ "../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"
          );

        function take(count) {
          return count <= 0
            ? function () {
                return _observable_empty__WEBPACK_IMPORTED_MODULE_0__.EMPTY;
              }
            : (0, _util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)(function (
                source,
                subscriber
              ) {
                var seen = 0;
                source.subscribe(
                  (0,
                  _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(
                    subscriber,
                    function (value) {
                      if (++seen <= count) {
                        subscriber.next(value);
                        if (count <= seen) {
                          subscriber.complete();
                        }
                      }
                    }
                  )
                );
              });
        }
        //# sourceMappingURL=take.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":
      /*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ timeoutProvider: () =>
            /* binding */ timeoutProvider,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );

        var timeoutProvider = {
          setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
              args[_i - 2] = arguments[_i];
            }
            var delegate = timeoutProvider.delegate;
            if (
              delegate === null || delegate === void 0
                ? void 0
                : delegate.setTimeout
            ) {
              return delegate.setTimeout.apply(
                delegate,
                (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                  [handler, timeout],
                  (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)
                )
              );
            }
            return setTimeout.apply(
              void 0,
              (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                [handler, timeout],
                (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)
              )
            );
          },
          clearTimeout: function (handle) {
            var delegate = timeoutProvider.delegate;
            return (
              (delegate === null || delegate === void 0
                ? void 0
                : delegate.clearTimeout) || clearTimeout
            )(handle);
          },
          delegate: undefined,
        };
        //# sourceMappingURL=timeoutProvider.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getSymbolIterator: () =>
            /* binding */ getSymbolIterator,
          /* harmony export */ iterator: () => /* binding */ iterator,
          /* harmony export */
        });
        function getSymbolIterator() {
          if (typeof Symbol !== "function" || !Symbol.iterator) {
            return "@@iterator";
          }
          return Symbol.iterator;
        }
        var iterator = getSymbolIterator();
        //# sourceMappingURL=iterator.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js":
      /*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/symbol/observable.js ***!
  \********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ observable: () => /* binding */ observable,
          /* harmony export */
        });
        var observable = (function () {
          return (
            (typeof Symbol === "function" && Symbol.observable) ||
            "@@observable"
          );
        })();
        //# sourceMappingURL=observable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ EmptyError: () => /* binding */ EmptyError,
          /* harmony export */
        });
        /* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"
          );

        var EmptyError = (0,
        _createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(
          function (_super) {
            return function EmptyErrorImpl() {
              _super(this);
              this.name = "EmptyError";
              this.message = "no elements in sequence";
            };
          }
        );
        //# sourceMappingURL=EmptyError.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js ***!
  \***************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ UnsubscriptionError: () =>
            /* binding */ UnsubscriptionError,
          /* harmony export */
        });
        /* harmony import */ var _createErrorClass__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./createErrorClass */ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"
          );

        var UnsubscriptionError = (0,
        _createErrorClass__WEBPACK_IMPORTED_MODULE_0__.createErrorClass)(
          function (_super) {
            return function UnsubscriptionErrorImpl(errors) {
              _super(this);
              this.message = errors
                ? errors.length +
                  " errors occurred during unsubscription:\n" +
                  errors
                    .map(function (err, i) {
                      return i + 1 + ") " + err.toString();
                    })
                    .join("\n  ")
                : "";
              this.name = "UnsubscriptionError";
              this.errors = errors;
            };
          }
        );
        //# sourceMappingURL=UnsubscriptionError.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":
      /*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ arrRemove: () => /* binding */ arrRemove,
          /* harmony export */
        });
        function arrRemove(arr, item) {
          if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
          }
        }
        //# sourceMappingURL=arrRemove.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":
      /*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ createErrorClass: () =>
            /* binding */ createErrorClass,
          /* harmony export */
        });
        function createErrorClass(createImpl) {
          var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
          };
          var ctorFunc = createImpl(_super);
          ctorFunc.prototype = Object.create(Error.prototype);
          ctorFunc.prototype.constructor = ctorFunc;
          return ctorFunc;
        }
        //# sourceMappingURL=createErrorClass.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/errorContext.js":
      /*!********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/errorContext.js ***!
  \********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ captureError: () => /* binding */ captureError,
          /* harmony export */ errorContext: () => /* binding */ errorContext,
          /* harmony export */
        });
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );

        var context = null;
        function errorContext(cb) {
          if (
            _config__WEBPACK_IMPORTED_MODULE_0__.config
              .useDeprecatedSynchronousErrorHandling
          ) {
            var isRoot = !context;
            if (isRoot) {
              context = { errorThrown: false, error: null };
            }
            cb();
            if (isRoot) {
              var _a = context,
                errorThrown = _a.errorThrown,
                error = _a.error;
              context = null;
              if (errorThrown) {
                throw error;
              }
            }
          } else {
            cb();
          }
        }
        function captureError(err) {
          if (
            _config__WEBPACK_IMPORTED_MODULE_0__.config
              .useDeprecatedSynchronousErrorHandling &&
            context
          ) {
            context.errorThrown = true;
            context.error = err;
          }
        }
        //# sourceMappingURL=errorContext.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ executeSchedule: () =>
            /* binding */ executeSchedule,
          /* harmony export */
        });
        function executeSchedule(
          parentSubscription,
          scheduler,
          work,
          delay,
          repeat
        ) {
          if (delay === void 0) {
            delay = 0;
          }
          if (repeat === void 0) {
            repeat = false;
          }
          var scheduleSubscription = scheduler.schedule(function () {
            work();
            if (repeat) {
              parentSubscription.add(this.schedule(null, delay));
            } else {
              this.unsubscribe();
            }
          }, delay);
          parentSubscription.add(scheduleSubscription);
          if (!repeat) {
            return scheduleSubscription;
          }
        }
        //# sourceMappingURL=executeSchedule.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/identity.js":
      /*!****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/identity.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ identity: () => /* binding */ identity,
          /* harmony export */
        });
        function identity(x) {
          return x;
        }
        //# sourceMappingURL=identity.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":
      /*!*******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js ***!
  \*******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isArrayLike: () => /* binding */ isArrayLike,
          /* harmony export */
        });
        var isArrayLike = function (x) {
          return x && typeof x.length === "number" && typeof x !== "function";
        };
        //# sourceMappingURL=isArrayLike.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":
      /*!***********************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isAsyncIterable: () =>
            /* binding */ isAsyncIterable,
          /* harmony export */
        });
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isAsyncIterable(obj) {
          return (
            Symbol.asyncIterator &&
            (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
              obj === null || obj === void 0
                ? void 0
                : obj[Symbol.asyncIterator]
            )
          );
        }
        //# sourceMappingURL=isAsyncIterable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isFunction.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isFunction: () => /* binding */ isFunction,
          /* harmony export */
        });
        function isFunction(value) {
          return typeof value === "function";
        }
        //# sourceMappingURL=isFunction.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":
      /*!***************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js ***!
  \***************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isInteropObservable: () =>
            /* binding */ isInteropObservable,
          /* harmony export */
        });
        /* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../symbol/observable */ "../node_modules/rxjs/dist/esm5/internal/symbol/observable.js"
          );
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isInteropObservable(input) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            input[_symbol_observable__WEBPACK_IMPORTED_MODULE_1__.observable]
          );
        }
        //# sourceMappingURL=isInteropObservable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isIterable.js":
      /*!******************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isIterable.js ***!
  \******************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isIterable: () => /* binding */ isIterable,
          /* harmony export */
        });
        /* harmony import */ var _symbol_iterator__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../symbol/iterator */ "../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js"
          );
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isIterable(input) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            input === null || input === void 0
              ? void 0
              : input[_symbol_iterator__WEBPACK_IMPORTED_MODULE_1__.iterator]
          );
        }
        //# sourceMappingURL=isIterable.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isPromise.js":
      /*!*****************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isPromise.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isPromise: () => /* binding */ isPromise,
          /* harmony export */
        });
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function isPromise(value) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            value === null || value === void 0 ? void 0 : value.then
          );
        }
        //# sourceMappingURL=isPromise.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":
      /*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isReadableStreamLike: () =>
            /* binding */ isReadableStreamLike,
          /* harmony export */ readableStreamLikeToAsyncGenerator: () =>
            /* binding */ readableStreamLikeToAsyncGenerator,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function readableStreamLikeToAsyncGenerator(readableStream) {
          return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__asyncGenerator)(
            this,
            arguments,
            function readableStreamLikeToAsyncGenerator_1() {
              var reader, _a, value, done;
              return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(
                this,
                function (_b) {
                  switch (_b.label) {
                    case 0:
                      reader = readableStream.getReader();
                      _b.label = 1;
                    case 1:
                      _b.trys.push([1, , 9, 10]);
                      _b.label = 2;
                    case 2:
                      if (false) {
                      }
                      return [
                        4,
                        (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(
                          reader.read()
                        ),
                      ];
                    case 3:
                      (_a = _b.sent()), (value = _a.value), (done = _a.done);
                      if (!done) return [3, 5];
                      return [
                        4,
                        (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(void 0),
                      ];
                    case 4:
                      return [2, _b.sent()];
                    case 5:
                      return [
                        4,
                        (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__await)(value),
                      ];
                    case 6:
                      return [4, _b.sent()];
                    case 7:
                      _b.sent();
                      return [3, 2];
                    case 8:
                      return [3, 10];
                    case 9:
                      reader.releaseLock();
                      return [7];
                    case 10:
                      return [2];
                  }
                }
              );
            }
          );
        }
        function isReadableStreamLike(obj) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_1__.isFunction)(
            obj === null || obj === void 0 ? void 0 : obj.getReader
          );
        }
        //# sourceMappingURL=isReadableStreamLike.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/lift.js":
      /*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/lift.js ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ hasLift: () => /* binding */ hasLift,
          /* harmony export */ operate: () => /* binding */ operate,
          /* harmony export */
        });
        /* harmony import */ var _isFunction__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./isFunction */ "../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"
          );

        function hasLift(source) {
          return (0, _isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(
            source === null || source === void 0 ? void 0 : source.lift
          );
        }
        function operate(init) {
          return function (source) {
            if (hasLift(source)) {
              return source.lift(function (liftedSource) {
                try {
                  return init(liftedSource, this);
                } catch (err) {
                  this.error(err);
                }
              });
            }
            throw new TypeError("Unable to lift unknown Observable type");
          };
        }
        //# sourceMappingURL=lift.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":
      /*!************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ mapOneOrManyArgs: () =>
            /* binding */ mapOneOrManyArgs,
          /* harmony export */
        });
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tslib */ "../node_modules/tslib/tslib.es6.js"
          );
        /* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../operators/map */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );

        var isArray = Array.isArray;
        function callOrApply(fn, args) {
          return isArray(args)
            ? fn.apply(
                void 0,
                (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)(
                  [],
                  (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__read)(args)
                )
              )
            : fn(args);
        }
        function mapOneOrManyArgs(fn) {
          return (0, _operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (
            args
          ) {
            return callOrApply(fn, args);
          });
        }
        //# sourceMappingURL=mapOneOrManyArgs.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/noop.js":
      /*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/noop.js ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ noop: () => /* binding */ noop,
          /* harmony export */
        });
        function noop() {}
        //# sourceMappingURL=noop.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/pipe.js":
      /*!************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/pipe.js ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ pipe: () => /* binding */ pipe,
          /* harmony export */ pipeFromArray: () => /* binding */ pipeFromArray,
          /* harmony export */
        });
        /* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./identity */ "../node_modules/rxjs/dist/esm5/internal/util/identity.js"
          );

        function pipe() {
          var fns = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
          }
          return pipeFromArray(fns);
        }
        function pipeFromArray(fns) {
          if (fns.length === 0) {
            return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
          }
          if (fns.length === 1) {
            return fns[0];
          }
          return function piped(input) {
            return fns.reduce(function (prev, fn) {
              return fn(prev);
            }, input);
          };
        }
        //# sourceMappingURL=pipe.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":
      /*!****************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ reportUnhandledError: () =>
            /* binding */ reportUnhandledError,
          /* harmony export */
        });
        /* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../config */ "../node_modules/rxjs/dist/esm5/internal/config.js"
          );
        /* harmony import */ var _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../scheduler/timeoutProvider */ "../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js"
          );

        function reportUnhandledError(err) {
          _scheduler_timeoutProvider__WEBPACK_IMPORTED_MODULE_0__.timeoutProvider.setTimeout(
            function () {
              var onUnhandledError =
                _config__WEBPACK_IMPORTED_MODULE_1__.config.onUnhandledError;
              if (onUnhandledError) {
                onUnhandledError(err);
              } else {
                throw err;
              }
            }
          );
        }
        //# sourceMappingURL=reportUnhandledError.js.map

        /***/
      },

    /***/ "../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":
      /*!******************************************************************************!*\
  !*** ../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js ***!
  \******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ createInvalidObservableTypeError: () =>
            /* binding */ createInvalidObservableTypeError,
          /* harmony export */
        });
        function createInvalidObservableTypeError(input) {
          return new TypeError(
            "You provided " +
              (input !== null && typeof input === "object"
                ? "an invalid object"
                : "'" + input + "'") +
              " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
          );
        }
        //# sourceMappingURL=throwUnobservableError.js.map

        /***/
      },

    /***/ "./dapp-interface/DAppInterface.ts":
      /*!*****************************************!*\
  !*** ./dapp-interface/DAppInterface.ts ***!
  \*****************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DAppInterface: () => /* binding */ DAppInterface,
          /* harmony export */
        });
        /* harmony import */ var _mysten_sui_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @mysten/sui.js */ "../node_modules/@mysten/sui.js/dist/index.mjs"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/lastValueFrom.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/take.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js"
          );
        /* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! _messages */ "./shared/messaging/messages/index.ts"
          );
        /* harmony import */ var _messaging_WindowMessageStream__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! _messaging/WindowMessageStream */ "./shared/messaging/WindowMessageStream.ts"
          );
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        /* harmony import */ var _payloads_permissions__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! _payloads/permissions */ "./shared/messaging/messages/payloads/permissions/index.ts"
          );
        /* harmony import */ var _src_shared_signature_serialization__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! _src/shared/signature-serialization */ "./shared/signature-serialization.ts"
          );
        /* provided dependency */ var Buffer = __webpack_require__(
          /*! buffer */ "../node_modules/buffer/index.js"
        )["Buffer"];
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function mapToPromise(stream, project) {
          return (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.lastValueFrom)(
            stream.pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_7__.take)(1),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_8__.map)((response) => {
                if (
                  (0, _payloads__WEBPACK_IMPORTED_MODULE_3__.isErrorPayload)(
                    response
                  )
                ) {
                  // TODO: throw proper error
                  throw new Error(response.message);
                }
                return project(response);
              })
            )
          );
        }
        class DAppInterface {
          constructor() {
            this._messagesStream =
              new _messaging_WindowMessageStream__WEBPACK_IMPORTED_MODULE_2__.WindowMessageStream(
                "ethos_in-page",
                "ethos_content-script"
              );
          }
          openWallet() {
            return mapToPromise(
              this.send({
                type: "open-wallet",
              }),
              (response) => response.success
            );
          }
          hasPermissions(
            permissions = _payloads_permissions__WEBPACK_IMPORTED_MODULE_4__.ALL_PERMISSION_TYPES
          ) {
            return mapToPromise(
              this.send({
                type: "has-permissions-request",
                permissions,
              }),
              (response) => response.result
            );
          }
          requestPermissions(
            permissions = _payloads_permissions__WEBPACK_IMPORTED_MODULE_4__.ALL_PERMISSION_TYPES
          ) {
            return mapToPromise(
              this.send({
                type: "acquire-permissions-request",
                permissions,
              }),
              (response) => response.result
            );
          }
          getAccounts() {
            return mapToPromise(
              this.send({
                type: "get-account",
              }),
              (response) => response.accounts
            );
          }
          requestPreapproval(preapproval) {
            return mapToPromise(
              this.send({
                type: "preapproval-request",
                preapproval,
              }),
              (response) => response
            );
          }
          executeMoveCall(transaction) {
            return mapToPromise(
              this.send({
                type: "execute-transaction-request",
                transaction,
              }),
              (response) => response.result
            );
          }
          executeSerializedMoveCall(transactionBytes) {
            return mapToPromise(
              this.send({
                type: "execute-transaction-request",
                transactionBytes,
              }),
              (response) => response.result
            );
          }
          signMessage(message) {
            let messageData;
            let messageString;
            // convert utf8 string to Uint8Array
            if (typeof message === "string") {
              messageString = message;
              message = new Uint8Array(Buffer.from(message, "utf8"));
            }
            // convert Uint8Array to base64 string
            if (message instanceof Uint8Array) {
              messageData =
                new _mysten_sui_js__WEBPACK_IMPORTED_MODULE_0__.Base64DataBuffer(
                  message
                ).toString();
            }
            return mapToPromise(
              this.send({
                type: "execute-sign-message-request",
                messageData,
                messageString,
              }),
              (response) =>
                response.signature
                  ? (0,
                    _src_shared_signature_serialization__WEBPACK_IMPORTED_MODULE_5__.deserializeSignaturePubkeyPair)(
                      response.signature
                    )
                  : undefined
            );
          }
          disconnect() {
            return mapToPromise(
              this.send({
                type: "disconnect-request",
              }),
              (response) => response.success
            );
          }
          send(payload, responseForID) {
            const msg = (0,
            _messages__WEBPACK_IMPORTED_MODULE_1__.createMessage)(
              payload,
              responseForID
            );
            this._messagesStream.send(msg);
            return this._messagesStream.messages.pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_9__.filter)(
                ({ id }) => id === msg.id
              ),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_8__.map)((msg) => msg.payload)
            );
          }
        }

        /***/
      },

    /***/ "./shared/messaging/WindowMessageStream.ts":
      /*!*************************************************!*\
  !*** ./shared/messaging/WindowMessageStream.ts ***!
  \*************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ WindowMessageStream: () =>
            /* binding */ WindowMessageStream,
          /* harmony export */
        });
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/filter.js"
          );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! rxjs */ "../node_modules/rxjs/dist/esm5/internal/operators/map.js"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        class WindowMessageStream {
          constructor(name, target) {
            if (name === target) {
              throw new Error(
                "[WindowMessageStream] name and target must be different"
              );
            }
            this._name = name;
            this._target = target;
            this.messages = (0, rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(
              window,
              "message"
            ).pipe(
              (0, rxjs__WEBPACK_IMPORTED_MODULE_1__.filter)(
                (message) =>
                  message.source === window &&
                  message.data.target === this._name
              ),
              (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(
                (message) => message.data.payload
              )
            );
          }
          send(payload) {
            const msg = {
              target: this._target,
              payload,
            };
            window.postMessage(msg);
          }
        }

        /***/
      },

    /***/ "./shared/messaging/messages/Message.ts":
      /*!**********************************************!*\
  !*** ./shared/messaging/messages/Message.ts ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ createMessage: () => /* binding */ createMessage,
          /* harmony export */
        });
        /* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! uuid */ "../node_modules/uuid/dist/esm-browser/v4.js"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function createMessage(payload, id) {
          return {
            id: id || (0, uuid__WEBPACK_IMPORTED_MODULE_0__["default"])(),
            payload,
          };
        }

        /***/
      },

    /***/ "./shared/messaging/messages/index.ts":
      /*!********************************************!*\
  !*** ./shared/messaging/messages/index.ts ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ createMessage: () =>
            /* reexport safe */ _Message__WEBPACK_IMPORTED_MODULE_0__.createMessage,
          /* harmony export */
        });
        /* harmony import */ var _Message__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./Message */ "./shared/messaging/messages/Message.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/BasePayload.ts":
      /*!***********************************************************!*\
  !*** ./shared/messaging/messages/payloads/BasePayload.ts ***!
  \***********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isBasePayload: () => /* binding */ isBasePayload,
          /* harmony export */
        });
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0
        function isBasePayload(payload) {
          return "type" in payload && typeof payload.type !== "undefined";
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/ErrorPayload.ts":
      /*!************************************************************!*\
  !*** ./shared/messaging/messages/payloads/ErrorPayload.ts ***!
  \************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isErrorPayload: () =>
            /* binding */ isErrorPayload,
          /* harmony export */
        });
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0
        function isErrorPayload(payload) {
          return "error" in payload && payload.error === true;
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/Payload.ts":
      /*!*******************************************************!*\
  !*** ./shared/messaging/messages/payloads/Payload.ts ***!
  \*******************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/index.ts":
      /*!*****************************************************!*\
  !*** ./shared/messaging/messages/payloads/index.ts ***!
  \*****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isBasePayload: () =>
            /* reexport safe */ _BasePayload__WEBPACK_IMPORTED_MODULE_0__.isBasePayload,
          /* harmony export */ isErrorPayload: () =>
            /* reexport safe */ _ErrorPayload__WEBPACK_IMPORTED_MODULE_1__.isErrorPayload,
          /* harmony export */
        });
        /* harmony import */ var _BasePayload__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./BasePayload */ "./shared/messaging/messages/payloads/BasePayload.ts"
          );
        /* harmony import */ var _ErrorPayload__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./ErrorPayload */ "./shared/messaging/messages/payloads/ErrorPayload.ts"
          );
        /* harmony import */ var _Payload__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./Payload */ "./shared/messaging/messages/payloads/Payload.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsRequest.ts":
      /*!*************************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/AcquirePermissionsRequest.ts ***!
  \*************************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isAcquirePermissionsRequest: () =>
            /* binding */ isAcquirePermissionsRequest,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isAcquirePermissionsRequest(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "acquire-permissions-request"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsResponse.ts":
      /*!**************************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/AcquirePermissionsResponse.ts ***!
  \**************************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isAcquirePermissionsResponse: () =>
            /* binding */ isAcquirePermissionsResponse,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isAcquirePermissionsResponse(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "acquire-permissions-response"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/GetPermissionRequests.ts":
      /*!*********************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/GetPermissionRequests.ts ***!
  \*********************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isGetPermissionRequests: () =>
            /* binding */ isGetPermissionRequests,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isGetPermissionRequests(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "get-permission-requests"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/HasPermissionsRequest.ts":
      /*!*********************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/HasPermissionsRequest.ts ***!
  \*********************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isHasPermissionRequest: () =>
            /* binding */ isHasPermissionRequest,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isHasPermissionRequest(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "has-permissions-request"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/HasPermissionsResponse.ts":
      /*!**********************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/HasPermissionsResponse.ts ***!
  \**********************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isHasPermissionResponse: () =>
            /* binding */ isHasPermissionResponse,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isHasPermissionResponse(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "has-permissions-response"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/Permission.ts":
      /*!**********************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/Permission.ts ***!
  \**********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/PermissionRequests.ts":
      /*!******************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/PermissionRequests.ts ***!
  \******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isPermissionRequests: () =>
            /* binding */ isPermissionRequests,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isPermissionRequests(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "permission-request"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/PermissionResponse.ts":
      /*!******************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/PermissionResponse.ts ***!
  \******************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ isPermissionResponse: () =>
            /* binding */ isPermissionResponse,
          /* harmony export */
        });
        /* harmony import */ var _payloads__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! _payloads */ "./shared/messaging/messages/payloads/index.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function isPermissionResponse(payload) {
          return (
            (0, _payloads__WEBPACK_IMPORTED_MODULE_0__.isBasePayload)(
              payload
            ) && payload.type === "permission-response"
          );
        }

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/PermissionType.ts":
      /*!**************************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/PermissionType.ts ***!
  \**************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ALL_PERMISSION_TYPES: () =>
            /* binding */ ALL_PERMISSION_TYPES,
          /* harmony export */
        });
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0
        const ALL_PERMISSION_TYPES = [
          "viewAccount",
          "suggestTransactions",
          "suggestSignMessages",
        ];

        /***/
      },

    /***/ "./shared/messaging/messages/payloads/permissions/index.ts":
      /*!*****************************************************************!*\
  !*** ./shared/messaging/messages/payloads/permissions/index.ts ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ ALL_PERMISSION_TYPES: () =>
            /* reexport safe */ _PermissionType__WEBPACK_IMPORTED_MODULE_3__.ALL_PERMISSION_TYPES,
          /* harmony export */ isAcquirePermissionsRequest: () =>
            /* reexport safe */ _AcquirePermissionsRequest__WEBPACK_IMPORTED_MODULE_7__.isAcquirePermissionsRequest,
          /* harmony export */ isAcquirePermissionsResponse: () =>
            /* reexport safe */ _AcquirePermissionsResponse__WEBPACK_IMPORTED_MODULE_8__.isAcquirePermissionsResponse,
          /* harmony export */ isGetPermissionRequests: () =>
            /* reexport safe */ _GetPermissionRequests__WEBPACK_IMPORTED_MODULE_0__.isGetPermissionRequests,
          /* harmony export */ isHasPermissionRequest: () =>
            /* reexport safe */ _HasPermissionsRequest__WEBPACK_IMPORTED_MODULE_5__.isHasPermissionRequest,
          /* harmony export */ isHasPermissionResponse: () =>
            /* reexport safe */ _HasPermissionsResponse__WEBPACK_IMPORTED_MODULE_6__.isHasPermissionResponse,
          /* harmony export */ isPermissionRequests: () =>
            /* reexport safe */ _PermissionRequests__WEBPACK_IMPORTED_MODULE_1__.isPermissionRequests,
          /* harmony export */ isPermissionResponse: () =>
            /* reexport safe */ _PermissionResponse__WEBPACK_IMPORTED_MODULE_2__.isPermissionResponse,
          /* harmony export */
        });
        /* harmony import */ var _GetPermissionRequests__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./GetPermissionRequests */ "./shared/messaging/messages/payloads/permissions/GetPermissionRequests.ts"
          );
        /* harmony import */ var _PermissionRequests__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./PermissionRequests */ "./shared/messaging/messages/payloads/permissions/PermissionRequests.ts"
          );
        /* harmony import */ var _PermissionResponse__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./PermissionResponse */ "./shared/messaging/messages/payloads/permissions/PermissionResponse.ts"
          );
        /* harmony import */ var _PermissionType__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./PermissionType */ "./shared/messaging/messages/payloads/permissions/PermissionType.ts"
          );
        /* harmony import */ var _Permission__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./Permission */ "./shared/messaging/messages/payloads/permissions/Permission.ts"
          );
        /* harmony import */ var _HasPermissionsRequest__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./HasPermissionsRequest */ "./shared/messaging/messages/payloads/permissions/HasPermissionsRequest.ts"
          );
        /* harmony import */ var _HasPermissionsResponse__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./HasPermissionsResponse */ "./shared/messaging/messages/payloads/permissions/HasPermissionsResponse.ts"
          );
        /* harmony import */ var _AcquirePermissionsRequest__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./AcquirePermissionsRequest */ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsRequest.ts"
          );
        /* harmony import */ var _AcquirePermissionsResponse__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./AcquirePermissionsResponse */ "./shared/messaging/messages/payloads/permissions/AcquirePermissionsResponse.ts"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        /***/
      },

    /***/ "./shared/signature-serialization.ts":
      /*!*******************************************!*\
  !*** ./shared/signature-serialization.ts ***!
  \*******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ deserializeSignaturePubkeyPair: () =>
            /* binding */ deserializeSignaturePubkeyPair,
          /* harmony export */ serializeSignaturePubkeyPair: () =>
            /* binding */ serializeSignaturePubkeyPair,
          /* harmony export */
        });
        /* harmony import */ var _mysten_sui_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @mysten/sui.js */ "../node_modules/@mysten/sui.js/dist/index.mjs"
          );
        // Copyright (c) 2022, Mysten Labs, Inc.
        // SPDX-License-Identifier: Apache-2.0

        function serializeSignaturePubkeyPair(signature) {
          return {
            signatureScheme: signature.signatureScheme,
            signature: signature.signature.toString(),
            pubKey: signature.pubKey.toBase64(),
          };
        }
        function deserializeSignaturePubkeyPair(signature) {
          return {
            signatureScheme: signature.signatureScheme,
            signature:
              new _mysten_sui_js__WEBPACK_IMPORTED_MODULE_0__.Base64DataBuffer(
                signature.signature
              ),
            pubKey: signature.pubKey,
          };
        }

        /***/
      },

    /***/ "../node_modules/tslib/tslib.es6.js":
      /*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ __assign: () => /* binding */ __assign,
          /* harmony export */ __asyncDelegator: () =>
            /* binding */ __asyncDelegator,
          /* harmony export */ __asyncGenerator: () =>
            /* binding */ __asyncGenerator,
          /* harmony export */ __asyncValues: () => /* binding */ __asyncValues,
          /* harmony export */ __await: () => /* binding */ __await,
          /* harmony export */ __awaiter: () => /* binding */ __awaiter,
          /* harmony export */ __classPrivateFieldGet: () =>
            /* binding */ __classPrivateFieldGet,
          /* harmony export */ __classPrivateFieldIn: () =>
            /* binding */ __classPrivateFieldIn,
          /* harmony export */ __classPrivateFieldSet: () =>
            /* binding */ __classPrivateFieldSet,
          /* harmony export */ __createBinding: () =>
            /* binding */ __createBinding,
          /* harmony export */ __decorate: () => /* binding */ __decorate,
          /* harmony export */ __exportStar: () => /* binding */ __exportStar,
          /* harmony export */ __extends: () => /* binding */ __extends,
          /* harmony export */ __generator: () => /* binding */ __generator,
          /* harmony export */ __importDefault: () =>
            /* binding */ __importDefault,
          /* harmony export */ __importStar: () => /* binding */ __importStar,
          /* harmony export */ __makeTemplateObject: () =>
            /* binding */ __makeTemplateObject,
          /* harmony export */ __metadata: () => /* binding */ __metadata,
          /* harmony export */ __param: () => /* binding */ __param,
          /* harmony export */ __read: () => /* binding */ __read,
          /* harmony export */ __rest: () => /* binding */ __rest,
          /* harmony export */ __spread: () => /* binding */ __spread,
          /* harmony export */ __spreadArray: () => /* binding */ __spreadArray,
          /* harmony export */ __spreadArrays: () =>
            /* binding */ __spreadArrays,
          /* harmony export */ __values: () => /* binding */ __values,
          /* harmony export */
        });
        /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        /* global Reflect, Promise */

        var extendStatics = function (d, b) {
          extendStatics =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (d, b) {
                d.__proto__ = b;
              }) ||
            function (d, b) {
              for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
          return extendStatics(d, b);
        };

        function __extends(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError(
              "Class extends value " +
                String(b) +
                " is not a constructor or null"
            );
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __());
        }

        var __assign = function () {
          __assign =
            Object.assign ||
            function __assign(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
            };
          return __assign.apply(this, arguments);
        };

        function __rest(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (
              var i = 0, p = Object.getOwnPropertySymbols(s);
              i < p.length;
              i++
            ) {
              if (
                e.indexOf(p[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(s, p[i])
              )
                t[p[i]] = s[p[i]];
            }
          return t;
        }

        function __decorate(decorators, target, key, desc) {
          var c = arguments.length,
            r =
              c < 3
                ? target
                : desc === null
                ? (desc = Object.getOwnPropertyDescriptor(target, key))
                : desc,
            d;
          if (
            typeof Reflect === "object" &&
            typeof Reflect.decorate === "function"
          )
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if ((d = decorators[i]))
                r =
                  (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) ||
                  r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        }

        function __param(paramIndex, decorator) {
          return function (target, key) {
            decorator(target, key, paramIndex);
          };
        }

        function __metadata(metadataKey, metadataValue) {
          if (
            typeof Reflect === "object" &&
            typeof Reflect.metadata === "function"
          )
            return Reflect.metadata(metadataKey, metadataValue);
        }

        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        }

        function __generator(thisArg, body) {
          var _ = {
              label: 0,
              sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
              },
              trys: [],
              ops: [],
            },
            f,
            y,
            t,
            g;
          return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function verb(n) {
            return function (v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t =
                      op[0] & 2
                        ? y["return"]
                        : op[0]
                        ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                        : y.next) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (
                      !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        }

        var __createBinding = Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                !desc ||
                ("get" in desc
                  ? !m.__esModule
                  : desc.writable || desc.configurable)
              ) {
                desc = {
                  enumerable: true,
                  get: function () {
                    return m[k];
                  },
                };
              }
              Object.defineProperty(o, k2, desc);
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            };

        function __exportStar(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
        }

        function __values(o) {
          var s = typeof Symbol === "function" && Symbol.iterator,
            m = s && o[s],
            i = 0;
          if (m) return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
              },
            };
          throw new TypeError(
            s ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        }

        function __read(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m) return o;
          var i = m.call(o),
            r,
            ar = [],
            e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error: error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"])) m.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          return ar;
        }

        /** @deprecated */
        function __spread() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
          return ar;
        }

        /** @deprecated */
        function __spreadArrays() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        }

        function __spreadArray(to, from, pack) {
          if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
              }
            }
          return to.concat(ar || Array.prototype.slice.call(from));
        }

        function __await(v) {
          return this instanceof __await
            ? ((this.v = v), this)
            : new __await(v);
        }

        function __asyncGenerator(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []),
            i,
            q = [];
          return (
            (i = {}),
            verb("next"),
            verb("throw"),
            verb("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function verb(n) {
            if (g[n])
              i[n] = function (v) {
                return new Promise(function (a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await
              ? Promise.resolve(r.value.v).then(fulfill, reject)
              : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
          }
        }

        function __asyncDelegator(o) {
          var i, p;
          return (
            (i = {}),
            verb("next"),
            verb("throw", function (e) {
              throw e;
            }),
            verb("return"),
            (i[Symbol.iterator] = function () {
              return this;
            }),
            i
          );
          function verb(n, f) {
            i[n] = o[n]
              ? function (v) {
                  return (p = !p)
                    ? { value: __await(o[n](v)), done: n === "return" }
                    : f
                    ? f(v)
                    : v;
                }
              : f;
          }
        }

        function __asyncValues(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator],
            i;
          return m
            ? m.call(o)
            : ((o =
                typeof __values === "function"
                  ? __values(o)
                  : o[Symbol.iterator]()),
              (i = {}),
              verb("next"),
              verb("throw"),
              verb("return"),
              (i[Symbol.asyncIterator] = function () {
                return this;
              }),
              i);
          function verb(n) {
            i[n] =
              o[n] &&
              function (v) {
                return new Promise(function (resolve, reject) {
                  (v = o[n](v)), settle(resolve, reject, v.done, v.value);
                });
              };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
              resolve({ value: v, done: d });
            }, reject);
          }
        }

        function __makeTemplateObject(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        }

        var __setModuleDefault = Object.create
          ? function (o, v) {
              Object.defineProperty(o, "default", {
                enumerable: true,
                value: v,
              });
            }
          : function (o, v) {
              o["default"] = v;
            };

        function __importStar(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (
                k !== "default" &&
                Object.prototype.hasOwnProperty.call(mod, k)
              )
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        }

        function __importDefault(mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        }

        function __classPrivateFieldGet(receiver, state, kind, f) {
          if (kind === "a" && !f)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if (
            typeof state === "function"
              ? receiver !== state || !f
              : !state.has(receiver)
          )
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return kind === "m"
            ? f
            : kind === "a"
            ? f.call(receiver)
            : f
            ? f.value
            : state.get(receiver);
        }

        function __classPrivateFieldSet(receiver, state, value, kind, f) {
          if (kind === "m")
            throw new TypeError("Private method is not writable");
          if (kind === "a" && !f)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if (
            typeof state === "function"
              ? receiver !== state || !f
              : !state.has(receiver)
          )
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return (
            kind === "a"
              ? f.call(receiver, value)
              : f
              ? (f.value = value)
              : state.set(receiver, value),
            value
          );
        }

        function __classPrivateFieldIn(state, receiver) {
          if (
            receiver === null ||
            (typeof receiver !== "object" && typeof receiver !== "function")
          )
            throw new TypeError("Cannot use 'in' operator on non-object");
          return typeof state === "function"
            ? receiver === state
            : state.has(receiver);
        }

        /***/
      },

    /***/ "../node_modules/tweetnacl/nacl-fast.js":
      /*!**********************************************!*\
  !*** ../node_modules/tweetnacl/nacl-fast.js ***!
  \**********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        (function (nacl) {
          "use strict";

          // Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
          // Public domain.
          //
          // Implementation derived from TweetNaCl version 20140427.
          // See for details: http://tweetnacl.cr.yp.to/

          var gf = function (init) {
            var i,
              r = new Float64Array(16);
            if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
            return r;
          };

          //  Pluggable, initialized in high-level API below.
          var randombytes = function (/* x, n */) {
            throw new Error("no PRNG");
          };

          var _0 = new Uint8Array(16);
          var _9 = new Uint8Array(32);
          _9[0] = 9;

          var gf0 = gf(),
            gf1 = gf([1]),
            _121665 = gf([0xdb41, 1]),
            D = gf([
              0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070,
              0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203,
            ]),
            D2 = gf([
              0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0,
              0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406,
            ]),
            X = gf([
              0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c,
              0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169,
            ]),
            Y = gf([
              0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666,
              0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666,
            ]),
            I = gf([
              0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43,
              0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83,
            ]);

          function ts64(x, i, h, l) {
            x[i] = (h >> 24) & 0xff;
            x[i + 1] = (h >> 16) & 0xff;
            x[i + 2] = (h >> 8) & 0xff;
            x[i + 3] = h & 0xff;
            x[i + 4] = (l >> 24) & 0xff;
            x[i + 5] = (l >> 16) & 0xff;
            x[i + 6] = (l >> 8) & 0xff;
            x[i + 7] = l & 0xff;
          }

          function vn(x, xi, y, yi, n) {
            var i,
              d = 0;
            for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
            return (1 & ((d - 1) >>> 8)) - 1;
          }

          function crypto_verify_16(x, xi, y, yi) {
            return vn(x, xi, y, yi, 16);
          }

          function crypto_verify_32(x, xi, y, yi) {
            return vn(x, xi, y, yi, 32);
          }

          function core_salsa20(o, p, k, c) {
            var j0 =
                (c[0] & 0xff) |
                ((c[1] & 0xff) << 8) |
                ((c[2] & 0xff) << 16) |
                ((c[3] & 0xff) << 24),
              j1 =
                (k[0] & 0xff) |
                ((k[1] & 0xff) << 8) |
                ((k[2] & 0xff) << 16) |
                ((k[3] & 0xff) << 24),
              j2 =
                (k[4] & 0xff) |
                ((k[5] & 0xff) << 8) |
                ((k[6] & 0xff) << 16) |
                ((k[7] & 0xff) << 24),
              j3 =
                (k[8] & 0xff) |
                ((k[9] & 0xff) << 8) |
                ((k[10] & 0xff) << 16) |
                ((k[11] & 0xff) << 24),
              j4 =
                (k[12] & 0xff) |
                ((k[13] & 0xff) << 8) |
                ((k[14] & 0xff) << 16) |
                ((k[15] & 0xff) << 24),
              j5 =
                (c[4] & 0xff) |
                ((c[5] & 0xff) << 8) |
                ((c[6] & 0xff) << 16) |
                ((c[7] & 0xff) << 24),
              j6 =
                (p[0] & 0xff) |
                ((p[1] & 0xff) << 8) |
                ((p[2] & 0xff) << 16) |
                ((p[3] & 0xff) << 24),
              j7 =
                (p[4] & 0xff) |
                ((p[5] & 0xff) << 8) |
                ((p[6] & 0xff) << 16) |
                ((p[7] & 0xff) << 24),
              j8 =
                (p[8] & 0xff) |
                ((p[9] & 0xff) << 8) |
                ((p[10] & 0xff) << 16) |
                ((p[11] & 0xff) << 24),
              j9 =
                (p[12] & 0xff) |
                ((p[13] & 0xff) << 8) |
                ((p[14] & 0xff) << 16) |
                ((p[15] & 0xff) << 24),
              j10 =
                (c[8] & 0xff) |
                ((c[9] & 0xff) << 8) |
                ((c[10] & 0xff) << 16) |
                ((c[11] & 0xff) << 24),
              j11 =
                (k[16] & 0xff) |
                ((k[17] & 0xff) << 8) |
                ((k[18] & 0xff) << 16) |
                ((k[19] & 0xff) << 24),
              j12 =
                (k[20] & 0xff) |
                ((k[21] & 0xff) << 8) |
                ((k[22] & 0xff) << 16) |
                ((k[23] & 0xff) << 24),
              j13 =
                (k[24] & 0xff) |
                ((k[25] & 0xff) << 8) |
                ((k[26] & 0xff) << 16) |
                ((k[27] & 0xff) << 24),
              j14 =
                (k[28] & 0xff) |
                ((k[29] & 0xff) << 8) |
                ((k[30] & 0xff) << 16) |
                ((k[31] & 0xff) << 24),
              j15 =
                (c[12] & 0xff) |
                ((c[13] & 0xff) << 8) |
                ((c[14] & 0xff) << 16) |
                ((c[15] & 0xff) << 24);

            var x0 = j0,
              x1 = j1,
              x2 = j2,
              x3 = j3,
              x4 = j4,
              x5 = j5,
              x6 = j6,
              x7 = j7,
              x8 = j8,
              x9 = j9,
              x10 = j10,
              x11 = j11,
              x12 = j12,
              x13 = j13,
              x14 = j14,
              x15 = j15,
              u;

            for (var i = 0; i < 20; i += 2) {
              u = (x0 + x12) | 0;
              x4 ^= (u << 7) | (u >>> (32 - 7));
              u = (x4 + x0) | 0;
              x8 ^= (u << 9) | (u >>> (32 - 9));
              u = (x8 + x4) | 0;
              x12 ^= (u << 13) | (u >>> (32 - 13));
              u = (x12 + x8) | 0;
              x0 ^= (u << 18) | (u >>> (32 - 18));

              u = (x5 + x1) | 0;
              x9 ^= (u << 7) | (u >>> (32 - 7));
              u = (x9 + x5) | 0;
              x13 ^= (u << 9) | (u >>> (32 - 9));
              u = (x13 + x9) | 0;
              x1 ^= (u << 13) | (u >>> (32 - 13));
              u = (x1 + x13) | 0;
              x5 ^= (u << 18) | (u >>> (32 - 18));

              u = (x10 + x6) | 0;
              x14 ^= (u << 7) | (u >>> (32 - 7));
              u = (x14 + x10) | 0;
              x2 ^= (u << 9) | (u >>> (32 - 9));
              u = (x2 + x14) | 0;
              x6 ^= (u << 13) | (u >>> (32 - 13));
              u = (x6 + x2) | 0;
              x10 ^= (u << 18) | (u >>> (32 - 18));

              u = (x15 + x11) | 0;
              x3 ^= (u << 7) | (u >>> (32 - 7));
              u = (x3 + x15) | 0;
              x7 ^= (u << 9) | (u >>> (32 - 9));
              u = (x7 + x3) | 0;
              x11 ^= (u << 13) | (u >>> (32 - 13));
              u = (x11 + x7) | 0;
              x15 ^= (u << 18) | (u >>> (32 - 18));

              u = (x0 + x3) | 0;
              x1 ^= (u << 7) | (u >>> (32 - 7));
              u = (x1 + x0) | 0;
              x2 ^= (u << 9) | (u >>> (32 - 9));
              u = (x2 + x1) | 0;
              x3 ^= (u << 13) | (u >>> (32 - 13));
              u = (x3 + x2) | 0;
              x0 ^= (u << 18) | (u >>> (32 - 18));

              u = (x5 + x4) | 0;
              x6 ^= (u << 7) | (u >>> (32 - 7));
              u = (x6 + x5) | 0;
              x7 ^= (u << 9) | (u >>> (32 - 9));
              u = (x7 + x6) | 0;
              x4 ^= (u << 13) | (u >>> (32 - 13));
              u = (x4 + x7) | 0;
              x5 ^= (u << 18) | (u >>> (32 - 18));

              u = (x10 + x9) | 0;
              x11 ^= (u << 7) | (u >>> (32 - 7));
              u = (x11 + x10) | 0;
              x8 ^= (u << 9) | (u >>> (32 - 9));
              u = (x8 + x11) | 0;
              x9 ^= (u << 13) | (u >>> (32 - 13));
              u = (x9 + x8) | 0;
              x10 ^= (u << 18) | (u >>> (32 - 18));

              u = (x15 + x14) | 0;
              x12 ^= (u << 7) | (u >>> (32 - 7));
              u = (x12 + x15) | 0;
              x13 ^= (u << 9) | (u >>> (32 - 9));
              u = (x13 + x12) | 0;
              x14 ^= (u << 13) | (u >>> (32 - 13));
              u = (x14 + x13) | 0;
              x15 ^= (u << 18) | (u >>> (32 - 18));
            }
            x0 = (x0 + j0) | 0;
            x1 = (x1 + j1) | 0;
            x2 = (x2 + j2) | 0;
            x3 = (x3 + j3) | 0;
            x4 = (x4 + j4) | 0;
            x5 = (x5 + j5) | 0;
            x6 = (x6 + j6) | 0;
            x7 = (x7 + j7) | 0;
            x8 = (x8 + j8) | 0;
            x9 = (x9 + j9) | 0;
            x10 = (x10 + j10) | 0;
            x11 = (x11 + j11) | 0;
            x12 = (x12 + j12) | 0;
            x13 = (x13 + j13) | 0;
            x14 = (x14 + j14) | 0;
            x15 = (x15 + j15) | 0;

            o[0] = (x0 >>> 0) & 0xff;
            o[1] = (x0 >>> 8) & 0xff;
            o[2] = (x0 >>> 16) & 0xff;
            o[3] = (x0 >>> 24) & 0xff;

            o[4] = (x1 >>> 0) & 0xff;
            o[5] = (x1 >>> 8) & 0xff;
            o[6] = (x1 >>> 16) & 0xff;
            o[7] = (x1 >>> 24) & 0xff;

            o[8] = (x2 >>> 0) & 0xff;
            o[9] = (x2 >>> 8) & 0xff;
            o[10] = (x2 >>> 16) & 0xff;
            o[11] = (x2 >>> 24) & 0xff;

            o[12] = (x3 >>> 0) & 0xff;
            o[13] = (x3 >>> 8) & 0xff;
            o[14] = (x3 >>> 16) & 0xff;
            o[15] = (x3 >>> 24) & 0xff;

            o[16] = (x4 >>> 0) & 0xff;
            o[17] = (x4 >>> 8) & 0xff;
            o[18] = (x4 >>> 16) & 0xff;
            o[19] = (x4 >>> 24) & 0xff;

            o[20] = (x5 >>> 0) & 0xff;
            o[21] = (x5 >>> 8) & 0xff;
            o[22] = (x5 >>> 16) & 0xff;
            o[23] = (x5 >>> 24) & 0xff;

            o[24] = (x6 >>> 0) & 0xff;
            o[25] = (x6 >>> 8) & 0xff;
            o[26] = (x6 >>> 16) & 0xff;
            o[27] = (x6 >>> 24) & 0xff;

            o[28] = (x7 >>> 0) & 0xff;
            o[29] = (x7 >>> 8) & 0xff;
            o[30] = (x7 >>> 16) & 0xff;
            o[31] = (x7 >>> 24) & 0xff;

            o[32] = (x8 >>> 0) & 0xff;
            o[33] = (x8 >>> 8) & 0xff;
            o[34] = (x8 >>> 16) & 0xff;
            o[35] = (x8 >>> 24) & 0xff;

            o[36] = (x9 >>> 0) & 0xff;
            o[37] = (x9 >>> 8) & 0xff;
            o[38] = (x9 >>> 16) & 0xff;
            o[39] = (x9 >>> 24) & 0xff;

            o[40] = (x10 >>> 0) & 0xff;
            o[41] = (x10 >>> 8) & 0xff;
            o[42] = (x10 >>> 16) & 0xff;
            o[43] = (x10 >>> 24) & 0xff;

            o[44] = (x11 >>> 0) & 0xff;
            o[45] = (x11 >>> 8) & 0xff;
            o[46] = (x11 >>> 16) & 0xff;
            o[47] = (x11 >>> 24) & 0xff;

            o[48] = (x12 >>> 0) & 0xff;
            o[49] = (x12 >>> 8) & 0xff;
            o[50] = (x12 >>> 16) & 0xff;
            o[51] = (x12 >>> 24) & 0xff;

            o[52] = (x13 >>> 0) & 0xff;
            o[53] = (x13 >>> 8) & 0xff;
            o[54] = (x13 >>> 16) & 0xff;
            o[55] = (x13 >>> 24) & 0xff;

            o[56] = (x14 >>> 0) & 0xff;
            o[57] = (x14 >>> 8) & 0xff;
            o[58] = (x14 >>> 16) & 0xff;
            o[59] = (x14 >>> 24) & 0xff;

            o[60] = (x15 >>> 0) & 0xff;
            o[61] = (x15 >>> 8) & 0xff;
            o[62] = (x15 >>> 16) & 0xff;
            o[63] = (x15 >>> 24) & 0xff;
          }

          function core_hsalsa20(o, p, k, c) {
            var j0 =
                (c[0] & 0xff) |
                ((c[1] & 0xff) << 8) |
                ((c[2] & 0xff) << 16) |
                ((c[3] & 0xff) << 24),
              j1 =
                (k[0] & 0xff) |
                ((k[1] & 0xff) << 8) |
                ((k[2] & 0xff) << 16) |
                ((k[3] & 0xff) << 24),
              j2 =
                (k[4] & 0xff) |
                ((k[5] & 0xff) << 8) |
                ((k[6] & 0xff) << 16) |
                ((k[7] & 0xff) << 24),
              j3 =
                (k[8] & 0xff) |
                ((k[9] & 0xff) << 8) |
                ((k[10] & 0xff) << 16) |
                ((k[11] & 0xff) << 24),
              j4 =
                (k[12] & 0xff) |
                ((k[13] & 0xff) << 8) |
                ((k[14] & 0xff) << 16) |
                ((k[15] & 0xff) << 24),
              j5 =
                (c[4] & 0xff) |
                ((c[5] & 0xff) << 8) |
                ((c[6] & 0xff) << 16) |
                ((c[7] & 0xff) << 24),
              j6 =
                (p[0] & 0xff) |
                ((p[1] & 0xff) << 8) |
                ((p[2] & 0xff) << 16) |
                ((p[3] & 0xff) << 24),
              j7 =
                (p[4] & 0xff) |
                ((p[5] & 0xff) << 8) |
                ((p[6] & 0xff) << 16) |
                ((p[7] & 0xff) << 24),
              j8 =
                (p[8] & 0xff) |
                ((p[9] & 0xff) << 8) |
                ((p[10] & 0xff) << 16) |
                ((p[11] & 0xff) << 24),
              j9 =
                (p[12] & 0xff) |
                ((p[13] & 0xff) << 8) |
                ((p[14] & 0xff) << 16) |
                ((p[15] & 0xff) << 24),
              j10 =
                (c[8] & 0xff) |
                ((c[9] & 0xff) << 8) |
                ((c[10] & 0xff) << 16) |
                ((c[11] & 0xff) << 24),
              j11 =
                (k[16] & 0xff) |
                ((k[17] & 0xff) << 8) |
                ((k[18] & 0xff) << 16) |
                ((k[19] & 0xff) << 24),
              j12 =
                (k[20] & 0xff) |
                ((k[21] & 0xff) << 8) |
                ((k[22] & 0xff) << 16) |
                ((k[23] & 0xff) << 24),
              j13 =
                (k[24] & 0xff) |
                ((k[25] & 0xff) << 8) |
                ((k[26] & 0xff) << 16) |
                ((k[27] & 0xff) << 24),
              j14 =
                (k[28] & 0xff) |
                ((k[29] & 0xff) << 8) |
                ((k[30] & 0xff) << 16) |
                ((k[31] & 0xff) << 24),
              j15 =
                (c[12] & 0xff) |
                ((c[13] & 0xff) << 8) |
                ((c[14] & 0xff) << 16) |
                ((c[15] & 0xff) << 24);

            var x0 = j0,
              x1 = j1,
              x2 = j2,
              x3 = j3,
              x4 = j4,
              x5 = j5,
              x6 = j6,
              x7 = j7,
              x8 = j8,
              x9 = j9,
              x10 = j10,
              x11 = j11,
              x12 = j12,
              x13 = j13,
              x14 = j14,
              x15 = j15,
              u;

            for (var i = 0; i < 20; i += 2) {
              u = (x0 + x12) | 0;
              x4 ^= (u << 7) | (u >>> (32 - 7));
              u = (x4 + x0) | 0;
              x8 ^= (u << 9) | (u >>> (32 - 9));
              u = (x8 + x4) | 0;
              x12 ^= (u << 13) | (u >>> (32 - 13));
              u = (x12 + x8) | 0;
              x0 ^= (u << 18) | (u >>> (32 - 18));

              u = (x5 + x1) | 0;
              x9 ^= (u << 7) | (u >>> (32 - 7));
              u = (x9 + x5) | 0;
              x13 ^= (u << 9) | (u >>> (32 - 9));
              u = (x13 + x9) | 0;
              x1 ^= (u << 13) | (u >>> (32 - 13));
              u = (x1 + x13) | 0;
              x5 ^= (u << 18) | (u >>> (32 - 18));

              u = (x10 + x6) | 0;
              x14 ^= (u << 7) | (u >>> (32 - 7));
              u = (x14 + x10) | 0;
              x2 ^= (u << 9) | (u >>> (32 - 9));
              u = (x2 + x14) | 0;
              x6 ^= (u << 13) | (u >>> (32 - 13));
              u = (x6 + x2) | 0;
              x10 ^= (u << 18) | (u >>> (32 - 18));

              u = (x15 + x11) | 0;
              x3 ^= (u << 7) | (u >>> (32 - 7));
              u = (x3 + x15) | 0;
              x7 ^= (u << 9) | (u >>> (32 - 9));
              u = (x7 + x3) | 0;
              x11 ^= (u << 13) | (u >>> (32 - 13));
              u = (x11 + x7) | 0;
              x15 ^= (u << 18) | (u >>> (32 - 18));

              u = (x0 + x3) | 0;
              x1 ^= (u << 7) | (u >>> (32 - 7));
              u = (x1 + x0) | 0;
              x2 ^= (u << 9) | (u >>> (32 - 9));
              u = (x2 + x1) | 0;
              x3 ^= (u << 13) | (u >>> (32 - 13));
              u = (x3 + x2) | 0;
              x0 ^= (u << 18) | (u >>> (32 - 18));

              u = (x5 + x4) | 0;
              x6 ^= (u << 7) | (u >>> (32 - 7));
              u = (x6 + x5) | 0;
              x7 ^= (u << 9) | (u >>> (32 - 9));
              u = (x7 + x6) | 0;
              x4 ^= (u << 13) | (u >>> (32 - 13));
              u = (x4 + x7) | 0;
              x5 ^= (u << 18) | (u >>> (32 - 18));

              u = (x10 + x9) | 0;
              x11 ^= (u << 7) | (u >>> (32 - 7));
              u = (x11 + x10) | 0;
              x8 ^= (u << 9) | (u >>> (32 - 9));
              u = (x8 + x11) | 0;
              x9 ^= (u << 13) | (u >>> (32 - 13));
              u = (x9 + x8) | 0;
              x10 ^= (u << 18) | (u >>> (32 - 18));

              u = (x15 + x14) | 0;
              x12 ^= (u << 7) | (u >>> (32 - 7));
              u = (x12 + x15) | 0;
              x13 ^= (u << 9) | (u >>> (32 - 9));
              u = (x13 + x12) | 0;
              x14 ^= (u << 13) | (u >>> (32 - 13));
              u = (x14 + x13) | 0;
              x15 ^= (u << 18) | (u >>> (32 - 18));
            }

            o[0] = (x0 >>> 0) & 0xff;
            o[1] = (x0 >>> 8) & 0xff;
            o[2] = (x0 >>> 16) & 0xff;
            o[3] = (x0 >>> 24) & 0xff;

            o[4] = (x5 >>> 0) & 0xff;
            o[5] = (x5 >>> 8) & 0xff;
            o[6] = (x5 >>> 16) & 0xff;
            o[7] = (x5 >>> 24) & 0xff;

            o[8] = (x10 >>> 0) & 0xff;
            o[9] = (x10 >>> 8) & 0xff;
            o[10] = (x10 >>> 16) & 0xff;
            o[11] = (x10 >>> 24) & 0xff;

            o[12] = (x15 >>> 0) & 0xff;
            o[13] = (x15 >>> 8) & 0xff;
            o[14] = (x15 >>> 16) & 0xff;
            o[15] = (x15 >>> 24) & 0xff;

            o[16] = (x6 >>> 0) & 0xff;
            o[17] = (x6 >>> 8) & 0xff;
            o[18] = (x6 >>> 16) & 0xff;
            o[19] = (x6 >>> 24) & 0xff;

            o[20] = (x7 >>> 0) & 0xff;
            o[21] = (x7 >>> 8) & 0xff;
            o[22] = (x7 >>> 16) & 0xff;
            o[23] = (x7 >>> 24) & 0xff;

            o[24] = (x8 >>> 0) & 0xff;
            o[25] = (x8 >>> 8) & 0xff;
            o[26] = (x8 >>> 16) & 0xff;
            o[27] = (x8 >>> 24) & 0xff;

            o[28] = (x9 >>> 0) & 0xff;
            o[29] = (x9 >>> 8) & 0xff;
            o[30] = (x9 >>> 16) & 0xff;
            o[31] = (x9 >>> 24) & 0xff;
          }

          function crypto_core_salsa20(out, inp, k, c) {
            core_salsa20(out, inp, k, c);
          }

          function crypto_core_hsalsa20(out, inp, k, c) {
            core_hsalsa20(out, inp, k, c);
          }

          var sigma = new Uint8Array([
            101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32,
            107,
          ]);
          // "expand 32-byte k"

          function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
            var z = new Uint8Array(16),
              x = new Uint8Array(64);
            var u, i;
            for (i = 0; i < 16; i++) z[i] = 0;
            for (i = 0; i < 8; i++) z[i] = n[i];
            while (b >= 64) {
              crypto_core_salsa20(x, z, k, sigma);
              for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
              u = 1;
              for (i = 8; i < 16; i++) {
                u = (u + (z[i] & 0xff)) | 0;
                z[i] = u & 0xff;
                u >>>= 8;
              }
              b -= 64;
              cpos += 64;
              mpos += 64;
            }
            if (b > 0) {
              crypto_core_salsa20(x, z, k, sigma);
              for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
            }
            return 0;
          }

          function crypto_stream_salsa20(c, cpos, b, n, k) {
            var z = new Uint8Array(16),
              x = new Uint8Array(64);
            var u, i;
            for (i = 0; i < 16; i++) z[i] = 0;
            for (i = 0; i < 8; i++) z[i] = n[i];
            while (b >= 64) {
              crypto_core_salsa20(x, z, k, sigma);
              for (i = 0; i < 64; i++) c[cpos + i] = x[i];
              u = 1;
              for (i = 8; i < 16; i++) {
                u = (u + (z[i] & 0xff)) | 0;
                z[i] = u & 0xff;
                u >>>= 8;
              }
              b -= 64;
              cpos += 64;
            }
            if (b > 0) {
              crypto_core_salsa20(x, z, k, sigma);
              for (i = 0; i < b; i++) c[cpos + i] = x[i];
            }
            return 0;
          }

          function crypto_stream(c, cpos, d, n, k) {
            var s = new Uint8Array(32);
            crypto_core_hsalsa20(s, n, k, sigma);
            var sn = new Uint8Array(8);
            for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
            return crypto_stream_salsa20(c, cpos, d, sn, s);
          }

          function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
            var s = new Uint8Array(32);
            crypto_core_hsalsa20(s, n, k, sigma);
            var sn = new Uint8Array(8);
            for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
            return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
          }

          /*
           * Port of Andrew Moon's Poly1305-donna-16. Public domain.
           * https://github.com/floodyberry/poly1305-donna
           */

          var poly1305 = function (key) {
            this.buffer = new Uint8Array(16);
            this.r = new Uint16Array(10);
            this.h = new Uint16Array(10);
            this.pad = new Uint16Array(8);
            this.leftover = 0;
            this.fin = 0;

            var t0, t1, t2, t3, t4, t5, t6, t7;

            t0 = (key[0] & 0xff) | ((key[1] & 0xff) << 8);
            this.r[0] = t0 & 0x1fff;
            t1 = (key[2] & 0xff) | ((key[3] & 0xff) << 8);
            this.r[1] = ((t0 >>> 13) | (t1 << 3)) & 0x1fff;
            t2 = (key[4] & 0xff) | ((key[5] & 0xff) << 8);
            this.r[2] = ((t1 >>> 10) | (t2 << 6)) & 0x1f03;
            t3 = (key[6] & 0xff) | ((key[7] & 0xff) << 8);
            this.r[3] = ((t2 >>> 7) | (t3 << 9)) & 0x1fff;
            t4 = (key[8] & 0xff) | ((key[9] & 0xff) << 8);
            this.r[4] = ((t3 >>> 4) | (t4 << 12)) & 0x00ff;
            this.r[5] = (t4 >>> 1) & 0x1ffe;
            t5 = (key[10] & 0xff) | ((key[11] & 0xff) << 8);
            this.r[6] = ((t4 >>> 14) | (t5 << 2)) & 0x1fff;
            t6 = (key[12] & 0xff) | ((key[13] & 0xff) << 8);
            this.r[7] = ((t5 >>> 11) | (t6 << 5)) & 0x1f81;
            t7 = (key[14] & 0xff) | ((key[15] & 0xff) << 8);
            this.r[8] = ((t6 >>> 8) | (t7 << 8)) & 0x1fff;
            this.r[9] = (t7 >>> 5) & 0x007f;

            this.pad[0] = (key[16] & 0xff) | ((key[17] & 0xff) << 8);
            this.pad[1] = (key[18] & 0xff) | ((key[19] & 0xff) << 8);
            this.pad[2] = (key[20] & 0xff) | ((key[21] & 0xff) << 8);
            this.pad[3] = (key[22] & 0xff) | ((key[23] & 0xff) << 8);
            this.pad[4] = (key[24] & 0xff) | ((key[25] & 0xff) << 8);
            this.pad[5] = (key[26] & 0xff) | ((key[27] & 0xff) << 8);
            this.pad[6] = (key[28] & 0xff) | ((key[29] & 0xff) << 8);
            this.pad[7] = (key[30] & 0xff) | ((key[31] & 0xff) << 8);
          };

          poly1305.prototype.blocks = function (m, mpos, bytes) {
            var hibit = this.fin ? 0 : 1 << 11;
            var t0, t1, t2, t3, t4, t5, t6, t7, c;
            var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

            var h0 = this.h[0],
              h1 = this.h[1],
              h2 = this.h[2],
              h3 = this.h[3],
              h4 = this.h[4],
              h5 = this.h[5],
              h6 = this.h[6],
              h7 = this.h[7],
              h8 = this.h[8],
              h9 = this.h[9];

            var r0 = this.r[0],
              r1 = this.r[1],
              r2 = this.r[2],
              r3 = this.r[3],
              r4 = this.r[4],
              r5 = this.r[5],
              r6 = this.r[6],
              r7 = this.r[7],
              r8 = this.r[8],
              r9 = this.r[9];

            while (bytes >= 16) {
              t0 = (m[mpos + 0] & 0xff) | ((m[mpos + 1] & 0xff) << 8);
              h0 += t0 & 0x1fff;
              t1 = (m[mpos + 2] & 0xff) | ((m[mpos + 3] & 0xff) << 8);
              h1 += ((t0 >>> 13) | (t1 << 3)) & 0x1fff;
              t2 = (m[mpos + 4] & 0xff) | ((m[mpos + 5] & 0xff) << 8);
              h2 += ((t1 >>> 10) | (t2 << 6)) & 0x1fff;
              t3 = (m[mpos + 6] & 0xff) | ((m[mpos + 7] & 0xff) << 8);
              h3 += ((t2 >>> 7) | (t3 << 9)) & 0x1fff;
              t4 = (m[mpos + 8] & 0xff) | ((m[mpos + 9] & 0xff) << 8);
              h4 += ((t3 >>> 4) | (t4 << 12)) & 0x1fff;
              h5 += (t4 >>> 1) & 0x1fff;
              t5 = (m[mpos + 10] & 0xff) | ((m[mpos + 11] & 0xff) << 8);
              h6 += ((t4 >>> 14) | (t5 << 2)) & 0x1fff;
              t6 = (m[mpos + 12] & 0xff) | ((m[mpos + 13] & 0xff) << 8);
              h7 += ((t5 >>> 11) | (t6 << 5)) & 0x1fff;
              t7 = (m[mpos + 14] & 0xff) | ((m[mpos + 15] & 0xff) << 8);
              h8 += ((t6 >>> 8) | (t7 << 8)) & 0x1fff;
              h9 += (t7 >>> 5) | hibit;

              c = 0;

              d0 = c;
              d0 += h0 * r0;
              d0 += h1 * (5 * r9);
              d0 += h2 * (5 * r8);
              d0 += h3 * (5 * r7);
              d0 += h4 * (5 * r6);
              c = d0 >>> 13;
              d0 &= 0x1fff;
              d0 += h5 * (5 * r5);
              d0 += h6 * (5 * r4);
              d0 += h7 * (5 * r3);
              d0 += h8 * (5 * r2);
              d0 += h9 * (5 * r1);
              c += d0 >>> 13;
              d0 &= 0x1fff;

              d1 = c;
              d1 += h0 * r1;
              d1 += h1 * r0;
              d1 += h2 * (5 * r9);
              d1 += h3 * (5 * r8);
              d1 += h4 * (5 * r7);
              c = d1 >>> 13;
              d1 &= 0x1fff;
              d1 += h5 * (5 * r6);
              d1 += h6 * (5 * r5);
              d1 += h7 * (5 * r4);
              d1 += h8 * (5 * r3);
              d1 += h9 * (5 * r2);
              c += d1 >>> 13;
              d1 &= 0x1fff;

              d2 = c;
              d2 += h0 * r2;
              d2 += h1 * r1;
              d2 += h2 * r0;
              d2 += h3 * (5 * r9);
              d2 += h4 * (5 * r8);
              c = d2 >>> 13;
              d2 &= 0x1fff;
              d2 += h5 * (5 * r7);
              d2 += h6 * (5 * r6);
              d2 += h7 * (5 * r5);
              d2 += h8 * (5 * r4);
              d2 += h9 * (5 * r3);
              c += d2 >>> 13;
              d2 &= 0x1fff;

              d3 = c;
              d3 += h0 * r3;
              d3 += h1 * r2;
              d3 += h2 * r1;
              d3 += h3 * r0;
              d3 += h4 * (5 * r9);
              c = d3 >>> 13;
              d3 &= 0x1fff;
              d3 += h5 * (5 * r8);
              d3 += h6 * (5 * r7);
              d3 += h7 * (5 * r6);
              d3 += h8 * (5 * r5);
              d3 += h9 * (5 * r4);
              c += d3 >>> 13;
              d3 &= 0x1fff;

              d4 = c;
              d4 += h0 * r4;
              d4 += h1 * r3;
              d4 += h2 * r2;
              d4 += h3 * r1;
              d4 += h4 * r0;
              c = d4 >>> 13;
              d4 &= 0x1fff;
              d4 += h5 * (5 * r9);
              d4 += h6 * (5 * r8);
              d4 += h7 * (5 * r7);
              d4 += h8 * (5 * r6);
              d4 += h9 * (5 * r5);
              c += d4 >>> 13;
              d4 &= 0x1fff;

              d5 = c;
              d5 += h0 * r5;
              d5 += h1 * r4;
              d5 += h2 * r3;
              d5 += h3 * r2;
              d5 += h4 * r1;
              c = d5 >>> 13;
              d5 &= 0x1fff;
              d5 += h5 * r0;
              d5 += h6 * (5 * r9);
              d5 += h7 * (5 * r8);
              d5 += h8 * (5 * r7);
              d5 += h9 * (5 * r6);
              c += d5 >>> 13;
              d5 &= 0x1fff;

              d6 = c;
              d6 += h0 * r6;
              d6 += h1 * r5;
              d6 += h2 * r4;
              d6 += h3 * r3;
              d6 += h4 * r2;
              c = d6 >>> 13;
              d6 &= 0x1fff;
              d6 += h5 * r1;
              d6 += h6 * r0;
              d6 += h7 * (5 * r9);
              d6 += h8 * (5 * r8);
              d6 += h9 * (5 * r7);
              c += d6 >>> 13;
              d6 &= 0x1fff;

              d7 = c;
              d7 += h0 * r7;
              d7 += h1 * r6;
              d7 += h2 * r5;
              d7 += h3 * r4;
              d7 += h4 * r3;
              c = d7 >>> 13;
              d7 &= 0x1fff;
              d7 += h5 * r2;
              d7 += h6 * r1;
              d7 += h7 * r0;
              d7 += h8 * (5 * r9);
              d7 += h9 * (5 * r8);
              c += d7 >>> 13;
              d7 &= 0x1fff;

              d8 = c;
              d8 += h0 * r8;
              d8 += h1 * r7;
              d8 += h2 * r6;
              d8 += h3 * r5;
              d8 += h4 * r4;
              c = d8 >>> 13;
              d8 &= 0x1fff;
              d8 += h5 * r3;
              d8 += h6 * r2;
              d8 += h7 * r1;
              d8 += h8 * r0;
              d8 += h9 * (5 * r9);
              c += d8 >>> 13;
              d8 &= 0x1fff;

              d9 = c;
              d9 += h0 * r9;
              d9 += h1 * r8;
              d9 += h2 * r7;
              d9 += h3 * r6;
              d9 += h4 * r5;
              c = d9 >>> 13;
              d9 &= 0x1fff;
              d9 += h5 * r4;
              d9 += h6 * r3;
              d9 += h7 * r2;
              d9 += h8 * r1;
              d9 += h9 * r0;
              c += d9 >>> 13;
              d9 &= 0x1fff;

              c = ((c << 2) + c) | 0;
              c = (c + d0) | 0;
              d0 = c & 0x1fff;
              c = c >>> 13;
              d1 += c;

              h0 = d0;
              h1 = d1;
              h2 = d2;
              h3 = d3;
              h4 = d4;
              h5 = d5;
              h6 = d6;
              h7 = d7;
              h8 = d8;
              h9 = d9;

              mpos += 16;
              bytes -= 16;
            }
            this.h[0] = h0;
            this.h[1] = h1;
            this.h[2] = h2;
            this.h[3] = h3;
            this.h[4] = h4;
            this.h[5] = h5;
            this.h[6] = h6;
            this.h[7] = h7;
            this.h[8] = h8;
            this.h[9] = h9;
          };

          poly1305.prototype.finish = function (mac, macpos) {
            var g = new Uint16Array(10);
            var c, mask, f, i;

            if (this.leftover) {
              i = this.leftover;
              this.buffer[i++] = 1;
              for (; i < 16; i++) this.buffer[i] = 0;
              this.fin = 1;
              this.blocks(this.buffer, 0, 16);
            }

            c = this.h[1] >>> 13;
            this.h[1] &= 0x1fff;
            for (i = 2; i < 10; i++) {
              this.h[i] += c;
              c = this.h[i] >>> 13;
              this.h[i] &= 0x1fff;
            }
            this.h[0] += c * 5;
            c = this.h[0] >>> 13;
            this.h[0] &= 0x1fff;
            this.h[1] += c;
            c = this.h[1] >>> 13;
            this.h[1] &= 0x1fff;
            this.h[2] += c;

            g[0] = this.h[0] + 5;
            c = g[0] >>> 13;
            g[0] &= 0x1fff;
            for (i = 1; i < 10; i++) {
              g[i] = this.h[i] + c;
              c = g[i] >>> 13;
              g[i] &= 0x1fff;
            }
            g[9] -= 1 << 13;

            mask = (c ^ 1) - 1;
            for (i = 0; i < 10; i++) g[i] &= mask;
            mask = ~mask;
            for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

            this.h[0] = (this.h[0] | (this.h[1] << 13)) & 0xffff;
            this.h[1] = ((this.h[1] >>> 3) | (this.h[2] << 10)) & 0xffff;
            this.h[2] = ((this.h[2] >>> 6) | (this.h[3] << 7)) & 0xffff;
            this.h[3] = ((this.h[3] >>> 9) | (this.h[4] << 4)) & 0xffff;
            this.h[4] =
              ((this.h[4] >>> 12) | (this.h[5] << 1) | (this.h[6] << 14)) &
              0xffff;
            this.h[5] = ((this.h[6] >>> 2) | (this.h[7] << 11)) & 0xffff;
            this.h[6] = ((this.h[7] >>> 5) | (this.h[8] << 8)) & 0xffff;
            this.h[7] = ((this.h[8] >>> 8) | (this.h[9] << 5)) & 0xffff;

            f = this.h[0] + this.pad[0];
            this.h[0] = f & 0xffff;
            for (i = 1; i < 8; i++) {
              f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
              this.h[i] = f & 0xffff;
            }

            mac[macpos + 0] = (this.h[0] >>> 0) & 0xff;
            mac[macpos + 1] = (this.h[0] >>> 8) & 0xff;
            mac[macpos + 2] = (this.h[1] >>> 0) & 0xff;
            mac[macpos + 3] = (this.h[1] >>> 8) & 0xff;
            mac[macpos + 4] = (this.h[2] >>> 0) & 0xff;
            mac[macpos + 5] = (this.h[2] >>> 8) & 0xff;
            mac[macpos + 6] = (this.h[3] >>> 0) & 0xff;
            mac[macpos + 7] = (this.h[3] >>> 8) & 0xff;
            mac[macpos + 8] = (this.h[4] >>> 0) & 0xff;
            mac[macpos + 9] = (this.h[4] >>> 8) & 0xff;
            mac[macpos + 10] = (this.h[5] >>> 0) & 0xff;
            mac[macpos + 11] = (this.h[5] >>> 8) & 0xff;
            mac[macpos + 12] = (this.h[6] >>> 0) & 0xff;
            mac[macpos + 13] = (this.h[6] >>> 8) & 0xff;
            mac[macpos + 14] = (this.h[7] >>> 0) & 0xff;
            mac[macpos + 15] = (this.h[7] >>> 8) & 0xff;
          };

          poly1305.prototype.update = function (m, mpos, bytes) {
            var i, want;

            if (this.leftover) {
              want = 16 - this.leftover;
              if (want > bytes) want = bytes;
              for (i = 0; i < want; i++)
                this.buffer[this.leftover + i] = m[mpos + i];
              bytes -= want;
              mpos += want;
              this.leftover += want;
              if (this.leftover < 16) return;
              this.blocks(this.buffer, 0, 16);
              this.leftover = 0;
            }

            if (bytes >= 16) {
              want = bytes - (bytes % 16);
              this.blocks(m, mpos, want);
              mpos += want;
              bytes -= want;
            }

            if (bytes) {
              for (i = 0; i < bytes; i++)
                this.buffer[this.leftover + i] = m[mpos + i];
              this.leftover += bytes;
            }
          };

          function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
            var s = new poly1305(k);
            s.update(m, mpos, n);
            s.finish(out, outpos);
            return 0;
          }

          function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
            var x = new Uint8Array(16);
            crypto_onetimeauth(x, 0, m, mpos, n, k);
            return crypto_verify_16(h, hpos, x, 0);
          }

          function crypto_secretbox(c, m, d, n, k) {
            var i;
            if (d < 32) return -1;
            crypto_stream_xor(c, 0, m, 0, d, n, k);
            crypto_onetimeauth(c, 16, c, 32, d - 32, c);
            for (i = 0; i < 16; i++) c[i] = 0;
            return 0;
          }

          function crypto_secretbox_open(m, c, d, n, k) {
            var i;
            var x = new Uint8Array(32);
            if (d < 32) return -1;
            crypto_stream(x, 0, 32, n, k);
            if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0)
              return -1;
            crypto_stream_xor(m, 0, c, 0, d, n, k);
            for (i = 0; i < 32; i++) m[i] = 0;
            return 0;
          }

          function set25519(r, a) {
            var i;
            for (i = 0; i < 16; i++) r[i] = a[i] | 0;
          }

          function car25519(o) {
            var i,
              v,
              c = 1;
            for (i = 0; i < 16; i++) {
              v = o[i] + c + 65535;
              c = Math.floor(v / 65536);
              o[i] = v - c * 65536;
            }
            o[0] += c - 1 + 37 * (c - 1);
          }

          function sel25519(p, q, b) {
            var t,
              c = ~(b - 1);
            for (var i = 0; i < 16; i++) {
              t = c & (p[i] ^ q[i]);
              p[i] ^= t;
              q[i] ^= t;
            }
          }

          function pack25519(o, n) {
            var i, j, b;
            var m = gf(),
              t = gf();
            for (i = 0; i < 16; i++) t[i] = n[i];
            car25519(t);
            car25519(t);
            car25519(t);
            for (j = 0; j < 2; j++) {
              m[0] = t[0] - 0xffed;
              for (i = 1; i < 15; i++) {
                m[i] = t[i] - 0xffff - ((m[i - 1] >> 16) & 1);
                m[i - 1] &= 0xffff;
              }
              m[15] = t[15] - 0x7fff - ((m[14] >> 16) & 1);
              b = (m[15] >> 16) & 1;
              m[14] &= 0xffff;
              sel25519(t, m, 1 - b);
            }
            for (i = 0; i < 16; i++) {
              o[2 * i] = t[i] & 0xff;
              o[2 * i + 1] = t[i] >> 8;
            }
          }

          function neq25519(a, b) {
            var c = new Uint8Array(32),
              d = new Uint8Array(32);
            pack25519(c, a);
            pack25519(d, b);
            return crypto_verify_32(c, 0, d, 0);
          }

          function par25519(a) {
            var d = new Uint8Array(32);
            pack25519(d, a);
            return d[0] & 1;
          }

          function unpack25519(o, n) {
            var i;
            for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
            o[15] &= 0x7fff;
          }

          function A(o, a, b) {
            for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
          }

          function Z(o, a, b) {
            for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
          }

          function M(o, a, b) {
            var v,
              c,
              t0 = 0,
              t1 = 0,
              t2 = 0,
              t3 = 0,
              t4 = 0,
              t5 = 0,
              t6 = 0,
              t7 = 0,
              t8 = 0,
              t9 = 0,
              t10 = 0,
              t11 = 0,
              t12 = 0,
              t13 = 0,
              t14 = 0,
              t15 = 0,
              t16 = 0,
              t17 = 0,
              t18 = 0,
              t19 = 0,
              t20 = 0,
              t21 = 0,
              t22 = 0,
              t23 = 0,
              t24 = 0,
              t25 = 0,
              t26 = 0,
              t27 = 0,
              t28 = 0,
              t29 = 0,
              t30 = 0,
              b0 = b[0],
              b1 = b[1],
              b2 = b[2],
              b3 = b[3],
              b4 = b[4],
              b5 = b[5],
              b6 = b[6],
              b7 = b[7],
              b8 = b[8],
              b9 = b[9],
              b10 = b[10],
              b11 = b[11],
              b12 = b[12],
              b13 = b[13],
              b14 = b[14],
              b15 = b[15];

            v = a[0];
            t0 += v * b0;
            t1 += v * b1;
            t2 += v * b2;
            t3 += v * b3;
            t4 += v * b4;
            t5 += v * b5;
            t6 += v * b6;
            t7 += v * b7;
            t8 += v * b8;
            t9 += v * b9;
            t10 += v * b10;
            t11 += v * b11;
            t12 += v * b12;
            t13 += v * b13;
            t14 += v * b14;
            t15 += v * b15;
            v = a[1];
            t1 += v * b0;
            t2 += v * b1;
            t3 += v * b2;
            t4 += v * b3;
            t5 += v * b4;
            t6 += v * b5;
            t7 += v * b6;
            t8 += v * b7;
            t9 += v * b8;
            t10 += v * b9;
            t11 += v * b10;
            t12 += v * b11;
            t13 += v * b12;
            t14 += v * b13;
            t15 += v * b14;
            t16 += v * b15;
            v = a[2];
            t2 += v * b0;
            t3 += v * b1;
            t4 += v * b2;
            t5 += v * b3;
            t6 += v * b4;
            t7 += v * b5;
            t8 += v * b6;
            t9 += v * b7;
            t10 += v * b8;
            t11 += v * b9;
            t12 += v * b10;
            t13 += v * b11;
            t14 += v * b12;
            t15 += v * b13;
            t16 += v * b14;
            t17 += v * b15;
            v = a[3];
            t3 += v * b0;
            t4 += v * b1;
            t5 += v * b2;
            t6 += v * b3;
            t7 += v * b4;
            t8 += v * b5;
            t9 += v * b6;
            t10 += v * b7;
            t11 += v * b8;
            t12 += v * b9;
            t13 += v * b10;
            t14 += v * b11;
            t15 += v * b12;
            t16 += v * b13;
            t17 += v * b14;
            t18 += v * b15;
            v = a[4];
            t4 += v * b0;
            t5 += v * b1;
            t6 += v * b2;
            t7 += v * b3;
            t8 += v * b4;
            t9 += v * b5;
            t10 += v * b6;
            t11 += v * b7;
            t12 += v * b8;
            t13 += v * b9;
            t14 += v * b10;
            t15 += v * b11;
            t16 += v * b12;
            t17 += v * b13;
            t18 += v * b14;
            t19 += v * b15;
            v = a[5];
            t5 += v * b0;
            t6 += v * b1;
            t7 += v * b2;
            t8 += v * b3;
            t9 += v * b4;
            t10 += v * b5;
            t11 += v * b6;
            t12 += v * b7;
            t13 += v * b8;
            t14 += v * b9;
            t15 += v * b10;
            t16 += v * b11;
            t17 += v * b12;
            t18 += v * b13;
            t19 += v * b14;
            t20 += v * b15;
            v = a[6];
            t6 += v * b0;
            t7 += v * b1;
            t8 += v * b2;
            t9 += v * b3;
            t10 += v * b4;
            t11 += v * b5;
            t12 += v * b6;
            t13 += v * b7;
            t14 += v * b8;
            t15 += v * b9;
            t16 += v * b10;
            t17 += v * b11;
            t18 += v * b12;
            t19 += v * b13;
            t20 += v * b14;
            t21 += v * b15;
            v = a[7];
            t7 += v * b0;
            t8 += v * b1;
            t9 += v * b2;
            t10 += v * b3;
            t11 += v * b4;
            t12 += v * b5;
            t13 += v * b6;
            t14 += v * b7;
            t15 += v * b8;
            t16 += v * b9;
            t17 += v * b10;
            t18 += v * b11;
            t19 += v * b12;
            t20 += v * b13;
            t21 += v * b14;
            t22 += v * b15;
            v = a[8];
            t8 += v * b0;
            t9 += v * b1;
            t10 += v * b2;
            t11 += v * b3;
            t12 += v * b4;
            t13 += v * b5;
            t14 += v * b6;
            t15 += v * b7;
            t16 += v * b8;
            t17 += v * b9;
            t18 += v * b10;
            t19 += v * b11;
            t20 += v * b12;
            t21 += v * b13;
            t22 += v * b14;
            t23 += v * b15;
            v = a[9];
            t9 += v * b0;
            t10 += v * b1;
            t11 += v * b2;
            t12 += v * b3;
            t13 += v * b4;
            t14 += v * b5;
            t15 += v * b6;
            t16 += v * b7;
            t17 += v * b8;
            t18 += v * b9;
            t19 += v * b10;
            t20 += v * b11;
            t21 += v * b12;
            t22 += v * b13;
            t23 += v * b14;
            t24 += v * b15;
            v = a[10];
            t10 += v * b0;
            t11 += v * b1;
            t12 += v * b2;
            t13 += v * b3;
            t14 += v * b4;
            t15 += v * b5;
            t16 += v * b6;
            t17 += v * b7;
            t18 += v * b8;
            t19 += v * b9;
            t20 += v * b10;
            t21 += v * b11;
            t22 += v * b12;
            t23 += v * b13;
            t24 += v * b14;
            t25 += v * b15;
            v = a[11];
            t11 += v * b0;
            t12 += v * b1;
            t13 += v * b2;
            t14 += v * b3;
            t15 += v * b4;
            t16 += v * b5;
            t17 += v * b6;
            t18 += v * b7;
            t19 += v * b8;
            t20 += v * b9;
            t21 += v * b10;
            t22 += v * b11;
            t23 += v * b12;
            t24 += v * b13;
            t25 += v * b14;
            t26 += v * b15;
            v = a[12];
            t12 += v * b0;
            t13 += v * b1;
            t14 += v * b2;
            t15 += v * b3;
            t16 += v * b4;
            t17 += v * b5;
            t18 += v * b6;
            t19 += v * b7;
            t20 += v * b8;
            t21 += v * b9;
            t22 += v * b10;
            t23 += v * b11;
            t24 += v * b12;
            t25 += v * b13;
            t26 += v * b14;
            t27 += v * b15;
            v = a[13];
            t13 += v * b0;
            t14 += v * b1;
            t15 += v * b2;
            t16 += v * b3;
            t17 += v * b4;
            t18 += v * b5;
            t19 += v * b6;
            t20 += v * b7;
            t21 += v * b8;
            t22 += v * b9;
            t23 += v * b10;
            t24 += v * b11;
            t25 += v * b12;
            t26 += v * b13;
            t27 += v * b14;
            t28 += v * b15;
            v = a[14];
            t14 += v * b0;
            t15 += v * b1;
            t16 += v * b2;
            t17 += v * b3;
            t18 += v * b4;
            t19 += v * b5;
            t20 += v * b6;
            t21 += v * b7;
            t22 += v * b8;
            t23 += v * b9;
            t24 += v * b10;
            t25 += v * b11;
            t26 += v * b12;
            t27 += v * b13;
            t28 += v * b14;
            t29 += v * b15;
            v = a[15];
            t15 += v * b0;
            t16 += v * b1;
            t17 += v * b2;
            t18 += v * b3;
            t19 += v * b4;
            t20 += v * b5;
            t21 += v * b6;
            t22 += v * b7;
            t23 += v * b8;
            t24 += v * b9;
            t25 += v * b10;
            t26 += v * b11;
            t27 += v * b12;
            t28 += v * b13;
            t29 += v * b14;
            t30 += v * b15;

            t0 += 38 * t16;
            t1 += 38 * t17;
            t2 += 38 * t18;
            t3 += 38 * t19;
            t4 += 38 * t20;
            t5 += 38 * t21;
            t6 += 38 * t22;
            t7 += 38 * t23;
            t8 += 38 * t24;
            t9 += 38 * t25;
            t10 += 38 * t26;
            t11 += 38 * t27;
            t12 += 38 * t28;
            t13 += 38 * t29;
            t14 += 38 * t30;
            // t15 left as is

            // first car
            c = 1;
            v = t0 + c + 65535;
            c = Math.floor(v / 65536);
            t0 = v - c * 65536;
            v = t1 + c + 65535;
            c = Math.floor(v / 65536);
            t1 = v - c * 65536;
            v = t2 + c + 65535;
            c = Math.floor(v / 65536);
            t2 = v - c * 65536;
            v = t3 + c + 65535;
            c = Math.floor(v / 65536);
            t3 = v - c * 65536;
            v = t4 + c + 65535;
            c = Math.floor(v / 65536);
            t4 = v - c * 65536;
            v = t5 + c + 65535;
            c = Math.floor(v / 65536);
            t5 = v - c * 65536;
            v = t6 + c + 65535;
            c = Math.floor(v / 65536);
            t6 = v - c * 65536;
            v = t7 + c + 65535;
            c = Math.floor(v / 65536);
            t7 = v - c * 65536;
            v = t8 + c + 65535;
            c = Math.floor(v / 65536);
            t8 = v - c * 65536;
            v = t9 + c + 65535;
            c = Math.floor(v / 65536);
            t9 = v - c * 65536;
            v = t10 + c + 65535;
            c = Math.floor(v / 65536);
            t10 = v - c * 65536;
            v = t11 + c + 65535;
            c = Math.floor(v / 65536);
            t11 = v - c * 65536;
            v = t12 + c + 65535;
            c = Math.floor(v / 65536);
            t12 = v - c * 65536;
            v = t13 + c + 65535;
            c = Math.floor(v / 65536);
            t13 = v - c * 65536;
            v = t14 + c + 65535;
            c = Math.floor(v / 65536);
            t14 = v - c * 65536;
            v = t15 + c + 65535;
            c = Math.floor(v / 65536);
            t15 = v - c * 65536;
            t0 += c - 1 + 37 * (c - 1);

            // second car
            c = 1;
            v = t0 + c + 65535;
            c = Math.floor(v / 65536);
            t0 = v - c * 65536;
            v = t1 + c + 65535;
            c = Math.floor(v / 65536);
            t1 = v - c * 65536;
            v = t2 + c + 65535;
            c = Math.floor(v / 65536);
            t2 = v - c * 65536;
            v = t3 + c + 65535;
            c = Math.floor(v / 65536);
            t3 = v - c * 65536;
            v = t4 + c + 65535;
            c = Math.floor(v / 65536);
            t4 = v - c * 65536;
            v = t5 + c + 65535;
            c = Math.floor(v / 65536);
            t5 = v - c * 65536;
            v = t6 + c + 65535;
            c = Math.floor(v / 65536);
            t6 = v - c * 65536;
            v = t7 + c + 65535;
            c = Math.floor(v / 65536);
            t7 = v - c * 65536;
            v = t8 + c + 65535;
            c = Math.floor(v / 65536);
            t8 = v - c * 65536;
            v = t9 + c + 65535;
            c = Math.floor(v / 65536);
            t9 = v - c * 65536;
            v = t10 + c + 65535;
            c = Math.floor(v / 65536);
            t10 = v - c * 65536;
            v = t11 + c + 65535;
            c = Math.floor(v / 65536);
            t11 = v - c * 65536;
            v = t12 + c + 65535;
            c = Math.floor(v / 65536);
            t12 = v - c * 65536;
            v = t13 + c + 65535;
            c = Math.floor(v / 65536);
            t13 = v - c * 65536;
            v = t14 + c + 65535;
            c = Math.floor(v / 65536);
            t14 = v - c * 65536;
            v = t15 + c + 65535;
            c = Math.floor(v / 65536);
            t15 = v - c * 65536;
            t0 += c - 1 + 37 * (c - 1);

            o[0] = t0;
            o[1] = t1;
            o[2] = t2;
            o[3] = t3;
            o[4] = t4;
            o[5] = t5;
            o[6] = t6;
            o[7] = t7;
            o[8] = t8;
            o[9] = t9;
            o[10] = t10;
            o[11] = t11;
            o[12] = t12;
            o[13] = t13;
            o[14] = t14;
            o[15] = t15;
          }

          function S(o, a) {
            M(o, a, a);
          }

          function inv25519(o, i) {
            var c = gf();
            var a;
            for (a = 0; a < 16; a++) c[a] = i[a];
            for (a = 253; a >= 0; a--) {
              S(c, c);
              if (a !== 2 && a !== 4) M(c, c, i);
            }
            for (a = 0; a < 16; a++) o[a] = c[a];
          }

          function pow2523(o, i) {
            var c = gf();
            var a;
            for (a = 0; a < 16; a++) c[a] = i[a];
            for (a = 250; a >= 0; a--) {
              S(c, c);
              if (a !== 1) M(c, c, i);
            }
            for (a = 0; a < 16; a++) o[a] = c[a];
          }

          function crypto_scalarmult(q, n, p) {
            var z = new Uint8Array(32);
            var x = new Float64Array(80),
              r,
              i;
            var a = gf(),
              b = gf(),
              c = gf(),
              d = gf(),
              e = gf(),
              f = gf();
            for (i = 0; i < 31; i++) z[i] = n[i];
            z[31] = (n[31] & 127) | 64;
            z[0] &= 248;
            unpack25519(x, p);
            for (i = 0; i < 16; i++) {
              b[i] = x[i];
              d[i] = a[i] = c[i] = 0;
            }
            a[0] = d[0] = 1;
            for (i = 254; i >= 0; --i) {
              r = (z[i >>> 3] >>> (i & 7)) & 1;
              sel25519(a, b, r);
              sel25519(c, d, r);
              A(e, a, c);
              Z(a, a, c);
              A(c, b, d);
              Z(b, b, d);
              S(d, e);
              S(f, a);
              M(a, c, a);
              M(c, b, e);
              A(e, a, c);
              Z(a, a, c);
              S(b, a);
              Z(c, d, f);
              M(a, c, _121665);
              A(a, a, d);
              M(c, c, a);
              M(a, d, f);
              M(d, b, x);
              S(b, e);
              sel25519(a, b, r);
              sel25519(c, d, r);
            }
            for (i = 0; i < 16; i++) {
              x[i + 16] = a[i];
              x[i + 32] = c[i];
              x[i + 48] = b[i];
              x[i + 64] = d[i];
            }
            var x32 = x.subarray(32);
            var x16 = x.subarray(16);
            inv25519(x32, x32);
            M(x16, x16, x32);
            pack25519(q, x16);
            return 0;
          }

          function crypto_scalarmult_base(q, n) {
            return crypto_scalarmult(q, n, _9);
          }

          function crypto_box_keypair(y, x) {
            randombytes(x, 32);
            return crypto_scalarmult_base(y, x);
          }

          function crypto_box_beforenm(k, y, x) {
            var s = new Uint8Array(32);
            crypto_scalarmult(s, x, y);
            return crypto_core_hsalsa20(k, _0, s, sigma);
          }

          var crypto_box_afternm = crypto_secretbox;
          var crypto_box_open_afternm = crypto_secretbox_open;

          function crypto_box(c, m, d, n, y, x) {
            var k = new Uint8Array(32);
            crypto_box_beforenm(k, y, x);
            return crypto_box_afternm(c, m, d, n, k);
          }

          function crypto_box_open(m, c, d, n, y, x) {
            var k = new Uint8Array(32);
            crypto_box_beforenm(k, y, x);
            return crypto_box_open_afternm(m, c, d, n, k);
          }

          var K = [
            0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf,
            0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538,
            0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5,
            0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
            0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74,
            0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235,
            0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786,
            0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
            0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc,
            0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab,
            0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7,
            0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
            0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85,
            0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed,
            0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb,
            0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
            0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70,
            0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218,
            0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070,
            0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
            0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3,
            0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373,
            0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f,
            0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
            0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7,
            0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c,
            0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f,
            0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
            0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5,
            0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc,
            0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c,
            0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817,
          ];

          function crypto_hashblocks_hl(hh, hl, m, n) {
            var wh = new Int32Array(16),
              wl = new Int32Array(16),
              bh0,
              bh1,
              bh2,
              bh3,
              bh4,
              bh5,
              bh6,
              bh7,
              bl0,
              bl1,
              bl2,
              bl3,
              bl4,
              bl5,
              bl6,
              bl7,
              th,
              tl,
              i,
              j,
              h,
              l,
              a,
              b,
              c,
              d;

            var ah0 = hh[0],
              ah1 = hh[1],
              ah2 = hh[2],
              ah3 = hh[3],
              ah4 = hh[4],
              ah5 = hh[5],
              ah6 = hh[6],
              ah7 = hh[7],
              al0 = hl[0],
              al1 = hl[1],
              al2 = hl[2],
              al3 = hl[3],
              al4 = hl[4],
              al5 = hl[5],
              al6 = hl[6],
              al7 = hl[7];

            var pos = 0;
            while (n >= 128) {
              for (i = 0; i < 16; i++) {
                j = 8 * i + pos;
                wh[i] =
                  (m[j + 0] << 24) |
                  (m[j + 1] << 16) |
                  (m[j + 2] << 8) |
                  m[j + 3];
                wl[i] =
                  (m[j + 4] << 24) |
                  (m[j + 5] << 16) |
                  (m[j + 6] << 8) |
                  m[j + 7];
              }
              for (i = 0; i < 80; i++) {
                bh0 = ah0;
                bh1 = ah1;
                bh2 = ah2;
                bh3 = ah3;
                bh4 = ah4;
                bh5 = ah5;
                bh6 = ah6;
                bh7 = ah7;

                bl0 = al0;
                bl1 = al1;
                bl2 = al2;
                bl3 = al3;
                bl4 = al4;
                bl5 = al5;
                bl6 = al6;
                bl7 = al7;

                // add
                h = ah7;
                l = al7;

                a = l & 0xffff;
                b = l >>> 16;
                c = h & 0xffff;
                d = h >>> 16;

                // Sigma1
                h =
                  ((ah4 >>> 14) | (al4 << (32 - 14))) ^
                  ((ah4 >>> 18) | (al4 << (32 - 18))) ^
                  ((al4 >>> (41 - 32)) | (ah4 << (32 - (41 - 32))));
                l =
                  ((al4 >>> 14) | (ah4 << (32 - 14))) ^
                  ((al4 >>> 18) | (ah4 << (32 - 18))) ^
                  ((ah4 >>> (41 - 32)) | (al4 << (32 - (41 - 32))));

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                // Ch
                h = (ah4 & ah5) ^ (~ah4 & ah6);
                l = (al4 & al5) ^ (~al4 & al6);

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                // K
                h = K[i * 2];
                l = K[i * 2 + 1];

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                // w
                h = wh[i % 16];
                l = wl[i % 16];

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;

                th = (c & 0xffff) | (d << 16);
                tl = (a & 0xffff) | (b << 16);

                // add
                h = th;
                l = tl;

                a = l & 0xffff;
                b = l >>> 16;
                c = h & 0xffff;
                d = h >>> 16;

                // Sigma0
                h =
                  ((ah0 >>> 28) | (al0 << (32 - 28))) ^
                  ((al0 >>> (34 - 32)) | (ah0 << (32 - (34 - 32)))) ^
                  ((al0 >>> (39 - 32)) | (ah0 << (32 - (39 - 32))));
                l =
                  ((al0 >>> 28) | (ah0 << (32 - 28))) ^
                  ((ah0 >>> (34 - 32)) | (al0 << (32 - (34 - 32)))) ^
                  ((ah0 >>> (39 - 32)) | (al0 << (32 - (39 - 32))));

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                // Maj
                h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
                l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;

                bh7 = (c & 0xffff) | (d << 16);
                bl7 = (a & 0xffff) | (b << 16);

                // add
                h = bh3;
                l = bl3;

                a = l & 0xffff;
                b = l >>> 16;
                c = h & 0xffff;
                d = h >>> 16;

                h = th;
                l = tl;

                a += l & 0xffff;
                b += l >>> 16;
                c += h & 0xffff;
                d += h >>> 16;

                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;

                bh3 = (c & 0xffff) | (d << 16);
                bl3 = (a & 0xffff) | (b << 16);

                ah1 = bh0;
                ah2 = bh1;
                ah3 = bh2;
                ah4 = bh3;
                ah5 = bh4;
                ah6 = bh5;
                ah7 = bh6;
                ah0 = bh7;

                al1 = bl0;
                al2 = bl1;
                al3 = bl2;
                al4 = bl3;
                al5 = bl4;
                al6 = bl5;
                al7 = bl6;
                al0 = bl7;

                if (i % 16 === 15) {
                  for (j = 0; j < 16; j++) {
                    // add
                    h = wh[j];
                    l = wl[j];

                    a = l & 0xffff;
                    b = l >>> 16;
                    c = h & 0xffff;
                    d = h >>> 16;

                    h = wh[(j + 9) % 16];
                    l = wl[(j + 9) % 16];

                    a += l & 0xffff;
                    b += l >>> 16;
                    c += h & 0xffff;
                    d += h >>> 16;

                    // sigma0
                    th = wh[(j + 1) % 16];
                    tl = wl[(j + 1) % 16];
                    h =
                      ((th >>> 1) | (tl << (32 - 1))) ^
                      ((th >>> 8) | (tl << (32 - 8))) ^
                      (th >>> 7);
                    l =
                      ((tl >>> 1) | (th << (32 - 1))) ^
                      ((tl >>> 8) | (th << (32 - 8))) ^
                      ((tl >>> 7) | (th << (32 - 7)));

                    a += l & 0xffff;
                    b += l >>> 16;
                    c += h & 0xffff;
                    d += h >>> 16;

                    // sigma1
                    th = wh[(j + 14) % 16];
                    tl = wl[(j + 14) % 16];
                    h =
                      ((th >>> 19) | (tl << (32 - 19))) ^
                      ((tl >>> (61 - 32)) | (th << (32 - (61 - 32)))) ^
                      (th >>> 6);
                    l =
                      ((tl >>> 19) | (th << (32 - 19))) ^
                      ((th >>> (61 - 32)) | (tl << (32 - (61 - 32)))) ^
                      ((tl >>> 6) | (th << (32 - 6)));

                    a += l & 0xffff;
                    b += l >>> 16;
                    c += h & 0xffff;
                    d += h >>> 16;

                    b += a >>> 16;
                    c += b >>> 16;
                    d += c >>> 16;

                    wh[j] = (c & 0xffff) | (d << 16);
                    wl[j] = (a & 0xffff) | (b << 16);
                  }
                }
              }

              // add
              h = ah0;
              l = al0;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[0];
              l = hl[0];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[0] = ah0 = (c & 0xffff) | (d << 16);
              hl[0] = al0 = (a & 0xffff) | (b << 16);

              h = ah1;
              l = al1;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[1];
              l = hl[1];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[1] = ah1 = (c & 0xffff) | (d << 16);
              hl[1] = al1 = (a & 0xffff) | (b << 16);

              h = ah2;
              l = al2;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[2];
              l = hl[2];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[2] = ah2 = (c & 0xffff) | (d << 16);
              hl[2] = al2 = (a & 0xffff) | (b << 16);

              h = ah3;
              l = al3;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[3];
              l = hl[3];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[3] = ah3 = (c & 0xffff) | (d << 16);
              hl[3] = al3 = (a & 0xffff) | (b << 16);

              h = ah4;
              l = al4;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[4];
              l = hl[4];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[4] = ah4 = (c & 0xffff) | (d << 16);
              hl[4] = al4 = (a & 0xffff) | (b << 16);

              h = ah5;
              l = al5;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[5];
              l = hl[5];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[5] = ah5 = (c & 0xffff) | (d << 16);
              hl[5] = al5 = (a & 0xffff) | (b << 16);

              h = ah6;
              l = al6;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[6];
              l = hl[6];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[6] = ah6 = (c & 0xffff) | (d << 16);
              hl[6] = al6 = (a & 0xffff) | (b << 16);

              h = ah7;
              l = al7;

              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;

              h = hh[7];
              l = hl[7];

              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;

              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;

              hh[7] = ah7 = (c & 0xffff) | (d << 16);
              hl[7] = al7 = (a & 0xffff) | (b << 16);

              pos += 128;
              n -= 128;
            }

            return n;
          }

          function crypto_hash(out, m, n) {
            var hh = new Int32Array(8),
              hl = new Int32Array(8),
              x = new Uint8Array(256),
              i,
              b = n;

            hh[0] = 0x6a09e667;
            hh[1] = 0xbb67ae85;
            hh[2] = 0x3c6ef372;
            hh[3] = 0xa54ff53a;
            hh[4] = 0x510e527f;
            hh[5] = 0x9b05688c;
            hh[6] = 0x1f83d9ab;
            hh[7] = 0x5be0cd19;

            hl[0] = 0xf3bcc908;
            hl[1] = 0x84caa73b;
            hl[2] = 0xfe94f82b;
            hl[3] = 0x5f1d36f1;
            hl[4] = 0xade682d1;
            hl[5] = 0x2b3e6c1f;
            hl[6] = 0xfb41bd6b;
            hl[7] = 0x137e2179;

            crypto_hashblocks_hl(hh, hl, m, n);
            n %= 128;

            for (i = 0; i < n; i++) x[i] = m[b - n + i];
            x[n] = 128;

            n = 256 - 128 * (n < 112 ? 1 : 0);
            x[n - 9] = 0;
            ts64(x, n - 8, (b / 0x20000000) | 0, b << 3);
            crypto_hashblocks_hl(hh, hl, x, n);

            for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);

            return 0;
          }

          function add(p, q) {
            var a = gf(),
              b = gf(),
              c = gf(),
              d = gf(),
              e = gf(),
              f = gf(),
              g = gf(),
              h = gf(),
              t = gf();

            Z(a, p[1], p[0]);
            Z(t, q[1], q[0]);
            M(a, a, t);
            A(b, p[0], p[1]);
            A(t, q[0], q[1]);
            M(b, b, t);
            M(c, p[3], q[3]);
            M(c, c, D2);
            M(d, p[2], q[2]);
            A(d, d, d);
            Z(e, b, a);
            Z(f, d, c);
            A(g, d, c);
            A(h, b, a);

            M(p[0], e, f);
            M(p[1], h, g);
            M(p[2], g, f);
            M(p[3], e, h);
          }

          function cswap(p, q, b) {
            var i;
            for (i = 0; i < 4; i++) {
              sel25519(p[i], q[i], b);
            }
          }

          function pack(r, p) {
            var tx = gf(),
              ty = gf(),
              zi = gf();
            inv25519(zi, p[2]);
            M(tx, p[0], zi);
            M(ty, p[1], zi);
            pack25519(r, ty);
            r[31] ^= par25519(tx) << 7;
          }

          function scalarmult(p, q, s) {
            var b, i;
            set25519(p[0], gf0);
            set25519(p[1], gf1);
            set25519(p[2], gf1);
            set25519(p[3], gf0);
            for (i = 255; i >= 0; --i) {
              b = (s[(i / 8) | 0] >> (i & 7)) & 1;
              cswap(p, q, b);
              add(q, p);
              add(p, p);
              cswap(p, q, b);
            }
          }

          function scalarbase(p, s) {
            var q = [gf(), gf(), gf(), gf()];
            set25519(q[0], X);
            set25519(q[1], Y);
            set25519(q[2], gf1);
            M(q[3], X, Y);
            scalarmult(p, q, s);
          }

          function crypto_sign_keypair(pk, sk, seeded) {
            var d = new Uint8Array(64);
            var p = [gf(), gf(), gf(), gf()];
            var i;

            if (!seeded) randombytes(sk, 32);
            crypto_hash(d, sk, 32);
            d[0] &= 248;
            d[31] &= 127;
            d[31] |= 64;

            scalarbase(p, d);
            pack(pk, p);

            for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
            return 0;
          }

          var L = new Float64Array([
            0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7,
            0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0x10,
          ]);

          function modL(r, x) {
            var carry, i, j, k;
            for (i = 63; i >= 32; --i) {
              carry = 0;
              for (j = i - 32, k = i - 12; j < k; ++j) {
                x[j] += carry - 16 * x[i] * L[j - (i - 32)];
                carry = Math.floor((x[j] + 128) / 256);
                x[j] -= carry * 256;
              }
              x[j] += carry;
              x[i] = 0;
            }
            carry = 0;
            for (j = 0; j < 32; j++) {
              x[j] += carry - (x[31] >> 4) * L[j];
              carry = x[j] >> 8;
              x[j] &= 255;
            }
            for (j = 0; j < 32; j++) x[j] -= carry * L[j];
            for (i = 0; i < 32; i++) {
              x[i + 1] += x[i] >> 8;
              r[i] = x[i] & 255;
            }
          }

          function reduce(r) {
            var x = new Float64Array(64),
              i;
            for (i = 0; i < 64; i++) x[i] = r[i];
            for (i = 0; i < 64; i++) r[i] = 0;
            modL(r, x);
          }

          // Note: difference from C - smlen returned, not passed as argument.
          function crypto_sign(sm, m, n, sk) {
            var d = new Uint8Array(64),
              h = new Uint8Array(64),
              r = new Uint8Array(64);
            var i,
              j,
              x = new Float64Array(64);
            var p = [gf(), gf(), gf(), gf()];

            crypto_hash(d, sk, 32);
            d[0] &= 248;
            d[31] &= 127;
            d[31] |= 64;

            var smlen = n + 64;
            for (i = 0; i < n; i++) sm[64 + i] = m[i];
            for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

            crypto_hash(r, sm.subarray(32), n + 32);
            reduce(r);
            scalarbase(p, r);
            pack(sm, p);

            for (i = 32; i < 64; i++) sm[i] = sk[i];
            crypto_hash(h, sm, n + 64);
            reduce(h);

            for (i = 0; i < 64; i++) x[i] = 0;
            for (i = 0; i < 32; i++) x[i] = r[i];
            for (i = 0; i < 32; i++) {
              for (j = 0; j < 32; j++) {
                x[i + j] += h[i] * d[j];
              }
            }

            modL(sm.subarray(32), x);
            return smlen;
          }

          function unpackneg(r, p) {
            var t = gf(),
              chk = gf(),
              num = gf(),
              den = gf(),
              den2 = gf(),
              den4 = gf(),
              den6 = gf();

            set25519(r[2], gf1);
            unpack25519(r[1], p);
            S(num, r[1]);
            M(den, num, D);
            Z(num, num, r[2]);
            A(den, r[2], den);

            S(den2, den);
            S(den4, den2);
            M(den6, den4, den2);
            M(t, den6, num);
            M(t, t, den);

            pow2523(t, t);
            M(t, t, num);
            M(t, t, den);
            M(t, t, den);
            M(r[0], t, den);

            S(chk, r[0]);
            M(chk, chk, den);
            if (neq25519(chk, num)) M(r[0], r[0], I);

            S(chk, r[0]);
            M(chk, chk, den);
            if (neq25519(chk, num)) return -1;

            if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);

            M(r[3], r[0], r[1]);
            return 0;
          }

          function crypto_sign_open(m, sm, n, pk) {
            var i;
            var t = new Uint8Array(32),
              h = new Uint8Array(64);
            var p = [gf(), gf(), gf(), gf()],
              q = [gf(), gf(), gf(), gf()];

            if (n < 64) return -1;

            if (unpackneg(q, pk)) return -1;

            for (i = 0; i < n; i++) m[i] = sm[i];
            for (i = 0; i < 32; i++) m[i + 32] = pk[i];
            crypto_hash(h, m, n);
            reduce(h);
            scalarmult(p, q, h);

            scalarbase(q, sm.subarray(32));
            add(p, q);
            pack(t, p);

            n -= 64;
            if (crypto_verify_32(sm, 0, t, 0)) {
              for (i = 0; i < n; i++) m[i] = 0;
              return -1;
            }

            for (i = 0; i < n; i++) m[i] = sm[i + 64];
            return n;
          }

          var crypto_secretbox_KEYBYTES = 32,
            crypto_secretbox_NONCEBYTES = 24,
            crypto_secretbox_ZEROBYTES = 32,
            crypto_secretbox_BOXZEROBYTES = 16,
            crypto_scalarmult_BYTES = 32,
            crypto_scalarmult_SCALARBYTES = 32,
            crypto_box_PUBLICKEYBYTES = 32,
            crypto_box_SECRETKEYBYTES = 32,
            crypto_box_BEFORENMBYTES = 32,
            crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
            crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
            crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
            crypto_sign_BYTES = 64,
            crypto_sign_PUBLICKEYBYTES = 32,
            crypto_sign_SECRETKEYBYTES = 64,
            crypto_sign_SEEDBYTES = 32,
            crypto_hash_BYTES = 64;

          nacl.lowlevel = {
            crypto_core_hsalsa20: crypto_core_hsalsa20,
            crypto_stream_xor: crypto_stream_xor,
            crypto_stream: crypto_stream,
            crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
            crypto_stream_salsa20: crypto_stream_salsa20,
            crypto_onetimeauth: crypto_onetimeauth,
            crypto_onetimeauth_verify: crypto_onetimeauth_verify,
            crypto_verify_16: crypto_verify_16,
            crypto_verify_32: crypto_verify_32,
            crypto_secretbox: crypto_secretbox,
            crypto_secretbox_open: crypto_secretbox_open,
            crypto_scalarmult: crypto_scalarmult,
            crypto_scalarmult_base: crypto_scalarmult_base,
            crypto_box_beforenm: crypto_box_beforenm,
            crypto_box_afternm: crypto_box_afternm,
            crypto_box: crypto_box,
            crypto_box_open: crypto_box_open,
            crypto_box_keypair: crypto_box_keypair,
            crypto_hash: crypto_hash,
            crypto_sign: crypto_sign,
            crypto_sign_keypair: crypto_sign_keypair,
            crypto_sign_open: crypto_sign_open,

            crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
            crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
            crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
            crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
            crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
            crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
            crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
            crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
            crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
            crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
            crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
            crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
            crypto_sign_BYTES: crypto_sign_BYTES,
            crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
            crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
            crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
            crypto_hash_BYTES: crypto_hash_BYTES,

            gf: gf,
            D: D,
            L: L,
            pack25519: pack25519,
            unpack25519: unpack25519,
            M: M,
            A: A,
            S: S,
            Z: Z,
            pow2523: pow2523,
            add: add,
            set25519: set25519,
            modL: modL,
            scalarmult: scalarmult,
            scalarbase: scalarbase,
          };

          /* High-level API */

          function checkLengths(k, n) {
            if (k.length !== crypto_secretbox_KEYBYTES)
              throw new Error("bad key size");
            if (n.length !== crypto_secretbox_NONCEBYTES)
              throw new Error("bad nonce size");
          }

          function checkBoxLengths(pk, sk) {
            if (pk.length !== crypto_box_PUBLICKEYBYTES)
              throw new Error("bad public key size");
            if (sk.length !== crypto_box_SECRETKEYBYTES)
              throw new Error("bad secret key size");
          }

          function checkArrayTypes() {
            for (var i = 0; i < arguments.length; i++) {
              if (!(arguments[i] instanceof Uint8Array))
                throw new TypeError("unexpected type, use Uint8Array");
            }
          }

          function cleanup(arr) {
            for (var i = 0; i < arr.length; i++) arr[i] = 0;
          }

          nacl.randomBytes = function (n) {
            var b = new Uint8Array(n);
            randombytes(b, n);
            return b;
          };

          nacl.secretbox = function (msg, nonce, key) {
            checkArrayTypes(msg, nonce, key);
            checkLengths(key, nonce);
            var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
            var c = new Uint8Array(m.length);
            for (var i = 0; i < msg.length; i++)
              m[i + crypto_secretbox_ZEROBYTES] = msg[i];
            crypto_secretbox(c, m, m.length, nonce, key);
            return c.subarray(crypto_secretbox_BOXZEROBYTES);
          };

          nacl.secretbox.open = function (box, nonce, key) {
            checkArrayTypes(box, nonce, key);
            checkLengths(key, nonce);
            var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
            var m = new Uint8Array(c.length);
            for (var i = 0; i < box.length; i++)
              c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
            if (c.length < 32) return null;
            if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0)
              return null;
            return m.subarray(crypto_secretbox_ZEROBYTES);
          };

          nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
          nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
          nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

          nacl.scalarMult = function (n, p) {
            checkArrayTypes(n, p);
            if (n.length !== crypto_scalarmult_SCALARBYTES)
              throw new Error("bad n size");
            if (p.length !== crypto_scalarmult_BYTES)
              throw new Error("bad p size");
            var q = new Uint8Array(crypto_scalarmult_BYTES);
            crypto_scalarmult(q, n, p);
            return q;
          };

          nacl.scalarMult.base = function (n) {
            checkArrayTypes(n);
            if (n.length !== crypto_scalarmult_SCALARBYTES)
              throw new Error("bad n size");
            var q = new Uint8Array(crypto_scalarmult_BYTES);
            crypto_scalarmult_base(q, n);
            return q;
          };

          nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
          nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

          nacl.box = function (msg, nonce, publicKey, secretKey) {
            var k = nacl.box.before(publicKey, secretKey);
            return nacl.secretbox(msg, nonce, k);
          };

          nacl.box.before = function (publicKey, secretKey) {
            checkArrayTypes(publicKey, secretKey);
            checkBoxLengths(publicKey, secretKey);
            var k = new Uint8Array(crypto_box_BEFORENMBYTES);
            crypto_box_beforenm(k, publicKey, secretKey);
            return k;
          };

          nacl.box.after = nacl.secretbox;

          nacl.box.open = function (msg, nonce, publicKey, secretKey) {
            var k = nacl.box.before(publicKey, secretKey);
            return nacl.secretbox.open(msg, nonce, k);
          };

          nacl.box.open.after = nacl.secretbox.open;

          nacl.box.keyPair = function () {
            var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
            var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
            crypto_box_keypair(pk, sk);
            return { publicKey: pk, secretKey: sk };
          };

          nacl.box.keyPair.fromSecretKey = function (secretKey) {
            checkArrayTypes(secretKey);
            if (secretKey.length !== crypto_box_SECRETKEYBYTES)
              throw new Error("bad secret key size");
            var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
            crypto_scalarmult_base(pk, secretKey);
            return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
          };

          nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
          nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
          nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
          nacl.box.nonceLength = crypto_box_NONCEBYTES;
          nacl.box.overheadLength = nacl.secretbox.overheadLength;

          nacl.sign = function (msg, secretKey) {
            checkArrayTypes(msg, secretKey);
            if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
              throw new Error("bad secret key size");
            var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
            crypto_sign(signedMsg, msg, msg.length, secretKey);
            return signedMsg;
          };

          nacl.sign.open = function (signedMsg, publicKey) {
            checkArrayTypes(signedMsg, publicKey);
            if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
              throw new Error("bad public key size");
            var tmp = new Uint8Array(signedMsg.length);
            var mlen = crypto_sign_open(
              tmp,
              signedMsg,
              signedMsg.length,
              publicKey
            );
            if (mlen < 0) return null;
            var m = new Uint8Array(mlen);
            for (var i = 0; i < m.length; i++) m[i] = tmp[i];
            return m;
          };

          nacl.sign.detached = function (msg, secretKey) {
            var signedMsg = nacl.sign(msg, secretKey);
            var sig = new Uint8Array(crypto_sign_BYTES);
            for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
            return sig;
          };

          nacl.sign.detached.verify = function (msg, sig, publicKey) {
            checkArrayTypes(msg, sig, publicKey);
            if (sig.length !== crypto_sign_BYTES)
              throw new Error("bad signature size");
            if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
              throw new Error("bad public key size");
            var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
            var m = new Uint8Array(crypto_sign_BYTES + msg.length);
            var i;
            for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
            for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
            return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
          };

          nacl.sign.keyPair = function () {
            var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
            var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
            crypto_sign_keypair(pk, sk);
            return { publicKey: pk, secretKey: sk };
          };

          nacl.sign.keyPair.fromSecretKey = function (secretKey) {
            checkArrayTypes(secretKey);
            if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
              throw new Error("bad secret key size");
            var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
            for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
            return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
          };

          nacl.sign.keyPair.fromSeed = function (seed) {
            checkArrayTypes(seed);
            if (seed.length !== crypto_sign_SEEDBYTES)
              throw new Error("bad seed size");
            var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
            var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
            for (var i = 0; i < 32; i++) sk[i] = seed[i];
            crypto_sign_keypair(pk, sk, true);
            return { publicKey: pk, secretKey: sk };
          };

          nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
          nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
          nacl.sign.seedLength = crypto_sign_SEEDBYTES;
          nacl.sign.signatureLength = crypto_sign_BYTES;

          nacl.hash = function (msg) {
            checkArrayTypes(msg);
            var h = new Uint8Array(crypto_hash_BYTES);
            crypto_hash(h, msg, msg.length);
            return h;
          };

          nacl.hash.hashLength = crypto_hash_BYTES;

          nacl.verify = function (x, y) {
            checkArrayTypes(x, y);
            // Zero length arguments are considered not equal.
            if (x.length === 0 || y.length === 0) return false;
            if (x.length !== y.length) return false;
            return vn(x, 0, y, 0, x.length) === 0 ? true : false;
          };

          nacl.setPRNG = function (fn) {
            randombytes = fn;
          };

          (function () {
            // Initialize PRNG if environment provides CSPRNG.
            // If not, methods calling randombytes will throw.
            var crypto =
              typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
            if (crypto && crypto.getRandomValues) {
              // Browsers.
              var QUOTA = 65536;
              nacl.setPRNG(function (x, n) {
                var i,
                  v = new Uint8Array(n);
                for (i = 0; i < n; i += QUOTA) {
                  crypto.getRandomValues(
                    v.subarray(i, i + Math.min(n - i, QUOTA))
                  );
                }
                for (i = 0; i < n; i++) x[i] = v[i];
                cleanup(v);
              });
            } else if (true) {
              // Node.js.
              crypto = __webpack_require__(/*! crypto */ "?050b");
              if (crypto && crypto.randomBytes) {
                nacl.setPRNG(function (x, n) {
                  var i,
                    v = crypto.randomBytes(n);
                  for (i = 0; i < n; i++) x[i] = v[i];
                  cleanup(v);
                });
              }
            }
          })();
        })(
          true && module.exports
            ? module.exports
            : (self.nacl = self.nacl || {})
        );

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/index.js":
      /*!******************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/index.js ***!
  \******************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ NIL: () =>
            /* reexport safe */ _nil_js__WEBPACK_IMPORTED_MODULE_4__["default"],
          /* harmony export */ parse: () =>
            /* reexport safe */ _parse_js__WEBPACK_IMPORTED_MODULE_8__[
              "default"
            ],
          /* harmony export */ stringify: () =>
            /* reexport safe */ _stringify_js__WEBPACK_IMPORTED_MODULE_7__[
              "default"
            ],
          /* harmony export */ v1: () =>
            /* reexport safe */ _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"],
          /* harmony export */ v3: () =>
            /* reexport safe */ _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"],
          /* harmony export */ v4: () =>
            /* reexport safe */ _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"],
          /* harmony export */ v5: () =>
            /* reexport safe */ _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"],
          /* harmony export */ validate: () =>
            /* reexport safe */ _validate_js__WEBPACK_IMPORTED_MODULE_6__[
              "default"
            ],
          /* harmony export */ version: () =>
            /* reexport safe */ _version_js__WEBPACK_IMPORTED_MODULE_5__[
              "default"
            ],
          /* harmony export */
        });
        /* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./v1.js */ "../node_modules/uuid/dist/esm-browser/v1.js"
          );
        /* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./v3.js */ "../node_modules/uuid/dist/esm-browser/v3.js"
          );
        /* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./v4.js */ "../node_modules/uuid/dist/esm-browser/v4.js"
          );
        /* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./v5.js */ "../node_modules/uuid/dist/esm-browser/v5.js"
          );
        /* harmony import */ var _nil_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./nil.js */ "../node_modules/uuid/dist/esm-browser/nil.js"
          );
        /* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ./version.js */ "../node_modules/uuid/dist/esm-browser/version.js"
          );
        /* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ./validate.js */ "../node_modules/uuid/dist/esm-browser/validate.js"
          );
        /* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ./stringify.js */ "../node_modules/uuid/dist/esm-browser/stringify.js"
          );
        /* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! ./parse.js */ "../node_modules/uuid/dist/esm-browser/parse.js"
          );

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/md5.js":
      /*!****************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/md5.js ***!
  \****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /*
         * Browser-compatible JavaScript MD5
         *
         * Modification of JavaScript MD5
         * https://github.com/blueimp/JavaScript-MD5
         *
         * Copyright 2011, Sebastian Tschan
         * https://blueimp.net
         *
         * Licensed under the MIT license:
         * https://opensource.org/licenses/MIT
         *
         * Based on
         * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
         * Digest Algorithm, as defined in RFC 1321.
         * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
         * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
         * Distributed under the BSD License
         * See http://pajhome.org.uk/crypt/md5 for more info.
         */
        function md5(bytes) {
          if (typeof bytes === "string") {
            var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

            bytes = new Uint8Array(msg.length);

            for (var i = 0; i < msg.length; ++i) {
              bytes[i] = msg.charCodeAt(i);
            }
          }

          return md5ToHexEncodedArray(
            wordsToMd5(bytesToWords(bytes), bytes.length * 8)
          );
        }
        /*
         * Convert an array of little-endian words to an array of bytes
         */

        function md5ToHexEncodedArray(input) {
          var output = [];
          var length32 = input.length * 32;
          var hexTab = "0123456789abcdef";

          for (var i = 0; i < length32; i += 8) {
            var x = (input[i >> 5] >>> i % 32) & 0xff;
            var hex = parseInt(
              hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f),
              16
            );
            output.push(hex);
          }

          return output;
        }
        /**
         * Calculate output length with padding and bit length
         */

        function getOutputLength(inputLength8) {
          return (((inputLength8 + 64) >>> 9) << 4) + 14 + 1;
        }
        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length.
         */

        function wordsToMd5(x, len) {
          /* append padding */
          x[len >> 5] |= 0x80 << len % 32;
          x[getOutputLength(len) - 1] = len;
          var a = 1732584193;
          var b = -271733879;
          var c = -1732584194;
          var d = 271733878;

          for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
          }

          return [a, b, c, d];
        }
        /*
         * Convert an array bytes to an array of little-endian words
         * Characters >255 have their high-byte silently ignored.
         */

        function bytesToWords(input) {
          if (input.length === 0) {
            return [];
          }

          var length8 = input.length * 8;
          var output = new Uint32Array(getOutputLength(length8));

          for (var i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
          }

          return output;
        }
        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */

        function safeAdd(x, y) {
          var lsw = (x & 0xffff) + (y & 0xffff);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xffff);
        }
        /*
         * Bitwise rotate a 32-bit number to the left.
         */

        function bitRotateLeft(num, cnt) {
          return (num << cnt) | (num >>> (32 - cnt));
        }
        /*
         * These functions implement the four basic operations the algorithm uses.
         */

        function md5cmn(q, a, b, x, s, t) {
          return safeAdd(
            bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s),
            b
          );
        }

        function md5ff(a, b, c, d, x, s, t) {
          return md5cmn((b & c) | (~b & d), a, b, x, s, t);
        }

        function md5gg(a, b, c, d, x, s, t) {
          return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
        }

        function md5hh(a, b, c, d, x, s, t) {
          return md5cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function md5ii(a, b, c, d, x, s, t) {
          return md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = md5;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/nil.js":
      /*!****************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/nil.js ***!
  \****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          "00000000-0000-0000-0000-000000000000";

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/parse.js":
      /*!******************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/parse.js ***!
  \******************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./validate.js */ "../node_modules/uuid/dist/esm-browser/validate.js"
          );

        function parse(uuid) {
          if (
            !(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)
          ) {
            throw TypeError("Invalid UUID");
          }

          var v;
          var arr = new Uint8Array(16); // Parse ########-....-....-....-............

          arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
          arr[1] = (v >>> 16) & 0xff;
          arr[2] = (v >>> 8) & 0xff;
          arr[3] = v & 0xff; // Parse ........-####-....-....-............

          arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
          arr[5] = v & 0xff; // Parse ........-....-####-....-............

          arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
          arr[7] = v & 0xff; // Parse ........-....-....-####-............

          arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
          arr[9] = v & 0xff; // Parse ........-....-....-....-############
          // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

          arr[10] =
            ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff;
          arr[11] = (v / 0x100000000) & 0xff;
          arr[12] = (v >>> 24) & 0xff;
          arr[13] = (v >>> 16) & 0xff;
          arr[14] = (v >>> 8) & 0xff;
          arr[15] = v & 0xff;
          return arr;
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = parse;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/regex.js":
      /*!******************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/regex.js ***!
  \******************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/rng.js":
      /*!****************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/rng.js ***!
  \****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ rng,
          /* harmony export */
        });
        // Unique ID creation requires a high quality random # generator. In the browser we therefore
        // require the crypto API and do not support built-in fallback to lower quality random number
        // generators (like Math.random()).
        var getRandomValues;
        var rnds8 = new Uint8Array(16);
        function rng() {
          // lazy load so that environments that need to polyfill have a chance to do so
          if (!getRandomValues) {
            // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
            // find the complete implementation of crypto (msCrypto) on IE11.
            getRandomValues =
              (typeof crypto !== "undefined" &&
                crypto.getRandomValues &&
                crypto.getRandomValues.bind(crypto)) ||
              (typeof msCrypto !== "undefined" &&
                typeof msCrypto.getRandomValues === "function" &&
                msCrypto.getRandomValues.bind(msCrypto));

            if (!getRandomValues) {
              throw new Error(
                "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
              );
            }
          }

          return getRandomValues(rnds8);
        }

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/sha1.js":
      /*!*****************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/sha1.js ***!
  \*****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        // Adapted from Chris Veness' SHA1 code at
        // http://www.movable-type.co.uk/scripts/sha1.html
        function f(s, x, y, z) {
          switch (s) {
            case 0:
              return (x & y) ^ (~x & z);

            case 1:
              return x ^ y ^ z;

            case 2:
              return (x & y) ^ (x & z) ^ (y & z);

            case 3:
              return x ^ y ^ z;
          }
        }

        function ROTL(x, n) {
          return (x << n) | (x >>> (32 - n));
        }

        function sha1(bytes) {
          var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
          var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

          if (typeof bytes === "string") {
            var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

            bytes = [];

            for (var i = 0; i < msg.length; ++i) {
              bytes.push(msg.charCodeAt(i));
            }
          } else if (!Array.isArray(bytes)) {
            // Convert Array-like to Array
            bytes = Array.prototype.slice.call(bytes);
          }

          bytes.push(0x80);
          var l = bytes.length / 4 + 2;
          var N = Math.ceil(l / 16);
          var M = new Array(N);

          for (var _i = 0; _i < N; ++_i) {
            var arr = new Uint32Array(16);

            for (var j = 0; j < 16; ++j) {
              arr[j] =
                (bytes[_i * 64 + j * 4] << 24) |
                (bytes[_i * 64 + j * 4 + 1] << 16) |
                (bytes[_i * 64 + j * 4 + 2] << 8) |
                bytes[_i * 64 + j * 4 + 3];
            }

            M[_i] = arr;
          }

          M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
          M[N - 1][14] = Math.floor(M[N - 1][14]);
          M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;

          for (var _i2 = 0; _i2 < N; ++_i2) {
            var W = new Uint32Array(80);

            for (var t = 0; t < 16; ++t) {
              W[t] = M[_i2][t];
            }

            for (var _t = 16; _t < 80; ++_t) {
              W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
            }

            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];

            for (var _t2 = 0; _t2 < 80; ++_t2) {
              var s = Math.floor(_t2 / 20);
              var T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2]) >>> 0;
              e = d;
              d = c;
              c = ROTL(b, 30) >>> 0;
              b = a;
              a = T;
            }

            H[0] = (H[0] + a) >>> 0;
            H[1] = (H[1] + b) >>> 0;
            H[2] = (H[2] + c) >>> 0;
            H[3] = (H[3] + d) >>> 0;
            H[4] = (H[4] + e) >>> 0;
          }

          return [
            (H[0] >> 24) & 0xff,
            (H[0] >> 16) & 0xff,
            (H[0] >> 8) & 0xff,
            H[0] & 0xff,
            (H[1] >> 24) & 0xff,
            (H[1] >> 16) & 0xff,
            (H[1] >> 8) & 0xff,
            H[1] & 0xff,
            (H[2] >> 24) & 0xff,
            (H[2] >> 16) & 0xff,
            (H[2] >> 8) & 0xff,
            H[2] & 0xff,
            (H[3] >> 24) & 0xff,
            (H[3] >> 16) & 0xff,
            (H[3] >> 8) & 0xff,
            H[3] & 0xff,
            (H[4] >> 24) & 0xff,
            (H[4] >> 16) & 0xff,
            (H[4] >> 8) & 0xff,
            H[4] & 0xff,
          ];
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = sha1;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/stringify.js":
      /*!**********************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/stringify.js ***!
  \**********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./validate.js */ "../node_modules/uuid/dist/esm-browser/validate.js"
          );

        /**
         * Convert array of 16 byte values to UUID string format of the form:
         * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
         */

        var byteToHex = [];

        for (var i = 0; i < 256; ++i) {
          byteToHex.push((i + 0x100).toString(16).substr(1));
        }

        function stringify(arr) {
          var offset =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : 0;
          // Note: Be careful editing this code!  It's been tuned for performance
          // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
          var uuid = (
            byteToHex[arr[offset + 0]] +
            byteToHex[arr[offset + 1]] +
            byteToHex[arr[offset + 2]] +
            byteToHex[arr[offset + 3]] +
            "-" +
            byteToHex[arr[offset + 4]] +
            byteToHex[arr[offset + 5]] +
            "-" +
            byteToHex[arr[offset + 6]] +
            byteToHex[arr[offset + 7]] +
            "-" +
            byteToHex[arr[offset + 8]] +
            byteToHex[arr[offset + 9]] +
            "-" +
            byteToHex[arr[offset + 10]] +
            byteToHex[arr[offset + 11]] +
            byteToHex[arr[offset + 12]] +
            byteToHex[arr[offset + 13]] +
            byteToHex[arr[offset + 14]] +
            byteToHex[arr[offset + 15]]
          ).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
          // of the following:
          // - One or more input array values don't map to a hex octet (leading to
          // "undefined" in the uuid)
          // - Invalid input values for the RFC `version` or `variant` fields

          if (
            !(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)
          ) {
            throw TypeError("Stringified UUID is invalid");
          }

          return uuid;
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          stringify;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/v1.js":
      /*!***************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/v1.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./rng.js */ "../node_modules/uuid/dist/esm-browser/rng.js"
          );
        /* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./stringify.js */ "../node_modules/uuid/dist/esm-browser/stringify.js"
          );

        // **`v1()` - Generate time-based UUID**
        //
        // Inspired by https://github.com/LiosK/UUID.js
        // and http://docs.python.org/library/uuid.html

        var _nodeId;

        var _clockseq; // Previous uuid creation time

        var _lastMSecs = 0;
        var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

        function v1(options, buf, offset) {
          var i = (buf && offset) || 0;
          var b = buf || new Array(16);
          options = options || {};
          var node = options.node || _nodeId;
          var clockseq =
            options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
          // specified.  We do this lazily to minimize issues related to insufficient
          // system entropy.  See #189

          if (node == null || clockseq == null) {
            var seedBytes =
              options.random ||
              (
                options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"]
              )();

            if (node == null) {
              // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
              node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5],
              ];
            }

            if (clockseq == null) {
              // Per 4.2.2, randomize (14 bit) clockseq
              clockseq = _clockseq =
                ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
            }
          } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
          // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
          // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
          // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

          var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
          // cycle to simulate higher resolution clock

          var nsecs =
            options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

          var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

          if (dt < 0 && options.clockseq === undefined) {
            clockseq = (clockseq + 1) & 0x3fff;
          } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
          // time interval

          if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
            nsecs = 0;
          } // Per 4.2.1.2 Throw error if too many uuids are requested

          if (nsecs >= 10000) {
            throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
          }

          _lastMSecs = msecs;
          _lastNSecs = nsecs;
          _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

          msecs += 12219292800000; // `time_low`

          var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
          b[i++] = (tl >>> 24) & 0xff;
          b[i++] = (tl >>> 16) & 0xff;
          b[i++] = (tl >>> 8) & 0xff;
          b[i++] = tl & 0xff; // `time_mid`

          var tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
          b[i++] = (tmh >>> 8) & 0xff;
          b[i++] = tmh & 0xff; // `time_high_and_version`

          b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version

          b[i++] = (tmh >>> 16) & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

          b[i++] = (clockseq >>> 8) | 0x80; // `clock_seq_low`

          b[i++] = clockseq & 0xff; // `node`

          for (var n = 0; n < 6; ++n) {
            b[i + n] = node[n];
          }

          return (
            buf || (0, _stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b)
          );
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = v1;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/v3.js":
      /*!***************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/v3.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./v35.js */ "../node_modules/uuid/dist/esm-browser/v35.js"
          );
        /* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./md5.js */ "../node_modules/uuid/dist/esm-browser/md5.js"
          );

        var v3 = (0, _v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
          "v3",
          0x30,
          _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]
        );
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = v3;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/v35.js":
      /*!****************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/v35.js ***!
  \****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DNS: () => /* binding */ DNS,
          /* harmony export */ URL: () => /* binding */ URL,
          /* harmony export */ default: () =>
            /* export default binding */ __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./stringify.js */ "../node_modules/uuid/dist/esm-browser/stringify.js"
          );
        /* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./parse.js */ "../node_modules/uuid/dist/esm-browser/parse.js"
          );

        function stringToBytes(str) {
          str = unescape(encodeURIComponent(str)); // UTF8 escape

          var bytes = [];

          for (var i = 0; i < str.length; ++i) {
            bytes.push(str.charCodeAt(i));
          }

          return bytes;
        }

        var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
        var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
        /* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(
          name,
          version,
          hashfunc
        ) {
          function generateUUID(value, namespace, buf, offset) {
            if (typeof value === "string") {
              value = stringToBytes(value);
            }

            if (typeof namespace === "string") {
              namespace = (0,
              _parse_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespace);
            }

            if (namespace.length !== 16) {
              throw TypeError(
                "Namespace must be array-like (16 iterable integer values, 0-255)"
              );
            } // Compute hash of namespace and value, Per 4.3
            // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
            // hashfunc([...namespace, ... value])`

            var bytes = new Uint8Array(16 + value.length);
            bytes.set(namespace);
            bytes.set(value, namespace.length);
            bytes = hashfunc(bytes);
            bytes[6] = (bytes[6] & 0x0f) | version;
            bytes[8] = (bytes[8] & 0x3f) | 0x80;

            if (buf) {
              offset = offset || 0;

              for (var i = 0; i < 16; ++i) {
                buf[offset + i] = bytes[i];
              }

              return buf;
            }

            return (0, _stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
              bytes
            );
          } // Function#name is not settable on some platforms (#270)

          try {
            generateUUID.name = name; // eslint-disable-next-line no-empty
          } catch (err) {} // For CommonJS default export support

          generateUUID.DNS = DNS;
          generateUUID.URL = URL;
          return generateUUID;
        }

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/v4.js":
      /*!***************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/v4.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./rng.js */ "../node_modules/uuid/dist/esm-browser/rng.js"
          );
        /* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./stringify.js */ "../node_modules/uuid/dist/esm-browser/stringify.js"
          );

        function v4(options, buf, offset) {
          options = options || {};
          var rnds =
            options.random ||
            (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

          rnds[6] = (rnds[6] & 0x0f) | 0x40;
          rnds[8] = (rnds[8] & 0x3f) | 0x80; // Copy bytes to buffer, if provided

          if (buf) {
            offset = offset || 0;

            for (var i = 0; i < 16; ++i) {
              buf[offset + i] = rnds[i];
            }

            return buf;
          }

          return (0, _stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
            rnds
          );
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = v4;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/v5.js":
      /*!***************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/v5.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./v35.js */ "../node_modules/uuid/dist/esm-browser/v35.js"
          );
        /* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./sha1.js */ "../node_modules/uuid/dist/esm-browser/sha1.js"
          );

        var v5 = (0, _v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
          "v5",
          0x50,
          _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]
        );
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = v5;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/validate.js":
      /*!*********************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/validate.js ***!
  \*********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./regex.js */ "../node_modules/uuid/dist/esm-browser/regex.js"
          );

        function validate(uuid) {
          return (
            typeof uuid === "string" &&
            _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid)
          );
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          validate;

        /***/
      },

    /***/ "../node_modules/uuid/dist/esm-browser/version.js":
      /*!********************************************************!*\
  !*** ../node_modules/uuid/dist/esm-browser/version.js ***!
  \********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./validate.js */ "../node_modules/uuid/dist/esm-browser/validate.js"
          );

        function version(uuid) {
          if (
            !(0, _validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)
          ) {
            throw TypeError("Invalid UUID");
          }

          return parseInt(uuid.substr(14, 1), 16);
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = version;

        /***/
      },

    /***/ "?e97e":
      /*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
      /***/ () => {
        /* (ignored) */
        /***/
      },

    /***/ "?0699":
      /*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
      /***/ () => {
        /* (ignored) */
        /***/
      },

    /***/ "?050b":
      /*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
      /***/ () => {
        /* (ignored) */
        /***/
      },

    /***/ "../node_modules/@mysten/bcs/dist/index.mjs":
      /*!**************************************************!*\
  !*** ../node_modules/@mysten/bcs/dist/index.mjs ***!
  \**************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ BcsReader: () => /* binding */ BcsReader,
          /* harmony export */ BcsWriter: () => /* binding */ BcsWriter,
          /* harmony export */ bcs: () => /* binding */ bcs,
          /* harmony export */ decodeStr: () => /* binding */ decodeStr,
          /* harmony export */ encodeStr: () => /* binding */ encodeStr,
          /* harmony export */ fromB64: () => /* binding */ fromB64,
          /* harmony export */ fromHEX: () => /* binding */ fromHEX,
          /* harmony export */ toB64: () => /* binding */ toB64,
          /* harmony export */ toHEX: () => /* binding */ toHEX,
          /* harmony export */
        });
        /* harmony import */ var bn_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! bn.js */ "../node_modules/bn.js/lib/bn.js");
        // src/index.ts

        // src/b64.ts
        function b64ToUint6(nChr) {
          return nChr > 64 && nChr < 91
            ? nChr - 65
            : nChr > 96 && nChr < 123
            ? nChr - 71
            : nChr > 47 && nChr < 58
            ? nChr + 4
            : nChr === 43
            ? 62
            : nChr === 47
            ? 63
            : 0;
        }
        function fromB64(sBase64, nBlocksSize) {
          var sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, ""),
            nInLen = sB64Enc.length,
            nOutLen = nBlocksSize
              ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
              : (nInLen * 3 + 1) >> 2,
            taBytes = new Uint8Array(nOutLen);
          for (
            var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0;
            nInIdx < nInLen;
            nInIdx++
          ) {
            nMod4 = nInIdx & 3;
            nUint24 |=
              b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4));
            if (nMod4 === 3 || nInLen - nInIdx === 1) {
              for (
                nMod3 = 0;
                nMod3 < 3 && nOutIdx < nOutLen;
                nMod3++, nOutIdx++
              ) {
                taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
              }
              nUint24 = 0;
            }
          }
          return taBytes;
        }
        function uint6ToB64(nUint6) {
          return nUint6 < 26
            ? nUint6 + 65
            : nUint6 < 52
            ? nUint6 + 71
            : nUint6 < 62
            ? nUint6 - 4
            : nUint6 === 62
            ? 43
            : nUint6 === 63
            ? 47
            : 65;
        }
        function toB64(aBytes) {
          var nMod3 = 2,
            sB64Enc = "";
          for (
            var nLen = aBytes.length, nUint24 = 0, nIdx = 0;
            nIdx < nLen;
            nIdx++
          ) {
            nMod3 = nIdx % 3;
            if (nIdx > 0 && ((nIdx * 4) / 3) % 76 === 0) {
              sB64Enc += "";
            }
            nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
            if (nMod3 === 2 || aBytes.length - nIdx === 1) {
              sB64Enc += String.fromCodePoint(
                uint6ToB64((nUint24 >>> 18) & 63),
                uint6ToB64((nUint24 >>> 12) & 63),
                uint6ToB64((nUint24 >>> 6) & 63),
                uint6ToB64(nUint24 & 63)
              );
              nUint24 = 0;
            }
          }
          return (
            sB64Enc.slice(0, sB64Enc.length - 2 + nMod3) +
            (nMod3 === 2 ? "" : nMod3 === 1 ? "=" : "==")
          );
        }

        // src/hex.ts
        function fromHEX(hexStr) {
          let intArr = hexStr
            .replace("0x", "")
            .match(/.{1,2}/g)
            .map((byte) => parseInt(byte, 16));
          if (intArr === null) {
            throw new Error(`Unable to parse HEX: ${hexStr}`);
          }
          return Uint8Array.from(intArr);
        }
        function toHEX(bytes) {
          return bytes.reduce(
            (str, byte) => str + byte.toString(16).padStart(2, "0"),
            ""
          );
        }

        // src/index.ts
        var BcsReader = class {
          constructor(data) {
            this.bytePosition = 0;
            this.dataView = new DataView(data.buffer);
          }
          shift(bytes) {
            this.bytePosition += bytes;
            return this;
          }
          read8() {
            let value = this.dataView.getUint8(this.bytePosition);
            this.shift(1);
            return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(value, 10);
          }
          read16() {
            let value = this.dataView.getUint16(this.bytePosition, true);
            this.shift(2);
            return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(value, 10);
          }
          read32() {
            let value = this.dataView.getUint32(this.bytePosition, true);
            this.shift(4);
            return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(value, 10);
          }
          read64() {
            let value1 = this.read32();
            let value2 = this.read32();
            let result =
              value2.toString(16) + value1.toString(16).padStart(8, "0");
            return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(result, 16);
          }
          read128() {
            let value1 = this.read64();
            let value2 = this.read64();
            let result =
              value2.toString(16) + value1.toString(16).padStart(8, "0");
            return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(result, 16);
          }
          readBytes(num) {
            let start = this.bytePosition + this.dataView.byteOffset;
            let value = new Uint8Array(this.dataView.buffer, start, num);
            this.shift(num);
            return value;
          }
          readULEB() {
            let start = this.bytePosition + this.dataView.byteOffset;
            let buffer = new Uint8Array(this.dataView.buffer, start);
            let { value, length } = ulebDecode(buffer);
            this.shift(length);
            return value;
          }
          readVec(cb) {
            let length = this.readULEB();
            let result = [];
            for (let i = 0; i < length; i++) {
              result.push(cb(this, i, length));
            }
            return result;
          }
        };
        var BcsWriter = class {
          constructor(size = 1024) {
            this.bytePosition = 0;
            this.dataView = new DataView(new ArrayBuffer(size));
          }
          static toBN(number) {
            switch (typeof number) {
              case "boolean":
                number = +number;
                return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(
                  number.toString()
                );
              case "bigint":
                return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(
                  number.toString()
                );
              default:
                return new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(number);
            }
          }
          shift(bytes) {
            this.bytePosition += bytes;
            return this;
          }
          write8(value) {
            this.dataView.setUint8(this.bytePosition, +BcsWriter.toBN(value));
            return this.shift(1);
          }
          write16(value) {
            this.dataView.setUint16(
              this.bytePosition,
              +BcsWriter.toBN(value),
              true
            );
            return this.shift(2);
          }
          write32(value) {
            this.dataView.setUint32(
              this.bytePosition,
              +BcsWriter.toBN(value),
              true
            );
            return this.shift(4);
          }
          write64(value) {
            BcsWriter.toBN(value)
              .toArray("le", 8)
              .forEach((el) => this.write8(el));
            return this;
          }
          write128(value) {
            BcsWriter.toBN(value)
              .toArray("le", 16)
              .forEach((el) => this.write8(el));
            return this;
          }
          writeULEB(value) {
            ulebEncode(value).forEach((el) => this.write8(el));
            return this;
          }
          writeVec(vector, cb) {
            this.writeULEB(vector.length);
            Array.from(vector).forEach((el, i) =>
              cb(this, el, i, vector.length)
            );
            return this;
          }
          *[Symbol.iterator]() {
            for (let i = 0; i < this.bytePosition; i++) {
              yield this.dataView.getUint8(i);
            }
            return this.toBytes();
          }
          toBytes() {
            return new Uint8Array(
              this.dataView.buffer.slice(0, this.bytePosition)
            );
          }
          toString(encoding) {
            return encodeStr(this.toBytes(), encoding);
          }
        };
        function ulebEncode(num) {
          let arr = [];
          let len = 0;
          if (num === 0) {
            return [0];
          }
          while (num > 0) {
            arr[len] = num & 127;
            if ((num >>= 7)) {
              arr[len] |= 128;
            }
            len += 1;
          }
          return arr;
        }
        function ulebDecode(arr) {
          let total = 0;
          let shift = 0;
          let len = 0;
          while (true) {
            let byte = arr[len];
            len += 1;
            total |= (byte & 127) << shift;
            if ((byte & 128) === 0) {
              break;
            }
            shift += 7;
          }
          return {
            value: total,
            length: len,
          };
        }
        var _bcs = class {
          static ser(type, data, size = 1024) {
            return this.getTypeInterface(type).encode(data, size);
          }
          static de(type, data, encoding) {
            if (typeof data == "string") {
              if (encoding) {
                data = decodeStr(data, encoding);
              } else {
                throw new Error(
                  "To pass a string to `bcs.de`, specify encoding"
                );
              }
            }
            return this.getTypeInterface(type).decode(data);
          }
          static hasType(type) {
            return this.types.has(type);
          }
          static registerType(
            name,
            encodeCb,
            decodeCb,
            validateCb = () => true
          ) {
            this.types.set(name, {
              encode(data, size = 1024) {
                return this._encodeRaw(new BcsWriter(size), data);
              },
              decode(data) {
                return this._decodeRaw(new BcsReader(data));
              },
              _encodeRaw(writer, data) {
                if (validateCb(data)) {
                  return encodeCb(writer, data);
                } else {
                  throw new Error(
                    `Validation failed for type ${name}, data: ${data}`
                  );
                }
              },
              _decodeRaw(reader) {
                return decodeCb(reader);
              },
            });
            return this;
          }
          static registerAddressType(name, length, encoding = "hex") {
            switch (encoding) {
              case "base64":
                return this.registerType(
                  name,
                  (writer, data) =>
                    fromB64(data).reduce(
                      (writer2, el) => writer2.write8(el),
                      writer
                    ),
                  (reader) => toB64(reader.readBytes(length))
                );
              case "hex":
                return this.registerType(
                  name,
                  (writer, data) =>
                    fromHEX(data).reduce(
                      (writer2, el) => writer2.write8(el),
                      writer
                    ),
                  (reader) => toHEX(reader.readBytes(length))
                );
              default:
                throw new Error(
                  "Unsupported encoding! Use either hex or base64"
                );
            }
          }
          static registerVectorType(name, elementType) {
            return this.registerType(
              name,
              (writer, data) =>
                writer.writeVec(data, (writer2, el) => {
                  return _bcs
                    .getTypeInterface(elementType)
                    ._encodeRaw(writer2, el);
                }),
              (reader) =>
                reader.readVec((reader2) => {
                  return _bcs.getTypeInterface(elementType)._decodeRaw(reader2);
                })
            );
          }
          static registerStructType(name, fields) {
            let struct = Object.freeze(fields);
            let canonicalOrder = Object.keys(struct);
            return this.registerType(
              name,
              (writer, data) => {
                if (!data || data.constructor !== Object) {
                  throw new Error(
                    `Expected ${name} to be an Object, got: ${data}`
                  );
                }
                for (let key of canonicalOrder) {
                  if (key in data) {
                    _bcs
                      .getTypeInterface(struct[key])
                      ._encodeRaw(writer, data[key]);
                  } else {
                    throw new Error(
                      `Struct ${name} requires field ${key}:${struct[key]}`
                    );
                  }
                }
                return writer;
              },
              (reader) => {
                let result = {};
                for (let key of canonicalOrder) {
                  result[key] = _bcs
                    .getTypeInterface(struct[key])
                    ._decodeRaw(reader);
                }
                return result;
              }
            );
          }
          static registerEnumType(name, variants) {
            let struct = Object.freeze(variants);
            let canonicalOrder = Object.keys(struct);
            return this.registerType(
              name,
              (writer, data) => {
                if (data === void 0) {
                  throw new Error(`Unable to write enum ${name}, missing data`);
                }
                let key = Object.keys(data)[0];
                if (key === void 0) {
                  throw new Error(`Unknown invariant of the enum ${name}`);
                }
                let orderByte = canonicalOrder.indexOf(key);
                if (orderByte === -1) {
                  throw new Error(
                    `Unknown invariant of the enum ${name}, allowed values: ${canonicalOrder}`
                  );
                }
                let invariant = canonicalOrder[orderByte];
                let invariantType = struct[invariant];
                writer.write8(orderByte);
                return invariantType !== null
                  ? _bcs
                      .getTypeInterface(invariantType)
                      ._encodeRaw(writer, data[key])
                  : writer;
              },
              (reader) => {
                let orderByte = reader.readULEB();
                let invariant = canonicalOrder[orderByte];
                let invariantType = struct[invariant];
                if (orderByte === -1) {
                  throw new Error(
                    `Decoding type mismatch, expected enum ${name} invariant index, received ${orderByte}`
                  );
                }
                return {
                  [invariant]:
                    invariantType !== null
                      ? _bcs.getTypeInterface(invariantType)._decodeRaw(reader)
                      : true,
                };
              }
            );
          }
          static getTypeInterface(type) {
            let typeInterface = _bcs.types.get(type);
            if (typeInterface === void 0) {
              throw new Error(`Type ${type} is not registered`);
            }
            return typeInterface;
          }
        };
        var bcs = _bcs;
        bcs.U8 = "u8";
        bcs.U32 = "u32";
        bcs.U64 = "u64";
        bcs.U128 = "u128";
        bcs.BOOL = "bool";
        bcs.VECTOR = "vector";
        bcs.ADDRESS = "address";
        bcs.STRING = "string";
        bcs.types = /* @__PURE__ */ new Map();
        function encodeStr(data, encoding) {
          switch (encoding) {
            case "base64":
              return toB64(data);
            case "hex":
              return toHEX(data);
            default:
              throw new Error(
                "Unsupported encoding, supported values are: base64, hex"
              );
          }
        }
        function decodeStr(data, encoding) {
          switch (encoding) {
            case "base64":
              return fromB64(data);
            case "hex":
              return fromHEX(data);
            default:
              throw new Error(
                "Unsupported encoding, supported values are: base64, hex"
              );
          }
        }
        (function registerPrimitives() {
          bcs.registerType(
            bcs.U8,
            (writer, data) => writer.write8(data),
            (reader) => reader.read8(),
            (u8) => u8 < 256
          );
          bcs.registerType(
            bcs.U32,
            (writer, data) => writer.write32(data),
            (reader) => reader.read32(),
            (u32) => u32 < 4294967296
          );
          bcs.registerType(
            bcs.U64,
            (writer, data) => writer.write64(data),
            (reader) => reader.read64(),
            (_u64) => true
          );
          bcs.registerType(
            bcs.U128,
            (writer, data) => writer.write128(data),
            (reader) => reader.read128(),
            (_u128) => true
          );
          bcs.registerType(
            bcs.BOOL,
            (writer, data) => writer.write8(data),
            (reader) => reader.read8().toString(10) === "1",
            (_bool) => true
          );
          bcs.registerType(
            bcs.STRING,
            (writer, data) =>
              writer.writeVec(Array.from(data), (writer2, el) =>
                writer2.write8(el.charCodeAt(0))
              ),
            (reader) => {
              return reader
                .readVec((reader2) => reader2.read8())
                .map((el) => String.fromCharCode(el))
                .join("");
            },
            (_str) => true
          );
        })();

        //# sourceMappingURL=index.mjs.map

        /***/
      },

    /***/ "../node_modules/@mysten/sui.js/dist/index.mjs":
      /*!*****************************************************!*\
  !*** ../node_modules/@mysten/sui.js/dist/index.mjs ***!
  \*****************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Base64DataBuffer: () =>
            /* binding */ Base64DataBuffer,
          /* harmony export */ COIN_JOIN_FUNC_NAME: () =>
            /* binding */ COIN_JOIN_FUNC_NAME,
          /* harmony export */ COIN_MODULE_NAME: () =>
            /* binding */ COIN_MODULE_NAME,
          /* harmony export */ COIN_PACKAGE_ID: () =>
            /* binding */ COIN_PACKAGE_ID,
          /* harmony export */ COIN_SPLIT_VEC_FUNC_NAME: () =>
            /* binding */ COIN_SPLIT_VEC_FUNC_NAME,
          /* harmony export */ COIN_TYPE: () => /* binding */ COIN_TYPE,
          /* harmony export */ Coin: () => /* binding */ Coin,
          /* harmony export */ DEFAULT_END_TIME: () =>
            /* binding */ DEFAULT_END_TIME,
          /* harmony export */ DEFAULT_START_TIME: () =>
            /* binding */ DEFAULT_START_TIME,
          /* harmony export */ Delegation: () => /* binding */ Delegation,
          /* harmony export */ EVENT_QUERY_MAX_LIMIT: () =>
            /* binding */ EVENT_QUERY_MAX_LIMIT,
          /* harmony export */ Ed25519Keypair: () =>
            /* binding */ Ed25519Keypair,
          /* harmony export */ Ed25519PublicKey: () =>
            /* binding */ Ed25519PublicKey,
          /* harmony export */ HexDataBuffer: () => /* binding */ HexDataBuffer,
          /* harmony export */ JsonRpcProvider: () =>
            /* binding */ JsonRpcProvider,
          /* harmony export */ JsonRpcProviderWithCache: () =>
            /* binding */ JsonRpcProviderWithCache,
          /* harmony export */ LocalTxnDataSerializer: () =>
            /* binding */ LocalTxnDataSerializer,
          /* harmony export */ Provider: () => /* binding */ Provider,
          /* harmony export */ RawSigner: () => /* binding */ RawSigner,
          /* harmony export */ RpcTxnDataSerializer: () =>
            /* binding */ RpcTxnDataSerializer,
          /* harmony export */ SIGNATURE_SCHEME_TO_FLAG: () =>
            /* binding */ SIGNATURE_SCHEME_TO_FLAG,
          /* harmony export */ SUI_ADDRESS_LENGTH: () =>
            /* binding */ SUI_ADDRESS_LENGTH,
          /* harmony export */ Secp256k1Keypair: () =>
            /* binding */ Secp256k1Keypair,
          /* harmony export */ Secp256k1PublicKey: () =>
            /* binding */ Secp256k1PublicKey,
          /* harmony export */ SignerWithProvider: () =>
            /* binding */ SignerWithProvider,
          /* harmony export */ bcs: () =>
            /* reexport safe */ _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs,
          /* harmony export */ checkPublicKeyData: () =>
            /* binding */ checkPublicKeyData,
          /* harmony export */ extractMutableReference: () =>
            /* binding */ extractMutableReference,
          /* harmony export */ extractReference: () =>
            /* binding */ extractReference,
          /* harmony export */ extractStructTag: () =>
            /* binding */ extractStructTag,
          /* harmony export */ getChangeEpochTransaction: () =>
            /* binding */ getChangeEpochTransaction,
          /* harmony export */ getCoinAfterMerge: () =>
            /* binding */ getCoinAfterMerge,
          /* harmony export */ getCoinAfterSplit: () =>
            /* binding */ getCoinAfterSplit,
          /* harmony export */ getExecutionStatus: () =>
            /* binding */ getExecutionStatus,
          /* harmony export */ getExecutionStatusError: () =>
            /* binding */ getExecutionStatusError,
          /* harmony export */ getExecutionStatusGasSummary: () =>
            /* binding */ getExecutionStatusGasSummary,
          /* harmony export */ getExecutionStatusType: () =>
            /* binding */ getExecutionStatusType,
          /* harmony export */ getMoveCallTransaction: () =>
            /* binding */ getMoveCallTransaction,
          /* harmony export */ getMoveObject: () => /* binding */ getMoveObject,
          /* harmony export */ getMoveObjectType: () =>
            /* binding */ getMoveObjectType,
          /* harmony export */ getMovePackageContent: () =>
            /* binding */ getMovePackageContent,
          /* harmony export */ getNewlyCreatedCoinRefsAfterSplit: () =>
            /* binding */ getNewlyCreatedCoinRefsAfterSplit,
          /* harmony export */ getNewlyCreatedCoinsAfterSplit: () =>
            /* binding */ getNewlyCreatedCoinsAfterSplit,
          /* harmony export */ getObjectDeletedResponse: () =>
            /* binding */ getObjectDeletedResponse,
          /* harmony export */ getObjectExistsResponse: () =>
            /* binding */ getObjectExistsResponse,
          /* harmony export */ getObjectFields: () =>
            /* binding */ getObjectFields,
          /* harmony export */ getObjectId: () => /* binding */ getObjectId,
          /* harmony export */ getObjectNotExistsResponse: () =>
            /* binding */ getObjectNotExistsResponse,
          /* harmony export */ getObjectOwner: () =>
            /* binding */ getObjectOwner,
          /* harmony export */ getObjectPreviousTransactionDigest: () =>
            /* binding */ getObjectPreviousTransactionDigest,
          /* harmony export */ getObjectReference: () =>
            /* binding */ getObjectReference,
          /* harmony export */ getObjectType: () => /* binding */ getObjectType,
          /* harmony export */ getObjectVersion: () =>
            /* binding */ getObjectVersion,
          /* harmony export */ getParsedMergeCoinResponse: () =>
            /* binding */ getParsedMergeCoinResponse,
          /* harmony export */ getParsedPublishResponse: () =>
            /* binding */ getParsedPublishResponse,
          /* harmony export */ getParsedSplitCoinResponse: () =>
            /* binding */ getParsedSplitCoinResponse,
          /* harmony export */ getPublishTransaction: () =>
            /* binding */ getPublishTransaction,
          /* harmony export */ getTotalGasUsed: () =>
            /* binding */ getTotalGasUsed,
          /* harmony export */ getTransactionAuthorityQuorumSignInfo: () =>
            /* binding */ getTransactionAuthorityQuorumSignInfo,
          /* harmony export */ getTransactionData: () =>
            /* binding */ getTransactionData,
          /* harmony export */ getTransactionDigest: () =>
            /* binding */ getTransactionDigest,
          /* harmony export */ getTransactionEffects: () =>
            /* binding */ getTransactionEffects,
          /* harmony export */ getTransactionGasBudget: () =>
            /* binding */ getTransactionGasBudget,
          /* harmony export */ getTransactionGasObject: () =>
            /* binding */ getTransactionGasObject,
          /* harmony export */ getTransactionKindName: () =>
            /* binding */ getTransactionKindName,
          /* harmony export */ getTransactionSender: () =>
            /* binding */ getTransactionSender,
          /* harmony export */ getTransactionSignature: () =>
            /* binding */ getTransactionSignature,
          /* harmony export */ getTransactions: () =>
            /* binding */ getTransactions,
          /* harmony export */ getTransferObjectTransaction: () =>
            /* binding */ getTransferObjectTransaction,
          /* harmony export */ getTransferSuiAmount: () =>
            /* binding */ getTransferSuiAmount,
          /* harmony export */ getTransferSuiTransaction: () =>
            /* binding */ getTransferSuiTransaction,
          /* harmony export */ hasPublicTransfer: () =>
            /* binding */ hasPublicTransfer,
          /* harmony export */ isAuthorityName: () =>
            /* binding */ isAuthorityName,
          /* harmony export */ isAuthorityQuorumSignInfo: () =>
            /* binding */ isAuthorityQuorumSignInfo,
          /* harmony export */ isAuthoritySignature: () =>
            /* binding */ isAuthoritySignature,
          /* harmony export */ isCallArg: () => /* binding */ isCallArg,
          /* harmony export */ isCertifiedTransaction: () =>
            /* binding */ isCertifiedTransaction,
          /* harmony export */ isDelegationData: () =>
            /* binding */ isDelegationData,
          /* harmony export */ isDelegationSuiObject: () =>
            /* binding */ isDelegationSuiObject,
          /* harmony export */ isDeleteObjectEvent: () =>
            /* binding */ isDeleteObjectEvent,
          /* harmony export */ isEmptySignInfo: () =>
            /* binding */ isEmptySignInfo,
          /* harmony export */ isEpochId: () => /* binding */ isEpochId,
          /* harmony export */ isEventType: () => /* binding */ isEventType,
          /* harmony export */ isExecuteTransactionRequestType: () =>
            /* binding */ isExecuteTransactionRequestType,
          /* harmony export */ isExecutionStatus: () =>
            /* binding */ isExecutionStatus,
          /* harmony export */ isExecutionStatusType: () =>
            /* binding */ isExecutionStatusType,
          /* harmony export */ isGasCostSummary: () =>
            /* binding */ isGasCostSummary,
          /* harmony export */ isGatewayTxSeqNumber: () =>
            /* binding */ isGatewayTxSeqNumber,
          /* harmony export */ isGenericAuthoritySignature: () =>
            /* binding */ isGenericAuthoritySignature,
          /* harmony export */ isGetObjectDataResponse: () =>
            /* binding */ isGetObjectDataResponse,
          /* harmony export */ isGetOwnedObjectsResponse: () =>
            /* binding */ isGetOwnedObjectsResponse,
          /* harmony export */ isGetTxnDigestsResponse: () =>
            /* binding */ isGetTxnDigestsResponse,
          /* harmony export */ isImmutableObject: () =>
            /* binding */ isImmutableObject,
          /* harmony export */ isMoveCall: () => /* binding */ isMoveCall,
          /* harmony export */ isMoveCallTx: () => /* binding */ isMoveCallTx,
          /* harmony export */ isMoveEvent: () => /* binding */ isMoveEvent,
          /* harmony export */ isMoveEventField: () =>
            /* binding */ isMoveEventField,
          /* harmony export */ isMovePackageContent: () =>
            /* binding */ isMovePackageContent,
          /* harmony export */ isNewObjectEvent: () =>
            /* binding */ isNewObjectEvent,
          /* harmony export */ isObjectArg: () => /* binding */ isObjectArg,
          /* harmony export */ isObjectContentFields: () =>
            /* binding */ isObjectContentFields,
          /* harmony export */ isObjectDigest: () =>
            /* binding */ isObjectDigest,
          /* harmony export */ isObjectId: () => /* binding */ isObjectId,
          /* harmony export */ isObjectOwner: () => /* binding */ isObjectOwner,
          /* harmony export */ isObjectStatus: () =>
            /* binding */ isObjectStatus,
          /* harmony export */ isObjectType: () => /* binding */ isObjectType,
          /* harmony export */ isOwnedObjectRef: () =>
            /* binding */ isOwnedObjectRef,
          /* harmony export */ isPayTx: () => /* binding */ isPayTx,
          /* harmony export */ isPublishEvent: () =>
            /* binding */ isPublishEvent,
          /* harmony export */ isPublishTx: () => /* binding */ isPublishTx,
          /* harmony export */ isSequenceNumber: () =>
            /* binding */ isSequenceNumber,
          /* harmony export */ isSharedObject: () =>
            /* binding */ isSharedObject,
          /* harmony export */ isStructTag: () => /* binding */ isStructTag,
          /* harmony export */ isSubscriptionEvent: () =>
            /* binding */ isSubscriptionEvent,
          /* harmony export */ isSubscriptionId: () =>
            /* binding */ isSubscriptionId,
          /* harmony export */ isSuiAddress: () => /* binding */ isSuiAddress,
          /* harmony export */ isSuiCertifiedTransactionEffects: () =>
            /* binding */ isSuiCertifiedTransactionEffects,
          /* harmony export */ isSuiChangeEpoch: () =>
            /* binding */ isSuiChangeEpoch,
          /* harmony export */ isSuiData: () => /* binding */ isSuiData,
          /* harmony export */ isSuiEvent: () => /* binding */ isSuiEvent,
          /* harmony export */ isSuiEventEnvelope: () =>
            /* binding */ isSuiEventEnvelope,
          /* harmony export */ isSuiEventFilter: () =>
            /* binding */ isSuiEventFilter,
          /* harmony export */ isSuiEvents: () => /* binding */ isSuiEvents,
          /* harmony export */ isSuiExecuteTransactionResponse: () =>
            /* binding */ isSuiExecuteTransactionResponse,
          /* harmony export */ isSuiJsonValue: () =>
            /* binding */ isSuiJsonValue,
          /* harmony export */ isSuiMoveAbilitySet: () =>
            /* binding */ isSuiMoveAbilitySet,
          /* harmony export */ isSuiMoveFunctionArgType: () =>
            /* binding */ isSuiMoveFunctionArgType,
          /* harmony export */ isSuiMoveFunctionArgTypes: () =>
            /* binding */ isSuiMoveFunctionArgTypes,
          /* harmony export */ isSuiMoveFunctionArgTypesResponse: () =>
            /* binding */ isSuiMoveFunctionArgTypesResponse,
          /* harmony export */ isSuiMoveModuleId: () =>
            /* binding */ isSuiMoveModuleId,
          /* harmony export */ isSuiMoveNormalizedField: () =>
            /* binding */ isSuiMoveNormalizedField,
          /* harmony export */ isSuiMoveNormalizedFunction: () =>
            /* binding */ isSuiMoveNormalizedFunction,
          /* harmony export */ isSuiMoveNormalizedModule: () =>
            /* binding */ isSuiMoveNormalizedModule,
          /* harmony export */ isSuiMoveNormalizedModules: () =>
            /* binding */ isSuiMoveNormalizedModules,
          /* harmony export */ isSuiMoveNormalizedStruct: () =>
            /* binding */ isSuiMoveNormalizedStruct,
          /* harmony export */ isSuiMoveNormalizedStructType: () =>
            /* binding */ isSuiMoveNormalizedStructType,
          /* harmony export */ isSuiMoveNormalizedType: () =>
            /* binding */ isSuiMoveNormalizedType,
          /* harmony export */ isSuiMoveNormalizedTypeParameterType: () =>
            /* binding */ isSuiMoveNormalizedTypeParameterType,
          /* harmony export */ isSuiMoveObject: () =>
            /* binding */ isSuiMoveObject,
          /* harmony export */ isSuiMovePackage: () =>
            /* binding */ isSuiMovePackage,
          /* harmony export */ isSuiMoveStructTypeParameter: () =>
            /* binding */ isSuiMoveStructTypeParameter,
          /* harmony export */ isSuiMoveTypeParameterIndex: () =>
            /* binding */ isSuiMoveTypeParameterIndex,
          /* harmony export */ isSuiMoveVisibility: () =>
            /* binding */ isSuiMoveVisibility,
          /* harmony export */ isSuiObject: () => /* binding */ isSuiObject,
          /* harmony export */ isSuiObjectInfo: () =>
            /* binding */ isSuiObjectInfo,
          /* harmony export */ isSuiObjectRef: () =>
            /* binding */ isSuiObjectRef,
          /* harmony export */ isSuiPackage: () => /* binding */ isSuiPackage,
          /* harmony export */ isSuiParsedMergeCoinResponse: () =>
            /* binding */ isSuiParsedMergeCoinResponse,
          /* harmony export */ isSuiParsedPublishResponse: () =>
            /* binding */ isSuiParsedPublishResponse,
          /* harmony export */ isSuiParsedSplitCoinResponse: () =>
            /* binding */ isSuiParsedSplitCoinResponse,
          /* harmony export */ isSuiParsedTransactionResponse: () =>
            /* binding */ isSuiParsedTransactionResponse,
          /* harmony export */ isSuiTransactionData: () =>
            /* binding */ isSuiTransactionData,
          /* harmony export */ isSuiTransactionKind: () =>
            /* binding */ isSuiTransactionKind,
          /* harmony export */ isSuiTransactionResponse: () =>
            /* binding */ isSuiTransactionResponse,
          /* harmony export */ isSuiTransferSui: () =>
            /* binding */ isSuiTransferSui,
          /* harmony export */ isTransaction: () => /* binding */ isTransaction,
          /* harmony export */ isTransactionBytes: () =>
            /* binding */ isTransactionBytes,
          /* harmony export */ isTransactionData: () =>
            /* binding */ isTransactionData,
          /* harmony export */ isTransactionDigest: () =>
            /* binding */ isTransactionDigest,
          /* harmony export */ isTransactionEffects: () =>
            /* binding */ isTransactionEffects,
          /* harmony export */ isTransactionKind: () =>
            /* binding */ isTransactionKind,
          /* harmony export */ isTransactionKindName: () =>
            /* binding */ isTransactionKindName,
          /* harmony export */ isTransferObject: () =>
            /* binding */ isTransferObject,
          /* harmony export */ isTransferObjectEvent: () =>
            /* binding */ isTransferObjectEvent,
          /* harmony export */ isTransferObjectTx: () =>
            /* binding */ isTransferObjectTx,
          /* harmony export */ isTransferSuiTx: () =>
            /* binding */ isTransferSuiTx,
          /* harmony export */ isTypeTag: () => /* binding */ isTypeTag,
          /* harmony export */ isValidSuiAddress: () =>
            /* binding */ isValidSuiAddress,
          /* harmony export */ isValidSuiObjectId: () =>
            /* binding */ isValidSuiObjectId,
          /* harmony export */ isValidTransactionDigest: () =>
            /* binding */ isValidTransactionDigest,
          /* harmony export */ normalizeSuiAddress: () =>
            /* binding */ normalizeSuiAddress,
          /* harmony export */ normalizeSuiObjectId: () =>
            /* binding */ normalizeSuiObjectId,
          /* harmony export */
        });
        /* harmony import */ var tweetnacl__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! tweetnacl */ "../node_modules/tweetnacl/nacl-fast.js"
          );
        /* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! buffer */ "../node_modules/buffer/index.js");
        /* harmony import */ var bn_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! bn.js */ "../node_modules/bn.js/lib/bn.js");
        /* harmony import */ var js_sha3__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! js-sha3 */ "../node_modules/js-sha3/src/sha3.js"
          );
        /* harmony import */ var _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! @noble/secp256k1 */ "../node_modules/@noble/secp256k1/lib/esm/index.js"
          );
        /* harmony import */ var _noble_hashes_hmac__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! @noble/hashes/hmac */ "../node_modules/@noble/hashes/esm/hmac.js"
          );
        /* harmony import */ var _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! @noble/hashes/sha256 */ "../node_modules/@noble/hashes/esm/sha256.js"
          );
        /* harmony import */ var jayson_lib_client_browser_index_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! jayson/lib/client/browser/index.js */ "../node_modules/jayson/lib/client/browser/index.js"
          );
        /* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__(
            /*! cross-fetch */ "../node_modules/cross-fetch/dist/browser-ponyfill.js"
          );
        /* harmony import */ var lossless_json__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__(
            /*! lossless-json */ "../node_modules/lossless-json/dist/lossless-json.js"
          );
        /* harmony import */ var _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__(
            /*! @mysten/bcs */ "../node_modules/@mysten/bcs/dist/index.mjs"
          );
        /* harmony import */ var rpc_websockets__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__(
            /*! rpc-websockets */ "../node_modules/rpc-websockets/dist/index.browser.js"
          );
        // src/cryptography/ed25519-keypair.ts

        // src/serialization/base64.ts

        var Base64DataBuffer = class {
          constructor(data) {
            if (typeof data === "string") {
              this.data = new Uint8Array(
                buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(data, "base64")
              );
            } else {
              this.data = data;
            }
          }
          getData() {
            return this.data;
          }
          getLength() {
            return this.data.length;
          }
          toString() {
            return buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(
              this.data
            ).toString("base64");
          }
        };

        // src/cryptography/ed25519-publickey.ts

        // src/cryptography/publickey.ts
        var SIGNATURE_SCHEME_TO_FLAG = {
          ED25519: 0,
          Secp256k1: 1,
        };
        function checkPublicKeyData(value) {
          return value._bn !== void 0;
        }

        // src/cryptography/ed25519-publickey.ts
        var PUBLIC_KEY_SIZE = 32;
        var Ed25519PublicKey = class {
          constructor(value) {
            if (checkPublicKeyData(value)) {
              this._bn = value._bn;
            } else {
              if (typeof value === "string") {
                const buffer = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(
                  value,
                  "base64"
                );
                if (buffer.length !== PUBLIC_KEY_SIZE) {
                  throw new Error(
                    `Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${buffer.length}`
                  );
                }
                this._bn = new bn_js__WEBPACK_IMPORTED_MODULE_2__(buffer);
              } else {
                this._bn = new bn_js__WEBPACK_IMPORTED_MODULE_2__(value);
              }
              let length = this._bn.byteLength();
              if (length != PUBLIC_KEY_SIZE) {
                throw new Error(
                  `Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${length}`
                );
              }
            }
          }
          equals(publicKey) {
            return this._bn.eq(publicKey._bn);
          }
          toBase64() {
            return this.toBuffer().toString("base64");
          }
          toBytes() {
            return this.toBuffer();
          }
          toBuffer() {
            const b = this._bn.toArrayLike(
              buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer
            );
            if (b.length === PUBLIC_KEY_SIZE) {
              return b;
            }
            const zeroPad =
              buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(PUBLIC_KEY_SIZE);
            b.copy(zeroPad, PUBLIC_KEY_SIZE - b.length);
            return zeroPad;
          }
          toString() {
            return this.toBase64();
          }
          toSuiAddress() {
            let tmp = new Uint8Array(PUBLIC_KEY_SIZE + 1);
            tmp.set([SIGNATURE_SCHEME_TO_FLAG["ED25519"]]);
            tmp.set(this.toBytes(), 1);
            return js_sha3__WEBPACK_IMPORTED_MODULE_3__
              .sha3_256(tmp)
              .slice(0, 40);
          }
        };

        // src/cryptography/ed25519-keypair.ts
        var Ed25519Keypair = class {
          constructor(keypair) {
            if (keypair) {
              this.keypair = keypair;
            } else {
              this.keypair =
                tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.keyPair();
            }
          }
          getKeyScheme() {
            return "ED25519";
          }
          static generate() {
            return new Ed25519Keypair(
              tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.keyPair()
            );
          }
          static fromSecretKey(secretKey, options) {
            const keypair =
              tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.keyPair.fromSecretKey(
                secretKey
              );
            if (!options || !options.skipValidation) {
              const encoder = new TextEncoder();
              const signData = encoder.encode("sui validation");
              const signature =
                tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.detached(
                  signData,
                  keypair.secretKey
                );
              if (
                !tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.detached.verify(
                  signData,
                  signature,
                  keypair.publicKey
                )
              ) {
                throw new Error("provided secretKey is invalid");
              }
            }
            return new Ed25519Keypair(keypair);
          }
          static fromSeed(seed) {
            return new Ed25519Keypair(
              tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.keyPair.fromSeed(seed)
            );
          }
          getPublicKey() {
            return new Ed25519PublicKey(this.keypair.publicKey);
          }
          signData(data) {
            return new Base64DataBuffer(
              tweetnacl__WEBPACK_IMPORTED_MODULE_0__.sign.detached(
                data.getData(),
                this.keypair.secretKey
              )
            );
          }
        };

        // src/cryptography/secp256k1-keypair.ts

        // src/cryptography/secp256k1-publickey.ts

        var SECP256K1_PUBLIC_KEY_SIZE = 33;
        var Secp256k1PublicKey = class {
          constructor(value) {
            if (checkPublicKeyData(value)) {
              this._bn = value._bn;
            } else {
              if (typeof value === "string") {
                const buffer = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(
                  value,
                  "base64"
                );
                if (buffer.length !== SECP256K1_PUBLIC_KEY_SIZE) {
                  throw new Error(
                    `Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${buffer.length}`
                  );
                }
                this._bn = new bn_js__WEBPACK_IMPORTED_MODULE_2__(buffer);
              } else {
                this._bn = new bn_js__WEBPACK_IMPORTED_MODULE_2__(value);
              }
              let length = this._bn.byteLength();
              if (length != SECP256K1_PUBLIC_KEY_SIZE) {
                throw new Error(
                  `Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${length}`
                );
              }
            }
          }
          equals(publicKey) {
            return this._bn.eq(publicKey._bn);
          }
          toBase64() {
            return this.toBuffer().toString("base64");
          }
          toBytes() {
            return this.toBuffer();
          }
          toBuffer() {
            const b = this._bn.toArrayLike(
              buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer
            );
            if (b.length === SECP256K1_PUBLIC_KEY_SIZE) {
              return b;
            }
            const zeroPad = buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.alloc(
              SECP256K1_PUBLIC_KEY_SIZE
            );
            b.copy(zeroPad, SECP256K1_PUBLIC_KEY_SIZE - b.length);
            return zeroPad;
          }
          toString() {
            return this.toBase64();
          }
          toSuiAddress() {
            let tmp = new Uint8Array(SECP256K1_PUBLIC_KEY_SIZE + 1);
            tmp.set([SIGNATURE_SCHEME_TO_FLAG["Secp256k1"]]);
            tmp.set(this.toBytes(), 1);
            return js_sha3__WEBPACK_IMPORTED_MODULE_3__
              .sha3_256(tmp)
              .slice(0, 40);
          }
        };

        // src/cryptography/secp256k1-keypair.ts

        _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.utils.hmacSha256Sync = (
          key,
          ...msgs
        ) => {
          const h = _noble_hashes_hmac__WEBPACK_IMPORTED_MODULE_5__.hmac.create(
            _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_6__.sha256,
            key
          );
          msgs.forEach((msg) => h.update(msg));
          return h.digest();
        };
        var Secp256k1Keypair = class {
          constructor(keypair) {
            if (keypair) {
              this.keypair = keypair;
            } else {
              const secretKey =
                _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.utils.randomPrivateKey();
              const publicKey =
                _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.getPublicKey(
                  secretKey,
                  true
                );
              this.keypair = { publicKey, secretKey };
            }
          }
          getKeyScheme() {
            return "Secp256k1";
          }
          static generate() {
            const secretKey =
              _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.utils.randomPrivateKey();
            const publicKey =
              _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.getPublicKey(
                secretKey,
                true
              );
            return new Secp256k1Keypair({ publicKey, secretKey });
          }
          static fromSecretKey(secretKey, options) {
            const publicKey =
              _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.getPublicKey(
                secretKey,
                true
              );
            if (!options || !options.skipValidation) {
              const encoder = new TextEncoder();
              const signData = encoder.encode("sui validation");
              const msgHash = (0,
              _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_6__.sha256)(
                signData
              );
              const signature =
                _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.signSync(
                  msgHash,
                  secretKey
                );
              if (
                !_noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.verify(
                  signature,
                  msgHash,
                  publicKey,
                  { strict: true }
                )
              ) {
                throw new Error("Provided secretKey is invalid");
              }
            }
            return new Secp256k1Keypair({ publicKey, secretKey });
          }
          static fromSeed(seed) {
            let publicKey =
              _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.getPublicKey(
                seed,
                true
              );
            return new Secp256k1Keypair({ publicKey, secretKey: seed });
          }
          getPublicKey() {
            return new Secp256k1PublicKey(this.keypair.publicKey);
          }
          signData(data) {
            const msgHash = (0,
            _noble_hashes_sha256__WEBPACK_IMPORTED_MODULE_6__.sha256)(
              data.getData()
            );
            const [sig, rec_id] =
              _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.signSync(
                msgHash,
                this.keypair.secretKey,
                {
                  canonical: true,
                  recovered: true,
                }
              );
            var recoverable_sig = new Uint8Array(65);
            recoverable_sig.set(
              _noble_secp256k1__WEBPACK_IMPORTED_MODULE_4__.Signature.fromDER(
                sig
              ).toCompactRawBytes()
            );
            recoverable_sig.set([rec_id], 64);
            return new Base64DataBuffer(recoverable_sig);
          }
        };

        // src/providers/provider.ts
        var Provider = class {};

        // src/rpc/client.ts

        // src/rpc/client.guard.ts
        function isValidResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            obj.jsonrpc === "2.0" &&
            typeof obj.id === "string"
          );
        }
        function isErrorResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            obj.jsonrpc === "2.0" &&
            typeof obj.id === "string" &&
            ((obj.error !== null && typeof obj.error === "object") ||
              typeof obj.error === "function") &&
            typeof obj.error.message === "string"
          );
        }

        // src/rpc/client.ts

        var TYPE_MISMATCH_ERROR = `The response returned from RPC server does not match the TypeScript definition. This is likely because the SDK version is not compatible with the RPC server. Please update your SDK version to the latest. `;
        var JsonRpcClient = class {
          constructor(url, httpHeaders) {
            this.rpcClient = this.createRpcClient(url, httpHeaders);
          }
          createRpcClient(url, httpHeaders) {
            const client =
              new jayson_lib_client_browser_index_js__WEBPACK_IMPORTED_MODULE_7__(
                async (request, callback) => {
                  const options = {
                    method: "POST",
                    body: request,
                    headers: Object.assign(
                      {
                        "Content-Type": "application/json",
                      },
                      httpHeaders || {}
                    ),
                  };
                  try {
                    let res = await cross_fetch__WEBPACK_IMPORTED_MODULE_8__(
                      url,
                      options
                    );
                    const text = await res.text();
                    const result = JSON.stringify(
                      lossless_json__WEBPACK_IMPORTED_MODULE_9__.parse(
                        text,
                        (key, value) => {
                          if (value == null) {
                            return value;
                          }
                          if (key === "balance" && typeof value === "number") {
                            return value.toString();
                          }
                          try {
                            if (value.isLosslessNumber) return value.valueOf();
                          } catch {
                            return value.toString();
                          }
                          return value;
                        }
                      )
                    );
                    if (res.ok) {
                      callback(null, result);
                    } else {
                      callback(
                        new Error(`${res.status} ${res.statusText}: ${text}`)
                      );
                    }
                  } catch (err) {
                    if (err instanceof Error) callback(err);
                  }
                },
                {}
              );
            return client;
          }
          async requestWithType(method, args, isT, skipDataValidation = false) {
            const response = await this.request(method, args);
            if (isErrorResponse(response)) {
              throw new Error(`RPC Error: ${response.error.message}`);
            } else if (isValidResponse(response)) {
              const expectedSchema = isT(response.result);
              const errMsg =
                TYPE_MISMATCH_ERROR +
                `Result received was: ${JSON.stringify(response.result)}`;
              if (skipDataValidation && !expectedSchema) {
                console.warn(errMsg);
                return response.result;
              } else if (!expectedSchema) {
                throw new Error(`RPC Error: ${errMsg}`);
              }
              return response.result;
            }
            throw new Error(`Unexpected RPC Response: ${response}`);
          }
          async request(method, args) {
            return new Promise((resolve, reject) => {
              this.rpcClient.request(method, args, (err, response) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(response);
              });
            });
          }
          async batchRequestWithType(
            requests,
            isT,
            skipDataValidation = false
          ) {
            const responses = await this.batchRequest(requests);
            const validResponses = responses.filter(
              (response) =>
                isValidResponse(response) &&
                (skipDataValidation || isT(response.result))
            );
            if (responses.length > validResponses.length) {
              console.warn(
                `Batch request contains invalid responses. ${
                  responses.length - validResponses.length
                } of the ${responses.length} requests has invalid schema.`
              );
              const exampleTypeMismatch = responses.find((r) => !isT(r.result));
              const exampleInvalidResponseIndex = responses.findIndex(
                (r) => !isValidResponse(r)
              );
              if (exampleTypeMismatch) {
                console.warn(
                  TYPE_MISMATCH_ERROR +
                    `One example mismatch is: ${JSON.stringify(
                      exampleTypeMismatch.result
                    )}`
                );
              }
              if (exampleInvalidResponseIndex !== -1) {
                console.warn(
                  `The request ${JSON.stringify(
                    requests[exampleInvalidResponseIndex]
                  )} within a batch request returns an invalid response ${JSON.stringify(
                    responses[exampleInvalidResponseIndex]
                  )}`
                );
              }
            }
            return validResponses.map((response) => response.result);
          }
          async batchRequest(requests) {
            return new Promise((resolve, reject) => {
              if (requests.length === 0) resolve([]);
              const batch = requests.map((params) => {
                return this.rpcClient.request(params.method, params.args);
              });
              this.rpcClient.request(batch, (err, response) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(response);
              });
            });
          }
        };

        // src/types/index.guard.ts
        function isTransactionDigest(obj, _argumentName) {
          return typeof obj === "string";
        }
        function isSuiAddress(obj, _argumentName) {
          return typeof obj === "string";
        }
        function isObjectOwner(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.AddressOwner)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.ObjectOwner)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.SingleOwner)) ||
            obj === "Shared" ||
            obj === "Immutable"
          );
        }
        function isSuiObjectRef(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.digest) &&
            isTransactionDigest(obj.objectId) &&
            isSuiMoveTypeParameterIndex(obj.version)
          );
        }
        function isSuiObjectInfo(obj, _argumentName) {
          return (
            isSuiObjectRef(obj) &&
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.type) &&
            isObjectOwner(obj.owner) &&
            isTransactionDigest(obj.previousTransaction)
          );
        }
        function isObjectContentFields(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            Object.entries(obj).every(([key, _value]) =>
              isTransactionDigest(key)
            )
          );
        }
        function isMovePackageContent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            Object.entries(obj).every(
              ([key, value]) =>
                isTransactionDigest(value) && isTransactionDigest(key)
            )
          );
        }
        function isSuiData(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isObjectType(obj.dataType) &&
              isSuiMoveObject(obj)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isObjectType(obj.dataType) &&
              isSuiMovePackage(obj))
          );
        }
        function isSuiMoveObject(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.type) &&
            isObjectContentFields(obj.fields) &&
            (typeof obj.has_public_transfer === "undefined" ||
              obj.has_public_transfer === false ||
              obj.has_public_transfer === true)
          );
        }
        function isSuiMovePackage(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isMovePackageContent(obj.disassembled)
          );
        }
        function isSuiMoveFunctionArgTypesResponse(obj, _argumentName) {
          return (
            Array.isArray(obj) && obj.every((e) => isSuiMoveFunctionArgType(e))
          );
        }
        function isSuiMoveFunctionArgType(obj, _argumentName) {
          return (
            isTransactionDigest(obj) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.Object))
          );
        }
        function isSuiMoveFunctionArgTypes(obj, _argumentName) {
          return (
            Array.isArray(obj) && obj.every((e) => isSuiMoveFunctionArgType(e))
          );
        }
        function isSuiMoveNormalizedModules(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            Object.entries(obj).every(
              ([key, value]) =>
                isSuiMoveNormalizedModule(value) && isTransactionDigest(key)
            )
          );
        }
        function isSuiMoveNormalizedModule(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.file_format_version) &&
            isTransactionDigest(obj.address) &&
            isTransactionDigest(obj.name) &&
            Array.isArray(obj.friends) &&
            obj.friends.every((e) => isSuiMoveModuleId(e)) &&
            ((obj.structs !== null && typeof obj.structs === "object") ||
              typeof obj.structs === "function") &&
            Object.entries(obj.structs).every(
              ([key, value]) =>
                isSuiMoveNormalizedStruct(value) && isTransactionDigest(key)
            ) &&
            ((obj.exposed_functions !== null &&
              typeof obj.exposed_functions === "object") ||
              typeof obj.exposed_functions === "function") &&
            Object.entries(obj.exposed_functions).every(
              ([key, value]) =>
                isSuiMoveNormalizedFunction(value) && isTransactionDigest(key)
            )
          );
        }
        function isSuiMoveModuleId(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.address) &&
            isTransactionDigest(obj.name)
          );
        }
        function isSuiMoveNormalizedStruct(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveAbilitySet(obj.abilities) &&
            Array.isArray(obj.type_parameters) &&
            obj.type_parameters.every((e) => isSuiMoveStructTypeParameter(e)) &&
            Array.isArray(obj.fields) &&
            obj.fields.every((e) => isSuiMoveNormalizedField(e))
          );
        }
        function isSuiMoveStructTypeParameter(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveAbilitySet(obj.constraints) &&
            typeof obj.is_phantom === "boolean"
          );
        }
        function isSuiMoveNormalizedField(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.name) &&
            isSuiMoveNormalizedType(obj.type_)
          );
        }
        function isSuiMoveNormalizedFunction(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveVisibility(obj.visibility) &&
            typeof obj.is_entry === "boolean" &&
            Array.isArray(obj.type_parameters) &&
            obj.type_parameters.every((e) => isSuiMoveAbilitySet(e)) &&
            Array.isArray(obj.parameters) &&
            obj.parameters.every((e) => isSuiMoveNormalizedType(e)) &&
            Array.isArray(obj.return_) &&
            obj.return_.every((e) => isSuiMoveNormalizedType(e))
          );
        }
        function isSuiMoveVisibility(obj, _argumentName) {
          return obj === "Private" || obj === "Public" || obj === "Friend";
        }
        function isSuiMoveTypeParameterIndex(obj, _argumentName) {
          return typeof obj === "number";
        }
        function isSuiMoveAbilitySet(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            Array.isArray(obj.abilities) &&
            obj.abilities.every((e) => isTransactionDigest(e))
          );
        }
        function isSuiMoveNormalizedType(obj, _argumentName) {
          return (
            isTransactionDigest(obj) ||
            isSuiMoveNormalizedTypeParameterType(obj) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiMoveNormalizedStructType(obj.Reference)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiMoveNormalizedStructType(obj.MutableReference)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiMoveNormalizedType(obj.Vector)) ||
            isSuiMoveNormalizedStructType(obj)
          );
        }
        function isSuiMoveNormalizedTypeParameterType(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.TypeParameter)
          );
        }
        function isSuiMoveNormalizedStructType(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            ((obj.Struct !== null && typeof obj.Struct === "object") ||
              typeof obj.Struct === "function") &&
            isTransactionDigest(obj.Struct.address) &&
            isTransactionDigest(obj.Struct.module) &&
            isTransactionDigest(obj.Struct.name) &&
            Array.isArray(obj.Struct.type_arguments) &&
            obj.Struct.type_arguments.every((e) =>
              isSuiMoveNormalizedTypeParameterType(e)
            )
          );
        }
        function isSuiObject(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiData(obj.data) &&
            isObjectOwner(obj.owner) &&
            isTransactionDigest(obj.previousTransaction) &&
            isSuiMoveTypeParameterIndex(obj.storageRebate) &&
            isSuiObjectRef(obj.reference)
          );
        }
        function isObjectStatus(obj, _argumentName) {
          return obj === "Exists" || obj === "NotExists" || obj === "Deleted";
        }
        function isObjectType(obj, _argumentName) {
          return obj === "moveObject" || obj === "package";
        }
        function isGetOwnedObjectsResponse(obj, _argumentName) {
          return Array.isArray(obj) && obj.every((e) => isSuiObjectInfo(e));
        }
        function isGetObjectDataResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isObjectStatus(obj.status) &&
            (isTransactionDigest(obj.details) ||
              isSuiObjectRef(obj.details) ||
              isSuiObject(obj.details))
          );
        }
        function isObjectDigest(obj, _argumentName) {
          return typeof obj === "string";
        }
        function isObjectId(obj, _argumentName) {
          return typeof obj === "string";
        }
        function isSequenceNumber(obj, _argumentName) {
          return typeof obj === "number";
        }
        function isMoveEvent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.packageId) &&
            isTransactionDigest(obj.transactionModule) &&
            isTransactionDigest(obj.sender) &&
            isTransactionDigest(obj.type) &&
            (typeof obj.fields === "undefined" ||
              (obj.fields !== null && typeof obj.fields === "object") ||
              typeof obj.fields === "function") &&
            isTransactionDigest(obj.bcs)
          );
        }
        function isPublishEvent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.sender) &&
            isTransactionDigest(obj.packageId)
          );
        }
        function isTransferObjectEvent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.packageId) &&
            isTransactionDigest(obj.transactionModule) &&
            isTransactionDigest(obj.sender) &&
            isObjectOwner(obj.recipient) &&
            isTransactionDigest(obj.objectId) &&
            isSuiMoveTypeParameterIndex(obj.version) &&
            isTransactionDigest(obj.type) &&
            (obj.amount === null || isSuiMoveTypeParameterIndex(obj.amount))
          );
        }
        function isDeleteObjectEvent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.packageId) &&
            isTransactionDigest(obj.transactionModule) &&
            isTransactionDigest(obj.sender) &&
            isTransactionDigest(obj.objectId)
          );
        }
        function isNewObjectEvent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.packageId) &&
            isTransactionDigest(obj.transactionModule) &&
            isTransactionDigest(obj.sender) &&
            isObjectOwner(obj.recipient) &&
            isTransactionDigest(obj.objectId)
          );
        }
        function isSuiEvent(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isMoveEvent(obj.moveEvent)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isPublishEvent(obj.publish)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransferObjectEvent(obj.transferObject)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isDeleteObjectEvent(obj.deleteObject)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isNewObjectEvent(obj.newObject)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              typeof obj.epochChange === "bigint") ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              typeof obj.checkpoint === "bigint")
          );
        }
        function isMoveEventField(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.path) &&
            isSuiJsonValue(obj.value)
          );
        }
        function isEventType(obj, _argumentName) {
          return (
            obj === "MoveEvent" ||
            obj === "Publish" ||
            obj === "TransferObject" ||
            obj === "DeleteObject" ||
            obj === "NewObject" ||
            obj === "EpochChange" ||
            obj === "Checkpoint"
          );
        }
        function isSuiEventFilter(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.Package)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.Module)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.MoveEventType)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isMoveEventField(obj.MoveEventField)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.SenderAddress)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isEventType(obj.EventType)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              Array.isArray(obj.All) &&
              obj.All.every((e) => isSuiEventFilter(e))) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              Array.isArray(obj.Any) &&
              obj.Any.every((e) => isSuiEventFilter(e))) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              Array.isArray(obj.And) &&
              isSuiEventFilter(obj.And[0]) &&
              isSuiEventFilter(obj.And[1])) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              Array.isArray(obj.Or) &&
              isSuiEventFilter(obj.Or[0]) &&
              isSuiEventFilter(obj.Or[1]))
          );
        }
        function isSuiEventEnvelope(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.timestamp) &&
            isTransactionDigest(obj.txDigest) &&
            isSuiEvent(obj.event)
          );
        }
        function isSuiEvents(obj, _argumentName) {
          return Array.isArray(obj) && obj.every((e) => isSuiEventEnvelope(e));
        }
        function isSubscriptionId(obj, _argumentName) {
          return typeof obj === "number";
        }
        function isSubscriptionEvent(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.subscription) &&
            isSuiEventEnvelope(obj.result)
          );
        }
        function isTransferObject(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.recipient) &&
            isSuiObjectRef(obj.objectRef)
          );
        }
        function isSuiTransferSui(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.recipient) &&
            (obj.amount === null || isSuiMoveTypeParameterIndex(obj.amount))
          );
        }
        function isSuiChangeEpoch(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.epoch) &&
            isSuiMoveTypeParameterIndex(obj.storage_charge) &&
            isSuiMoveTypeParameterIndex(obj.computation_charge)
          );
        }
        function isExecuteTransactionRequestType(obj, _argumentName) {
          return (
            obj === "ImmediateReturn" ||
            obj === "WaitForTxCert" ||
            obj === "WaitForEffectsCert"
          );
        }
        function isTransactionKindName(obj, _argumentName) {
          return (
            obj === "Publish" ||
            obj === "TransferObject" ||
            obj === "Call" ||
            obj === "TransferSui" ||
            obj === "ChangeEpoch"
          );
        }
        function isSuiTransactionKind(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransferObject(obj.TransferObject)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiMovePackage(obj.Publish)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isMoveCall(obj.Call)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiTransferSui(obj.TransferSui)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiChangeEpoch(obj.ChangeEpoch))
          );
        }
        function isSuiTransactionData(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            Array.isArray(obj.transactions) &&
            obj.transactions.every((e) => isSuiTransactionKind(e)) &&
            isTransactionDigest(obj.sender) &&
            isSuiObjectRef(obj.gasPayment) &&
            isSuiMoveTypeParameterIndex(obj.gasBudget)
          );
        }
        function isEpochId(obj, _argumentName) {
          return typeof obj === "number";
        }
        function isGenericAuthoritySignature(obj, _argumentName) {
          return (
            isTransactionDigest(obj) ||
            (Array.isArray(obj) && obj.every((e) => isTransactionDigest(e)))
          );
        }
        function isAuthorityQuorumSignInfo(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.epoch) &&
            isGenericAuthoritySignature(obj.signature)
          );
        }
        function isCertifiedTransaction(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.transactionDigest) &&
            isSuiTransactionData(obj.data) &&
            isTransactionDigest(obj.txSignature) &&
            isAuthorityQuorumSignInfo(obj.authSignInfo)
          );
        }
        function isGasCostSummary(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiMoveTypeParameterIndex(obj.computationCost) &&
            isSuiMoveTypeParameterIndex(obj.storageCost) &&
            isSuiMoveTypeParameterIndex(obj.storageRebate)
          );
        }
        function isExecutionStatusType(obj, _argumentName) {
          return obj === "success" || obj === "failure";
        }
        function isExecutionStatus(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isExecutionStatusType(obj.status) &&
            (typeof obj.error === "undefined" || isTransactionDigest(obj.error))
          );
        }
        function isOwnedObjectRef(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isObjectOwner(obj.owner) &&
            isSuiObjectRef(obj.reference)
          );
        }
        function isTransactionEffects(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isExecutionStatus(obj.status) &&
            isGasCostSummary(obj.gasUsed) &&
            (typeof obj.sharedObjects === "undefined" ||
              (Array.isArray(obj.sharedObjects) &&
                obj.sharedObjects.every((e) => isSuiObjectRef(e)))) &&
            isTransactionDigest(obj.transactionDigest) &&
            (typeof obj.created === "undefined" ||
              (Array.isArray(obj.created) &&
                obj.created.every((e) => isOwnedObjectRef(e)))) &&
            (typeof obj.mutated === "undefined" ||
              (Array.isArray(obj.mutated) &&
                obj.mutated.every((e) => isOwnedObjectRef(e)))) &&
            (typeof obj.unwrapped === "undefined" ||
              (Array.isArray(obj.unwrapped) &&
                obj.unwrapped.every((e) => isOwnedObjectRef(e)))) &&
            (typeof obj.deleted === "undefined" ||
              (Array.isArray(obj.deleted) &&
                obj.deleted.every((e) => isSuiObjectRef(e)))) &&
            (typeof obj.wrapped === "undefined" ||
              (Array.isArray(obj.wrapped) &&
                obj.wrapped.every((e) => isSuiObjectRef(e)))) &&
            isOwnedObjectRef(obj.gasObject) &&
            (typeof obj.events === "undefined" || Array.isArray(obj.events)) &&
            (typeof obj.dependencies === "undefined" ||
              (Array.isArray(obj.dependencies) &&
                obj.dependencies.every((e) => isTransactionDigest(e))))
          );
        }
        function isSuiTransactionResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isCertifiedTransaction(obj.certificate) &&
            isTransactionEffects(obj.effects) &&
            (obj.timestamp_ms === null ||
              isSuiMoveTypeParameterIndex(obj.timestamp_ms)) &&
            (obj.parsed_data === null ||
              (((obj.parsed_data !== null &&
                typeof obj.parsed_data === "object") ||
                typeof obj.parsed_data === "function") &&
                isSuiParsedSplitCoinResponse(obj.parsed_data.SplitCoin)) ||
              (((obj.parsed_data !== null &&
                typeof obj.parsed_data === "object") ||
                typeof obj.parsed_data === "function") &&
                isSuiParsedMergeCoinResponse(obj.parsed_data.MergeCoin)) ||
              (((obj.parsed_data !== null &&
                typeof obj.parsed_data === "object") ||
                typeof obj.parsed_data === "function") &&
                isSuiParsedPublishResponse(obj.parsed_data.Publish)))
          );
        }
        function isSuiCertifiedTransactionEffects(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionEffects(obj.effects)
          );
        }
        function isSuiExecuteTransactionResponse(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              ((obj.ImmediateReturn !== null &&
                typeof obj.ImmediateReturn === "object") ||
                typeof obj.ImmediateReturn === "function") &&
              isTransactionDigest(obj.ImmediateReturn.tx_digest)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              ((obj.TxCert !== null && typeof obj.TxCert === "object") ||
                typeof obj.TxCert === "function") &&
              isCertifiedTransaction(obj.TxCert.certificate)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              ((obj.EffectsCert !== null &&
                typeof obj.EffectsCert === "object") ||
                typeof obj.EffectsCert === "function") &&
              isCertifiedTransaction(obj.EffectsCert.certificate) &&
              isSuiCertifiedTransactionEffects(obj.EffectsCert.effects))
          );
        }
        function isGatewayTxSeqNumber(obj, _argumentName) {
          return typeof obj === "number";
        }
        function isGetTxnDigestsResponse(obj, _argumentName) {
          return (
            Array.isArray(obj) &&
            obj.every(
              (e) =>
                Array.isArray(e) &&
                isSuiMoveTypeParameterIndex(e[0]) &&
                isTransactionDigest(e[1])
            )
          );
        }
        function isMoveCall(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiObjectRef(obj.package) &&
            isTransactionDigest(obj.module) &&
            isTransactionDigest(obj.function) &&
            (typeof obj.typeArguments === "undefined" ||
              (Array.isArray(obj.typeArguments) &&
                obj.typeArguments.every((e) => isTransactionDigest(e)))) &&
            (typeof obj.arguments === "undefined" ||
              (Array.isArray(obj.arguments) &&
                obj.arguments.every((e) => isSuiJsonValue(e))))
          );
        }
        function isSuiJsonValue(obj, _argumentName) {
          return (
            isTransactionDigest(obj) ||
            isSuiMoveTypeParameterIndex(obj) ||
            obj === false ||
            obj === true ||
            (Array.isArray(obj) && obj.every((e) => isSuiJsonValue(e)))
          );
        }
        function isEmptySignInfo(obj, _argumentName) {
          return typeof obj === "object";
        }
        function isAuthorityName(obj, _argumentName) {
          return typeof obj === "string";
        }
        function isAuthoritySignature(obj, _argumentName) {
          return typeof obj === "string";
        }
        function isTransactionBytes(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.txBytes) &&
            isSuiObjectRef(obj.gas)
          );
        }
        function isSuiParsedMergeCoinResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiObject(obj.updatedCoin) &&
            isSuiObject(obj.updatedGas)
          );
        }
        function isSuiParsedSplitCoinResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isSuiObject(obj.updatedCoin) &&
            Array.isArray(obj.newCoins) &&
            obj.newCoins.every((e) => isSuiObject(e)) &&
            isSuiObject(obj.updatedGas)
          );
        }
        function isSuiParsedPublishResponse(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            Array.isArray(obj.createdObjects) &&
            obj.createdObjects.every((e) => isSuiObject(e)) &&
            isSuiPackage(obj.package) &&
            isSuiObject(obj.updatedGas)
          );
        }
        function isSuiPackage(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.digest) &&
            isTransactionDigest(obj.objectId) &&
            isSuiMoveTypeParameterIndex(obj.version)
          );
        }
        function isSuiParsedTransactionResponse(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiParsedSplitCoinResponse(obj.SplitCoin)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiParsedMergeCoinResponse(obj.MergeCoin)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiParsedPublishResponse(obj.Publish))
          );
        }
        function isDelegationData(obj, _argumentName) {
          return (
            isSuiMoveObject(obj) &&
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isObjectType(obj.dataType) &&
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            obj.type === "0x2::delegation::Delegation" &&
            ((obj.fields !== null && typeof obj.fields === "object") ||
              typeof obj.fields === "function") &&
            (isSuiMoveTypeParameterIndex(obj.fields.active_delegation) ||
              (((obj.fields.active_delegation !== null &&
                typeof obj.fields.active_delegation === "object") ||
                typeof obj.fields.active_delegation === "function") &&
                ((obj.fields.active_delegation.fields !== null &&
                  typeof obj.fields.active_delegation.fields === "object") ||
                  typeof obj.fields.active_delegation.fields === "function") &&
                obj.fields.active_delegation.fields.vec === "" &&
                isTransactionDigest(obj.fields.active_delegation.type))) &&
            isSuiMoveTypeParameterIndex(obj.fields.delegate_amount) &&
            isSuiMoveTypeParameterIndex(
              obj.fields.next_reward_unclaimed_epoch
            ) &&
            isTransactionDigest(obj.fields.validator_address) &&
            ((obj.fields.info !== null &&
              typeof obj.fields.info === "object") ||
              typeof obj.fields.info === "function") &&
            isTransactionDigest(obj.fields.info.id) &&
            isSuiMoveTypeParameterIndex(obj.fields.info.version) &&
            (isSuiMoveObject(obj.fields.coin_locked_until_epoch) ||
              (((obj.fields.coin_locked_until_epoch !== null &&
                typeof obj.fields.coin_locked_until_epoch === "object") ||
                typeof obj.fields.coin_locked_until_epoch === "function") &&
                ((obj.fields.coin_locked_until_epoch.fields !== null &&
                  typeof obj.fields.coin_locked_until_epoch.fields ===
                    "object") ||
                  typeof obj.fields.coin_locked_until_epoch.fields ===
                    "function") &&
                obj.fields.coin_locked_until_epoch.fields.vec === "" &&
                isTransactionDigest(
                  obj.fields.coin_locked_until_epoch.type
                ))) &&
            (isSuiMoveTypeParameterIndex(obj.fields.ending_epoch) ||
              (((obj.fields.ending_epoch !== null &&
                typeof obj.fields.ending_epoch === "object") ||
                typeof obj.fields.ending_epoch === "function") &&
                ((obj.fields.ending_epoch.fields !== null &&
                  typeof obj.fields.ending_epoch.fields === "object") ||
                  typeof obj.fields.ending_epoch.fields === "function") &&
                obj.fields.ending_epoch.fields.vec === "" &&
                isTransactionDigest(obj.fields.ending_epoch.type)))
          );
        }
        function isDelegationSuiObject(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isObjectOwner(obj.owner) &&
            isTransactionDigest(obj.previousTransaction) &&
            isSuiMoveTypeParameterIndex(obj.storageRebate) &&
            isSuiObjectRef(obj.reference) &&
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isDelegationData(obj.data)
          );
        }
        function isTransferObjectTx(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            ((obj.TransferObject !== null &&
              typeof obj.TransferObject === "object") ||
              typeof obj.TransferObject === "function") &&
            isTransactionDigest(obj.TransferObject.recipient) &&
            isSuiObjectRef(obj.TransferObject.object_ref)
          );
        }
        function isTransferSuiTx(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            ((obj.TransferSui !== null &&
              typeof obj.TransferSui === "object") ||
              typeof obj.TransferSui === "function") &&
            isTransactionDigest(obj.TransferSui.recipient) &&
            ((((obj.TransferSui.amount !== null &&
              typeof obj.TransferSui.amount === "object") ||
              typeof obj.TransferSui.amount === "function") &&
              isSuiMoveTypeParameterIndex(obj.TransferSui.amount.Some)) ||
              (((obj.TransferSui.amount !== null &&
                typeof obj.TransferSui.amount === "object") ||
                typeof obj.TransferSui.amount === "function") &&
                obj.TransferSui.amount.None === null))
          );
        }
        function isPayTx(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            ((obj.Pay !== null && typeof obj.Pay === "object") ||
              typeof obj.Pay === "function") &&
            Array.isArray(obj.Pay.input_coins) &&
            obj.Pay.input_coins.every((e) => isTransactionDigest(e)) &&
            Array.isArray(obj.Pay.recipients) &&
            obj.Pay.recipients.every((e) => isTransactionDigest(e)) &&
            Array.isArray(obj.Pay.amounts) &&
            obj.Pay.amounts.every((e) => isSuiMoveTypeParameterIndex(e))
          );
        }
        function isPublishTx(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            ((obj.Publish !== null && typeof obj.Publish === "object") ||
              typeof obj.Publish === "function") &&
            ((obj.Publish.modules !== null &&
              typeof obj.Publish.modules === "object") ||
              typeof obj.Publish.modules === "function") &&
            isSuiMoveTypeParameterIndex(obj.Publish.modules.length)
          );
        }
        function isObjectArg(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isSuiObjectRef(obj.ImmOrOwned)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransactionDigest(obj.Shared))
          );
        }
        function isCallArg(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              ((obj.Pure !== null && typeof obj.Pure === "object") ||
                typeof obj.Pure === "function") &&
              isSuiMoveTypeParameterIndex(obj.Pure.length)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isObjectArg(obj.Object))
          );
        }
        function isStructTag(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            isTransactionDigest(obj.address) &&
            isTransactionDigest(obj.module) &&
            isTransactionDigest(obj.name) &&
            Array.isArray(obj.typeParams) &&
            obj.typeParams.every((e) => isTypeTag(e))
          );
        }
        function isTypeTag(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              obj.bool === null) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              obj.u8 === null) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              obj.u64 === null) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              obj.u128 === null) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              obj.address === null) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              obj.signer === null) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTypeTag(obj.vector)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isStructTag(obj.struct))
          );
        }
        function isMoveCallTx(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            ((obj.Call !== null && typeof obj.Call === "object") ||
              typeof obj.Call === "function") &&
            isSuiObjectRef(obj.Call.package) &&
            isTransactionDigest(obj.Call.module) &&
            isTransactionDigest(obj.Call.function) &&
            Array.isArray(obj.Call.typeArguments) &&
            obj.Call.typeArguments.every((e) => isTypeTag(e)) &&
            Array.isArray(obj.Call.arguments) &&
            obj.Call.arguments.every((e) => isCallArg(e))
          );
        }
        function isTransaction(obj, _argumentName) {
          return (
            isTransferObjectTx(obj) ||
            isTransferSuiTx(obj) ||
            isPayTx(obj) ||
            isPublishTx(obj) ||
            isMoveCallTx(obj)
          );
        }
        function isTransactionKind(obj, _argumentName) {
          return (
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              isTransaction(obj.Single)) ||
            (((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
              Array.isArray(obj.Batch) &&
              obj.Batch.every((e) => isTransaction(e)))
          );
        }
        function isTransactionData(obj, _argumentName) {
          return (
            ((obj !== null && typeof obj === "object") ||
              typeof obj === "function") &&
            (typeof obj.sender === "undefined" ||
              isTransactionDigest(obj.sender)) &&
            isSuiMoveTypeParameterIndex(obj.gasBudget) &&
            isSuiMoveTypeParameterIndex(obj.gasPrice) &&
            isTransactionKind(obj.kind) &&
            isSuiObjectRef(obj.gasPayment)
          );
        }

        // src/types/common.ts
        var TX_DIGEST_LENGTH = 32;
        var VALID_BASE64_REGEX =
          /^(?:[a-zA-Z0-9+\/]{4})*(?:|(?:[a-zA-Z0-9+\/]{3}=)|(?:[a-zA-Z0-9+\/]{2}==)|(?:[a-zA-Z0-9+\/]{1}===))$/;
        function isValidTransactionDigest(value) {
          return (
            new Base64DataBuffer(value).getLength() === TX_DIGEST_LENGTH &&
            VALID_BASE64_REGEX.test(value)
          );
        }
        var SUI_ADDRESS_LENGTH = 20;
        function isValidSuiAddress(value) {
          return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
        }
        function isValidSuiObjectId(value) {
          return isValidSuiAddress(value);
        }
        function normalizeSuiAddress(value, forceAdd0x = false) {
          let address = value.toLowerCase();
          if (!forceAdd0x && address.startsWith("0x")) {
            address = address.slice(2);
          }
          return `0x${address.padStart(SUI_ADDRESS_LENGTH * 2, "0")}`;
        }
        function normalizeSuiObjectId(value, forceAdd0x = false) {
          return normalizeSuiAddress(value, forceAdd0x);
        }
        function isHex(value) {
          return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
        }
        function getHexByteLength(value) {
          return /^(0x|0X)/.test(value)
            ? (value.length - 2) / 2
            : value.length / 2;
        }

        // src/types/objects.ts
        function getObjectExistsResponse(resp) {
          return resp.status !== "Exists" ? void 0 : resp.details;
        }
        function getObjectDeletedResponse(resp) {
          return resp.status !== "Deleted" ? void 0 : resp.details;
        }
        function getObjectNotExistsResponse(resp) {
          return resp.status !== "NotExists" ? void 0 : resp.details;
        }
        function getObjectReference(resp) {
          var _a;
          return (
            ((_a = getObjectExistsResponse(resp)) == null
              ? void 0
              : _a.reference) || getObjectDeletedResponse(resp)
          );
        }
        function getObjectId(data) {
          var _a;
          if ("objectId" in data) {
            return data.objectId;
          }
          return (
            ((_a = getObjectReference(data)) == null ? void 0 : _a.objectId) ??
            getObjectNotExistsResponse(data)
          );
        }
        function getObjectVersion(data) {
          var _a;
          if ("version" in data) {
            return data.version;
          }
          return (_a = getObjectReference(data)) == null ? void 0 : _a.version;
        }
        function getObjectType(resp) {
          var _a;
          return (_a = getObjectExistsResponse(resp)) == null
            ? void 0
            : _a.data.dataType;
        }
        function getObjectPreviousTransactionDigest(resp) {
          var _a;
          return (_a = getObjectExistsResponse(resp)) == null
            ? void 0
            : _a.previousTransaction;
        }
        function getObjectOwner(resp) {
          var _a;
          return (_a = getObjectExistsResponse(resp)) == null
            ? void 0
            : _a.owner;
        }
        function isSharedObject(resp) {
          const owner = getObjectOwner(resp);
          return owner === "Shared";
        }
        function isImmutableObject(resp) {
          const owner = getObjectOwner(resp);
          return owner === "Immutable";
        }
        function getMoveObjectType(resp) {
          var _a;
          return (_a = getMoveObject(resp)) == null ? void 0 : _a.type;
        }
        function getObjectFields(resp) {
          var _a;
          if ("fields" in resp) {
            return resp.fields;
          }
          return (_a = getMoveObject(resp)) == null ? void 0 : _a.fields;
        }
        function getMoveObject(data) {
          const suiObject =
            "data" in data ? data : getObjectExistsResponse(data);
          if (
            (suiObject == null ? void 0 : suiObject.data.dataType) !==
            "moveObject"
          ) {
            return void 0;
          }
          return suiObject.data;
        }
        function hasPublicTransfer(data) {
          var _a;
          return (
            ((_a = getMoveObject(data)) == null
              ? void 0
              : _a.has_public_transfer) ?? false
          );
        }
        function getMovePackageContent(data) {
          if ("disassembled" in data) {
            return data.disassembled;
          }
          const suiObject = getObjectExistsResponse(data);
          if (
            (suiObject == null ? void 0 : suiObject.data.dataType) !== "package"
          ) {
            return void 0;
          }
          return suiObject.data.disassembled;
        }
        function extractMutableReference(normalizedType) {
          return typeof normalizedType === "object" &&
            "MutableReference" in normalizedType
            ? normalizedType.MutableReference
            : void 0;
        }
        function extractReference(normalizedType) {
          return typeof normalizedType === "object" &&
            "Reference" in normalizedType
            ? normalizedType.Reference
            : void 0;
        }
        function extractStructTag(normalizedType) {
          if (
            typeof normalizedType === "object" &&
            "Struct" in normalizedType
          ) {
            return normalizedType;
          }
          return (
            (extractReference(normalizedType) ||
              extractMutableReference(normalizedType)) ??
            void 0
          );
        }

        // src/types/events.ts
        var EVENT_QUERY_MAX_LIMIT = 100;
        var DEFAULT_START_TIME = 0;
        var DEFAULT_END_TIME = Number.MAX_SAFE_INTEGER;

        // src/types/transactions.ts

        function getTransactionDigest(tx) {
          return tx.transactionDigest;
        }
        function getTransactionSignature(tx) {
          return tx.txSignature;
        }
        function getTransactionAuthorityQuorumSignInfo(tx) {
          return tx.authSignInfo;
        }
        function getTransactionData(tx) {
          return tx.data;
        }
        function getTransactionSender(tx) {
          return tx.data.sender;
        }
        function getTransactionGasObject(tx) {
          return tx.data.gasPayment;
        }
        function getTransactionGasBudget(tx) {
          return tx.data.gasBudget;
        }
        function getTransferObjectTransaction(data) {
          return "TransferObject" in data ? data.TransferObject : void 0;
        }
        function getPublishTransaction(data) {
          return "Publish" in data ? data.Publish : void 0;
        }
        function getMoveCallTransaction(data) {
          return "Call" in data ? data.Call : void 0;
        }
        function getTransferSuiTransaction(data) {
          return "TransferSui" in data ? data.TransferSui : void 0;
        }
        function getChangeEpochTransaction(data) {
          return "ChangeEpoch" in data ? data.ChangeEpoch : void 0;
        }
        function getTransactions(data) {
          return data.data.transactions;
        }
        function getTransferSuiAmount(data) {
          return "TransferSui" in data && data.TransferSui.amount
            ? new bn_js__WEBPACK_IMPORTED_MODULE_2__.BN(
                data.TransferSui.amount,
                10
              )
            : null;
        }
        function getTransactionKindName(data) {
          return Object.keys(data)[0];
        }
        function getExecutionStatusType(data) {
          return getExecutionStatus(data).status;
        }
        function getExecutionStatus(data) {
          return data.effects.status;
        }
        function getExecutionStatusError(data) {
          return getExecutionStatus(data).error;
        }
        function getExecutionStatusGasSummary(data) {
          return data.effects.gasUsed;
        }
        function getTotalGasUsed(data) {
          const gasSummary = getExecutionStatusGasSummary(data);
          return (
            gasSummary.computationCost +
            gasSummary.storageCost -
            gasSummary.storageRebate
          );
        }
        function getTransactionEffects(data) {
          return "EffectsCert" in data
            ? data.EffectsCert.effects.effects
            : void 0;
        }
        function getParsedSplitCoinResponse(data) {
          const parsed = data.parsed_data;
          return parsed && "SplitCoin" in parsed ? parsed.SplitCoin : void 0;
        }
        function getParsedMergeCoinResponse(data) {
          const parsed = data.parsed_data;
          return parsed && "MergeCoin" in parsed ? parsed.MergeCoin : void 0;
        }
        function getParsedPublishResponse(data) {
          const parsed = data.parsed_data;
          return parsed && "Publish" in parsed ? parsed.Publish : void 0;
        }
        function getCoinAfterMerge(data) {
          var _a;
          return (_a = getParsedMergeCoinResponse(data)) == null
            ? void 0
            : _a.updatedCoin;
        }
        function getCoinAfterSplit(data) {
          var _a;
          return (_a = getParsedSplitCoinResponse(data)) == null
            ? void 0
            : _a.updatedCoin;
        }
        function getNewlyCreatedCoinsAfterSplit(data) {
          var _a;
          return (_a = getParsedSplitCoinResponse(data)) == null
            ? void 0
            : _a.newCoins;
        }
        function getNewlyCreatedCoinRefsAfterSplit(data) {
          var _a;
          if ("EffectsCert" in data) {
            const effects = data.EffectsCert.effects.effects;
            return (_a = effects.created) == null
              ? void 0
              : _a.map((c) => c.reference);
          }
          return void 0;
        }

        // src/types/framework.ts

        // src/types/option.ts
        function getOption(option) {
          if (
            typeof option === "object" &&
            option !== null &&
            "type" in option &&
            option.type.startsWith("0x1::option::Option<")
          ) {
            return void 0;
          }
          return option;
        }

        // src/types/framework.ts
        var COIN_PACKAGE_ID = "0x2";
        var COIN_MODULE_NAME = "coin";
        var COIN_TYPE = `${COIN_PACKAGE_ID}::${COIN_MODULE_NAME}::Coin`;
        var COIN_SPLIT_VEC_FUNC_NAME = "split_vec";
        var COIN_JOIN_FUNC_NAME = "join";
        var COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
        var Coin = class {
          static isCoin(data) {
            var _a;
            return (
              ((_a = Coin.getType(data)) == null
                ? void 0
                : _a.startsWith(COIN_TYPE)) ?? false
            );
          }
          static getCoinTypeArg(obj) {
            var _a;
            const res =
              (_a = Coin.getType(obj)) == null
                ? void 0
                : _a.match(COIN_TYPE_ARG_REGEX);
            return res ? res[1] : null;
          }
          static isSUI(obj) {
            const arg = Coin.getCoinTypeArg(obj);
            return arg ? Coin.getCoinSymbol(arg) === "SUI" : false;
          }
          static getCoinSymbol(coinTypeArg) {
            return coinTypeArg.substring(coinTypeArg.lastIndexOf(":") + 1);
          }
          static getCoinStructTag(coinTypeArg) {
            return {
              address: normalizeSuiObjectId(coinTypeArg.split("::")[0]),
              module: coinTypeArg.split("::")[1],
              name: coinTypeArg.split("::")[2],
              typeParams: [],
            };
          }
          static getBalance(data) {
            var _a;
            if (!Coin.isCoin(data)) {
              return void 0;
            }
            const balance =
              (_a = getObjectFields(data)) == null ? void 0 : _a.balance;
            return new bn_js__WEBPACK_IMPORTED_MODULE_2__.BN(balance, 10);
          }
          static getZero() {
            return new bn_js__WEBPACK_IMPORTED_MODULE_2__.BN("0", 10);
          }
          static getType(data) {
            if ("status" in data) {
              return getMoveObjectType(data);
            }
            return data.type;
          }
        };
        var _Delegation = class {
          static isDelegationSuiObject(obj) {
            return (
              "type" in obj.data &&
              obj.data.type === _Delegation.SUI_OBJECT_TYPE
            );
          }
          constructor(obj) {
            this.suiObject = obj;
          }
          nextRewardUnclaimedEpoch() {
            return this.suiObject.data.fields.next_reward_unclaimed_epoch;
          }
          activeDelegation() {
            return BigInt(
              getOption(this.suiObject.data.fields.active_delegation) || 0
            );
          }
          delegateAmount() {
            return this.suiObject.data.fields.delegate_amount;
          }
          endingEpoch() {
            return getOption(this.suiObject.data.fields.ending_epoch);
          }
          validatorAddress() {
            return this.suiObject.data.fields.validator_address;
          }
          isActive() {
            return this.activeDelegation() > 0 && !this.endingEpoch();
          }
          hasUnclaimedRewards(epoch) {
            return (
              this.nextRewardUnclaimedEpoch() <= epoch &&
              (this.isActive() || (this.endingEpoch() || 0) > epoch)
            );
          }
        };
        var Delegation = _Delegation;
        Delegation.SUI_OBJECT_TYPE = "0x2::delegation::Delegation";

        // src/types/sui-bcs.ts

        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
          .registerVectorType("vector<u8>", "u8")
          .registerVectorType("vector<u64>", "u64")
          .registerVectorType("vector<u128>", "u128")
          .registerVectorType("vector<vector<u8>>", "vector<u8>")
          .registerAddressType("ObjectID", 20)
          .registerAddressType("SuiAddress", 20)
          .registerAddressType("address", 20)
          .registerType(
            "utf8string",
            (writer, str) => {
              let bytes = Array.from(
                buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(str)
              );
              return writer.writeVec(bytes, (writer2, el) =>
                writer2.write8(el)
              );
            },
            (reader) => {
              let bytes = reader.readVec((reader2) => reader2.read8());
              return buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(
                bytes
              ).toString("utf-8");
            }
          )
          .registerType(
            "ObjectDigest",
            (writer, str) => {
              let bytes = Array.from(
                (0, _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.decodeStr)(
                  str,
                  "base64"
                )
              );
              return writer.writeVec(bytes, (writer2, el) =>
                writer2.write8(el)
              );
            },
            (reader) => {
              let bytes = reader.readVec((reader2) => reader2.read8());
              return (0, _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.encodeStr)(
                new Uint8Array(bytes),
                "base64"
              );
            }
          );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerStructType(
          "SuiObjectRef",
          {
            objectId: "ObjectID",
            version: "u64",
            digest: "ObjectDigest",
          }
        );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerStructType(
          "TransferObjectTx",
          {
            recipient: "SuiAddress",
            object_ref: "SuiObjectRef",
          }
        );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerEnumType(
          "Option<u64>",
          {
            None: null,
            Some: "u64",
          }
        );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerStructType(
          "TransferSuiTx",
          {
            recipient: "SuiAddress",
            amount: "Option<u64>",
          }
        );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerStructType(
          "PublishTx",
          {
            modules: "vector<vector<u8>>",
          }
        );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
          .registerEnumType("ObjectArg", {
            ImmOrOwned: "SuiObjectRef",
            Shared: "ObjectID",
          })
          .registerEnumType("CallArg", {
            Pure: "vector<u8>",
            Object: "ObjectArg",
          });
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
          .registerEnumType("TypeTag", {
            bool: null,
            u8: null,
            u64: null,
            u128: null,
            address: null,
            signer: null,
            vector: "TypeTag",
            struct: "StructTag",
          })
          .registerVectorType("vector<TypeTag>", "TypeTag")
          .registerStructType("StructTag", {
            address: "SuiAddress",
            module: "string",
            name: "string",
            typeParams: "vector<TypeTag>",
          });
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
          .registerVectorType("vector<CallArg>", "CallArg")
          .registerStructType("MoveCallTx", {
            package: "SuiObjectRef",
            module: "string",
            function: "string",
            typeArguments: "vector<TypeTag>",
            arguments: "vector<CallArg>",
          });
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerEnumType(
          "Transaction",
          {
            TransferObject: "TransferObjectTx",
            Publish: "PublishTx",
            Call: "MoveCallTx",
            TransferSui: "TransferSuiTx",
          }
        );
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
          .registerVectorType("vector<Transaction>", "Transaction")
          .registerEnumType("TransactionKind", {
            Single: "Transaction",
            Batch: "vector<Transaction>",
          });
        _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerStructType(
          "TransactionData",
          {
            kind: "TransactionKind",
            sender: "SuiAddress",
            gasPayment: "SuiObjectRef",
            gasPrice: "u64",
            gasBudget: "u64",
          }
        );

        // src/rpc/websocket-client.ts

        var getWebsocketUrl = (httpUrl, port) => {
          const url = new URL(httpUrl);
          url.protocol = url.protocol.replace("http", "ws");
          url.port = (port ?? 9001).toString();
          return url.toString();
        };
        var isMinimumSubscriptionMessage = (msg) =>
          msg &&
          "subscription" in msg &&
          typeof msg["subscription"] === "number" &&
          "result" in msg &&
          typeof msg["result"] === "object";
        var DEFAULT_CLIENT_OPTIONS = {
          connectTimeout: 15e3,
          callTimeout: 3e4,
          reconnectInterval: 3e3,
          maxReconnects: 5,
        };
        var SUBSCRIBE_EVENT_METHOD = "sui_subscribeEvent";
        var UNSUBSCRIBE_EVENT_METHOD = "sui_unsubscribeEvent";
        var WebsocketClient = class {
          constructor(
            endpoint,
            skipValidation,
            options = DEFAULT_CLIENT_OPTIONS
          ) {
            this.endpoint = endpoint;
            this.skipValidation = skipValidation;
            this.options = options;
            this.connectionState = 0 /* NotConnected */;
            this.connectionTimeout = null;
            this.isSetup = false;
            this.connectionPromise = null;
            this.eventSubscriptions = /* @__PURE__ */ new Map();
            if (this.endpoint.startsWith("http"))
              this.endpoint = getWebsocketUrl(this.endpoint);
            this.rpcClient =
              new rpc_websockets__WEBPACK_IMPORTED_MODULE_11__.Client(
                this.endpoint,
                {
                  reconnect_interval: this.options.reconnectInterval,
                  max_reconnects: this.options.maxReconnects,
                  autoconnect: false,
                }
              );
          }
          setupSocket() {
            if (this.isSetup) return;
            this.rpcClient.on("open", () => {
              if (this.connectionTimeout) {
                clearTimeout(this.connectionTimeout);
                this.connectionTimeout = null;
              }
              this.connectionState = 2 /* Connected */;
              this.rpcClient.socket.on(
                "message",
                this.onSocketMessage.bind(this)
              );
            });
            this.rpcClient.on("close", () => {
              this.connectionState = 0 /* NotConnected */;
            });
            this.rpcClient.on("error", console.error);
            this.isSetup = true;
          }
          onSocketMessage(rawMessage) {
            const msg = JSON.parse(rawMessage);
            const params = msg.params;
            if (msg.method === SUBSCRIBE_EVENT_METHOD) {
              if (this.skipValidation && isMinimumSubscriptionMessage(params)) {
                const sub = this.eventSubscriptions.get(params.subscription);
                if (sub) sub.onMessage(params.result);
              } else if (isSubscriptionEvent(params)) {
                const sub = this.eventSubscriptions.get(params.subscription);
                if (sub) sub.onMessage(params.result);
              }
            }
          }
          async connect() {
            if (this.connectionPromise) return this.connectionPromise;
            if (this.connectionState === 2 /* Connected */)
              return Promise.resolve();
            this.setupSocket();
            this.rpcClient.connect();
            this.connectionState = 1 /* Connecting */;
            this.connectionPromise = new Promise((resolve, reject) => {
              this.connectionTimeout = setTimeout(
                () => reject(new Error("timeout")),
                this.options.connectTimeout
              );
              this.rpcClient.once("open", () => {
                this.refreshSubscriptions();
                this.connectionPromise = null;
                resolve();
              });
              this.rpcClient.once("error", (err) => {
                this.connectionPromise = null;
                reject(err);
              });
            });
            return this.connectionPromise;
          }
          async refreshSubscriptions() {
            if (this.eventSubscriptions.size === 0) return;
            try {
              let newSubs = /* @__PURE__ */ new Map();
              let newSubsArr = await Promise.all(
                Array.from(this.eventSubscriptions.values()).map(
                  async (sub) => {
                    const onMessage = sub.onMessage;
                    const filter = sub.filter;
                    if (!filter || !onMessage) return Promise.resolve(null);
                    const id = await this.subscribeEvent(filter, onMessage);
                    return { id, onMessage, filter };
                  }
                )
              );
              newSubsArr.forEach((entry) => {
                if (entry === null) return;
                const filter = entry.filter;
                const onMessage = entry.onMessage;
                newSubs.set(entry.id, { filter, onMessage });
              });
              this.eventSubscriptions = newSubs;
            } catch (err) {
              throw new Error(`error refreshing event subscriptions: ${err}`);
            }
          }
          async subscribeEvent(filter, onMessage) {
            try {
              if (this.connectionState != 2 /* Connected */)
                await this.connect();
              let subId = await this.rpcClient.call(
                SUBSCRIBE_EVENT_METHOD,
                [filter],
                this.options.callTimeout
              );
              this.eventSubscriptions.set(subId, { filter, onMessage });
              return subId;
            } catch (err) {
              throw new Error(
                `Error subscribing to event: ${err}, filter: ${JSON.stringify(
                  filter
                )}`
              );
            }
          }
          async unsubscribeEvent(id) {
            try {
              if (this.connectionState != 2 /* Connected */)
                await this.connect();
              let removedOnNode = await this.rpcClient.call(
                UNSUBSCRIBE_EVENT_METHOD,
                [id],
                this.options.callTimeout
              );
              return this.eventSubscriptions.delete(id) || removedOnNode;
            } catch (err) {
              throw new Error(
                `Error unsubscribing from event: ${err}, subscription: ${id}}`
              );
            }
          }
        };

        // src/providers/json-rpc-provider.ts
        var isNumber = (val) => typeof val === "number";
        var isAny = (_val) => true;
        var JsonRpcProvider = class extends Provider {
          constructor(
            endpoint,
            skipDataValidation = false,
            socketOptions = DEFAULT_CLIENT_OPTIONS
          ) {
            super();
            this.endpoint = endpoint;
            this.skipDataValidation = skipDataValidation;
            this.socketOptions = socketOptions;
            this.client = new JsonRpcClient(endpoint);
            this.wsClient = new WebsocketClient(
              endpoint,
              skipDataValidation,
              socketOptions
            );
          }
          async getMoveFunctionArgTypes(objectId, moduleName, functionName) {
            try {
              return await this.client.requestWithType(
                "sui_getMoveFunctionArgTypes",
                [objectId, moduleName, functionName],
                isSuiMoveFunctionArgTypes,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching Move function arg types with package object ID: ${objectId}, module name: ${moduleName}, function name: ${functionName}`
              );
            }
          }
          async getNormalizedMoveModulesByPackage(objectId) {
            try {
              return await this.client.requestWithType(
                "sui_getNormalizedMoveModulesByPackage",
                [objectId],
                isSuiMoveNormalizedModules,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching package: ${err} for package ${objectId}`
              );
            }
          }
          async getNormalizedMoveModule(objectId, moduleName) {
            try {
              return await this.client.requestWithType(
                "sui_getNormalizedMoveModule",
                [objectId, moduleName],
                isSuiMoveNormalizedModule,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching module: ${err} for package ${objectId}, module ${moduleName}}`
              );
            }
          }
          async getNormalizedMoveFunction(objectId, moduleName, functionName) {
            try {
              return await this.client.requestWithType(
                "sui_getNormalizedMoveFunction",
                [objectId, moduleName, functionName],
                isSuiMoveNormalizedFunction,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching function: ${err} for package ${objectId}, module ${moduleName} and function ${functionName}}`
              );
            }
          }
          async getNormalizedMoveStruct(objectId, moduleName, structName) {
            try {
              return await this.client.requestWithType(
                "sui_getNormalizedMoveStruct",
                [objectId, moduleName, structName],
                isSuiMoveNormalizedStruct,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching struct: ${err} for package ${objectId}, module ${moduleName} and struct ${structName}}`
              );
            }
          }
          async getObjectsOwnedByAddress(address) {
            try {
              return await this.client.requestWithType(
                "sui_getObjectsOwnedByAddress",
                [address],
                isGetOwnedObjectsResponse,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching owned object: ${err} for address ${address}`
              );
            }
          }
          async getGasObjectsOwnedByAddress(address) {
            const objects = await this.getObjectsOwnedByAddress(address);
            return objects.filter((obj) => Coin.isSUI(obj));
          }
          async getObjectsOwnedByObject(objectId) {
            try {
              return await this.client.requestWithType(
                "sui_getObjectsOwnedByObject",
                [objectId],
                isGetOwnedObjectsResponse,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching owned object: ${err} for objectId ${objectId}`
              );
            }
          }
          async getObject(objectId) {
            try {
              return await this.client.requestWithType(
                "sui_getObject",
                [objectId],
                isGetObjectDataResponse,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching object info: ${err} for id ${objectId}`
              );
            }
          }
          async getObjectRef(objectId) {
            const resp = await this.getObject(objectId);
            return getObjectReference(resp);
          }
          async getObjectBatch(objectIds) {
            const requests = objectIds.map((id) => ({
              method: "sui_getObject",
              args: [id],
            }));
            try {
              return await this.client.batchRequestWithType(
                requests,
                isGetObjectDataResponse,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching object info: ${err} for id ${objectIds}`
              );
            }
          }
          async getTransactionsForObject(objectID) {
            const requests = [
              {
                method: "sui_getTransactionsByInputObject",
                args: [objectID],
              },
              {
                method: "sui_getTransactionsByMutatedObject",
                args: [objectID],
              },
            ];
            try {
              const results = await this.client.batchRequestWithType(
                requests,
                isGetTxnDigestsResponse,
                this.skipDataValidation
              );
              return [...results[0], ...results[1]];
            } catch (err) {
              throw new Error(
                `Error getting transactions for object: ${err} for id ${objectID}`
              );
            }
          }
          async getTransactionsForAddress(addressID) {
            const requests = [
              {
                method: "sui_getTransactionsToAddress",
                args: [addressID],
              },
              {
                method: "sui_getTransactionsFromAddress",
                args: [addressID],
              },
            ];
            try {
              const results = await this.client.batchRequestWithType(
                requests,
                isGetTxnDigestsResponse,
                this.skipDataValidation
              );
              return [...results[0], ...results[1]];
            } catch (err) {
              throw new Error(
                `Error getting transactions for address: ${err} for id ${addressID}`
              );
            }
          }
          async getTransactionWithEffects(digest) {
            try {
              const resp = await this.client.requestWithType(
                "sui_getTransaction",
                [digest],
                isSuiTransactionResponse,
                this.skipDataValidation
              );
              return resp;
            } catch (err) {
              throw new Error(
                `Error getting transaction with effects: ${err} for digest ${digest}`
              );
            }
          }
          async getTransactionWithEffectsBatch(digests) {
            const requests = digests.map((d) => ({
              method: "sui_getTransaction",
              args: [d],
            }));
            try {
              return await this.client.batchRequestWithType(
                requests,
                isSuiTransactionResponse,
                this.skipDataValidation
              );
            } catch (err) {
              const list = digests.join(", ").substring(0, -2);
              throw new Error(
                `Error getting transaction effects: ${err} for digests [${list}]`
              );
            }
          }
          async executeTransaction(
            txnBytes,
            signatureScheme,
            signature,
            pubkey
          ) {
            try {
              const resp = await this.client.requestWithType(
                "sui_executeTransaction",
                [txnBytes, signatureScheme, signature, pubkey],
                isSuiTransactionResponse,
                this.skipDataValidation
              );
              return resp;
            } catch (err) {
              throw new Error(`Error executing transaction: ${err}}`);
            }
          }
          async executeTransactionWithRequestType(
            txnBytes,
            signatureScheme,
            signature,
            pubkey,
            requestType = "WaitForEffectsCert"
          ) {
            try {
              const resp = await this.client.requestWithType(
                "sui_executeTransaction",
                [txnBytes, signatureScheme, signature, pubkey, requestType],
                isSuiExecuteTransactionResponse,
                this.skipDataValidation
              );
              return resp;
            } catch (err) {
              throw new Error(
                `Error executing transaction with request type: ${err}}`
              );
            }
          }
          async getTotalTransactionNumber() {
            try {
              const resp = await this.client.requestWithType(
                "sui_getTotalTransactionNumber",
                [],
                isNumber,
                this.skipDataValidation
              );
              return resp;
            } catch (err) {
              throw new Error(
                `Error fetching total transaction number: ${err}`
              );
            }
          }
          async getTransactionDigestsInRange(start, end) {
            try {
              return await this.client.requestWithType(
                "sui_getTransactionsInRange",
                [start, end],
                isGetTxnDigestsResponse,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching transaction digests in range: ${err} for range ${start}-${end}`
              );
            }
          }
          async getRecentTransactions(count) {
            try {
              return await this.client.requestWithType(
                "sui_getRecentTransactions",
                [count],
                isGetTxnDigestsResponse,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error fetching recent transactions: ${err} for count ${count}`
              );
            }
          }
          async syncAccountState(address) {
            try {
              return await this.client.requestWithType(
                "sui_syncAccountState",
                [address],
                isAny,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error sync account address for address: ${address} with error: ${err}`
              );
            }
          }
          async getEventsByTransaction(digest, count = EVENT_QUERY_MAX_LIMIT) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsByTransaction",
                [digest, count],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by transaction: ${digest}, with error: ${err}`
              );
            }
          }
          async getEventsByModule(
            package_,
            module,
            count = EVENT_QUERY_MAX_LIMIT,
            startTime = DEFAULT_START_TIME,
            endTime = DEFAULT_END_TIME
          ) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsByModule",
                [package_, module, count, startTime, endTime],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by transaction module: ${package_}::${module}, with error: ${err}`
              );
            }
          }
          async getEventsByMoveEventStructName(
            moveEventStructName,
            count = EVENT_QUERY_MAX_LIMIT,
            startTime = DEFAULT_START_TIME,
            endTime = DEFAULT_END_TIME
          ) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsByMoveEventStructName",
                [moveEventStructName, count, startTime, endTime],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by move event struct name: ${moveEventStructName}, with error: ${err}`
              );
            }
          }
          async getEventsBySender(
            sender,
            count = EVENT_QUERY_MAX_LIMIT,
            startTime = DEFAULT_START_TIME,
            endTime = DEFAULT_END_TIME
          ) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsBySender",
                [sender, count, startTime, endTime],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by sender: ${sender}, with error: ${err}`
              );
            }
          }
          async getEventsByRecipient(
            recipient,
            count = EVENT_QUERY_MAX_LIMIT,
            startTime = DEFAULT_START_TIME,
            endTime = DEFAULT_END_TIME
          ) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsByRecipient",
                [recipient, count, startTime, endTime],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by receipient: ${recipient}, with error: ${err}`
              );
            }
          }
          async getEventsByObject(
            object,
            count = EVENT_QUERY_MAX_LIMIT,
            startTime = DEFAULT_START_TIME,
            endTime = DEFAULT_END_TIME
          ) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsByObject",
                [object, count, startTime, endTime],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by object: ${object}, with error: ${err}`
              );
            }
          }
          async getEventsByTimeRange(
            count = EVENT_QUERY_MAX_LIMIT,
            startTime = DEFAULT_START_TIME,
            endTime = DEFAULT_END_TIME
          ) {
            try {
              return await this.client.requestWithType(
                "sui_getEventsByTimeRange",
                [count, startTime, endTime],
                isSuiEvents,
                this.skipDataValidation
              );
            } catch (err) {
              throw new Error(
                `Error getting events by time range: ${startTime} thru ${endTime}, with error: ${err}`
              );
            }
          }
          async subscribeEvent(filter, onMessage) {
            return this.wsClient.subscribeEvent(filter, onMessage);
          }
          async unsubscribeEvent(id) {
            return this.wsClient.unsubscribeEvent(id);
          }
        };

        // src/providers/json-rpc-provider-with-cache.ts
        var JsonRpcProviderWithCache = class extends JsonRpcProvider {
          constructor() {
            super(...arguments);
            this.objectRefs = /* @__PURE__ */ new Map();
          }
          async getObjectsOwnedByAddress(address) {
            const resp = await super.getObjectsOwnedByAddress(address);
            resp.forEach((r) => this.updateObjectRefCache(r));
            return resp;
          }
          async getObjectsOwnedByObject(objectId) {
            const resp = await super.getObjectsOwnedByObject(objectId);
            resp.forEach((r) => this.updateObjectRefCache(r));
            return resp;
          }
          async getObject(objectId) {
            const resp = await super.getObject(objectId);
            this.updateObjectRefCache(resp);
            return resp;
          }
          async getObjectRef(objectId, skipCache = false) {
            const normalizedId = normalizeSuiObjectId(objectId);
            if (!skipCache && this.objectRefs.has(normalizedId)) {
              return this.objectRefs.get(normalizedId);
            }
            const ref = await super.getObjectRef(objectId);
            this.updateObjectRefCache(ref);
            return ref;
          }
          async getObjectBatch(objectIds) {
            const resp = await super.getObjectBatch(objectIds);
            resp.forEach((r) => this.updateObjectRefCache(r));
            return resp;
          }
          async executeTransaction(
            txnBytes,
            signatureScheme,
            signature,
            pubkey
          ) {
            const resp = await super.executeTransaction(
              txnBytes,
              signatureScheme,
              signature,
              pubkey
            );
            this.updateObjectRefCacheFromTransactionEffects(resp.effects);
            return resp;
          }
          async executeTransactionWithRequestType(
            txnBytes,
            signatureScheme,
            signature,
            pubkey,
            requestType = "WaitForEffectsCert"
          ) {
            if (requestType !== "WaitForEffectsCert") {
              console.warn(
                `It's not recommended to use JsonRpcProviderWithCache with the request type other than 'WaitForEffectsCert' for executeTransactionWithRequestType. Using the '${requestType}' may result in stale cache and a failure in subsequent transactions.`
              );
            }
            const resp = await super.executeTransactionWithRequestType(
              txnBytes,
              signatureScheme,
              signature,
              pubkey,
              requestType
            );
            const effects = getTransactionEffects(resp);
            if (effects != null) {
              this.updateObjectRefCacheFromTransactionEffects(effects);
            }
            return resp;
          }
          updateObjectRefCache(newData) {
            if (newData == null) {
              return;
            }
            const ref = isSuiObjectRef(newData)
              ? newData
              : getObjectReference(newData);
            if (ref != null) {
              this.objectRefs.set(ref.objectId, ref);
            }
          }
          updateObjectRefCacheFromTransactionEffects(effects) {
            var _a, _b, _c, _d, _e;
            (_a = effects.created) == null
              ? void 0
              : _a.forEach((r) => this.updateObjectRefCache(r.reference));
            (_b = effects.mutated) == null
              ? void 0
              : _b.forEach((r) => this.updateObjectRefCache(r.reference));
            (_c = effects.unwrapped) == null
              ? void 0
              : _c.forEach((r) => this.updateObjectRefCache(r.reference));
            (_d = effects.wrapped) == null
              ? void 0
              : _d.forEach((r) => this.updateObjectRefCache(r));
            (_e = effects.deleted) == null
              ? void 0
              : _e.forEach((r) => this.objectRefs.delete(r.objectId));
          }
        };

        // src/serialization/hex.ts

        var HexDataBuffer = class {
          constructor(data) {
            if (typeof data === "string") {
              this._data = new Uint8Array(
                buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(data, "hex")
              );
            } else {
              this._data = data;
            }
          }
          getData() {
            return this._data;
          }
          getLength() {
            return this._data.length;
          }
          toString() {
            return buffer__WEBPACK_IMPORTED_MODULE_1__.Buffer.from(
              this._data
            ).toString("hex");
          }
        };

        // src/signers/txn-data-serializers/rpc-txn-data-serializer.ts
        var RpcTxnDataSerializer = class {
          constructor(endpoint, skipDataValidation = false) {
            this.skipDataValidation = skipDataValidation;
            this.client = new JsonRpcClient(endpoint);
          }
          async newTransferObject(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_transferObject",
                [
                  signerAddress,
                  t.objectId,
                  t.gasPayment,
                  t.gasBudget,
                  t.recipient,
                ],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(
                `Error transferring object: ${err} with args ${t}`
              );
            }
          }
          async newTransferSui(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_transferSui",
                [
                  signerAddress,
                  t.suiObjectId,
                  t.gasBudget,
                  t.recipient,
                  t.amount,
                ],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(
                `Error transferring Sui coin: ${err} with args ${t}`
              );
            }
          }
          async newPay(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_pay",
                [
                  signerAddress,
                  t.inputCoins,
                  t.recipients,
                  t.amounts,
                  t.gasPayment,
                  t.gasBudget,
                ],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(
                `Error executing Pay transaction: ${err} with args ${t}`
              );
            }
          }
          async newMoveCall(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_moveCall",
                [
                  signerAddress,
                  t.packageObjectId,
                  t.module,
                  t.function,
                  t.typeArguments,
                  t.arguments,
                  t.gasPayment,
                  t.gasBudget,
                ],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(
                `Error executing a move call: ${err} with args ${t}`
              );
            }
          }
          async newMergeCoin(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_mergeCoins",
                [
                  signerAddress,
                  t.primaryCoin,
                  t.coinToMerge,
                  t.gasPayment,
                  t.gasBudget,
                ],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(`Error merging coin: ${err}`);
            }
          }
          async newSplitCoin(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_splitCoin",
                [
                  signerAddress,
                  t.coinObjectId,
                  t.splitAmounts,
                  t.gasPayment,
                  t.gasBudget,
                ],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(`Error splitting coin: ${err}`);
            }
          }
          async newPublish(signerAddress, t) {
            try {
              const resp = await this.client.requestWithType(
                "sui_publish",
                [signerAddress, t.compiledModules, t.gasPayment, t.gasBudget],
                isTransactionBytes,
                this.skipDataValidation
              );
              return new Base64DataBuffer(resp.txBytes);
            } catch (err) {
              throw new Error(`Error publishing package ${err}`);
            }
          }
        };

        // src/signers/txn-data-serializers/call-arg-serializer.ts
        var MOVE_CALL_SER_ERROR = "Move call argument serialization error:";
        var isTypeFunc = (type) => (t) => typeof t === type;
        var CallArgSerializer = class {
          constructor(provider) {
            this.provider = provider;
          }
          async serializeMoveCallArguments(txn) {
            const normalized = await this.provider.getNormalizedMoveFunction(
              normalizeSuiObjectId(txn.packageObjectId),
              txn.module,
              txn.function
            );
            const params = normalized.parameters;
            const hasTxContext =
              params.length > 0 && this.isTxContext(params.at(-1));
            const userParams = hasTxContext
              ? params.slice(0, params.length - 1)
              : params;
            if (userParams.length !== txn.arguments.length) {
              throw new Error(
                `${MOVE_CALL_SER_ERROR} expect ${userParams.length} arguments, received ${txn.arguments.length} arguments`
              );
            }
            return Promise.all(
              userParams.map(async (param, i) =>
                this.newCallArg(param, txn.arguments[i])
              )
            );
          }
          async newObjectArg(objectId) {
            const object = await this.provider.getObject(objectId);
            if (isSharedObject(object)) {
              return { Shared: objectId };
            }
            return { ImmOrOwned: getObjectReference(object) };
          }
          async newCallArg(expectedType, argVal) {
            const structVal = extractStructTag(expectedType);
            if (structVal != null) {
              if (typeof argVal !== "string") {
                throw new Error(
                  `${MOVE_CALL_SER_ERROR} expect the argument to be an object id string, got ${argVal}`
                );
              }
              return { Object: await this.newObjectArg(argVal) };
            }
            let serType = this.getPureSerializationType(expectedType, argVal);
            return {
              Pure: _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
                .ser(serType, argVal)
                .toBytes(),
            };
          }
          getPureSerializationType(normalizedType, argVal) {
            const allowedTypes = [
              "Address",
              "Bool",
              "U8",
              "U32",
              "U64",
              "U128",
            ];
            if (
              typeof normalizedType === "string" &&
              allowedTypes.includes(normalizedType)
            ) {
              if (normalizedType in ["U8", "U32", "U64", "U128"]) {
                this.checkArgVal(isTypeFunc("number"), argVal, "number");
              } else if (normalizedType === "Bool") {
                this.checkArgVal(isTypeFunc("boolean"), argVal, "boolean");
              } else if (normalizedType === "Address") {
                this.checkArgVal(
                  (t) => typeof t === "string" && isValidSuiAddress(t),
                  argVal,
                  "valid SUI address"
                );
              }
              return normalizedType.toLowerCase();
            } else if (typeof normalizedType === "string") {
              throw new Error(
                `${MOVE_CALL_SER_ERROR} unknown pure normalized type ${normalizedType}`
              );
            }
            if ("Vector" in normalizedType) {
              if (
                typeof argVal === "string" &&
                normalizedType.Vector === "U8"
              ) {
                return "string";
              }
              if (!Array.isArray(argVal)) {
                throw new Error(
                  `Expect ${argVal} to be a array, received ${typeof argVal}`
                );
              }
              const innerType = this.getPureSerializationType(
                normalizedType.Vector,
                argVal[0]
              );
              const res = `vector<${innerType}>`;
              _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs.registerVectorType(
                res,
                innerType
              );
              return res;
            }
            throw new Error(
              `${MOVE_CALL_SER_ERROR} unknown normalized type ${normalizedType}`
            );
          }
          checkArgVal(check, argVal, expectedType) {
            if (argVal === void 0) {
              return;
            }
            if (!check(argVal)) {
              throw new Error(
                `Expect ${argVal} to be ${expectedType}, received ${typeof argVal}`
              );
            }
          }
          isTxContext(param) {
            var _a;
            const struct =
              (_a = extractMutableReference(param)) == null
                ? void 0
                : _a.Struct;
            return (
              (struct == null ? void 0 : struct.address) === "0x2" &&
              (struct == null ? void 0 : struct.module) === "tx_context" &&
              (struct == null ? void 0 : struct.name) === "TxContext"
            );
          }
        };

        // src/signers/txn-data-serializers/local-txn-data-serializer.ts
        var TYPE_TAG = Array.from("TransactionData::").map((e) =>
          e.charCodeAt(0)
        );
        var LocalTxnDataSerializer = class {
          constructor(provider) {
            this.provider = provider;
          }
          async newTransferObject(signerAddress, t) {
            try {
              const objectRef = await this.provider.getObjectRef(t.objectId);
              const tx = {
                TransferObject: {
                  recipient: t.recipient,
                  object_ref: objectRef,
                },
              };
              return await this.constructTransactionData(
                tx,
                t.gasPayment,
                t.gasBudget,
                signerAddress
              );
            } catch (err) {
              throw new Error(
                `Error constructing a TransferObject transaction: ${err} args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async newTransferSui(signerAddress, t) {
            try {
              const tx = {
                TransferSui: {
                  recipient: t.recipient,
                  amount:
                    t.amount == null ? { None: null } : { Some: t.amount },
                },
              };
              return await this.constructTransactionData(
                tx,
                t.suiObjectId,
                t.gasBudget,
                signerAddress
              );
            } catch (err) {
              throw new Error(
                `Error constructing a TransferSui transaction: ${err} args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async newPay(signerAddress, t) {
            try {
              const tx = {
                Pay: {
                  input_coins: t.inputCoins,
                  recipients: t.recipients,
                  amounts: t.amounts,
                },
              };
              return await this.constructTransactionData(
                tx,
                t.gasPayment,
                t.gasBudget,
                signerAddress
              );
            } catch (err) {
              throw new Error(
                `Error constructing a Pay transaction: ${err} args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async newMoveCall(signerAddress, t) {
            try {
              const pkg = await this.provider.getObjectRef(t.packageObjectId);
              const tx = {
                Call: {
                  package: pkg,
                  module: t.module,
                  function: t.function,
                  typeArguments: t.typeArguments,
                  arguments: await new CallArgSerializer(
                    this.provider
                  ).serializeMoveCallArguments(t),
                },
              };
              return await this.constructTransactionData(
                tx,
                t.gasPayment,
                t.gasBudget,
                signerAddress
              );
            } catch (err) {
              throw new Error(
                `Error constructing a move call: ${err} args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async newMergeCoin(signerAddress, t) {
            try {
              return await this.newMoveCall(signerAddress, {
                packageObjectId: COIN_PACKAGE_ID,
                module: COIN_MODULE_NAME,
                function: COIN_JOIN_FUNC_NAME,
                typeArguments: [await this.getCoinStructTag(t.coinToMerge)],
                arguments: [t.primaryCoin, t.coinToMerge],
                gasPayment: t.gasPayment,
                gasBudget: t.gasBudget,
              });
            } catch (err) {
              throw new Error(
                `Error constructing a MergeCoin Transaction: ${err} args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async newSplitCoin(signerAddress, t) {
            try {
              return await this.newMoveCall(signerAddress, {
                packageObjectId: COIN_PACKAGE_ID,
                module: COIN_MODULE_NAME,
                function: COIN_SPLIT_VEC_FUNC_NAME,
                typeArguments: [await this.getCoinStructTag(t.coinObjectId)],
                arguments: [t.coinObjectId, t.splitAmounts],
                gasPayment: t.gasPayment,
                gasBudget: t.gasBudget,
              });
            } catch (err) {
              throw new Error(
                `Error constructing a SplitCoin Transaction: ${err} args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async newPublish(signerAddress, t) {
            try {
              const tx = {
                Publish: {
                  modules: t.compiledModules,
                },
              };
              return await this.constructTransactionData(
                tx,
                t.gasPayment,
                t.gasBudget,
                signerAddress
              );
            } catch (err) {
              throw new Error(
                `Error constructing a newPublish transaction: ${err} with args ${JSON.stringify(
                  t
                )}`
              );
            }
          }
          async getCoinStructTag(coinId) {
            const coin = await this.provider.getObject(coinId);
            const coinTypeArg = Coin.getCoinTypeArg(coin);
            if (coinTypeArg == null) {
              throw new Error(`Object ${coinId} is not a valid coin type`);
            }
            return { struct: Coin.getCoinStructTag(coinTypeArg) };
          }
          async constructTransactionData(
            tx,
            gasObjectId,
            gasBudget,
            signerAddress
          ) {
            const gasPayment = await this.provider.getObjectRef(gasObjectId);
            const txData = {
              kind: {
                Single: tx,
              },
              gasPayment,
              gasPrice: 1,
              gasBudget,
              sender: signerAddress,
            };
            console.log("transactiondata", txData);
            return this.serializeTransactionData(txData);
          }
          serializeTransactionData(tx, size = 2048) {
            const dataBytes = _mysten_bcs__WEBPACK_IMPORTED_MODULE_10__.bcs
              .ser("TransactionData", tx, size)
              .toBytes();
            const serialized = new Uint8Array(
              TYPE_TAG.length + dataBytes.length
            );
            serialized.set(TYPE_TAG);
            serialized.set(dataBytes, TYPE_TAG.length);
            return new Base64DataBuffer(serialized);
          }
        };

        // src/providers/void-provider.ts
        var VoidProvider = class extends Provider {
          async getObjectsOwnedByAddress(_address) {
            throw this.newError("getObjectsOwnedByAddress");
          }
          async getGasObjectsOwnedByAddress(_address) {
            throw this.newError("getGasObjectsOwnedByAddress");
          }
          async getObject(_objectId) {
            throw this.newError("getObject");
          }
          async getObjectRef(_objectId) {
            throw this.newError("getObjectRef");
          }
          async getTransaction(_digest) {
            throw this.newError("getTransaction");
          }
          async executeTransaction(
            _txnBytes,
            _signatureScheme,
            _signature,
            _pubkey
          ) {
            throw this.newError("executeTransaction");
          }
          async executeTransactionWithRequestType(
            _txnBytes,
            _signatureScheme,
            _signature,
            _pubkey,
            _requestType
          ) {
            throw this.newError("executeTransaction with request Type");
          }
          async getTotalTransactionNumber() {
            throw this.newError("getTotalTransactionNumber");
          }
          async getTransactionDigestsInRange(_start, _end) {
            throw this.newError("getTransactionDigestsInRange");
          }
          async getRecentTransactions(_count) {
            throw this.newError("getRecentTransactions");
          }
          async getMoveFunctionArgTypes(_objectId, _moduleName, _functionName) {
            throw this.newError("getMoveFunctionArgTypes");
          }
          async getNormalizedMoveModulesByPackage(_objectId) {
            throw this.newError("getNormalizedMoveModulesByPackage");
          }
          async getNormalizedMoveModule(_objectId, _moduleName) {
            throw this.newError("getNormalizedMoveModule");
          }
          async getNormalizedMoveFunction(
            _objectId,
            _moduleName,
            _functionName
          ) {
            throw this.newError("getNormalizedMoveFunction");
          }
          async getNormalizedMoveStruct(_objectId, _oduleName, _structName) {
            throw this.newError("getNormalizedMoveStruct");
          }
          async syncAccountState(_address) {
            throw this.newError("syncAccountState");
          }
          async getEventsByTransaction(_digest, _count) {
            throw this.newError("getEventsByTransaction");
          }
          async getEventsByModule(
            _package,
            _module,
            _count,
            _startTime,
            _endTime
          ) {
            throw this.newError("getEventsByTransactionModule");
          }
          async getEventsByMoveEventStructName(
            _moveEventStructName,
            _count,
            _startTime,
            _endTime
          ) {
            throw this.newError("getEventsByMoveEventStructName");
          }
          async getEventsBySender(_sender, _count, _startTime, _endTime) {
            throw this.newError("getEventsBySender");
          }
          async getEventsByRecipient(_recipient, _count, _startTime, _endTime) {
            throw this.newError("getEventsByRecipient");
          }
          async getEventsByObject(_object, _count, _startTime, _endTime) {
            throw this.newError("getEventsByObject");
          }
          async getEventsByTimeRange(_count, _startTime, _endTime) {
            throw this.newError("getEventsByTimeRange");
          }
          async subscribeEvent(_filter, _onMessage) {
            throw this.newError("subscribeEvent");
          }
          async unsubscribeEvent(_id) {
            throw this.newError("unsubscribeEvent");
          }
          newError(operation) {
            return new Error(`Please use a valid provider for ${operation}`);
          }
        };

        // src/signers/signer-with-provider.ts
        var SignerWithProvider = class {
          constructor(provider, serializer) {
            this.provider = provider || new VoidProvider();
            let endpoint = "";
            let skipDataValidation = false;
            if (this.provider instanceof JsonRpcProvider) {
              endpoint = this.provider.endpoint;
              skipDataValidation = this.provider.skipDataValidation;
            }
            this.serializer =
              serializer ||
              new RpcTxnDataSerializer(endpoint, skipDataValidation);
          }
          async signAndExecuteTransaction(txBytes) {
            const sig = await this.signData(txBytes);
            return await this.provider.executeTransaction(
              txBytes.toString(),
              sig.signatureScheme,
              sig.signature.toString(),
              sig.pubKey.toString()
            );
          }
          async signAndExecuteTransactionWithRequestType(txBytes, requestType) {
            const sig = await this.signData(txBytes);
            return await this.provider.executeTransactionWithRequestType(
              txBytes.toString(),
              sig.signatureScheme,
              sig.signature.toString(),
              sig.pubKey.toString(),
              requestType
            );
          }
          async syncAccountState() {
            const address = await this.getAddress();
            return await this.provider.syncAccountState(address);
          }
          async transferObject(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newTransferObject(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async transferSui(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newTransferSui(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async pay(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newPay(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async mergeCoin(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newMergeCoin(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async splitCoin(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newSplitCoin(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async executeMoveCall(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newMoveCall(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async publish(transaction) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newPublish(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransaction(txBytes);
          }
          async transferObjectWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newTransferObject(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
          async transferSuiWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newTransferSui(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
          async payWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newPay(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
          async mergeCoinWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newMergeCoin(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
          async splitCoinWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newSplitCoin(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
          async executeMoveCallWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newMoveCall(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
          async publishWithRequestType(
            transaction,
            requestType = "WaitForEffectsCert"
          ) {
            const signerAddress = await this.getAddress();
            const txBytes = await this.serializer.newPublish(
              signerAddress,
              transaction
            );
            return await this.signAndExecuteTransactionWithRequestType(
              txBytes,
              requestType
            );
          }
        };

        // src/signers/raw-signer.ts
        var RawSigner = class extends SignerWithProvider {
          constructor(keypair, provider, serializer) {
            super(provider, serializer);
            this.keypair = keypair;
          }
          async getAddress() {
            return this.keypair.getPublicKey().toSuiAddress();
          }
          async signData(data) {
            return {
              signatureScheme: this.keypair.getKeyScheme(),
              signature: this.keypair.signData(data),
              pubKey: this.keypair.getPublicKey(),
            };
          }
          connect(provider) {
            return new RawSigner(this.keypair, provider);
          }
        };

        //# sourceMappingURL=index.mjs.map

        /***/
      },

    /***/ "../node_modules/@noble/hashes/esm/_assert.js":
      /*!****************************************************!*\
  !*** ../node_modules/@noble/hashes/esm/_assert.js ***!
  \****************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ bool: () => /* binding */ bool,
          /* harmony export */ bytes: () => /* binding */ bytes,
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */ exists: () => /* binding */ exists,
          /* harmony export */ hash: () => /* binding */ hash,
          /* harmony export */ number: () => /* binding */ number,
          /* harmony export */ output: () => /* binding */ output,
          /* harmony export */
        });
        function number(n) {
          if (!Number.isSafeInteger(n) || n < 0)
            throw new Error(`Wrong positive integer: ${n}`);
        }
        function bool(b) {
          if (typeof b !== "boolean")
            throw new Error(`Expected boolean, not ${b}`);
        }
        function bytes(b, ...lengths) {
          if (!(b instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
          if (lengths.length > 0 && !lengths.includes(b.length))
            throw new TypeError(
              `Expected Uint8Array of length ${lengths}, not of length=${b.length}`
            );
        }
        function hash(hash) {
          if (typeof hash !== "function" || typeof hash.create !== "function")
            throw new Error("Hash should be wrapped by utils.wrapConstructor");
          number(hash.outputLen);
          number(hash.blockLen);
        }
        function exists(instance, checkFinished = true) {
          if (instance.destroyed)
            throw new Error("Hash instance has been destroyed");
          if (checkFinished && instance.finished)
            throw new Error("Hash#digest() has already been called");
        }
        function output(out, instance) {
          bytes(out);
          const min = instance.outputLen;
          if (out.length < min) {
            throw new Error(
              `digestInto() expects output buffer of length at least ${min}`
            );
          }
        }
        const assert = {
          number,
          bool,
          bytes,
          hash,
          exists,
          output,
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = assert;

        /***/
      },

    /***/ "../node_modules/@noble/hashes/esm/_sha2.js":
      /*!**************************************************!*\
  !*** ../node_modules/@noble/hashes/esm/_sha2.js ***!
  \**************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SHA2: () => /* binding */ SHA2,
          /* harmony export */
        });
        /* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./_assert.js */ "../node_modules/@noble/hashes/esm/_assert.js"
          );
        /* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./utils.js */ "../node_modules/@noble/hashes/esm/utils.js"
          );

        // Polyfill for Safari 14
        function setBigUint64(view, byteOffset, value, isLE) {
          if (typeof view.setBigUint64 === "function")
            return view.setBigUint64(byteOffset, value, isLE);
          const _32n = BigInt(32);
          const _u32_max = BigInt(0xffffffff);
          const wh = Number((value >> _32n) & _u32_max);
          const wl = Number(value & _u32_max);
          const h = isLE ? 4 : 0;
          const l = isLE ? 0 : 4;
          view.setUint32(byteOffset + h, wh, isLE);
          view.setUint32(byteOffset + l, wl, isLE);
        }
        // Base SHA2 class (RFC 6234)
        class SHA2 extends _utils_js__WEBPACK_IMPORTED_MODULE_1__.Hash {
          constructor(blockLen, outputLen, padOffset, isLE) {
            super();
            this.blockLen = blockLen;
            this.outputLen = outputLen;
            this.padOffset = padOffset;
            this.isLE = isLE;
            this.finished = false;
            this.length = 0;
            this.pos = 0;
            this.destroyed = false;
            this.buffer = new Uint8Array(blockLen);
            this.view = (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.createView)(
              this.buffer
            );
          }
          update(data) {
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].exists(this);
            const { view, buffer, blockLen } = this;
            data = (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.toBytes)(data);
            const len = data.length;
            for (let pos = 0; pos < len; ) {
              const take = Math.min(blockLen - this.pos, len - pos);
              // Fast path: we have at least one block in input, cast it to view and process
              if (take === blockLen) {
                const dataView = (0,
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.createView)(data);
                for (; blockLen <= len - pos; pos += blockLen)
                  this.process(dataView, pos);
                continue;
              }
              buffer.set(data.subarray(pos, pos + take), this.pos);
              this.pos += take;
              pos += take;
              if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
              }
            }
            this.length += data.length;
            this.roundClean();
            return this;
          }
          digestInto(out) {
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].exists(this);
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].output(
              out,
              this
            );
            this.finished = true;
            // Padding
            // We can avoid allocation of buffer for padding completely if it
            // was previously not allocated here. But it won't change performance.
            const { buffer, view, blockLen, isLE } = this;
            let { pos } = this;
            // append the bit '1' to the message
            buffer[pos++] = 0b10000000;
            this.buffer.subarray(pos).fill(0);
            // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
            if (this.padOffset > blockLen - pos) {
              this.process(view, 0);
              pos = 0;
            }
            // Pad until full block byte with zeros
            for (let i = pos; i < blockLen; i++) buffer[i] = 0;
            // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
            // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
            // So we just write lowest 64 bits of that value.
            setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
            this.process(view, 0);
            const oview = (0,
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.createView)(out);
            this.get().forEach((v, i) => oview.setUint32(4 * i, v, isLE));
          }
          digest() {
            const { buffer, outputLen } = this;
            this.digestInto(buffer);
            const res = buffer.slice(0, outputLen);
            this.destroy();
            return res;
          }
          _cloneInto(to) {
            to || (to = new this.constructor());
            to.set(...this.get());
            const { blockLen, buffer, length, finished, destroyed, pos } = this;
            to.length = length;
            to.pos = pos;
            to.finished = finished;
            to.destroyed = destroyed;
            if (length % blockLen) to.buffer.set(buffer);
            return to;
          }
        }

        /***/
      },

    /***/ "../node_modules/@noble/hashes/esm/cryptoBrowser.js":
      /*!**********************************************************!*\
  !*** ../node_modules/@noble/hashes/esm/cryptoBrowser.js ***!
  \**********************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ crypto: () => /* binding */ crypto,
          /* harmony export */
        });
        const crypto = {
          node: undefined,
          web:
            typeof self === "object" && "crypto" in self
              ? self.crypto
              : undefined,
        };

        /***/
      },

    /***/ "../node_modules/@noble/hashes/esm/hmac.js":
      /*!*************************************************!*\
  !*** ../node_modules/@noble/hashes/esm/hmac.js ***!
  \*************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ hmac: () => /* binding */ hmac,
          /* harmony export */
        });
        /* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./_assert.js */ "../node_modules/@noble/hashes/esm/_assert.js"
          );
        /* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./utils.js */ "../node_modules/@noble/hashes/esm/utils.js"
          );

        // HMAC (RFC 2104)
        class HMAC extends _utils_js__WEBPACK_IMPORTED_MODULE_1__.Hash {
          constructor(hash, _key) {
            super();
            this.finished = false;
            this.destroyed = false;
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].hash(hash);
            const key = (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.toBytes)(
              _key
            );
            this.iHash = hash.create();
            if (
              !(
                this.iHash instanceof
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.Hash
              )
            )
              throw new TypeError(
                "Expected instance of class which extends utils.Hash"
              );
            const blockLen = (this.blockLen = this.iHash.blockLen);
            this.outputLen = this.iHash.outputLen;
            const pad = new Uint8Array(blockLen);
            // blockLen can be bigger than outputLen
            pad.set(
              key.length > this.iHash.blockLen
                ? hash.create().update(key).digest()
                : key
            );
            for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36;
            this.iHash.update(pad);
            // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
            this.oHash = hash.create();
            // Undo internal XOR && apply outer XOR
            for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36 ^ 0x5c;
            this.oHash.update(pad);
            pad.fill(0);
          }
          update(buf) {
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].exists(this);
            this.iHash.update(buf);
            return this;
          }
          digestInto(out) {
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].exists(this);
            _assert_js__WEBPACK_IMPORTED_MODULE_0__["default"].bytes(
              out,
              this.outputLen
            );
            this.finished = true;
            this.iHash.digestInto(out);
            this.oHash.update(out);
            this.oHash.digestInto(out);
            this.destroy();
          }
          digest() {
            const out = new Uint8Array(this.oHash.outputLen);
            this.digestInto(out);
            return out;
          }
          _cloneInto(to) {
            // Create new instance without calling constructor since key already in state and we don't know it.
            to || (to = Object.create(Object.getPrototypeOf(this), {}));
            const { oHash, iHash, finished, destroyed, blockLen, outputLen } =
              this;
            to = to;
            to.finished = finished;
            to.destroyed = destroyed;
            to.blockLen = blockLen;
            to.outputLen = outputLen;
            to.oHash = oHash._cloneInto(to.oHash);
            to.iHash = iHash._cloneInto(to.iHash);
            return to;
          }
          destroy() {
            this.destroyed = true;
            this.oHash.destroy();
            this.iHash.destroy();
          }
        }
        /**
         * HMAC: RFC2104 message authentication code.
         * @param hash - function that would be used e.g. sha256
         * @param key - message key
         * @param message - message data
         */
        const hmac = (hash, key, message) =>
          new HMAC(hash, key).update(message).digest();
        hmac.create = (hash, key) => new HMAC(hash, key);

        /***/
      },

    /***/ "../node_modules/@noble/hashes/esm/sha256.js":
      /*!***************************************************!*\
  !*** ../node_modules/@noble/hashes/esm/sha256.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ sha256: () => /* binding */ sha256,
          /* harmony export */
        });
        /* harmony import */ var _sha2_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./_sha2.js */ "../node_modules/@noble/hashes/esm/_sha2.js"
          );
        /* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./utils.js */ "../node_modules/@noble/hashes/esm/utils.js"
          );

        // Choice: a ? b : c
        const Chi = (a, b, c) => (a & b) ^ (~a & c);
        // Majority function, true if any two inpust is true
        const Maj = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
        // Round constants:
        // first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
        // prettier-ignore
        const SHA256_K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
        // Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
        // prettier-ignore
        const IV = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]);
        // Temporary buffer, not used to store anything between runs
        // Named this way because it matches specification.
        const SHA256_W = new Uint32Array(64);
        class SHA256 extends _sha2_js__WEBPACK_IMPORTED_MODULE_0__.SHA2 {
          constructor() {
            super(64, 32, 8, false);
            // We cannot use array here since array allows indexing by variable
            // which means optimizer/compiler cannot use registers.
            this.A = IV[0] | 0;
            this.B = IV[1] | 0;
            this.C = IV[2] | 0;
            this.D = IV[3] | 0;
            this.E = IV[4] | 0;
            this.F = IV[5] | 0;
            this.G = IV[6] | 0;
            this.H = IV[7] | 0;
          }
          get() {
            const { A, B, C, D, E, F, G, H } = this;
            return [A, B, C, D, E, F, G, H];
          }
          // prettier-ignore
          set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
          process(view, offset) {
            // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
            for (let i = 0; i < 16; i++, offset += 4)
              SHA256_W[i] = view.getUint32(offset, false);
            for (let i = 16; i < 64; i++) {
              const W15 = SHA256_W[i - 15];
              const W2 = SHA256_W[i - 2];
              const s0 =
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(W15, 7) ^
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(W15, 18) ^
                (W15 >>> 3);
              const s1 =
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(W2, 17) ^
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(W2, 19) ^
                (W2 >>> 10);
              SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
            }
            // Compression function main loop, 64 rounds
            let { A, B, C, D, E, F, G, H } = this;
            for (let i = 0; i < 64; i++) {
              const sigma1 =
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(E, 6) ^
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(E, 11) ^
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(E, 25);
              const T1 =
                (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
              const sigma0 =
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(A, 2) ^
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(A, 13) ^
                (0, _utils_js__WEBPACK_IMPORTED_MODULE_1__.rotr)(A, 22);
              const T2 = (sigma0 + Maj(A, B, C)) | 0;
              H = G;
              G = F;
              F = E;
              E = (D + T1) | 0;
              D = C;
              C = B;
              B = A;
              A = (T1 + T2) | 0;
            }
            // Add the compressed chunk to the current hash value
            A = (A + this.A) | 0;
            B = (B + this.B) | 0;
            C = (C + this.C) | 0;
            D = (D + this.D) | 0;
            E = (E + this.E) | 0;
            F = (F + this.F) | 0;
            G = (G + this.G) | 0;
            H = (H + this.H) | 0;
            this.set(A, B, C, D, E, F, G, H);
          }
          roundClean() {
            SHA256_W.fill(0);
          }
          destroy() {
            this.set(0, 0, 0, 0, 0, 0, 0, 0);
            this.buffer.fill(0);
          }
        }
        /**
         * SHA2-256 hash function
         * @param message - data that would be hashed
         */
        const sha256 = (0,
        _utils_js__WEBPACK_IMPORTED_MODULE_1__.wrapConstructor)(
          () => new SHA256()
        );

        /***/
      },

    /***/ "../node_modules/@noble/hashes/esm/utils.js":
      /*!**************************************************!*\
  !*** ../node_modules/@noble/hashes/esm/utils.js ***!
  \**************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Hash: () => /* binding */ Hash,
          /* harmony export */ asyncLoop: () => /* binding */ asyncLoop,
          /* harmony export */ bytesToHex: () => /* binding */ bytesToHex,
          /* harmony export */ checkOpts: () => /* binding */ checkOpts,
          /* harmony export */ concatBytes: () => /* binding */ concatBytes,
          /* harmony export */ createView: () => /* binding */ createView,
          /* harmony export */ hexToBytes: () => /* binding */ hexToBytes,
          /* harmony export */ isLE: () => /* binding */ isLE,
          /* harmony export */ nextTick: () => /* binding */ nextTick,
          /* harmony export */ randomBytes: () => /* binding */ randomBytes,
          /* harmony export */ rotr: () => /* binding */ rotr,
          /* harmony export */ toBytes: () => /* binding */ toBytes,
          /* harmony export */ u32: () => /* binding */ u32,
          /* harmony export */ u8: () => /* binding */ u8,
          /* harmony export */ utf8ToBytes: () => /* binding */ utf8ToBytes,
          /* harmony export */ wrapConstructor: () =>
            /* binding */ wrapConstructor,
          /* harmony export */ wrapConstructorWithOpts: () =>
            /* binding */ wrapConstructorWithOpts,
          /* harmony export */
        });
        /* harmony import */ var _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @noble/hashes/crypto */ "../node_modules/@noble/hashes/esm/cryptoBrowser.js"
          );
        /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
        // The import here is via the package name. This is to ensure
        // that exports mapping/resolution does fall into place.

        // Cast array to different type
        const u8 = (arr) =>
          new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
        const u32 = (arr) =>
          new Uint32Array(
            arr.buffer,
            arr.byteOffset,
            Math.floor(arr.byteLength / 4)
          );
        // Cast array to view
        const createView = (arr) =>
          new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
        // The rotate right (circular right shift) operation for uint32
        const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
        const isLE =
          new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
        // There is almost no big endian hardware, but js typed arrays uses platform specific endianness.
        // So, just to be sure not to corrupt anything.
        if (!isLE)
          throw new Error("Non little-endian hardware is not supported");
        const hexes = Array.from({ length: 256 }, (v, i) =>
          i.toString(16).padStart(2, "0")
        );
        /**
         * @example bytesToHex(Uint8Array.from([0xde, 0xad, 0xbe, 0xef]))
         */
        function bytesToHex(uint8a) {
          // pre-caching improves the speed 6x
          if (!(uint8a instanceof Uint8Array))
            throw new Error("Uint8Array expected");
          let hex = "";
          for (let i = 0; i < uint8a.length; i++) {
            hex += hexes[uint8a[i]];
          }
          return hex;
        }
        /**
         * @example hexToBytes('deadbeef')
         */
        function hexToBytes(hex) {
          if (typeof hex !== "string") {
            throw new TypeError(
              "hexToBytes: expected string, got " + typeof hex
            );
          }
          if (hex.length % 2)
            throw new Error("hexToBytes: received invalid unpadded hex");
          const array = new Uint8Array(hex.length / 2);
          for (let i = 0; i < array.length; i++) {
            const j = i * 2;
            const hexByte = hex.slice(j, j + 2);
            const byte = Number.parseInt(hexByte, 16);
            if (Number.isNaN(byte) || byte < 0)
              throw new Error("Invalid byte sequence");
            array[i] = byte;
          }
          return array;
        }
        // There is no setImmediate in browser and setTimeout is slow. However, call to async function will return Promise
        // which will be fullfiled only on next scheduler queue processing step and this is exactly what we need.
        const nextTick = async () => {};
        // Returns control to thread each 'tick' ms to avoid blocking
        async function asyncLoop(iters, tick, cb) {
          let ts = Date.now();
          for (let i = 0; i < iters; i++) {
            cb(i);
            // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
            const diff = Date.now() - ts;
            if (diff >= 0 && diff < tick) continue;
            await nextTick();
            ts += diff;
          }
        }
        function utf8ToBytes(str) {
          if (typeof str !== "string") {
            throw new TypeError(
              `utf8ToBytes expected string, got ${typeof str}`
            );
          }
          return new TextEncoder().encode(str);
        }
        function toBytes(data) {
          if (typeof data === "string") data = utf8ToBytes(data);
          if (!(data instanceof Uint8Array))
            throw new TypeError(
              `Expected input type is Uint8Array (got ${typeof data})`
            );
          return data;
        }
        /**
         * Concats Uint8Array-s into one; like `Buffer.concat([buf1, buf2])`
         * @example concatBytes(buf1, buf2)
         */
        function concatBytes(...arrays) {
          if (!arrays.every((a) => a instanceof Uint8Array))
            throw new Error("Uint8Array list expected");
          if (arrays.length === 1) return arrays[0];
          const length = arrays.reduce((a, arr) => a + arr.length, 0);
          const result = new Uint8Array(length);
          for (let i = 0, pad = 0; i < arrays.length; i++) {
            const arr = arrays[i];
            result.set(arr, pad);
            pad += arr.length;
          }
          return result;
        }
        // For runtime check if class implements interface
        class Hash {
          // Safe version that clones internal state
          clone() {
            return this._cloneInto();
          }
        }
        // Check if object doens't have custom constructor (like Uint8Array/Array)
        const isPlainObject = (obj) =>
          Object.prototype.toString.call(obj) === "[object Object]" &&
          obj.constructor === Object;
        function checkOpts(defaults, opts) {
          if (
            opts !== undefined &&
            (typeof opts !== "object" || !isPlainObject(opts))
          )
            throw new TypeError("Options should be object or undefined");
          const merged = Object.assign(defaults, opts);
          return merged;
        }
        function wrapConstructor(hashConstructor) {
          const hashC = (message) =>
            hashConstructor().update(toBytes(message)).digest();
          const tmp = hashConstructor();
          hashC.outputLen = tmp.outputLen;
          hashC.blockLen = tmp.blockLen;
          hashC.create = () => hashConstructor();
          return hashC;
        }
        function wrapConstructorWithOpts(hashCons) {
          const hashC = (msg, opts) =>
            hashCons(opts).update(toBytes(msg)).digest();
          const tmp = hashCons({});
          hashC.outputLen = tmp.outputLen;
          hashC.blockLen = tmp.blockLen;
          hashC.create = (opts) => hashCons(opts);
          return hashC;
        }
        /**
         * Secure PRNG
         */
        function randomBytes(bytesLength = 32) {
          if (_noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_0__.crypto.web) {
            return _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_0__.crypto.web.getRandomValues(
              new Uint8Array(bytesLength)
            );
          } else if (
            _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_0__.crypto.node
          ) {
            return new Uint8Array(
              _noble_hashes_crypto__WEBPACK_IMPORTED_MODULE_0__.crypto.node.randomBytes(
                bytesLength
              ).buffer
            );
          } else {
            throw new Error(
              "The environment doesn't have randomBytes function"
            );
          }
        }

        /***/
      },

    /***/ "../node_modules/@noble/secp256k1/lib/esm/index.js":
      /*!*********************************************************!*\
  !*** ../node_modules/@noble/secp256k1/lib/esm/index.js ***!
  \*********************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        var crypto__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ CURVE: () => /* binding */ CURVE,
          /* harmony export */ Point: () => /* binding */ Point,
          /* harmony export */ Signature: () => /* binding */ Signature,
          /* harmony export */ getPublicKey: () => /* binding */ getPublicKey,
          /* harmony export */ getSharedSecret: () =>
            /* binding */ getSharedSecret,
          /* harmony export */ recoverPublicKey: () =>
            /* binding */ recoverPublicKey,
          /* harmony export */ schnorr: () => /* binding */ schnorr,
          /* harmony export */ sign: () => /* binding */ sign,
          /* harmony export */ signSync: () => /* binding */ signSync,
          /* harmony export */ utils: () => /* binding */ utils,
          /* harmony export */ verify: () => /* binding */ verify,
          /* harmony export */
        });
        /* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! crypto */ "?e97e");
        /*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */

        const _0n = BigInt(0);
        const _1n = BigInt(1);
        const _2n = BigInt(2);
        const _3n = BigInt(3);
        const _8n = BigInt(8);
        const CURVE = Object.freeze({
          a: _0n,
          b: BigInt(7),
          P: BigInt(
            "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
          ),
          n: BigInt(
            "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
          ),
          h: _1n,
          Gx: BigInt(
            "55066263022277343669578718895168534326250603453777594175500187360389116729240"
          ),
          Gy: BigInt(
            "32670510020758816978083085130507043184471273380659243275938904335757337482424"
          ),
          beta: BigInt(
            "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
          ),
        });

        function weistrass(x) {
          const { a, b } = CURVE;
          const x2 = mod(x * x);
          const x3 = mod(x2 * x);
          return mod(x3 + a * x + b);
        }
        const USE_ENDOMORPHISM = CURVE.a === _0n;
        class ShaError extends Error {
          constructor(message) {
            super(message);
          }
        }
        class JacobianPoint {
          constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
          }
          static fromAffine(p) {
            if (!(p instanceof Point)) {
              throw new TypeError("JacobianPoint#fromAffine: expected Point");
            }
            return new JacobianPoint(p.x, p.y, _1n);
          }
          static toAffineBatch(points) {
            const toInv = invertBatch(points.map((p) => p.z));
            return points.map((p, i) => p.toAffine(toInv[i]));
          }
          static normalizeZ(points) {
            return JacobianPoint.toAffineBatch(points).map(
              JacobianPoint.fromAffine
            );
          }
          equals(other) {
            if (!(other instanceof JacobianPoint))
              throw new TypeError("JacobianPoint expected");
            const { x: X1, y: Y1, z: Z1 } = this;
            const { x: X2, y: Y2, z: Z2 } = other;
            const Z1Z1 = mod(Z1 * Z1);
            const Z2Z2 = mod(Z2 * Z2);
            const U1 = mod(X1 * Z2Z2);
            const U2 = mod(X2 * Z1Z1);
            const S1 = mod(mod(Y1 * Z2) * Z2Z2);
            const S2 = mod(mod(Y2 * Z1) * Z1Z1);
            return U1 === U2 && S1 === S2;
          }
          negate() {
            return new JacobianPoint(this.x, mod(-this.y), this.z);
          }
          double() {
            const { x: X1, y: Y1, z: Z1 } = this;
            const A = mod(X1 * X1);
            const B = mod(Y1 * Y1);
            const C = mod(B * B);
            const x1b = X1 + B;
            const D = mod(_2n * (mod(x1b * x1b) - A - C));
            const E = mod(_3n * A);
            const F = mod(E * E);
            const X3 = mod(F - _2n * D);
            const Y3 = mod(E * (D - X3) - _8n * C);
            const Z3 = mod(_2n * Y1 * Z1);
            return new JacobianPoint(X3, Y3, Z3);
          }
          add(other) {
            if (!(other instanceof JacobianPoint))
              throw new TypeError("JacobianPoint expected");
            const { x: X1, y: Y1, z: Z1 } = this;
            const { x: X2, y: Y2, z: Z2 } = other;
            if (X2 === _0n || Y2 === _0n) return this;
            if (X1 === _0n || Y1 === _0n) return other;
            const Z1Z1 = mod(Z1 * Z1);
            const Z2Z2 = mod(Z2 * Z2);
            const U1 = mod(X1 * Z2Z2);
            const U2 = mod(X2 * Z1Z1);
            const S1 = mod(mod(Y1 * Z2) * Z2Z2);
            const S2 = mod(mod(Y2 * Z1) * Z1Z1);
            const H = mod(U2 - U1);
            const r = mod(S2 - S1);
            if (H === _0n) {
              if (r === _0n) {
                return this.double();
              } else {
                return JacobianPoint.ZERO;
              }
            }
            const HH = mod(H * H);
            const HHH = mod(H * HH);
            const V = mod(U1 * HH);
            const X3 = mod(r * r - HHH - _2n * V);
            const Y3 = mod(r * (V - X3) - S1 * HHH);
            const Z3 = mod(Z1 * Z2 * H);
            return new JacobianPoint(X3, Y3, Z3);
          }
          subtract(other) {
            return this.add(other.negate());
          }
          multiplyUnsafe(scalar) {
            const P0 = JacobianPoint.ZERO;
            if (typeof scalar === "bigint" && scalar === _0n) return P0;
            let n = normalizeScalar(scalar);
            if (n === _1n) return this;
            if (!USE_ENDOMORPHISM) {
              let p = P0;
              let d = this;
              while (n > _0n) {
                if (n & _1n) p = p.add(d);
                d = d.double();
                n >>= _1n;
              }
              return p;
            }
            let { k1neg, k1, k2neg, k2 } = splitScalarEndo(n);
            let k1p = P0;
            let k2p = P0;
            let d = this;
            while (k1 > _0n || k2 > _0n) {
              if (k1 & _1n) k1p = k1p.add(d);
              if (k2 & _1n) k2p = k2p.add(d);
              d = d.double();
              k1 >>= _1n;
              k2 >>= _1n;
            }
            if (k1neg) k1p = k1p.negate();
            if (k2neg) k2p = k2p.negate();
            k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
            return k1p.add(k2p);
          }
          precomputeWindow(W) {
            const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
            const points = [];
            let p = this;
            let base = p;
            for (let window = 0; window < windows; window++) {
              base = p;
              points.push(base);
              for (let i = 1; i < 2 ** (W - 1); i++) {
                base = base.add(p);
                points.push(base);
              }
              p = base.double();
            }
            return points;
          }
          wNAF(n, affinePoint) {
            if (!affinePoint && this.equals(JacobianPoint.BASE))
              affinePoint = Point.BASE;
            const W = (affinePoint && affinePoint._WINDOW_SIZE) || 1;
            if (256 % W) {
              throw new Error(
                "Point#wNAF: Invalid precomputation window, must be power of 2"
              );
            }
            let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
            if (!precomputes) {
              precomputes = this.precomputeWindow(W);
              if (affinePoint && W !== 1) {
                precomputes = JacobianPoint.normalizeZ(precomputes);
                pointPrecomputes.set(affinePoint, precomputes);
              }
            }
            let p = JacobianPoint.ZERO;
            let f = JacobianPoint.ZERO;
            const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
            const windowSize = 2 ** (W - 1);
            const mask = BigInt(2 ** W - 1);
            const maxNumber = 2 ** W;
            const shiftBy = BigInt(W);
            for (let window = 0; window < windows; window++) {
              const offset = window * windowSize;
              let wbits = Number(n & mask);
              n >>= shiftBy;
              if (wbits > windowSize) {
                wbits -= maxNumber;
                n += _1n;
              }
              if (wbits === 0) {
                let pr = precomputes[offset];
                if (window % 2) pr = pr.negate();
                f = f.add(pr);
              } else {
                let cached = precomputes[offset + Math.abs(wbits) - 1];
                if (wbits < 0) cached = cached.negate();
                p = p.add(cached);
              }
            }
            return { p, f };
          }
          multiply(scalar, affinePoint) {
            let n = normalizeScalar(scalar);
            let point;
            let fake;
            if (USE_ENDOMORPHISM) {
              const { k1neg, k1, k2neg, k2 } = splitScalarEndo(n);
              let { p: k1p, f: f1p } = this.wNAF(k1, affinePoint);
              let { p: k2p, f: f2p } = this.wNAF(k2, affinePoint);
              if (k1neg) k1p = k1p.negate();
              if (k2neg) k2p = k2p.negate();
              k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
              point = k1p.add(k2p);
              fake = f1p.add(f2p);
            } else {
              const { p, f } = this.wNAF(n, affinePoint);
              point = p;
              fake = f;
            }
            return JacobianPoint.normalizeZ([point, fake])[0];
          }
          toAffine(invZ = invert(this.z)) {
            const { x, y, z } = this;
            const iz1 = invZ;
            const iz2 = mod(iz1 * iz1);
            const iz3 = mod(iz2 * iz1);
            const ax = mod(x * iz2);
            const ay = mod(y * iz3);
            const zz = mod(z * iz1);
            if (zz !== _1n) throw new Error("invZ was invalid");
            return new Point(ax, ay);
          }
        }
        JacobianPoint.BASE = new JacobianPoint(CURVE.Gx, CURVE.Gy, _1n);
        JacobianPoint.ZERO = new JacobianPoint(_0n, _1n, _0n);
        const pointPrecomputes = new WeakMap();
        class Point {
          constructor(x, y) {
            this.x = x;
            this.y = y;
          }
          _setWindowSize(windowSize) {
            this._WINDOW_SIZE = windowSize;
            pointPrecomputes.delete(this);
          }
          hasEvenY() {
            return this.y % _2n === _0n;
          }
          static fromCompressedHex(bytes) {
            const isShort = bytes.length === 32;
            const x = bytesToNumber(isShort ? bytes : bytes.subarray(1));
            if (!isValidFieldElement(x))
              throw new Error("Point is not on curve");
            const y2 = weistrass(x);
            let y = sqrtMod(y2);
            const isYOdd = (y & _1n) === _1n;
            if (isShort) {
              if (isYOdd) y = mod(-y);
            } else {
              const isFirstByteOdd = (bytes[0] & 1) === 1;
              if (isFirstByteOdd !== isYOdd) y = mod(-y);
            }
            const point = new Point(x, y);
            point.assertValidity();
            return point;
          }
          static fromUncompressedHex(bytes) {
            const x = bytesToNumber(bytes.subarray(1, 33));
            const y = bytesToNumber(bytes.subarray(33, 65));
            const point = new Point(x, y);
            point.assertValidity();
            return point;
          }
          static fromHex(hex) {
            const bytes = ensureBytes(hex);
            const len = bytes.length;
            const header = bytes[0];
            if (
              len === 32 ||
              (len === 33 && (header === 0x02 || header === 0x03))
            ) {
              return this.fromCompressedHex(bytes);
            }
            if (len === 65 && header === 0x04)
              return this.fromUncompressedHex(bytes);
            throw new Error(
              `Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${len}`
            );
          }
          static fromPrivateKey(privateKey) {
            return Point.BASE.multiply(normalizePrivateKey(privateKey));
          }
          static fromSignature(msgHash, signature, recovery) {
            msgHash = ensureBytes(msgHash);
            const h = truncateHash(msgHash);
            const { r, s } = normalizeSignature(signature);
            if (recovery !== 0 && recovery !== 1) {
              throw new Error("Cannot recover signature: invalid recovery bit");
            }
            const prefix = recovery & 1 ? "03" : "02";
            const R = Point.fromHex(prefix + numTo32bStr(r));
            const { n } = CURVE;
            const rinv = invert(r, n);
            const u1 = mod(-h * rinv, n);
            const u2 = mod(s * rinv, n);
            const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
            if (!Q)
              throw new Error("Cannot recover signature: point at infinify");
            Q.assertValidity();
            return Q;
          }
          toRawBytes(isCompressed = false) {
            return hexToBytes(this.toHex(isCompressed));
          }
          toHex(isCompressed = false) {
            const x = numTo32bStr(this.x);
            if (isCompressed) {
              const prefix = this.hasEvenY() ? "02" : "03";
              return `${prefix}${x}`;
            } else {
              return `04${x}${numTo32bStr(this.y)}`;
            }
          }
          toHexX() {
            return this.toHex(true).slice(2);
          }
          toRawX() {
            return this.toRawBytes(true).slice(1);
          }
          assertValidity() {
            const msg = "Point is not on elliptic curve";
            const { x, y } = this;
            if (!isValidFieldElement(x) || !isValidFieldElement(y))
              throw new Error(msg);
            const left = mod(y * y);
            const right = weistrass(x);
            if (mod(left - right) !== _0n) throw new Error(msg);
          }
          equals(other) {
            return this.x === other.x && this.y === other.y;
          }
          negate() {
            return new Point(this.x, mod(-this.y));
          }
          double() {
            return JacobianPoint.fromAffine(this).double().toAffine();
          }
          add(other) {
            return JacobianPoint.fromAffine(this)
              .add(JacobianPoint.fromAffine(other))
              .toAffine();
          }
          subtract(other) {
            return this.add(other.negate());
          }
          multiply(scalar) {
            return JacobianPoint.fromAffine(this)
              .multiply(scalar, this)
              .toAffine();
          }
          multiplyAndAddUnsafe(Q, a, b) {
            const P = JacobianPoint.fromAffine(this);
            const aP =
              a === _0n || a === _1n || this !== Point.BASE
                ? P.multiplyUnsafe(a)
                : P.multiply(a);
            const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
            const sum = aP.add(bQ);
            return sum.equals(JacobianPoint.ZERO) ? undefined : sum.toAffine();
          }
        }
        Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
        Point.ZERO = new Point(_0n, _0n);
        function sliceDER(s) {
          return Number.parseInt(s[0], 16) >= 8 ? "00" + s : s;
        }
        function parseDERInt(data) {
          if (data.length < 2 || data[0] !== 0x02) {
            throw new Error(
              `Invalid signature integer tag: ${bytesToHex(data)}`
            );
          }
          const len = data[1];
          const res = data.subarray(2, len + 2);
          if (!len || res.length !== len) {
            throw new Error(`Invalid signature integer: wrong length`);
          }
          if (res[0] === 0x00 && res[1] <= 0x7f) {
            throw new Error("Invalid signature integer: trailing length");
          }
          return { data: bytesToNumber(res), left: data.subarray(len + 2) };
        }
        function parseDERSignature(data) {
          if (data.length < 2 || data[0] != 0x30) {
            throw new Error(`Invalid signature tag: ${bytesToHex(data)}`);
          }
          if (data[1] !== data.length - 2) {
            throw new Error("Invalid signature: incorrect length");
          }
          const { data: r, left: sBytes } = parseDERInt(data.subarray(2));
          const { data: s, left: rBytesLeft } = parseDERInt(sBytes);
          if (rBytesLeft.length) {
            throw new Error(
              `Invalid signature: left bytes after parsing: ${bytesToHex(
                rBytesLeft
              )}`
            );
          }
          return { r, s };
        }
        class Signature {
          constructor(r, s) {
            this.r = r;
            this.s = s;
            this.assertValidity();
          }
          static fromCompact(hex) {
            const arr = hex instanceof Uint8Array;
            const name = "Signature.fromCompact";
            if (typeof hex !== "string" && !arr)
              throw new TypeError(`${name}: Expected string or Uint8Array`);
            const str = arr ? bytesToHex(hex) : hex;
            if (str.length !== 128)
              throw new Error(`${name}: Expected 64-byte hex`);
            return new Signature(
              hexToNumber(str.slice(0, 64)),
              hexToNumber(str.slice(64, 128))
            );
          }
          static fromDER(hex) {
            const arr = hex instanceof Uint8Array;
            if (typeof hex !== "string" && !arr)
              throw new TypeError(
                `Signature.fromDER: Expected string or Uint8Array`
              );
            const { r, s } = parseDERSignature(arr ? hex : hexToBytes(hex));
            return new Signature(r, s);
          }
          static fromHex(hex) {
            return this.fromDER(hex);
          }
          assertValidity() {
            const { r, s } = this;
            if (!isWithinCurveOrder(r))
              throw new Error("Invalid Signature: r must be 0 < r < n");
            if (!isWithinCurveOrder(s))
              throw new Error("Invalid Signature: s must be 0 < s < n");
          }
          hasHighS() {
            const HALF = CURVE.n >> _1n;
            return this.s > HALF;
          }
          normalizeS() {
            return this.hasHighS()
              ? new Signature(this.r, CURVE.n - this.s)
              : this;
          }
          toDERRawBytes(isCompressed = false) {
            return hexToBytes(this.toDERHex(isCompressed));
          }
          toDERHex(isCompressed = false) {
            const sHex = sliceDER(numberToHexUnpadded(this.s));
            if (isCompressed) return sHex;
            const rHex = sliceDER(numberToHexUnpadded(this.r));
            const rLen = numberToHexUnpadded(rHex.length / 2);
            const sLen = numberToHexUnpadded(sHex.length / 2);
            const length = numberToHexUnpadded(
              rHex.length / 2 + sHex.length / 2 + 4
            );
            return `30${length}02${rLen}${rHex}02${sLen}${sHex}`;
          }
          toRawBytes() {
            return this.toDERRawBytes();
          }
          toHex() {
            return this.toDERHex();
          }
          toCompactRawBytes() {
            return hexToBytes(this.toCompactHex());
          }
          toCompactHex() {
            return numTo32bStr(this.r) + numTo32bStr(this.s);
          }
        }
        function concatBytes(...arrays) {
          if (!arrays.every((b) => b instanceof Uint8Array))
            throw new Error("Uint8Array list expected");
          if (arrays.length === 1) return arrays[0];
          const length = arrays.reduce((a, arr) => a + arr.length, 0);
          const result = new Uint8Array(length);
          for (let i = 0, pad = 0; i < arrays.length; i++) {
            const arr = arrays[i];
            result.set(arr, pad);
            pad += arr.length;
          }
          return result;
        }
        const hexes = Array.from({ length: 256 }, (v, i) =>
          i.toString(16).padStart(2, "0")
        );
        function bytesToHex(uint8a) {
          if (!(uint8a instanceof Uint8Array))
            throw new Error("Expected Uint8Array");
          let hex = "";
          for (let i = 0; i < uint8a.length; i++) {
            hex += hexes[uint8a[i]];
          }
          return hex;
        }
        const POW_2_256 = BigInt(
          "0x10000000000000000000000000000000000000000000000000000000000000000"
        );
        function numTo32bStr(num) {
          if (typeof num !== "bigint") throw new Error("Expected bigint");
          if (!(_0n <= num && num < POW_2_256))
            throw new Error("Expected number < 2^256");
          return num.toString(16).padStart(64, "0");
        }
        function numTo32b(num) {
          const b = hexToBytes(numTo32bStr(num));
          if (b.length !== 32) throw new Error("Error: expected 32 bytes");
          return b;
        }
        function numberToHexUnpadded(num) {
          const hex = num.toString(16);
          return hex.length & 1 ? `0${hex}` : hex;
        }
        function hexToNumber(hex) {
          if (typeof hex !== "string") {
            throw new TypeError(
              "hexToNumber: expected string, got " + typeof hex
            );
          }
          return BigInt(`0x${hex}`);
        }
        function hexToBytes(hex) {
          if (typeof hex !== "string") {
            throw new TypeError(
              "hexToBytes: expected string, got " + typeof hex
            );
          }
          if (hex.length % 2)
            throw new Error(
              "hexToBytes: received invalid unpadded hex" + hex.length
            );
          const array = new Uint8Array(hex.length / 2);
          for (let i = 0; i < array.length; i++) {
            const j = i * 2;
            const hexByte = hex.slice(j, j + 2);
            const byte = Number.parseInt(hexByte, 16);
            if (Number.isNaN(byte) || byte < 0)
              throw new Error("Invalid byte sequence");
            array[i] = byte;
          }
          return array;
        }
        function bytesToNumber(bytes) {
          return hexToNumber(bytesToHex(bytes));
        }
        function ensureBytes(hex) {
          return hex instanceof Uint8Array
            ? Uint8Array.from(hex)
            : hexToBytes(hex);
        }
        function normalizeScalar(num) {
          if (typeof num === "number" && Number.isSafeInteger(num) && num > 0)
            return BigInt(num);
          if (typeof num === "bigint" && isWithinCurveOrder(num)) return num;
          throw new TypeError(
            "Expected valid private scalar: 0 < scalar < curve.n"
          );
        }
        function mod(a, b = CURVE.P) {
          const result = a % b;
          return result >= _0n ? result : b + result;
        }
        function pow2(x, power) {
          const { P } = CURVE;
          let res = x;
          while (power-- > _0n) {
            res *= res;
            res %= P;
          }
          return res;
        }
        function sqrtMod(x) {
          const { P } = CURVE;
          const _6n = BigInt(6);
          const _11n = BigInt(11);
          const _22n = BigInt(22);
          const _23n = BigInt(23);
          const _44n = BigInt(44);
          const _88n = BigInt(88);
          const b2 = (x * x * x) % P;
          const b3 = (b2 * b2 * x) % P;
          const b6 = (pow2(b3, _3n) * b3) % P;
          const b9 = (pow2(b6, _3n) * b3) % P;
          const b11 = (pow2(b9, _2n) * b2) % P;
          const b22 = (pow2(b11, _11n) * b11) % P;
          const b44 = (pow2(b22, _22n) * b22) % P;
          const b88 = (pow2(b44, _44n) * b44) % P;
          const b176 = (pow2(b88, _88n) * b88) % P;
          const b220 = (pow2(b176, _44n) * b44) % P;
          const b223 = (pow2(b220, _3n) * b3) % P;
          const t1 = (pow2(b223, _23n) * b22) % P;
          const t2 = (pow2(t1, _6n) * b2) % P;
          return pow2(t2, _2n);
        }
        function invert(number, modulo = CURVE.P) {
          if (number === _0n || modulo <= _0n) {
            throw new Error(
              `invert: expected positive integers, got n=${number} mod=${modulo}`
            );
          }
          let a = mod(number, modulo);
          let b = modulo;
          let x = _0n,
            y = _1n,
            u = _1n,
            v = _0n;
          while (a !== _0n) {
            const q = b / a;
            const r = b % a;
            const m = x - u * q;
            const n = y - v * q;
            (b = a), (a = r), (x = u), (y = v), (u = m), (v = n);
          }
          const gcd = b;
          if (gcd !== _1n) throw new Error("invert: does not exist");
          return mod(x, modulo);
        }
        function invertBatch(nums, p = CURVE.P) {
          const scratch = new Array(nums.length);
          const lastMultiplied = nums.reduce((acc, num, i) => {
            if (num === _0n) return acc;
            scratch[i] = acc;
            return mod(acc * num, p);
          }, _1n);
          const inverted = invert(lastMultiplied, p);
          nums.reduceRight((acc, num, i) => {
            if (num === _0n) return acc;
            scratch[i] = mod(acc * scratch[i], p);
            return mod(acc * num, p);
          }, inverted);
          return scratch;
        }
        const divNearest = (a, b) => (a + b / _2n) / b;
        const ENDO = {
          a1: BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
          b1: -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
          a2: BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
          b2: BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
          POW_2_128: BigInt("0x100000000000000000000000000000000"),
        };
        function splitScalarEndo(k) {
          const { n } = CURVE;
          const { a1, b1, a2, b2, POW_2_128 } = ENDO;
          const c1 = divNearest(b2 * k, n);
          const c2 = divNearest(-b1 * k, n);
          let k1 = mod(k - c1 * a1 - c2 * a2, n);
          let k2 = mod(-c1 * b1 - c2 * b2, n);
          const k1neg = k1 > POW_2_128;
          const k2neg = k2 > POW_2_128;
          if (k1neg) k1 = n - k1;
          if (k2neg) k2 = n - k2;
          if (k1 > POW_2_128 || k2 > POW_2_128) {
            throw new Error("splitScalarEndo: Endomorphism failed, k=" + k);
          }
          return { k1neg, k1, k2neg, k2 };
        }
        function truncateHash(hash) {
          const { n } = CURVE;
          const byteLength = hash.length;
          const delta = byteLength * 8 - 256;
          let h = bytesToNumber(hash);
          if (delta > 0) h = h >> BigInt(delta);
          if (h >= n) h -= n;
          return h;
        }
        let _sha256Sync;
        let _hmacSha256Sync;
        class HmacDrbg {
          constructor() {
            this.v = new Uint8Array(32).fill(1);
            this.k = new Uint8Array(32).fill(0);
            this.counter = 0;
          }
          hmac(...values) {
            return utils.hmacSha256(this.k, ...values);
          }
          hmacSync(...values) {
            return _hmacSha256Sync(this.k, ...values);
          }
          checkSync() {
            if (typeof _hmacSha256Sync !== "function")
              throw new ShaError("hmacSha256Sync needs to be set");
          }
          incr() {
            if (this.counter >= 1000)
              throw new Error(
                "Tried 1,000 k values for sign(), all were invalid"
              );
            this.counter += 1;
          }
          async reseed(seed = new Uint8Array()) {
            this.k = await this.hmac(this.v, Uint8Array.from([0x00]), seed);
            this.v = await this.hmac(this.v);
            if (seed.length === 0) return;
            this.k = await this.hmac(this.v, Uint8Array.from([0x01]), seed);
            this.v = await this.hmac(this.v);
          }
          reseedSync(seed = new Uint8Array()) {
            this.checkSync();
            this.k = this.hmacSync(this.v, Uint8Array.from([0x00]), seed);
            this.v = this.hmacSync(this.v);
            if (seed.length === 0) return;
            this.k = this.hmacSync(this.v, Uint8Array.from([0x01]), seed);
            this.v = this.hmacSync(this.v);
          }
          async generate() {
            this.incr();
            this.v = await this.hmac(this.v);
            return this.v;
          }
          generateSync() {
            this.checkSync();
            this.incr();
            this.v = this.hmacSync(this.v);
            return this.v;
          }
        }
        function isWithinCurveOrder(num) {
          return _0n < num && num < CURVE.n;
        }
        function isValidFieldElement(num) {
          return _0n < num && num < CURVE.P;
        }
        function kmdToSig(kBytes, m, d) {
          const k = bytesToNumber(kBytes);
          if (!isWithinCurveOrder(k)) return;
          const { n } = CURVE;
          const q = Point.BASE.multiply(k);
          const r = mod(q.x, n);
          if (r === _0n) return;
          const s = mod(invert(k, n) * mod(m + d * r, n), n);
          if (s === _0n) return;
          const sig = new Signature(r, s);
          const recovery = (q.x === sig.r ? 0 : 2) | Number(q.y & _1n);
          return { sig, recovery };
        }
        function normalizePrivateKey(key) {
          let num;
          if (typeof key === "bigint") {
            num = key;
          } else if (
            typeof key === "number" &&
            Number.isSafeInteger(key) &&
            key > 0
          ) {
            num = BigInt(key);
          } else if (typeof key === "string") {
            if (key.length !== 64)
              throw new Error("Expected 32 bytes of private key");
            num = hexToNumber(key);
          } else if (key instanceof Uint8Array) {
            if (key.length !== 32)
              throw new Error("Expected 32 bytes of private key");
            num = bytesToNumber(key);
          } else {
            throw new TypeError("Expected valid private key");
          }
          if (!isWithinCurveOrder(num))
            throw new Error("Expected private key: 0 < key < n");
          return num;
        }
        function normalizePublicKey(publicKey) {
          if (publicKey instanceof Point) {
            publicKey.assertValidity();
            return publicKey;
          } else {
            return Point.fromHex(publicKey);
          }
        }
        function normalizeSignature(signature) {
          if (signature instanceof Signature) {
            signature.assertValidity();
            return signature;
          }
          try {
            return Signature.fromDER(signature);
          } catch (error) {
            return Signature.fromCompact(signature);
          }
        }
        function getPublicKey(privateKey, isCompressed = false) {
          return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
        }
        function recoverPublicKey(
          msgHash,
          signature,
          recovery,
          isCompressed = false
        ) {
          return Point.fromSignature(msgHash, signature, recovery).toRawBytes(
            isCompressed
          );
        }
        function isProbPub(item) {
          const arr = item instanceof Uint8Array;
          const str = typeof item === "string";
          const len = (arr || str) && item.length;
          if (arr) return len === 33 || len === 65;
          if (str) return len === 66 || len === 130;
          if (item instanceof Point) return true;
          return false;
        }
        function getSharedSecret(privateA, publicB, isCompressed = false) {
          if (isProbPub(privateA))
            throw new TypeError(
              "getSharedSecret: first arg must be private key"
            );
          if (!isProbPub(publicB))
            throw new TypeError(
              "getSharedSecret: second arg must be public key"
            );
          const b = normalizePublicKey(publicB);
          b.assertValidity();
          return b
            .multiply(normalizePrivateKey(privateA))
            .toRawBytes(isCompressed);
        }
        function bits2int(bytes) {
          const slice = bytes.length > 32 ? bytes.slice(0, 32) : bytes;
          return bytesToNumber(slice);
        }
        function bits2octets(bytes) {
          const z1 = bits2int(bytes);
          const z2 = mod(z1, CURVE.n);
          return int2octets(z2 < _0n ? z1 : z2);
        }
        function int2octets(num) {
          return numTo32b(num);
        }
        function initSigArgs(msgHash, privateKey, extraEntropy) {
          if (msgHash == null)
            throw new Error(
              `sign: expected valid message hash, not "${msgHash}"`
            );
          const h1 = ensureBytes(msgHash);
          const d = normalizePrivateKey(privateKey);
          const seedArgs = [int2octets(d), bits2octets(h1)];
          if (extraEntropy != null) {
            if (extraEntropy === true) extraEntropy = utils.randomBytes(32);
            const e = ensureBytes(extraEntropy);
            if (e.length !== 32)
              throw new Error("sign: Expected 32 bytes of extra data");
            seedArgs.push(e);
          }
          const seed = concatBytes(...seedArgs);
          const m = bits2int(h1);
          return { seed, m, d };
        }
        function finalizeSig(recSig, opts) {
          let { sig, recovery } = recSig;
          const { canonical, der, recovered } = Object.assign(
            { canonical: true, der: true },
            opts
          );
          if (canonical && sig.hasHighS()) {
            sig = sig.normalizeS();
            recovery ^= 1;
          }
          const hashed = der ? sig.toDERRawBytes() : sig.toCompactRawBytes();
          return recovered ? [hashed, recovery] : hashed;
        }
        async function sign(msgHash, privKey, opts = {}) {
          const { seed, m, d } = initSigArgs(
            msgHash,
            privKey,
            opts.extraEntropy
          );
          let sig;
          const drbg = new HmacDrbg();
          await drbg.reseed(seed);
          while (!(sig = kmdToSig(await drbg.generate(), m, d)))
            await drbg.reseed();
          return finalizeSig(sig, opts);
        }
        function signSync(msgHash, privKey, opts = {}) {
          const { seed, m, d } = initSigArgs(
            msgHash,
            privKey,
            opts.extraEntropy
          );
          let sig;
          const drbg = new HmacDrbg();
          drbg.reseedSync(seed);
          while (!(sig = kmdToSig(drbg.generateSync(), m, d)))
            drbg.reseedSync();
          return finalizeSig(sig, opts);
        }

        const vopts = { strict: true };
        function verify(signature, msgHash, publicKey, opts = vopts) {
          let sig;
          try {
            sig = normalizeSignature(signature);
            msgHash = ensureBytes(msgHash);
          } catch (error) {
            return false;
          }
          const { r, s } = sig;
          if (opts.strict && sig.hasHighS()) return false;
          const h = truncateHash(msgHash);
          let P;
          try {
            P = normalizePublicKey(publicKey);
          } catch (error) {
            return false;
          }
          const { n } = CURVE;
          const sinv = invert(s, n);
          const u1 = mod(h * sinv, n);
          const u2 = mod(r * sinv, n);
          const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2);
          if (!R) return false;
          const v = mod(R.x, n);
          return v === r;
        }
        function schnorrChallengeFinalize(ch) {
          return mod(bytesToNumber(ch), CURVE.n);
        }
        class SchnorrSignature {
          constructor(r, s) {
            this.r = r;
            this.s = s;
            this.assertValidity();
          }
          static fromHex(hex) {
            const bytes = ensureBytes(hex);
            if (bytes.length !== 64)
              throw new TypeError(
                `SchnorrSignature.fromHex: expected 64 bytes, not ${bytes.length}`
              );
            const r = bytesToNumber(bytes.subarray(0, 32));
            const s = bytesToNumber(bytes.subarray(32, 64));
            return new SchnorrSignature(r, s);
          }
          assertValidity() {
            const { r, s } = this;
            if (!isValidFieldElement(r) || !isWithinCurveOrder(s))
              throw new Error("Invalid signature");
          }
          toHex() {
            return numTo32bStr(this.r) + numTo32bStr(this.s);
          }
          toRawBytes() {
            return hexToBytes(this.toHex());
          }
        }
        function schnorrGetPublicKey(privateKey) {
          return Point.fromPrivateKey(privateKey).toRawX();
        }
        class InternalSchnorrSignature {
          constructor(message, privateKey, auxRand = utils.randomBytes()) {
            if (message == null)
              throw new TypeError(
                `sign: Expected valid message, not "${message}"`
              );
            this.m = ensureBytes(message);
            const { x, scalar } = this.getScalar(
              normalizePrivateKey(privateKey)
            );
            this.px = x;
            this.d = scalar;
            this.rand = ensureBytes(auxRand);
            if (this.rand.length !== 32)
              throw new TypeError("sign: Expected 32 bytes of aux randomness");
          }
          getScalar(priv) {
            const point = Point.fromPrivateKey(priv);
            const scalar = point.hasEvenY() ? priv : CURVE.n - priv;
            return { point, scalar, x: point.toRawX() };
          }
          initNonce(d, t0h) {
            return numTo32b(d ^ bytesToNumber(t0h));
          }
          finalizeNonce(k0h) {
            const k0 = mod(bytesToNumber(k0h), CURVE.n);
            if (k0 === _0n)
              throw new Error("sign: Creation of signature failed. k is zero");
            const { point: R, x: rx, scalar: k } = this.getScalar(k0);
            return { R, rx, k };
          }
          finalizeSig(R, k, e, d) {
            return new SchnorrSignature(
              R.x,
              mod(k + e * d, CURVE.n)
            ).toRawBytes();
          }
          error() {
            throw new Error("sign: Invalid signature produced");
          }
          async calc() {
            const { m, d, px, rand } = this;
            const tag = utils.taggedHash;
            const t = this.initNonce(d, await tag(TAGS.aux, rand));
            const { R, rx, k } = this.finalizeNonce(
              await tag(TAGS.nonce, t, px, m)
            );
            const e = schnorrChallengeFinalize(
              await tag(TAGS.challenge, rx, px, m)
            );
            const sig = this.finalizeSig(R, k, e, d);
            if (!(await schnorrVerify(sig, m, px))) this.error();
            return sig;
          }
          calcSync() {
            const { m, d, px, rand } = this;
            const tag = utils.taggedHashSync;
            const t = this.initNonce(d, tag(TAGS.aux, rand));
            const { R, rx, k } = this.finalizeNonce(tag(TAGS.nonce, t, px, m));
            const e = schnorrChallengeFinalize(tag(TAGS.challenge, rx, px, m));
            const sig = this.finalizeSig(R, k, e, d);
            if (!schnorrVerifySync(sig, m, px)) this.error();
            return sig;
          }
        }
        async function schnorrSign(msg, privKey, auxRand) {
          return new InternalSchnorrSignature(msg, privKey, auxRand).calc();
        }
        function schnorrSignSync(msg, privKey, auxRand) {
          return new InternalSchnorrSignature(msg, privKey, auxRand).calcSync();
        }
        function initSchnorrVerify(signature, message, publicKey) {
          const raw = signature instanceof SchnorrSignature;
          const sig = raw ? signature : SchnorrSignature.fromHex(signature);
          if (raw) sig.assertValidity();
          return {
            ...sig,
            m: ensureBytes(message),
            P: normalizePublicKey(publicKey),
          };
        }
        function finalizeSchnorrVerify(r, P, s, e) {
          const R = Point.BASE.multiplyAndAddUnsafe(
            P,
            normalizePrivateKey(s),
            mod(-e, CURVE.n)
          );
          if (!R || !R.hasEvenY() || R.x !== r) return false;
          return true;
        }
        async function schnorrVerify(signature, message, publicKey) {
          try {
            const { r, s, m, P } = initSchnorrVerify(
              signature,
              message,
              publicKey
            );
            const e = schnorrChallengeFinalize(
              await utils.taggedHash(TAGS.challenge, numTo32b(r), P.toRawX(), m)
            );
            return finalizeSchnorrVerify(r, P, s, e);
          } catch (error) {
            return false;
          }
        }
        function schnorrVerifySync(signature, message, publicKey) {
          try {
            const { r, s, m, P } = initSchnorrVerify(
              signature,
              message,
              publicKey
            );
            const e = schnorrChallengeFinalize(
              utils.taggedHashSync(TAGS.challenge, numTo32b(r), P.toRawX(), m)
            );
            return finalizeSchnorrVerify(r, P, s, e);
          } catch (error) {
            if (error instanceof ShaError) throw error;
            return false;
          }
        }
        const schnorr = {
          Signature: SchnorrSignature,
          getPublicKey: schnorrGetPublicKey,
          sign: schnorrSign,
          verify: schnorrVerify,
          signSync: schnorrSignSync,
          verifySync: schnorrVerifySync,
        };
        Point.BASE._setWindowSize(8);
        const crypto = {
          node:
            /*#__PURE__*/ crypto__WEBPACK_IMPORTED_MODULE_0___namespace_cache ||
            (crypto__WEBPACK_IMPORTED_MODULE_0___namespace_cache =
              __webpack_require__.t(crypto__WEBPACK_IMPORTED_MODULE_0__, 2)),
          web:
            typeof self === "object" && "crypto" in self
              ? self.crypto
              : undefined,
        };
        const TAGS = {
          challenge: "BIP0340/challenge",
          aux: "BIP0340/aux",
          nonce: "BIP0340/nonce",
        };
        const TAGGED_HASH_PREFIXES = {};
        const utils = {
          bytesToHex,
          hexToBytes,
          concatBytes,
          mod,
          invert,
          isValidPrivateKey(privateKey) {
            try {
              normalizePrivateKey(privateKey);
              return true;
            } catch (error) {
              return false;
            }
          },
          _bigintTo32Bytes: numTo32b,
          _normalizePrivateKey: normalizePrivateKey,
          hashToPrivateKey: (hash) => {
            hash = ensureBytes(hash);
            if (hash.length < 40 || hash.length > 1024)
              throw new Error(
                "Expected 40-1024 bytes of private key as per FIPS 186"
              );
            const num = mod(bytesToNumber(hash), CURVE.n - _1n) + _1n;
            return numTo32b(num);
          },
          randomBytes: (bytesLength = 32) => {
            if (crypto.web) {
              return crypto.web.getRandomValues(new Uint8Array(bytesLength));
            } else if (crypto.node) {
              const { randomBytes } = crypto.node;
              return Uint8Array.from(randomBytes(bytesLength));
            } else {
              throw new Error(
                "The environment doesn't have randomBytes function"
              );
            }
          },
          randomPrivateKey: () => {
            return utils.hashToPrivateKey(utils.randomBytes(40));
          },
          sha256: async (...messages) => {
            if (crypto.web) {
              const buffer = await crypto.web.subtle.digest(
                "SHA-256",
                concatBytes(...messages)
              );
              return new Uint8Array(buffer);
            } else if (crypto.node) {
              const { createHash } = crypto.node;
              const hash = createHash("sha256");
              messages.forEach((m) => hash.update(m));
              return Uint8Array.from(hash.digest());
            } else {
              throw new Error("The environment doesn't have sha256 function");
            }
          },
          hmacSha256: async (key, ...messages) => {
            if (crypto.web) {
              const ckey = await crypto.web.subtle.importKey(
                "raw",
                key,
                { name: "HMAC", hash: { name: "SHA-256" } },
                false,
                ["sign"]
              );
              const message = concatBytes(...messages);
              const buffer = await crypto.web.subtle.sign(
                "HMAC",
                ckey,
                message
              );
              return new Uint8Array(buffer);
            } else if (crypto.node) {
              const { createHmac } = crypto.node;
              const hash = createHmac("sha256", key);
              messages.forEach((m) => hash.update(m));
              return Uint8Array.from(hash.digest());
            } else {
              throw new Error(
                "The environment doesn't have hmac-sha256 function"
              );
            }
          },
          sha256Sync: undefined,
          hmacSha256Sync: undefined,
          taggedHash: async (tag, ...messages) => {
            let tagP = TAGGED_HASH_PREFIXES[tag];
            if (tagP === undefined) {
              const tagH = await utils.sha256(
                Uint8Array.from(tag, (c) => c.charCodeAt(0))
              );
              tagP = concatBytes(tagH, tagH);
              TAGGED_HASH_PREFIXES[tag] = tagP;
            }
            return utils.sha256(tagP, ...messages);
          },
          taggedHashSync: (tag, ...messages) => {
            if (typeof _sha256Sync !== "function")
              throw new ShaError("sha256Sync is undefined, you need to set it");
            let tagP = TAGGED_HASH_PREFIXES[tag];
            if (tagP === undefined) {
              const tagH = _sha256Sync(
                Uint8Array.from(tag, (c) => c.charCodeAt(0))
              );
              tagP = concatBytes(tagH, tagH);
              TAGGED_HASH_PREFIXES[tag] = tagP;
            }
            return _sha256Sync(tagP, ...messages);
          },
          precompute(windowSize = 8, point = Point.BASE) {
            const cached =
              point === Point.BASE ? point : new Point(point.x, point.y);
            cached._setWindowSize(windowSize);
            cached.multiply(_3n);
            return cached;
          },
        };
        Object.defineProperties(utils, {
          sha256Sync: {
            configurable: false,
            get() {
              return _sha256Sync;
            },
            set(val) {
              if (!_sha256Sync) _sha256Sync = val;
            },
          },
          hmacSha256Sync: {
            configurable: false,
            get() {
              return _hmacSha256Sync;
            },
            set(val) {
              if (!_hmacSha256Sync) _hmacSha256Sync = val;
            },
          },
        });

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ loaded: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.loaded = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/amd options */
  /******/ (() => {
    /******/ __webpack_require__.amdO = {};
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/create fake namespace object */
  /******/ (() => {
    /******/ var getProto = Object.getPrototypeOf
      ? (obj) => Object.getPrototypeOf(obj)
      : (obj) => obj.__proto__;
    /******/ var leafPrototypes;
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 16: return value when it's Promise-like
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
      /******/ if (mode & 1) value = this(value);
      /******/ if (mode & 8) return value;
      /******/ if (typeof value === "object" && value) {
        /******/ if (mode & 4 && value.__esModule) return value;
        /******/ if (mode & 16 && typeof value.then === "function")
          return value;
        /******/
      }
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ var def = {};
      /******/ leafPrototypes = leafPrototypes || [
        null,
        getProto({}),
        getProto([]),
        getProto(getProto),
      ];
      /******/ for (
        var current = mode & 2 && value;
        typeof current == "object" && !~leafPrototypes.indexOf(current);
        current = getProto(current)
      ) {
        /******/ Object.getOwnPropertyNames(current).forEach(
          (key) => (def[key] = () => value[key])
        );
        /******/
      }
      /******/ def["default"] = () => value;
      /******/ __webpack_require__.d(ns, def);
      /******/ return ns;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/ (() => {
    /******/ __webpack_require__.g = (function () {
      /******/ if (typeof globalThis === "object") return globalThis;
      /******/ try {
        /******/ return this || new Function("return this")();
        /******/
      } catch (e) {
        /******/ if (typeof window === "object") return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/node module decorator */
  /******/ (() => {
    /******/ __webpack_require__.nmd = (module) => {
      /******/ module.paths = [];
      /******/ if (!module.children) module.children = [];
      /******/ return module;
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /*!*********************************!*\
  !*** ./dapp-interface/index.ts ***!
  \*********************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _DAppInterface__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./DAppInterface */ "./dapp-interface/DAppInterface.ts"
      );
    // Copyright (c) 2022, Mysten Labs, Inc.
    // SPDX-License-Identifier: Apache-2.0

    Object.defineProperty(window, "ethosWallet", {
      enumerable: false,
      configurable: false,
      value: new _DAppInterface__WEBPACK_IMPORTED_MODULE_0__.DAppInterface(),
    });
  })();

  /******/
})();
//# sourceMappingURL=dapp-interface.js.map
