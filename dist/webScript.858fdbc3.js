// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Particles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, velocityX, velocityY, radius, color) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.veloctyY = velocityY;
    this.r = radius;
    this.color = color;
    this.dodge = 7.5; //how much the particle tries to dodge the mouse
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 2, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update(mouse) {
      if (this.x < 0 || this.x > window.innerWidth) this.velocityX *= -1; //flip direction moving when approaching window

      if (this.y < 0 || this.y > window.innerHeight) this.veloctyY *= -1;
      var distance = this.calcDistance(mouse.x, mouse.y);

      if (distance < mouse.radius + this.r) {
        if (mouse.x < this.x) {
          this.x += this.dodge;
        } else {
          this.x -= this.dodge;
        }

        if (mouse.y < this.y) {
          this.y += this.dodge;
        } else {
          this.y -= this.dodge;
        }

        if (this.x < 0) this.x = 0 + this.r / 2;
        if (this.x > window.innerWidth) this.x = window.innerWidth - this.r / 2;
        if (this.y < 0) this.y = 0 + this.r / 2;
        if (this.y > window.innerHeight) this.y = window.innerHeight - this.r / 2;
      } else {
        this.x += this.velocityX;
        this.y += this.veloctyY;
      }
    }
  }, {
    key: "calcDistance",
    value: function calcDistance(otherX, otherY) {
      var deltaX = otherX - this.x;
      var deltaY = otherY - this.y;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  }]);

  return Particle;
}();

exports.default = Particle;
},{}],"Rectangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rectangle = /*#__PURE__*/function () {
  function Rectangle(x, y, width, height) {
    _classCallCheck(this, Rectangle);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  _createClass(Rectangle, [{
    key: "contains",
    value: function contains(point) {
      return point.x >= this.x - this.width && point.x < this.x + this.width && point.y >= this.y - this.height && point.y < this.y + this.height;
    }
  }, {
    key: "intersects",
    value: function intersects(range) {
      return !(range.x - range.width > this.x + this.width || range.x + range.width < this.x - this.width || range.y - range.height > this.y + this.height || range.y + range.height < this.y - this.height);
    }
  }]);

  return Rectangle;
}();

exports.default = Rectangle;
},{}],"Point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y, data) {
  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
  this.data = data;
};

exports.default = Point;
},{}],"QuadTree.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Rectangle = _interopRequireDefault(require("./Rectangle.js"));

var _Point = _interopRequireDefault(require("./Point.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QuadTree = /*#__PURE__*/function () {
  function QuadTree(boundary, n) {
    _classCallCheck(this, QuadTree);

    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  _createClass(QuadTree, [{
    key: "subdivide",
    value: function subdivide() {
      var x = this.boundary.x; //setup some local vars to make code more readable (hopefully)

      var y = this.boundary.y;
      var halfWidth = this.boundary.width / 2;
      var halfHeight = this.boundary.height / 2;
      var NERect = new _Rectangle.default(x + halfWidth, y - halfHeight, halfWidth, halfHeight);
      var NWRect = new _Rectangle.default(x - halfWidth, y - halfHeight, halfWidth, halfHeight);
      var SERect = new _Rectangle.default(x + halfWidth, y + halfHeight, halfWidth, halfHeight);
      var SWRect = new _Rectangle.default(x - halfWidth, y + halfHeight, halfWidth, halfHeight);
      this.northEast = new QuadTree(NERect, this.capacity);
      this.northWest = new QuadTree(NWRect, this.capacity);
      this.southEast = new QuadTree(SERect, this.capacity);
      this.southWest = new QuadTree(SWRect, this.capacity);
      this.divided = true;
    }
  }, {
    key: "insert",
    value: function insert(point) {
      if (!this.boundary.contains(point)) {
        return false;
      }

      if (this.points.length < this.capacity) {
        this.points.push(point);
        return true;
      } else {
        if (!this.divided) {
          this.subdivide();
        }

        if (this.northEast.insert(point) || this.northWest.insert(point) || this.southEast.insert(point) || this.southWest.insert(point)) return true;
      }
    }
  }, {
    key: "query",
    value: function query(range, found) {
      if (!found) {
        found = [];
      }

      if (!range.intersects(this.boundary)) {
        return found;
      } else {
        var _iterator = _createForOfIteratorHelper(this.points),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var p = _step.value;

            if (range.contains(p)) {
              found.push(p);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (this.divided) {
          this.northWest.query(range, found);
          this.northEast.query(range, found);
          this.southWest.query(range, found);
          this.southEast.query(range, found);
        }
      }

      return found;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.rect(this.boundary.x - this.boundary.width, this.boundary.y - this.boundary.height, this.boundary.width * 2, this.boundary.height * 2);
      ctx.stroke();

      if (this.divided) {
        this.northEast.draw(ctx);
        this.northWest.draw(ctx);
        this.southEast.draw(ctx);
        this.southWest.draw(ctx);
      }
    }
  }]);

  return QuadTree;
}();

exports.default = QuadTree;
},{"./Rectangle.js":"Rectangle.js","./Point.js":"Point.js"}],"Circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle = /*#__PURE__*/function () {
  function Circle(x, y, r) {
    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  _createClass(Circle, [{
    key: "contains",
    value: function contains(point) {
      var deltaX = point.x - this.x;
      var deltaY = point.y - this.y;
      var distance = Math.pow(deltaX, 2) + Math.pow(deltaY, 2);
      return distance <= this.rSquared;
    }
  }, {
    key: "intersects",
    value: function intersects(range) {
      //detects intersection between axis-aligned rectangle (range) and this circle
      var deltaX = Math.abs(range.x - this.x);
      var deltaY = Math.abs(range.y - this.y);
      var edges = Math.pow(deltaX - range.width, 2) + Math.pow(deltaY - range.height, 2);
      if (deltaX > this.r + range.width || deltaY > this.r + range.height) return false; //circle completely outside rectangle

      if (deltaX <= range.width || deltaY <= range.height) return true; //circle center inside rectangle

      return edges <= this.rSquared; //rectangle passes through circle, just not center of it
    }
  }]);

  return Circle;
}();

exports.default = Circle;
},{}],"webScript.js":[function(require,module,exports) {
"use strict";

var _Particles = _interopRequireDefault(require("./Particles.js"));

var _QuadTree = _interopRequireDefault(require("./QuadTree.js"));

var _Rectangle = _interopRequireDefault(require("./Rectangle.js"));

var _Point = _interopRequireDefault(require("./Point.js"));

var _Circle = _interopRequireDefault(require("./Circle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var MOUSE_RADIUS = 0.0075; //area of effect for mouse

var MAX_PARTICLES = 0.0002; //how many particles

var CONNECTING_BAR_LENGTH = 0.0065; //how long are the "bars" that connect the dots

var MIN_RADIUS = 2;
var MIN_SPEED = 5;
var DEFAULT_SPLIT_COUNT = 10; //how many particles per quadtree before it splits

var debug = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; //create QuadTree

var boundary = new _Rectangle.default(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
var qtree = new _QuadTree.default(boundary, DEFAULT_SPLIT_COUNT);
var particles = []; //array to hold particles

var mouse = {
  //setup our mouse object
  x: undefined,
  y: undefined,
  radius: canvas.height * MOUSE_RADIUS * (canvas.width * MOUSE_RADIUS)
};
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("resize", function (event) {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  mouse.radius = canvas.height * MOUSE_RADIUS * (canvas.width * MOUSE_RADIUS);
  createParticles();
});
window.addEventListener("mouseout", function (event) {
  mouse.x = undefined;
  mouse.y = undefined;
});

function createParticles() {
  particles = [];
  var numParticles = canvas.height * canvas.width * MAX_PARTICLES;

  for (var i = 0; i < numParticles; i++) {
    var size = Math.random() * MIN_RADIUS + 1;
    var x = Math.random() * innerWidth - MIN_RADIUS * 4;
    var y = Math.random() * innerHeight - MIN_RADIUS * 4;
    var velocityX = Math.random() * MIN_SPEED - MIN_SPEED / 2;
    var velocityY = Math.random() * MIN_SPEED - MIN_SPEED / 2;
    var color = "#2baba9";
    particles.push(new _Particles.default(x, y, velocityX, velocityY, size, color));
  }
}

function mainLoop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (var _i = 0, _particles = particles; _i < _particles.length; _i++) {
    var particle = _particles[_i];
    particle.update(mouse);
    particle.draw(ctx);
  }

  connectParticles();
  requestAnimationFrame(mainLoop);
}

function connectParticles() {
  //create QuadTree
  var boundary = new _Rectangle.default(canvas.width / 2, canvas.height / 2, canvas.width, canvas.height);
  var qtree = new _QuadTree.default(boundary, DEFAULT_SPLIT_COUNT);

  for (var _i2 = 0, _particles2 = particles; _i2 < _particles2.length; _i2++) {
    var p = _particles2[_i2];
    var point = new _Point.default(p.x, p.y, p);
    qtree.insert(point);
  }

  var maxDistance = canvas.width * canvas.height * Math.pow(CONNECTING_BAR_LENGTH, 2);
  var opacity = 1;
  var count = 0;

  for (var _i3 = 0, _particles3 = particles; _i3 < _particles3.length; _i3++) {
    var _p = _particles3[_i3];

    var _point = new _Point.default(_p.x, _p.y, _p);

    var range = new _Circle.default(_p.x, _p.y, maxDistance);
    var matches = qtree.query(range);

    var _iterator = _createForOfIteratorHelper(matches),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var match = _step.value;

        var distance = _p.calcDistance(match.x, match.y);

        if (_p !== match && distance <= maxDistance) {
          opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = "rgba(43,171,169," + opacity + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(_p.x, _p.y);
          ctx.lineTo(match.x, match.y);
          ctx.stroke();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  if (debug) qtree.draw(ctx);
}

createParticles();
mainLoop();
},{"./Particles.js":"Particles.js","./QuadTree.js":"QuadTree.js","./Rectangle.js":"Rectangle.js","./Point.js":"Point.js","./Circle.js":"Circle.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58865" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","webScript.js"], null)
//# sourceMappingURL=/webScript.858fdbc3.js.map