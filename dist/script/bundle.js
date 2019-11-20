/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/Game.ts":
/*!**************************!*\
  !*** ./src/core/Game.ts ***!
  \**************************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/core/types.ts\");\n/* harmony import */ var _TerisRule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TerisRule */ \"./src/core/TerisRule.ts\");\n/* harmony import */ var _Teris__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Teris */ \"./src/core/Teris.ts\");\n/* harmony import */ var _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./viewer/GameConfig */ \"./src/core/viewer/GameConfig.ts\");\n\n\n\n\nclass Game {\n    constructor(_viewer) {\n        this._viewer = _viewer;\n        this._gamesStatus = _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].init;\n        this._nextTeris = Object(_Teris__WEBPACK_IMPORTED_MODULE_2__[\"createTeris\"])({ x: 0, y: 0 });\n        this._duration = _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].level[0].duration;\n        this._exists = [];\n        this._score = 0;\n        this.resetCenterPoint(_viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].nextSize.width, this._nextTeris);\n        this._viewer.showNext(this._nextTeris);\n        this._viewer.init(this);\n        this._viewer.showScore(this.score);\n    }\n    get score() {\n        return this._score;\n    }\n    set score(val) {\n        this._score = val;\n        this._viewer.showScore(val);\n        const level = _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].level.filter(it => it.score < val).pop();\n        console.log('level', level);\n        if (this._duration === level.duration) {\n            return;\n        }\n        this._duration = level.duration;\n        if (this._timer) {\n            this._timer = undefined;\n            clearInterval(this._timer);\n            this.autoDrop();\n        }\n    }\n    get GameStatus() {\n        return this._gamesStatus;\n    }\n    init() {\n        this._exists.forEach(sq => {\n            if (sq.viewer) {\n                sq.viewer.remove();\n            }\n        });\n        this._exists = [];\n        this._nextTeris = Object(_Teris__WEBPACK_IMPORTED_MODULE_2__[\"createTeris\"])({ x: 0, y: 0 });\n        this.resetCenterPoint(_viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].nextSize.width, this._nextTeris);\n        this._viewer.showNext(this._nextTeris);\n        this._curTeris = undefined;\n        this._score = 0;\n    }\n    start() {\n        if (this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            return;\n        }\n        if (this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].over) {\n            this.init();\n        }\n        this._gamesStatus = _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing;\n        if (!this._curTeris) {\n            this.switchTeris();\n        }\n        this.autoDrop();\n        this._viewer.onGameStart();\n    }\n    autoDrop() {\n        if (this._timer || this._gamesStatus !== _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            return;\n        }\n        this._timer = setInterval(() => {\n            if (this._curTeris) {\n                if (!_TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].move(this._curTeris, _types__WEBPACK_IMPORTED_MODULE_0__[\"MoveDirection\"].down, this._exists)) {\n                    this.hitBottom();\n                }\n            }\n        }, this._duration);\n    }\n    switchTeris() {\n        this._curTeris = this._nextTeris;\n        this.resetCenterPoint(_viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].panelSize.width, this._curTeris);\n        if (!_TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {\n            this._gamesStatus = _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].over;\n            clearInterval(this._timer);\n            this._timer = undefined;\n            this._viewer.onGameOver();\n            return;\n        }\n        this._nextTeris = Object(_Teris__WEBPACK_IMPORTED_MODULE_2__[\"createTeris\"])({ x: 0, y: 0 });\n        this.resetCenterPoint(_viewer_GameConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].nextSize.width, this._nextTeris);\n        this._viewer.swtich(this._curTeris);\n        this._viewer.showNext(this._nextTeris);\n    }\n    resetCenterPoint(width, teris) {\n        const x = Math.ceil(width / 2) - 1;\n        const y = 0;\n        teris.centerPoint = {\n            x, y\n        };\n        while (teris.suqares.some(it => it.point.y < 0)) {\n            teris.centerPoint = {\n                x: teris.centerPoint.x,\n                y: teris.centerPoint.y + 1\n            };\n        }\n    }\n    pause() {\n        if (this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            this._gamesStatus = _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].pause;\n            clearInterval(this._timer);\n            this._timer = undefined;\n        }\n        this._viewer.onGamePause();\n    }\n    control_left() {\n        if (this._curTeris && this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            _TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].move(this._curTeris, _types__WEBPACK_IMPORTED_MODULE_0__[\"MoveDirection\"].left, this._exists);\n        }\n    }\n    control_right() {\n        if (this._curTeris && this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            _TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].move(this._curTeris, _types__WEBPACK_IMPORTED_MODULE_0__[\"MoveDirection\"].right, this._exists);\n        }\n    }\n    control_down() {\n        if (this._curTeris && this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            _TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].moveDirectly(this._curTeris, _types__WEBPACK_IMPORTED_MODULE_0__[\"MoveDirection\"].down, this._exists);\n            this.hitBottom();\n        }\n    }\n    control_rotate() {\n        if (this._curTeris && this._gamesStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n            _TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].rotate(this._curTeris, this._exists);\n        }\n    }\n    hitBottom() {\n        this._exists.push(...this._curTeris.suqares);\n        const num = _TerisRule__WEBPACK_IMPORTED_MODULE_1__[\"TerisRule\"].deleteSquares(this._exists);\n        this.addScore(num);\n        this.switchTeris();\n    }\n    addScore(lineNum) {\n        if (lineNum === 0) {\n            return;\n        }\n        else if (lineNum === 1) {\n            this.score += 10;\n        }\n        else if (lineNum === 2) {\n            this.score += 25;\n        }\n        else if (lineNum === 3) {\n            this.score += 50;\n        }\n        else {\n            this.score += 100;\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Game.ts?");

/***/ }),

/***/ "./src/core/Square.ts":
/*!****************************!*\
  !*** ./src/core/Square.ts ***!
  \****************************/
/*! exports provided: Square */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Square\", function() { return Square; });\nclass Square {\n    constructor() {\n        this._point = {\n            x: 0,\n            y: 0\n        };\n        this._color = \"red\";\n    }\n    get viewer() {\n        return this._viewer;\n    }\n    set viewer(v) {\n        this._viewer = v;\n        if (v) {\n            v.show();\n        }\n    }\n    get point() {\n        return this._point;\n    }\n    set point(val) {\n        this._point = val;\n        if (this._viewer) {\n            this._viewer.show();\n        }\n    }\n    get color() {\n        return this._color;\n    }\n    set color(val) {\n        this._color = val;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/Square.ts?");

/***/ }),

/***/ "./src/core/SquareGroup.ts":
/*!*********************************!*\
  !*** ./src/core/SquareGroup.ts ***!
  \*********************************/
/*! exports provided: SquareGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SquareGroup\", function() { return SquareGroup; });\n/* harmony import */ var _Square__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Square */ \"./src/core/Square.ts\");\n\nclass SquareGroup {\n    constructor(_shape, _centerPoint, _color) {\n        this._shape = _shape;\n        this._centerPoint = _centerPoint;\n        this._color = _color;\n        this.isClock = true;\n        const arr = [];\n        this._shape.forEach((item) => {\n            const sq = new _Square__WEBPACK_IMPORTED_MODULE_0__[\"Square\"]();\n            sq.color = this._color;\n            arr.push(sq);\n        });\n        this._suqares = arr;\n        this.setSquares();\n    }\n    get suqares() {\n        return this._suqares;\n    }\n    get shape() {\n        return this._shape;\n    }\n    get centerPoint() {\n        return this._centerPoint;\n    }\n    set centerPoint(val) {\n        this._centerPoint = val;\n        this.setSquares();\n    }\n    setSquares() {\n        this._shape.forEach((item, index) => {\n            this._suqares[index].point = {\n                x: this._centerPoint.x + item.x,\n                y: this._centerPoint.y + item.y\n            };\n        });\n    }\n    afterRotateShape() {\n        if (this.isClock) {\n            return this._shape.map(it => {\n                const newP = {\n                    x: -it.y,\n                    y: it.x\n                };\n                return newP;\n            });\n        }\n        else {\n            return this._shape.map(it => {\n                const newP = {\n                    x: it.y,\n                    y: -it.x\n                };\n                return newP;\n            });\n        }\n    }\n    rotate() {\n        const newShape = this.afterRotateShape();\n        this._shape = newShape;\n        this.setSquares();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/SquareGroup.ts?");

/***/ }),

/***/ "./src/core/Teris.ts":
/*!***************************!*\
  !*** ./src/core/Teris.ts ***!
  \***************************/
/*! exports provided: TShape, LShape, LMirrorShape, SShape, SMirrorShape, SSquareShape, LineShape, shapes, colors, createTeris */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TShape\", function() { return TShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LShape\", function() { return LShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LMirrorShape\", function() { return LMirrorShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SShape\", function() { return SShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SMirrorShape\", function() { return SMirrorShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SSquareShape\", function() { return SSquareShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LineShape\", function() { return LineShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shapes\", function() { return shapes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colors\", function() { return colors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTeris\", function() { return createTeris; });\n/* harmony import */ var _viewer_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewer/util */ \"./src/core/viewer/util.ts\");\n/* harmony import */ var _SquareGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SquareGroup */ \"./src/core/SquareGroup.ts\");\n\n\nclass TShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color);\n    }\n}\nclass LShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color);\n    }\n}\nclass LMirrorShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, _color);\n    }\n}\nclass SShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], _centerPoint, _color);\n    }\n    rotate() {\n        super.rotate();\n        this.isClock = !this.isClock;\n    }\n}\nclass SMirrorShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color);\n    }\n    rotate() {\n        super.rotate();\n        this.isClock = !this.isClock;\n    }\n}\nclass SSquareShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, _color);\n    }\n    afterRotateShape() {\n        return this.shape;\n    }\n}\nclass LineShape extends _SquareGroup__WEBPACK_IMPORTED_MODULE_1__[\"SquareGroup\"] {\n    constructor(_centerPoint, _color) {\n        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, _color);\n    }\n    rotate() {\n        super.rotate();\n        this.isClock = !this.isClock;\n    }\n}\nconst shapes = [\n    TShape, LShape, LMirrorShape, LineShape, SShape, SMirrorShape, SSquareShape\n];\nconst colors = [\n    \"red\",\n    \"#fff\",\n    \"green\",\n    \"#2f7ce8\"\n];\nfunction createTeris(centerPoint) {\n    let index = Object(_viewer_util__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, shapes.length);\n    const shape = shapes[index];\n    index = Object(_viewer_util__WEBPACK_IMPORTED_MODULE_0__[\"getRandom\"])(0, colors.length);\n    const color = colors[index];\n    return new shape(centerPoint, color);\n}\n\n\n//# sourceURL=webpack:///./src/core/Teris.ts?");

/***/ }),

/***/ "./src/core/TerisRule.ts":
/*!*******************************!*\
  !*** ./src/core/TerisRule.ts ***!
  \*******************************/
/*! exports provided: TerisRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TerisRule\", function() { return TerisRule; });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ \"./src/core/types.ts\");\n/* harmony import */ var _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewer/GameConfig */ \"./src/core/viewer/GameConfig.ts\");\n\n\nfunction isPoint(obj) {\n    if (typeof obj.x === \"undefined\") {\n        return false;\n    }\n    return true;\n}\nclass TerisRule {\n    static canIMove(shape, targetPoint, exists) {\n        const targetSquarePoints = shape.map(it => {\n            return {\n                x: it.x + targetPoint.x,\n                y: it.y + targetPoint.y\n            };\n        });\n        const res = targetSquarePoints.some(p => {\n            if (p.x < 0 || p.x > _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_1__[\"default\"].panelSize.width - 1 || p.y < 0 || p.y > _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_1__[\"default\"].panelSize.height - 1) {\n                return true;\n            }\n            return false;\n        });\n        if (res) {\n            return false;\n        }\n        let result = targetSquarePoints.some(sq => exists && exists.some(it => it.point.x === sq.x && it.point.y === sq.y));\n        if (result) {\n            return false;\n        }\n        return true;\n    }\n    static move(teris, targetPointOrDirection, exists) {\n        if (isPoint(targetPointOrDirection)) {\n            if (this.canIMove(teris.shape, targetPointOrDirection, exists)) {\n                teris.centerPoint = targetPointOrDirection;\n                return true;\n            }\n            return false;\n        }\n        else {\n            const direction = targetPointOrDirection;\n            let targetPoint;\n            if (direction === _types__WEBPACK_IMPORTED_MODULE_0__[\"MoveDirection\"].down) {\n                targetPoint = {\n                    x: teris.centerPoint.x,\n                    y: teris.centerPoint.y + 1\n                };\n            }\n            else if (direction === _types__WEBPACK_IMPORTED_MODULE_0__[\"MoveDirection\"].left) {\n                targetPoint = {\n                    x: teris.centerPoint.x - 1,\n                    y: teris.centerPoint.y\n                };\n            }\n            else {\n                targetPoint = {\n                    x: teris.centerPoint.x + 1,\n                    y: teris.centerPoint.y\n                };\n            }\n            return this.move(teris, targetPoint, exists);\n        }\n    }\n    static moveDirectly(teris, direction, exists) {\n        while (this.move(teris, direction, exists)) { }\n    }\n    static rotate(teris, exists) {\n        const newShape = teris.afterRotateShape();\n        if (this.canIMove(newShape, teris.centerPoint, exists)) {\n            teris.rotate();\n            return true;\n        }\n        else {\n            return false;\n        }\n    }\n    static getLineSquares(exists, y) {\n        return exists.filter(sq => sq.point.y === y);\n    }\n    static deleteSquares(exists) {\n        const ys = exists.map(sq => sq.point.y);\n        const maxY = Math.max(...ys);\n        const minY = Math.min(...ys);\n        let num = 0;\n        for (let i = minY; i <= maxY; i++) {\n            if (this.deleteLine(exists, i)) {\n                num++;\n            }\n            ;\n        }\n        return num;\n    }\n    static deleteLine(exists, line) {\n        const squares = this.getLineSquares(exists, line);\n        if (squares.length === _viewer_GameConfig__WEBPACK_IMPORTED_MODULE_1__[\"default\"].panelSize.width) {\n            squares.forEach(sq => {\n                if (sq.viewer) {\n                    sq.viewer.remove();\n                }\n                const index = exists.indexOf(sq);\n                exists.splice(index, 1);\n            });\n            exists.filter(sq => sq.point.y < line).forEach(sq => {\n                sq.point = {\n                    x: sq.point.x,\n                    y: sq.point.y + 1\n                };\n            });\n            return true;\n        }\n        return false;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/TerisRule.ts?");

/***/ }),

/***/ "./src/core/types.ts":
/*!***************************!*\
  !*** ./src/core/types.ts ***!
  \***************************/
/*! exports provided: MoveDirection, GameStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MoveDirection\", function() { return MoveDirection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStatus\", function() { return GameStatus; });\nvar MoveDirection;\n(function (MoveDirection) {\n    MoveDirection[MoveDirection[\"left\"] = 0] = \"left\";\n    MoveDirection[MoveDirection[\"right\"] = 1] = \"right\";\n    MoveDirection[MoveDirection[\"down\"] = 2] = \"down\";\n})(MoveDirection || (MoveDirection = {}));\nvar GameStatus;\n(function (GameStatus) {\n    GameStatus[GameStatus[\"init\"] = 0] = \"init\";\n    GameStatus[GameStatus[\"playing\"] = 1] = \"playing\";\n    GameStatus[GameStatus[\"pause\"] = 2] = \"pause\";\n    GameStatus[GameStatus[\"over\"] = 3] = \"over\";\n})(GameStatus || (GameStatus = {}));\n\n\n//# sourceURL=webpack:///./src/core/types.ts?");

/***/ }),

/***/ "./src/core/viewer/GameConfig.ts":
/*!***************************************!*\
  !*** ./src/core/viewer/GameConfig.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    panelSize: {\n        width: 12,\n        height: 20\n    },\n    nextSize: {\n        width: 6,\n        height: 6\n    },\n    level: [{\n            score: 0, duration: 1500\n        }, {\n            score: 100, duration: 1000\n        }, {\n            score: 500, duration: 500\n        }]\n});\n\n\n//# sourceURL=webpack:///./src/core/viewer/GameConfig.ts?");

/***/ }),

/***/ "./src/core/viewer/GamePageViewer.ts":
/*!*******************************************!*\
  !*** ./src/core/viewer/GamePageViewer.ts ***!
  \*******************************************/
/*! exports provided: GamePageViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GamePageViewer\", function() { return GamePageViewer; });\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ \"./src/core/types.ts\");\n/* harmony import */ var _SquarePageViewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SquarePageViewer */ \"./src/core/viewer/SquarePageViewer.ts\");\n/* harmony import */ var _GameConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameConfig */ \"./src/core/viewer/GameConfig.ts\");\n/* harmony import */ var _PageConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PageConfig */ \"./src/core/viewer/PageConfig.ts\");\n\n\n\n\nclass GamePageViewer {\n    constructor() {\n        this.nextDom = $(\"#next\");\n        this.panelDom = $(\"#panel\");\n        this.scoreDom = $(\"#score\");\n        this.msgDom = $(\"#msg\");\n    }\n    showNext(teris) {\n        teris.suqares.forEach(sq => {\n            sq.viewer = new _SquarePageViewer__WEBPACK_IMPORTED_MODULE_1__[\"SquarePageViewer\"](sq, this.nextDom);\n        });\n    }\n    swtich(teris) {\n        teris.suqares.forEach(sq => {\n            sq.viewer.remove();\n            sq.viewer = new _SquarePageViewer__WEBPACK_IMPORTED_MODULE_1__[\"SquarePageViewer\"](sq, this.panelDom);\n        });\n    }\n    init(game) {\n        this.panelDom.css({\n            width: _GameConfig__WEBPACK_IMPORTED_MODULE_2__[\"default\"].panelSize.width * _PageConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].SquareSize.width,\n            height: _GameConfig__WEBPACK_IMPORTED_MODULE_2__[\"default\"].panelSize.height * _PageConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].SquareSize.height\n        });\n        this.nextDom.css({\n            width: _GameConfig__WEBPACK_IMPORTED_MODULE_2__[\"default\"].nextSize.width * _PageConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].SquareSize.width,\n            height: _GameConfig__WEBPACK_IMPORTED_MODULE_2__[\"default\"].nextSize.height * _PageConfig__WEBPACK_IMPORTED_MODULE_3__[\"default\"].SquareSize.height\n        });\n        $(document).keydown((e) => {\n            let eCode = e.keyCode;\n            if (eCode === 37) {\n                game.control_left();\n            }\n            else if (eCode === 38) {\n                game.control_rotate();\n            }\n            else if (eCode === 39) {\n                game.control_right();\n            }\n            else if (eCode === 40) {\n                game.control_down();\n            }\n            else if (eCode === 32) {\n                if (game.GameStatus === _types__WEBPACK_IMPORTED_MODULE_0__[\"GameStatus\"].playing) {\n                    game.pause();\n                }\n                else {\n                    game.start();\n                }\n            }\n        });\n    }\n    showScore(score) {\n        this.scoreDom.html(score.toString());\n    }\n    onGamePause() {\n        this.msgDom.css({\n            display: 'block'\n        }).html(\"Pause\");\n    }\n    onGameStart() {\n        this.msgDom.css({\n            display: 'none'\n        });\n    }\n    onGameOver() {\n        this.msgDom.css({\n            display: 'block'\n        }).html(\"Over\");\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/viewer/GamePageViewer.ts?");

/***/ }),

/***/ "./src/core/viewer/PageConfig.ts":
/*!***************************************!*\
  !*** ./src/core/viewer/PageConfig.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    SquareSize: {\n        width: 30,\n        height: 30\n    }\n});\n\n\n//# sourceURL=webpack:///./src/core/viewer/PageConfig.ts?");

/***/ }),

/***/ "./src/core/viewer/SquarePageViewer.ts":
/*!*********************************************!*\
  !*** ./src/core/viewer/SquarePageViewer.ts ***!
  \*********************************************/
/*! exports provided: SquarePageViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SquarePageViewer\", function() { return SquarePageViewer; });\n/* harmony import */ var _PageConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageConfig */ \"./src/core/viewer/PageConfig.ts\");\n\nclass SquarePageViewer {\n    constructor(square, container) {\n        this.square = square;\n        this.container = container;\n        this.isRemove = false;\n    }\n    show() {\n        if (this.isRemove) {\n            return;\n        }\n        if (!this.dom) {\n            this.dom = $(\"<div>\").css({\n                position: \"absolute\",\n                width: _PageConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SquareSize.width,\n                height: _PageConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SquareSize.height,\n                border: \"solid 1px #ccc\",\n                boxSizing: \"border-box\"\n            }).appendTo(this.container);\n        }\n        this.dom.css({\n            left: this.square.point.x * _PageConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SquareSize.width,\n            top: this.square.point.y * _PageConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].SquareSize.height,\n            background: this.square.color\n        });\n    }\n    remove() {\n        if (this.dom && !this.isRemove) {\n            this.dom.remove();\n            this.isRemove = true;\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/core/viewer/SquarePageViewer.ts?");

/***/ }),

/***/ "./src/core/viewer/util.ts":
/*!*********************************!*\
  !*** ./src/core/viewer/util.ts ***!
  \*********************************/
/*! exports provided: getRandom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandom\", function() { return getRandom; });\nfunction getRandom(min, max) {\n    const dec = max - min;\n    return Math.floor(Math.random() * dec + min);\n}\n\n\n//# sourceURL=webpack:///./src/core/viewer/util.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Game */ \"./src/core/Game.ts\");\n/* harmony import */ var _core_viewer_GamePageViewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/viewer/GamePageViewer */ \"./src/core/viewer/GamePageViewer.ts\");\n\n\nnew _core_Game__WEBPACK_IMPORTED_MODULE_0__[\"Game\"](new _core_viewer_GamePageViewer__WEBPACK_IMPORTED_MODULE_1__[\"GamePageViewer\"]());\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });