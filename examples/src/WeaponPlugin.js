(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WeaponPlugin", [], factory);
	else if(typeof exports === 'object')
		exports["WeaponPlugin"] = factory();
	else
		root["WeaponPlugin"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Weapon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * @author       Patrick Sletvold
 * @author       jdotr <https://github.com/jdotrjs>
 * @author       Richard Davey
 * @license      {@link https://github.com/16patsle/phaser3-weapon-plugin/blob/master/LICENSE|MIT License}
 */



/**
 * The Weapon Plugin provides the ability to easily create a bullet pool
 * and manager.
 *
 * Weapons fire {@link Bullet} objects, which are essentially Sprites with a
 * few extra properties. The Bullets are enabled for Arcade Physics. They do
 * not currently work with Impact or Matter Physics.
 *
 * The Bullets are created inside of {@link #bullets weapon.bullets}, which is
 * a {@link Phaser.GameObjects.Group} instance. Anything you can usually do
 * with a Group, like iterate it, etc can be done to the bullets Group too.
 *
 * Bullets can have textures and even animations. You can control the speed at
 * which they are fired, the firing rate, the firing angle, and even set things
 * like gravity for them.
 *
 * A small example, using add.weapon, assumed to be running from within a
 * {@link Phaser.Scene#create} method:
 *
 * ```javascript
 * var weapon = this.add.weapon(10, 'bullet');
 * weapon.fireFrom.setPosition(300, 300);
 * this.input.on('pointerdown', weapon.fire, this);
 * ```
 */

var WeaponPlugin =
/*#__PURE__*/
function (_Phaser$Plugins$Scene) {
  _inherits(WeaponPlugin, _Phaser$Plugins$Scene);

  /**
   * @param {Phaser.Scene} scene - A reference to the Phaser.Scene instance.
   * @param {Phaser.Plugins.PluginManager} pluginManager - A reference to the
   *  Phaser.Plugins.PluginManager instance.
   */
  function WeaponPlugin(scene, pluginManager) {
    var _this;

    _classCallCheck(this, WeaponPlugin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WeaponPlugin).call(this, scene, pluginManager));
    _this.weapons = []; // Register our new Game Object type

    pluginManager.registerGameObject('weapon', _this.add.bind(_assertThisInitialized(_this)), function (config) {
      return _this.add(config.bulletLimit, config.key, config.frame, config.group, config.weaponClass);
    });
    return _this;
  }

  _createClass(WeaponPlugin, [{
    key: "add",
    value: function add(bulletLimit, key, frame, group, weaponClass) {
      if (!weaponClass) {
        weaponClass = _Weapon__WEBPACK_IMPORTED_MODULE_0__["default"];
      }

      var weapon = new weaponClass(this.scene, bulletLimit, key, frame, group);
      this.weapons.push(weapon);
      return weapon;
    }
    /**
     * Called by the PluginManager when this plugin is started.
     * If a plugin is stopped, and then started again, this will get called again.
     * Typically called immediately after `BasePlugin.init`.
     *
     * @returns {void}
     */

  }, {
    key: "start",
    value: function start() {
      this.systems.events.on('postrender', this.postRender, this);
    }
    /**
     * If this is a Scene Plugin (i.e. installed into a Scene) then this method is called when the Scene boots.
     * By this point the plugin properties `scene` and `systems` will have already been set.
     * In here you can listen for Scene events and set-up whatever you need for this plugin to run.
     * @returns {void}
     */

  }, {
    key: "boot",
    value: function boot() {
      var eventEmitter = this.systems.events;
      eventEmitter.on('update', this.update, this);
      eventEmitter.on('destroy', this.destroy, this);
    }
    /**
     * Internal update method, called by the PluginManager.
     *
     * @protected
     * @returns {void}
     */

  }, {
    key: "update",
    value: function update() {
      this.weapons.forEach(function (weapon) {
        weapon.update();
      });
    }
    /**
     * Internal update method, called by the PluginManager.
     *
     * @protected
     * @returns {void}
     */

  }, {
    key: "postRender",
    value: function postRender() {
      this.weapons.forEach(function (weapon) {
        weapon.postRender();
      });
    }
    /**
     * Destroys this Weapon.
     * You must release everything in here, all references, all objects, free it all up.
     * @returns {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.pluginManager = null;
      this.game = null;
      this.scene = null;
      this.systems = null;
    }
  }]);

  return WeaponPlugin;
}(Phaser.Plugins.ScenePlugin); // Set up shortcuts to the classes and constants


WeaponPlugin.Weapon = _Weapon__WEBPACK_IMPORTED_MODULE_0__["default"];
WeaponPlugin.Bullet = _Bullet__WEBPACK_IMPORTED_MODULE_1__["default"];
WeaponPlugin.consts = _consts__WEBPACK_IMPORTED_MODULE_2__["default"];
/* harmony default export */ __webpack_exports__["default"] = (WeaponPlugin);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Bullet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _validateConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/**
 * The Weapon provides the ability to easily create a bullet pool and manager.
 *
 * Weapons fire {@link Bullet} objects, which are essentially Sprites with a
 * few extra properties. The Bullets are enabled for Arcade Physics. They do
 * not currently work with Impact or Matter Physics.
 *
 * The Bullets are created inside of {@link #bullets weapon.bullets}, which is
 * a {@link Phaser.GameObjects.Group} instance. Anything you can usually do
 * with a Group, like iterate it, etc can be done to the bullets Group too.
 *
 * Bullets can have textures and even animations. You can control the speed at
 * which they are fired, the firing rate, the firing angle, and even set things
 * like gravity for them.
 *
 * A small example, using add.weapon, assumed to be running from within a
 * {@link Phaser.Scene#create} method:
 *
 * ```javascript
 * var weapon = this.add.weapon(10, 'bullet');
 * weapon.fireFrom.setPosition(300, 300);
 * this.input.on('pointerdown', weapon.fire, this);
 * ```
 */

var Weapon =
/*#__PURE__*/
function () {
  /**
   * TODO: a builder style interface would be neat. Can be kicked way forward
   * into polishing.
   * @param {Phaser.Scene} scene - A reference to the Phaser.Scene instance.
   * @param {number} bulletLimit - The number of bullets to create.
   * @param {String} key - The texture key for the bullet.
   * @param {String} frame - The frame name for the bullet.
   * @param {Phaser.GameObjects.Group} group - A group to add the bullets to.
   */
  function Weapon(scene, bulletLimit, key, frame, group) {
    _classCallCheck(this, Weapon);

    this.scene = scene;
    this.debugPhysics = null;
    /**
     * Private var that holds the public `bullets` property.
     * @type {Phaser.GameObjects.Group}
     * @private
     */

    this._bullets = null;
    /**
     * Private var that holds the public `autoExpandBulletsGroup` property.
     * @type {boolean}
     * @private
     */

    this._autoExpandBulletsGroup = false;
    /**
     * Private var that holds the public `autofire` property.
     * @type {boolean}
     * @private
     */

    this._autofire = false;
    /**
     * Private var that holds the public `shots` property.
     * @type {number}
     * @private
     */

    this._shots = 0;
    /**
     * Private var that holds the public `fireLimit` property.
     * @type {number}
     * @private
     */

    this._fireLimit = 0;
    /**
     * Private var that holds the public `fireRate` property.
     * @type {number}
     * @private
     */

    this._fireRate = 100;
    /**
     * Private var that holds the public `fireRateVariance` property.
     * @type {number}
     * @private
     */

    this._fireRateVariance = 0;
    /**
     * Private var that holds the public `fireFrom` property.
     * @type {Phaser.Geom.Rectangle}
     * @private
     */

    this._fireFrom = new Phaser.Geom.Rectangle(0, 0, 1, 1);
    /**
     * Private var that holds the public `fireAngle` property.
     * @type {integer}
     * @private
     */

    this._fireAngle = _consts__WEBPACK_IMPORTED_MODULE_1__["default"].ANGLE_UP;
    /**
     * Private var that holds the public `bulletInheritSpriteSpeed` property.
     * @type {boolean}
     * @private
     */

    this._bulletInheritSpriteSpeed = false;
    /**
     * Private var that holds the public `bulletAnimation` property.
     * @type {string}
     * @private
     */

    this._bulletAnimation = '';
    /**
     * Private var that holds the public `bulletFrameRandom` property.
     * @type {boolean}
     * @private
     */

    this._bulletFrameRandom = false;
    /**
     * Private var that holds the public `bulletFrameCycle` property.
     * @type {boolean}
     * @private
     */

    this._bulletFrameCycle = false;
    /**
     * Private var that holds the public `bulletWorldWrap` property.
     * @type {boolean}
     * @private
     */

    this._bulletWorldWrap = false;
    /**
     * Private var that holds the public `bulletWorldWrapPadding` property.
     * @type {integer}
     * @private
     */

    this._bulletWorldWrapPadding = 0;
    /**
     * Private var that holds the public `bulletAngleOffset` property.
     * @type {number}
     * @private
     */

    this._bulletAngleOffset = 0;
    /**
     * Private var that holds the public `bulletAngleVariance` property.
     * @type {number}
     * @private
     */

    this._bulletAngleVariance = 0;
    /**
     * Private var that holds the public `bulletSpeed` property.
     * @type {number}
     * @private
     */

    this._bulletSpeed = 200;
    /**
     * Private var that holds the public `bulletSpeedVariance` property.
     * @type {number}
     * @private
     */

    this._bulletSpeedVariance = 0;
    /**
     * Private var that holds the public `bulletLifespan` property.
     * @type {number}
     * @private
     */

    this._bulletLifespan = 0;
    /**
     * Private var that holds the public `bulletKillDistance` property.
     * @type {number}
     * @private
     */

    this._bulletKillDistance = 0;
    /**
     * Private var that holds the public `bulletGravity` property.
     * @type {Phaser.Math.Vector2}
     * @private
     */

    this._bulletGravity = new Phaser.Math.Vector2(0, 0);
    /**
     * Private var that holds the public `bulletRotateToVelocity` property.
     * @type {boolean}
     * @private
     */

    this._bulletRotateToVelocity = false;
    /**
     * Private var that holds the public `bulletKey` property.
     * @type {string}
     * @private
     */

    this._bulletKey = key || '';
    /**
     * Private var that holds the public `bulletFrame` property.
     * @type {string|integer}
     * @private
     */

    this._bulletFrame = frame || '';
    /**
     * Private var that holds the public `bulletClass` property.
     * @type {function}
     * @private
     */

    this._bulletClass = _Bullet__WEBPACK_IMPORTED_MODULE_0__["default"];
    /**
     * Private var that holds the public `bulletCollideWorldBounds` property.
     * @type {boolean}
     * @private
     */

    this._bulletCollideWorldBounds = false;
    /**
     * Private var that holds the public `bulletKillType` property.
     * @type {integer}
     * @private
     */

    this._bulletKillType = _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_WORLD_BOUNDS;
    /**
     * Holds internal data about custom bullet body sizes.
     *
     * @type {Object}
     * @private
     */

    this._data = {
      customBody: false,
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0
    };
    /**
     * Private var that holds the public `bounds` property.
     * @type {Phaser.Geom.Rectangle}
     * @private
     */

    this._bounds = new Phaser.Geom.Rectangle();
    /**
     * Private var that holds the public `bulletBounds` property.
     * @type {Phaser.Geom.Rectangle}
     * @private
     */

    this._bulletBounds = this.scene.physics.world.bounds;
    /**
     * This array stores the frames added via @link #setBulletFrames.
     *
     * @type {Array}
     * @protected
     */

    this._bulletFrames = [];
    /**
     * Private var that holds the public `bulletFrameIndex` property.
     * @type {number}
     * @private
     */

    this._bulletFrameIndex = 0;
    /**
     * An internal object that stores the animation data added via {@link #addBulletAnimation}.
     * @type {Object}
     * @private
     */

    this.anims = {};
    /**
     * Private var that holds the public `trackedSprite` property.
     * @type {Phaser.GameObjects.Sprite|Object}
     * @private
     */

    this._trackedSprite = null;
    /**
     * Private var that holds the public `trackedPointer` property.
     * @type {Phaser.Input.Pointer}
     * @private
     */

    this._trackedPointer = null;
    /**
     * Private var that holds the public `multiFire` property.
     * @type {boolean}
     * @private
     */

    this._multiFire = false;
    /**
     * Internal multiFire test flag.
     *
     * @type {boolean}
     * @private
     */

    this._hasFired = false;
    /**
     * Private var that holds the public `trackRotation` property.
     * @type {boolean}
     * @private
     */

    this._trackRotation = false;
    /**
     * Private var that holds the public `trackOffset` property.
     * @type {Phaser.Math.Vector2}
     * @private
     */

    this._trackOffset = new Phaser.Math.Vector2();
    /**
     * Internal firing rate time tracking variable.
     *
     * @type {number}
     * @private
     */

    this._nextFire = 0;
    /**
     * Internal firing rate time tracking variable used by multiFire.
     *
     * @type {number}
     * @private
     */

    this._tempNextFire = 0;
    /**
     * Internal firing rotation tracking point.
     *
     * @type {Phaser.Math.Vector2}
     * @private
     */

    this._rotatedPoint = new Phaser.Math.Vector2();
    /**
     * Log level for this weapon. Either `warn`, `error' or `off`. `warn` is the default.
     * If you change this, please do so before setting any other properties.
     *
     * @type {string}
     */

    this.logLevel = 'warn';
    this.eventEmitter = new Phaser.Events.EventEmitter();
    Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this);
    this.createBullets(bulletLimit, key, frame, group);
  }
  /**
   * This is the Phaser.Group that contains all of the bullets managed by this plugin.
   * @type {Phaser.GameObjects.Group}
   */


  _createClass(Weapon, [{
    key: "createBullets",

    /**
     * This method performs two actions: First it will check to see if the
     * {@link #bullets} Group exists or not, and if not it creates it, adding its
     * children to the `group` given as the 4th argument.
     *
     * Then it will seed the bullet pool with the `quantity` number of Bullets,
     * using the texture key and frame provided (if any).
     *
     * If for example you set the quantity to be 10, then this Weapon will only
     * ever be able to have 10 bullets in-flight simultaneously. If you try to
     * fire an 11th bullet then nothing will happen until one, or more, of the
     * in-flight bullets have been killed, freeing them up for use by the Weapon
     * again.
     *
     * If you do not wish to have a limit set, then pass in -1 as the quantity.
     * In this instance the Weapon will keep increasing the size of the bullet
     * pool as needed. It will never reduce the size of the pool however, so be
     * careful it doesn't grow too large.
     *
     * You can either set the texture key and frame here, or via the
     * {@link #bulletKey} and {@link #bulletFrame} properties. You can also
     * animate bullets, or set them to use random frames. All Bullets belonging
     * to a single Weapon instance must share the same texture key however.
     *
     * @param {integer} [quantity=1] - The quantity of bullets to seed the Weapon
     *  with. If -1 it will set the pool to automatically expand.
     * @param {string} [key] - The Game.cache key of the image that this Sprite
     *  will use.
     * @param {integer|string} [frame] - If the Sprite image contains multiple
     *  frames you can specify which one to use here.
     * @param {Phaser.GameObjects.Group} [group] - Optional Group to add the
     *  object to. If not specified it will be added to the World group.
     * @return {Weapon} This Weapon instance.
     */
    value: function createBullets() {
      var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var key = arguments.length > 1 ? arguments[1] : undefined;
      var frame = arguments.length > 2 ? arguments[2] : undefined;
      var group = arguments.length > 3 ? arguments[3] : undefined;
      var bulletClass = arguments.length > 4 ? arguments[4] : undefined;

      if (bulletClass) {
        this._bulletClass = bulletClass;
      }

      if (this.bullets && !this.bullets.scene) {
        this.bullets = null;
      }

      if (!this.bullets) {
        this.bullets = this.scene.add.group({
          classType: this._bulletClass,
          maxSize: quantity,
          runChildUpdate: true
        });
      }

      if (quantity !== 0) {
        if (quantity === -1) {
          this.autoExpandBulletsGroup = true;
          quantity = 1;
        }

        this.bullets.createMultiple({
          key: key,
          frame: frame,
          repeat: quantity,
          active: false,
          visible: false
        });
        this.bullets.children.each(function (child) {
          child.setData('bulletManager', this);
        }, this);
        this.bulletKey = key;
        this.bulletFrame = frame;

        if (group) {
          group.addMultiple(this.bullets.children.entries);
        }
      }

      return this;
    }
    /**
     * Call a function on each in-flight bullet in this Weapon.
     *
     * See {@link Phaser.GameObjects.Group#forEachExists forEachExists} for more details.
     *
     * @param {function} callback - The function that will be called for each applicable child.
     * The child will be passed as the first argument.
     * @param {object} callbackContext - The context in which the function should be called (usually 'this').
     * @param {...any} [args=(none)] - Additional arguments to pass to the callback function, after the child item.
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "forEach",
    value: function forEach(callback, callbackContext) {
      var extraArgs = arguments;
      this.bullets.children.each(function (child) {
        if (child.active) {
          callback.call(callbackContext, child, extraArgs);
        }
      });
      return this;
    }
    /**
     * Sets {@link Phaser.Physics.Arcade.Body#enable} to `false` on each bullet in this Weapon.
     * This has the effect of stopping them in-flight should they be moving.
     * It also stops them being able to be checked for collision.
     *
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "pauseAll",
    value: function pauseAll() {
      this.bullets.children.each(function (child) {
        child.body.enable = false;

        if (child.getData('timeEvent') !== null) {
          child.getData('timeEvent').paused = true;
        }
      }, this);
      return this;
    }
    /**
     * Sets {@link Phaser.Physics.Arcade.Body#enable} to `true` on each bullet in this Weapon.
     * This has the effect of resuming their motion should they be in-flight.
     * It also enables them for collision checks again.
     *
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "resumeAll",
    value: function resumeAll() {
      this.bullets.children.each(function (child) {
        child.body.enable = true;

        if (child.getData('timeEvent') !== null) {
          child.getData('timeEvent').paused = false;
        }
      }, this);
      return this;
    }
    /**
     * Calls {@link Phaser.Bullet#kill} on every in-flight bullet in this Weapon.
     * Also re-enables their physics bodies, should they have been disabled via {@link #pauseAll}.
     *
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "killAll",
    value: function killAll() {
      this.bullets.children.each(function (child) {
        if (child.active) {
          child.kill();
        }

        child.body.enable = true;
      });
      return this;
    }
    /**
     * Resets the {@link #shots} counter back to zero. This is used when you've set
     * {@link #fireLimit} and have hit (or just wish to reset) your limit.
     *
     * @param {integer} [newLimit] - Optionally set a new {@link #fireLimit}.
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "resetShots",
    value: function resetShots(newLimit) {
      this.shots = 0;

      if (newLimit !== undefined) {
        this.fireLimit = newLimit;
      }

      return this;
    }
    /**
     * Sets this Weapon to track the given Sprite, or any Object with a public {@link Phaser.Component.Core#world world}
     * Point object. When a Weapon tracks a Sprite it will automatically update its {@link #fireFrom} value to match the
     * Sprite's position within the Game World, adjusting the coordinates based on the offset arguments.
     *
     * This allows you to lock a Weapon to a Sprite, so that bullets are always launched from its location.
     *
     * Calling `trackSprite` will reset {@link #trackedPointer} to null, should it have been set, as you can
     * only track _either_ a Sprite, or a Pointer, at once, but not both.
     *
     * @param {Phaser.GameObjects.Sprite|Object} sprite - The Sprite to track the position of.
     * @param {integer} [offsetX=0] - The horizontal offset from the Sprites position to be applied to the Weapon.
     * @param {integer} [offsetY=0] - The vertical offset from the Sprites position to be applied to the Weapon.
     * @param {boolean} [trackRotation=false] - Should the Weapon also track the Sprites rotation?
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "trackSprite",
    value: function trackSprite(sprite) {
      var offsetX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var offsetY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var trackRotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.trackedPointer = null;
      this.trackedSprite = sprite;
      this.trackRotation = trackRotation;
      this.trackOffset.set(offsetX, offsetY);
      return this;
    }
    /**
     * Sets this Weapon to track the given Pointer.
     * When a Weapon tracks a Pointer it will automatically update its {@link #fireFrom} value to match the Pointer's
     * position within the Game World, adjusting the coordinates based on the offset arguments.
     *
     * This allows you to lock a Weapon to a Pointer, so that bullets are always launched from its location.
     *
     * Calling `trackPointer` will reset {@link #trackedSprite} to null, should it have been set, as you can
     * only track _either_ a Pointer, or a Sprite, at once, but not both.
     *
     * @param {Phaser.Input.Pointer} [pointer] - The Pointer to track the position of.
     * Defaults to `Input.activePointer` if not specified.
     * @param {integer} [offsetX=0] - The horizontal offset from the Pointers position to be applied to the Weapon.
     * @param {integer} [offsetY=0] - The vertical offset from the Pointers position to be applied to the Weapon.
     * @return {Weapon} This Weapon instance.
     */

  }, {
    key: "trackPointer",
    value: function trackPointer(pointer) {
      var offsetX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var offsetY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (pointer === undefined && this.scene.input) {
        pointer = this.scene.input.activePointer;
      }

      this.trackedPointer = pointer;
      this.trackedSprite = null;
      this.trackRotation = false;
      this.trackOffset.set(offsetX, offsetY);
      return this;
    }
    /**
     * Attempts to fire multiple bullets from the positions defined in the given array.
     *
     * If you provide a `from` argument, or if there is a tracked Sprite or Pointer, then
     * the positions are treated as __offsets__ from the given objects position.
     *
     * If `from` is undefined, and there is no tracked object, then the bullets are fired
     * from the given positions, as they exist in the world.
     *
     * Calling this method sets {@link #multiFire} to `true`.
     *
     * If there are not enough bullets available in the pool, and the pool cannot be extended,
     * then this method may not fire from all of the given positions.
     *
     * When the bullets are launched they have their texture and frame updated, as required.
     * The velocity of the bullets are calculated based on Weapon properties like {@link #bulletSpeed}.
     *
     * @param {array} positions - An array of positions. Each position can be any Object,
     * as long as it has public `x` and `y` properties, such as Phaser.Point, { x: 0, y: 0 }, Phaser.Sprite, etc.
     * @param {Phaser.GameObject.Sprite|Phaser.Math.Vector2|Object|string} [from]
     * Optionally fires the bullets **from** the `x` and `y` properties of this object,
     * _instead_ of any {@link #trackedSprite} or `trackedPointer` that is set.
     * @return {array} An array containing all of the fired Phaser.Bullet objects,
     * if a launch was successful, otherwise an empty array.
     */

  }, {
    key: "fireMany",
    value: function fireMany(positions, from) {
      var _this = this;

      this.multiFire = true;
      var bullets = [];

      if (from || this.trackedSprite || this.trackedPointer) {
        positions.forEach(function (offset) {
          bullets.push(_this.fire(from, null, null, offset.x, offset.y));
        });
      } else {
        positions.forEach(function (position) {
          bullets.push(_this.fire(position));
        });
      }

      return bullets;
    }
    /**
     * Attempts to fire a single Bullet from a tracked Sprite or Pointer, but applies an offset
     * to the position first. This is the same as calling {@link #fire} and passing in the offset arguments.
     *
     * If there are no more bullets available in the pool, and the pool cannot be extended,
     * then this method returns `null`. It will also return `null` if not enough time has expired since the last time
     * the Weapon was fired, as defined in the {@link #fireRate} property.
     *
     * Otherwise the first available bullet is selected, launched, and returned.
     *
     * When the bullet is launched it has its texture and frame updated, as required. The velocity of the bullet is
     * calculated based on Weapon properties like {@link #bulletSpeed}.
     *
     * If you wish to fire multiple bullets in a single game update, then set {@link #multiFire} to `true`
     * and you can call this method as many times as you like, per loop. See also {@link #fireMany}.
     *
     * @param {number} [offsetX=0] - The horizontal offset from the position of the tracked Sprite or Pointer,
     * as set with {@link #trackSprite}.
     * @param {number} [offsetY=0] - The vertical offset from the position of the tracked Sprite or Pointer,
     * as set with {@link #trackSprite}.
     * @return {Bullet} The fired bullet, if a launch was successful, otherwise `null`.
     */

  }, {
    key: "fireOffset",
    value: function fireOffset() {
      var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this.fire(null, null, null, offsetX, offsetY);
    }
    /**
     * Fires a bullet **at** the given Pointer. The bullet will be launched from the {@link #fireFrom} position,
     * or from a Tracked Sprite or Pointer, if you have one set.
     *
     * @param {Phaser.Input.Pointer} [pointer] - The Pointer to fire the bullet towards.
     * @return {Bullet} The fired bullet if successful, null otherwise.
     */

  }, {
    key: "fireAtPointer",
    value: function fireAtPointer(pointer) {
      if (pointer === undefined && this.scene.input) {
        pointer = this.scene.input.activePointer;
      }

      return this.fire(null, pointer.x, pointer.y);
    }
    /**
     * Fires a bullet **at** the given Sprite. The bullet will be launched from the {@link #fireFrom} position,
     * or from a Tracked Sprite or Pointer, if you have one set.
     *
     * @param {Phaser.GameObjects.Sprite} [sprite] - The Sprite to fire the bullet towards.
     * @return {Bullet} The fired bullet if successful, null otherwise.
     */

  }, {
    key: "fireAtSprite",
    value: function fireAtSprite(sprite) {
      return this.fire(null, sprite.x, sprite.y);
    }
    /**
     * Fires a bullet **at** the given coordinates. The bullet will be launched from the {@link #fireFrom} position,
     * or from a Tracked Sprite or Pointer, if you have one set.
     *
     * @param {number} [x] - The x coordinate, in world space, to fire the bullet towards.
     * @param {number} [y] - The y coordinate, in world space, to fire the bullet towards.
     * @return {Bullet} The fired bullet if successful, null otherwise.
     */

  }, {
    key: "fireAtXY",
    value: function fireAtXY(x, y) {
      return this.fire(null, x, y);
    }
    /**
     * Attempts to fire a single Bullet. If there are no more bullets available in the pool,
     * and the pool cannot be extended, then this method returns `null`. It will also return `null`
     * if not enough time has expired since the last time the Weapon was fired,
     * as defined in the {@link #fireRate} property.
     *
     * Otherwise the first available bullet is selected, launched, and returned.
     *
     * The arguments are all optional, but allow you to control both where the bullet is launched from, and aimed at.
     *
     * If you don't provide any of the arguments then it uses those set via properties such as {@link #trackedSprite},
     * {@link #bulletAngle} and so on.
     *
     * When the bullet is launched it has its texture and frame updated, as required. The velocity of the bullet is
     * calculated based on Weapon properties like `bulletSpeed`.
     *
     * If you wish to fire multiple bullets in a single game update, then set `Weapon.multiFire = true`
     * and you can call `fire` as many times as you like, per loop. Multiple fires in a single update
     * only counts once towards the `shots` total, but you will still receive a Signal for each bullet.
     *
     * @param {Phaser.GameObjects.Sprite|Phaser.Math.Vector2|Object|string} [from]
     * Optionally fires the bullet **from** the `x` and `y` properties of this object.
     * If set this overrides {@link #trackedSprite} or `trackedPointer`. Pass `null` to ignore it.
     * @param {number} [x] - The x coordinate, in world space, to fire the bullet **towards**.
     * If left as `undefined`, or `null`, the bullet direction is based on its angle.
     * @param {number} [y] - The y coordinate, in world space, to fire the bullet **towards**.
     * If left as `undefined`, or `null`, the bullet direction is based on its angle.
     * @param {number} [offsetX=0] - If the bullet is fired from a tracked Sprite or Pointer,
     * or the `from` argument is set, this applies a horizontal offset from the launch position.
     * @param {number} [offsetY=0] - If the bullet is fired from a tracked Sprite or Pointer,
     * or the `from` argument is set, this applies a vertical offset from the launch position.
     * @return {Bullet} The fired bullet, if a launch was successful, otherwise `null`.
     */

  }, {
    key: "fire",
    value: function fire(from) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var offsetX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var offsetY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

      if (this.scene.time.now < this._nextFire || this.fireLimit > 0 && this.shots === this.fireLimit) {
        return null;
      }

      var speed = this.bulletSpeed; //  Apply +- speed variance

      if (this.bulletSpeedVariance !== 0) {
        speed += Phaser.Math.Between(-this.bulletSpeedVariance, this.bulletSpeedVariance);
      } // Position the fireFrom rectangle


      if (from) {
        // Fire based on passed coordinates
        this.updateFireFrom(from.x, from.y);
      } else if (this.trackedSprite) {
        // Fire based on tracked sprite
        if (this.trackRotation) {
          this._rotatedPoint.set(this.trackedSprite.x + this.trackOffset.x, this.trackedSprite.y + this.trackOffset.y);

          Phaser.Math.RotateAround(this._rotatedPoint, this.trackedSprite.x, this.trackedSprite.y, this.trackedSprite.rotation);
          this.updateFireFrom(this._rotatedPoint.x, this._rotatedPoint.y);
        } else {
          this.updateFireFrom(this.trackedSprite.x, this.trackedSprite.y);
        }

        if (this.bulletInheritSpriteSpeed) {
          speed += this.trackedSprite.body.speed;
        }
      } else if (this.trackedPointer) {
        // Fire based on tracked pointer
        this.updateFireFrom(this.trackedPointer.x, this.trackedPointer.y);
      } // Take offset into account


      this.fireFrom.x += offsetX;
      this.fireFrom.y += offsetY; // Pick a random coordinate inside the fireFrom rectangle

      var randomX = this.fireFrom.x + Math.random() * this.fireFrom.width;
      var randomY = this.fireFrom.y + Math.random() * this.fireFrom.height;
      var fromX = this.fireFrom.width > 1 ? randomX : this.fireFrom.x;
      var fromY = this.fireFrom.height > 1 ? randomY : this.fireFrom.y;
      var angle = this.trackRotation ? this.trackedSprite.angle : this.fireAngle; //  The position (in world space) to fire the bullet towards, if set

      if (x !== null && y !== null) {
        angle = Phaser.Math.RadToDeg(Math.atan2(y - fromY, x - fromX));
      } //  Apply +- angle variance


      if (this.bulletAngleVariance !== 0) {
        angle += Phaser.Math.Between(-this.bulletAngleVariance, this.bulletAngleVariance);
      }

      var moveX = 0;
      var moveY = 0; //  Avoid unnecessary sin/cos for right-angled shots

      if (angle === 0 || angle === 180) {
        // Only cos needed
        moveX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
      } else if (angle === 90 || angle === 270) {
        // Only sin needed
        moveY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;
      } else {
        // Need to calculate both
        moveX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
        moveY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;
      }

      var bullet = null; // Attempt to get a bullet instance to use

      if (this.autoExpandBulletsGroup) {
        bullet = this.bullets.getFirstDead(true, fromX, fromY, this.bulletKey, this.bulletFrame);
        bullet.setData('bulletManager', this);
      } else {
        bullet = this.bullets.getFirstDead(false);
      } // Prepare and fire the bullet


      if (bullet) {
        bullet.prepare(fromX, fromY);
        bullet.setData({
          fromX: fromX,
          fromY: fromY,
          killType: this.bulletKillType,
          killDistance: this.bulletKillDistance,
          rotateToVelocity: this.bulletRotateToVelocity
        }); // Prepare timer for bullet lifespan

        if (this.bulletKillType === _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_LIFESPAN) {
          bullet.setData('timeEvent', this.scene.time.addEvent({
            delay: this.bulletLifespan,
            callback: bullet.kill,
            callbackScope: bullet
          }));
          bullet.lifespan = this.bulletLifespan;
        }

        bullet.angle = angle + this.bulletAngleOffset; //  Frames and Animations

        if (this.bulletAnimation) {
          bullet.anims.play(this.bulletAnimation);
        } else if (this.bulletFrameCycle) {
          // Calculate bullet frame to use
          if (this.bulletFrameIndex >= this.bulletFrames.length) {
            this.bulletFrameIndex = 0;
          }

          bullet.setTexture(this.bulletKey, this.bulletFrameIndex);
          this.bulletFrameIndex++;
        } else if (this.bulletFrameRandom) {
          // Pick a bullet frame at random
          var nextFrame = Math.floor(Math.random() * this.bulletFrames.length);
          bullet.setTexture(this.bulletKey, nextFrame);
        } // Set correct size and position for bullet body


        if (bullet.getData('bodyDirty')) {
          if (this._data.customBody) {
            bullet.body.setSize(this._data.width, this._data.height);
            bullet.body.setOffset(this._data.offsetX, this._data.offsetY);
          }

          bullet.body.collideWorldBounds = this.bulletCollideWorldBounds;
          bullet.setData('bodyDirty', false);
        }

        bullet.body.setVelocity(moveX, moveY);
        bullet.body.setGravity(this.bulletGravity.x, this.bulletGravity.y);
        var next = 0; // Calculate when to fire next bullet, taking into account speed variance

        if (this.bulletSpeedVariance !== 0) {
          var rate = this.fireRate;
          rate += Phaser.Math.Between(-this.fireRateVariance, this.fireRateVariance);

          if (rate < 0) {
            rate = 0;
          }

          next = this.scene.time.now + rate;
        } else {
          next = this.scene.time.now + this.fireRate;
        } // Prepare for next shot


        if (this.multiFire) {
          if (!this._hasFired) {
            //  We only add 1 to the 'shots' count for multiFire shots
            this._hasFired = true;
            this._tempNextFire = next;
            this.shots++;
          }
        } else {
          this._nextFire = next;
          this.shots++;
        } // Emit events


        this.eventEmitter.emit('fire', bullet, this, speed);

        if (this.fireLimit > 0 && this.shots === this.fireLimit) {
          this.eventEmitter.emit('firelimit', this, this.fireLimit);
        }
      }

      return bullet;
    }
    /**
     * Set the fireFrom rectangle based on passed coords
     * @private
     * @param {number} x - X coordinate for where to fire from
     * @param {number} y - Y coordinate for where to fire from
     * @return {void}
     */

  }, {
    key: "updateFireFrom",
    value: function updateFireFrom(x, y) {
      if (this.fireFrom.width > 1) {
        // If size is larger than 1, center on coordinates
        Phaser.Geom.Rectangle.CenterOn(this.fireFrom, x + this.trackOffset.x, y + this.trackOffset.y);
      } else {
        this.fireFrom.x = x + this.trackOffset.x;
        this.fireFrom.y = y + this.trackOffset.y;
      }
    }
    /**
     * You can modify the size of the physics Body the Bullets use to be any dimension you need.
     * This allows you to make it smaller, or larger, than the parent Sprite.
     * You can also control the x and y offset of the Body. This is the position of the
     * Body relative to the top-left of the Sprite _texture_.
     *
     * For example: If you have a Sprite with a texture that is 80x100 in size,
     * and you want the physics body to be 32x32 pixels in the middle of the texture, you would do:
     *
     * `setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)`
     *
     * Where the first two parameters are the new Body size (32x32 pixels) relative to the Sprite's scale.
     * 24 is the horizontal offset of the Body from the top-left of the Sprites texture, and 34
     * is the vertical offset.
     *
     * @param {number} width - The width of the Body.
     * @param {number} height - The height of the Body.
     * @param {number} [offsetX=0] - The X offset of the Body from the top-left of the Sprites texture.
     * @param {number} [offsetY=0] - The Y offset of the Body from the top-left of the Sprites texture.
     * @return {Weapon} The Weapon Plugin.
     */

  }, {
    key: "setBulletBodyOffset",
    value: function setBulletBodyOffset(width, height) {
      var offsetX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var offsetY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      this._data.customBody = true;
      this._data.width = width;
      this._data.height = height;
      this._data.offsetX = offsetX;
      this._data.offsetY = offsetY; //  Update all bullets in the pool

      this.bullets.children.each(function (child) {
        child.body.setSize(width, height);
        child.body.setOffset(offsetX, offsetY);
        child.setData('bodyDirty', false);
      });
      return this;
    }
    /**
     * Sets the texture frames that the bullets can use when being launched.
     *
     * This is intended for use when you've got numeric based frames, such as
     * those loaded via a Sprite Sheet.
     *
     * It works by calling `Phaser.Utils.Array.NumberArray` internally, using
     * the min and max values provided. Then it sets the frame index to be zero.
     *
     * You can optionally set the cycle and random booleans, to allow bullets to
     * cycle through the frames when they're fired, or pick one at random.
     *
     * @param {integer} min - The minimum value the frame can be. Usually zero.
     * @param {integer} max - The maximum value the frame can be.
     * @param {integer} [selcetionMethod=BULLET_FRAME_STABLE] - Specifies how the
     *  frame for the fired bullet will be selected. See consts.BULLET_FRAME_XYZ
     *  for options.
     * @return {Weapon} The Weapon Plugin.
     */

  }, {
    key: "setBulletFrames",
    value: function setBulletFrames(min, max) {
      var selectionMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _consts__WEBPACK_IMPORTED_MODULE_1__["default"].BULLET_FRAME_STABLE;

      if (typeof selectionMethod !== 'number' || selectionMethod < _consts__WEBPACK_IMPORTED_MODULE_1__["default"].BULLET_FRAME_STABLE || selectionMethod > _consts__WEBPACK_IMPORTED_MODULE_1__["default"].BULLET_FRAME_RANDOM) {
        Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["log"])("Invalid bullet frame selection method specified: ".concat(selectionMethod), this.logLevel);
      }

      if (min > max) {
        Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["log"])("min frame (".concat(min, ") must be <= max frame (").concat(max, ")"), this.logLevel);
      }

      this.bulletFrames = Phaser.Utils.Array.NumberArray(min, max);
      this.bulletFrameIndex = 0;
      this.bulletFrameCycle = selectionMethod === _consts__WEBPACK_IMPORTED_MODULE_1__["default"].BULLET_FRAME_CYCLE;
      this.bulletFrameRandom = selectionMethod === _consts__WEBPACK_IMPORTED_MODULE_1__["default"].BULLET_FRAME_RANDOM;
      return this;
    }
    /**
     * Adds a new animation under the given key. Optionally set the frames, frame rate and loop.
     * The arguments are all the same as for `Animation.add`, and work in the same way.
     *
     * {@link #bulletAnimation} will be set to this animation after it's created. From that point on, all
     * bullets fired will play using this animation. You can swap between animations by calling this method
     * several times, and then just changing the {@link #bulletAnimation} property to the name of the animation
     * you wish to play for the next launched bullet.
     *
     * If you wish to stop using animations at all, set {@link #bulletAnimation} to '' (an empty string).
     *
     * @param {string} name - The unique (within the Weapon instance) name for the animation, i.e. "fire", "blast".
     * @param {Array} [frames=null] - An array of numbers/strings that correspond to the framesto add to this animation
     * and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used.
     * @param {number} [frameRate=60] - The speed at which the animation should play.
     * The speed is given in frames per second.
     * @param {number} [loop=1] - Number of times to repeat the animation. Set to -1 to repeat forever.
     * @return {Weapon} The Weapon Plugin.
     */

  }, {
    key: "addBulletAnimation",
    value: function addBulletAnimation(name, frames, frameRate, loop) {
      if (!this.scene.sys.anims.anims.contains(name)) {
        this.scene.sys.anims.create({
          key: name,
          frames: frames,
          frameRate: frameRate,
          loop: loop
        });
        this.anims[name] = this.scene.sys.anims.anims.entries[name];
      }

      this.bulletAnimation = name;
      return this;
    }
    /**
     * Internal update method, called by the Weapon Plugin.
     * @returns {void}
     */

  }, {
    key: "update",
    value: function update() {
      if (this._bulletKillType === _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_WEAPON_BOUNDS) {
        if (this.trackedSprite) {
          this.trackedSprite.updateTransform();
          Phaser.Geom.Rectangle.CenterOn(this.bounds, this.trackedSprite.x, this.trackedSprite.y);
        } else if (this.trackedPointer) {
          Phaser.Geom.Rectangle.CenterOn(this.bounds, this.trackedPointer.x, this.trackedPointer.y);
        }
      }

      if (this.autofire) {
        this.fire();
      }
    }
    /**
     * Internal update method, called by the Weapon Plugin.
     *
     * @protected
     * @returns {void}
     */

  }, {
    key: "postRender",
    value: function postRender() {
      if (!this.multiFire || !this._hasFired) {
        return;
      }

      this._hasFired = false;
      this._nextFire = this._tempNextFire;
    }
    /**
     * Destroys this Weapon.
     * You must release everything in here, all references, all objects, free it all up.
     * @returns {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.scene = null;
      this.bullets.destroy(true);
    }
  }, {
    key: "bullets",
    get: function get() {
      return this._bullets;
    },
    set: function set(value) {
      this._bullets = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bullets');
    }
    /**
     * Should the bullet pool run out of bullets (i.e. they are all in flight) then this
     * boolean controls if the Group will create a brand new bullet object or not.
     * @type {boolean}
     * @default
     */

  }, {
    key: "autoExpandBulletsGroup",
    get: function get() {
      return this._autoExpandBulletsGroup;
    },
    set: function set(value) {
      this._autoExpandBulletsGroup = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'autoExpandBulletsGroup');
    }
    /**
     * Will this weapon auto fire? If set to true then a new bullet will be fired
     * based on the {@link #fireRate} value.
     * @type {boolean}
     * @default
     */

  }, {
    key: "autofire",
    get: function get() {
      return this._autofire;
    },
    set: function set(value) {
      this._autofire = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'autofire');
    }
    /**
     * The total number of bullets this Weapon has fired so far.
     * You can limit the number of shots allowed (via {@link #fireLimit}), and reset
     * this total via {@link #resetShots}.
     * @type {number}
     * @default
     */

  }, {
    key: "shots",
    get: function get() {
      return this._shots;
    },
    set: function set(value) {
      this._shots = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'shots');
    }
    /**
     * The maximum number of shots that this Weapon is allowed to fire before it stops.
     * When the limit is hit the {@link #onFireLimit} event is dispatched.
     * You can reset the shot counter via {@link #resetShots}.
     * @type {number}
     * @default
     */

  }, {
    key: "fireLimit",
    get: function get() {
      return this._fireLimit;
    },
    set: function set(value) {
      this._fireLimit = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'fireLimit');
    }
    /**
     * The minimum interval between shots, in milliseconds.
     * @type {number}
     * @default
     */

  }, {
    key: "fireRate",
    get: function get() {
      return this._fireRate;
    },
    set: function set(value) {
      this._fireRate = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'fireRate');
    }
    /**
     * This is a modifier that is added to the {@link #fireRate} each update to add variety
     * to the firing rate of the Weapon. The value is given in milliseconds.
     * If you've a `fireRate` of 200 and a `fireRateVariance` of 50 then the actual
     * firing rate of the Weapon will be between 150 and 250.
     * @type {number}
     * @default
     */

  }, {
    key: "fireRateVariance",
    get: function get() {
      return this._fireRateVariance;
    },
    set: function set(value) {
      this._fireRateVariance = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'fireRateVariance');
    }
    /**
     * This is a Rectangle from within which the bullets are fired. By default it's a 1x1
     * rectangle, the equivalent of a Point. But you can change the width and height, and if
     * larger than 1x1 it'll pick a random point within the rectangle to launch the bullet from.
     * @type {Phaser.Geom.Rectangle}
     */

  }, {
    key: "fireFrom",
    get: function get() {
      return this._fireFrom;
    },
    set: function set(value) {
      this._fireFrom = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'fireFrom');
    }
    /**
     * The angle at which the bullets are fired. This can be a const such as Phaser.ANGLE_UP
     * or it can be any number from 0 to 360 inclusive, where 0 degrees is to the right.
     * @type {integer}
     * @default
     */

  }, {
    key: "fireAngle",
    get: function get() {
      return this._fireAngle;
    },
    set: function set(value) {
      this._fireAngle = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'fireAngle');
    }
    /**
     * When a Bullet is fired it can optionally inherit the velocity of the `trackedSprite` if set.
     * @type {boolean}
     * @default
     */

  }, {
    key: "bulletInheritSpriteSpeed",
    get: function get() {
      return this._bulletInheritSpriteSpeed;
    },
    set: function set(value) {
      this._bulletInheritSpriteSpeed = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletInheritSpriteSpeed');
    }
    /**
     * The string based name of the animation that the Bullet will be given on launch.
     * This is set via {@link #addBulletAnimation}.
     * @type {string}
     * @default
     */

  }, {
    key: "bulletAnimation",
    get: function get() {
      return this._bulletAnimation;
    },
    set: function set(value) {
      this._bulletAnimation = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletAnimation');
    }
    /**
     * If you've added a set of frames via {@link #setBulletFrames} then you can optionally
     * chose for each Bullet fired to pick a random frame from the set.
     * @type {boolean}
     * @default
     */

  }, {
    key: "bulletFrameRandom",
    get: function get() {
      return this._bulletFrameRandom;
    },
    set: function set(value) {
      this._bulletFrameRandom = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletFrameRandom');
    }
    /**
     * If you've added a set of frames via {@link #setBulletFrames} then you can optionally
     * chose for each Bullet fired to use the next frame in the set. The frame index is then
     * advanced one frame until it reaches the end of the set, then it starts from the start
     * again. Cycling frames like this allows you to create varied bullet effects via
     * sprite sheets.
     * @type {boolean}
     * @default
     */

  }, {
    key: "bulletFrameCycle",
    get: function get() {
      return this._bulletFrameCycle;
    },
    set: function set(value) {
      this._bulletFrameCycle = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletFrameCycle');
    }
    /**
     * Should the Bullets wrap around the world bounds? This automatically calls
     * `World.wrap` on the Bullet each frame. See the docs for that method for details.
     * @type {boolean}
     * @default
     */

  }, {
    key: "bulletWorldWrap",
    get: function get() {
      return this._bulletWorldWrap;
    },
    set: function set(value) {
      this._bulletWorldWrap = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletWorldWrap');
    }
    /**
     * If `bulletWorldWrap` is true then you can provide an optional padding value with this
     * property. It's added to the calculations determining when the Bullet should wrap around
     * the world or not. The value is given in pixels.
     * @type {integer}
     * @default
     */

  }, {
    key: "bulletWorldWrapPadding",
    get: function get() {
      return this._bulletWorldWrapPadding;
    },
    set: function set(value) {
      this._bulletWorldWrapPadding = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletWorldWrapPadding');
    }
    /**
     * An optional angle offset applied to the Bullets when they are launched.
     * This is useful if for example your bullet sprites have been drawn facing up, instead of
     * to the right, and you want to fire them at an angle. In which case you can set the
     * angle offset to be 90 and they'll be properly rotated when fired.
     * @type {number}
     * @default
     */

  }, {
    key: "bulletAngleOffset",
    get: function get() {
      return this._bulletAngleOffset;
    },
    set: function set(value) {
      this._bulletAngleOffset = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletAngleOffset');
    }
    /**
     * This is a variance added to the angle of Bullets when they are fired.
     * If you fire from an angle of 90 and have a `bulletAngleVariance` of 20 then the actual
     * angle of the Bullets will be between 70 and 110 degrees. This is a quick way to add a
     * great 'spread' effect to a Weapon.
     * @type {number}
     * @default
     */

  }, {
    key: "bulletAngleVariance",
    get: function get() {
      return this._bulletAngleVariance;
    },
    set: function set(value) {
      this._bulletAngleVariance = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletAngleVariance');
    }
    /**
     * The initial velocity of fired bullets, in pixels per second.
     * @type {number}
     * @default
     */

  }, {
    key: "bulletSpeed",
    get: function get() {
      return this._bulletSpeed;
    },
    set: function set(value) {
      this._bulletSpeed = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletSpeed');
    }
    /**
     * This is a variance added to the speed of Bullets when they are fired.
     * If bullets have a {@link #bulletSpeed} value of 200, and a `bulletSpeedVariance` of 50
     * then the actual speed of the Bullets will be between 150 and 250 pixels per second.
     * @type {number}
     * @default
     */

  }, {
    key: "bulletSpeedVariance",
    get: function get() {
      return this._bulletSpeedVariance;
    },
    set: function set(value) {
      this._bulletSpeedVariance = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletSpeedVariance');
    }
    /**
     * If you've set {@link #bulletKillType} to `consts.KILL_LIFESPAN` this controls the amount
     * of lifespan the Bullets have set on launch. The value is given in milliseconds.
     * When a Bullet hits its lifespan limit it will be automatically killed.
     * @type {number}
     * @default
     */

  }, {
    key: "bulletLifespan",
    get: function get() {
      return this._bulletLifespan;
    },
    set: function set(value) {
      this._bulletLifespan = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletLifespan');
    }
    /**
     * If you've set {@link #bulletKillType} to `consts.KILL_DISTANCE` this controls the distance
     * the Bullet can travel before it is automatically killed. The distance is given in pixels.
     * @type {number}
     * @default
     */

  }, {
    key: "bulletKillDistance",
    get: function get() {
      return this._bulletKillDistance;
    },
    set: function set(value) {
      this._bulletKillDistance = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletKillDistance');
    }
    /**
     * This is the amount of {@link Phaser.Physics.Arcade.Body#gravity} added to the Bullets physics body when fired.
     * Gravity is expressed in pixels / second / second.
     * @type {Phaser.Math.Vector2}
     */

  }, {
    key: "bulletGravity",
    get: function get() {
      return this._bulletGravity;
    },
    set: function set(value) {
      this._bulletGravity = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletGravity');
    }
    /**
     * Bullets can optionally adjust their rotation in-flight to match their velocity.
     * This can create the effect of a bullet 'pointing' to the path it is following, for example
     * an arrow being fired from a bow, and works especially well when added to {@link #bulletGravity}.
     * @type {boolean}
     * @default
     */

  }, {
    key: "bulletRotateToVelocity",
    get: function get() {
      return this._bulletRotateToVelocity;
    },
    set: function set(value) {
      this._bulletRotateToVelocity = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletRotateToVelocity');
    }
    /**
     * The Texture Key that the Bullets use when rendering.
     * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
     * @type {string}
     * @default
     */

  }, {
    key: "bulletKey",
    get: function get() {
      return this._bulletKey;
    },
    set: function set(value) {
      this._bulletKey = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletKey');
    }
    /**
     * The Texture Frame that the Bullets use when rendering.
     * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
     * @type {string|integer}
     * @default
     */

  }, {
    key: "bulletFrame",
    get: function get() {
      return this._bulletFrame;
    },
    set: function set(value) {
      this._bulletFrame = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletFrame');
    }
    /**
     * The Class of the bullets that are launched by this Weapon. Defaults to {@link Phaser.Bullet}, but can be
     * overridden before calling `createBullets` and set to your own class type.
     *
     * It should be a constructor function accepting `(game, x, y, key, frame)`.
     *
     * @property {function} bulletClass
     */

  }, {
    key: "bulletClass",
    get: function get() {
      return this._bulletClass;
    },
    set: function set(classType) {
      this._bulletClass = classType; // `this.bullets` exists only after createBullets()

      if (this.bullets) {
        this.bullets.classType = this._bulletClass;
      }

      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletClass');
    }
    /**
     * Should bullets collide with the World bounds or not?
     *
     * @property {boolean} bulletCollideWorldBounds
     */

  }, {
    key: "bulletCollideWorldBounds",
    get: function get() {
      return this._bulletCollideWorldBounds;
    },
    set: function set(value) {
      this._bulletCollideWorldBounds = value;
      this.bullets.children.each(function (child) {
        child.body.collideWorldBounds = value;
        child.setData('bodyDirty', false);
      });
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletCollideWorldBounds');
    }
    /**
     * This controls how the bullets will be killed. The default is `consts.KILL_WORLD_BOUNDS`.
     *
     * There are 7 different "kill types" available:
     *
     * * `consts.KILL_NEVER`
     * The bullets are never destroyed by the Weapon. It's up to you to destroy them via your own code.
     *
     * * `consts.KILL_LIFESPAN`
     * The bullets are automatically killed when their `bulletLifespan` amount expires.
     *
     * * `consts.KILL_DISTANCE`
     * The bullets are automatically killed when they
     * exceed `bulletDistance` pixels away from their original launch position.
     *
     * * `consts.KILL_WEAPON_BOUNDS`
     * The bullets are automatically killed when they no longer intersect with the {@link #bounds} rectangle.
     *
     * * `consts.KILL_CAMERA_BOUNDS`
     * The bullets are automatically killed when they no longer intersect with the {@link Phaser.Camera#bounds} rectangle.
     *
     * * `consts.KILL_WORLD_BOUNDS`
     * The bullets are automatically killed when they no longer intersect with the {@link Phaser.World#bounds} rectangle.
     *
     * * `consts.KILL_STATIC_BOUNDS`
     * The bullets are automatically killed when they no longer intersect with the {@link #bounds} rectangle.
     * The difference between static bounds and weapon bounds, is that a static bounds will never be adjusted to
     * match the position of a tracked sprite or pointer.
     *
     * @property {integer} bulletKillType
     */

  }, {
    key: "bulletKillType",
    get: function get() {
      return this._bulletKillType;
    },
    set: function set(type) {
      switch (type) {
        case _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_STATIC_BOUNDS:
        case _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_WEAPON_BOUNDS:
          this.bulletBounds = this.bounds;
          break;

        case _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_CAMERA_BOUNDS:
          this.bulletBounds = this.scene.sys.cameras.main._bounds;
          break;

        case _consts__WEBPACK_IMPORTED_MODULE_1__["default"].KILL_WORLD_BOUNDS:
          this.bulletBounds = this.scene.physics.world.bounds;
          break;
      }

      this._bulletKillType = type;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletKillType');
    }
    /**
     * This Rectangle defines the bounds that are used when determining if a Bullet should be killed or not.
     * It's used in combination with {@link #bulletKillType} when that is set to either `consts.KILL_WEAPON_BOUNDS`
     * or `consts.KILL_STATIC_BOUNDS`. If you are not using either of these kill types then the bounds are ignored.
     * If you are tracking a Sprite or Point then the bounds are centered on that object every frame.
     *
     * @type {Phaser.Geom.Rectangle}
     */

  }, {
    key: "bounds",
    get: function get() {
      return this._bounds;
    },
    set: function set(value) {
      this._bounds = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bounds');
    }
    /**
     * The Rectangle used to calculate the bullet bounds from.
     *
     * @type {Phaser.Geom.Rectangle}
     * @private
     */

  }, {
    key: "bulletBounds",
    get: function get() {
      return this._bulletBounds;
    },
    set: function set(value) {
      this._bulletBounds = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletBounds');
    }
    /**
     * This array stores the frames added via @link #setBulletFrames.
     *
     * @type {Array}
     * @protected
     */

  }, {
    key: "bulletFrames",
    get: function get() {
      return this._bulletFrames;
    },
    set: function set(value) {
      this._bulletFrames = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletFrames');
    }
    /**
     * The index of the frame within {@link #bulletFrames} that is currently being used.
     * This value is only used if {@link #bulletFrameCycle} is set to `true`.
     * @type {number}
     * @private
     */

  }, {
    key: "bulletFrameIndex",
    get: function get() {
      return this._bulletFrameIndex;
    },
    set: function set(value) {
      this._bulletFrameIndex = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'bulletFrameIndex');
    }
    /**
     * The Sprite currently being tracked by the Weapon, if any.
     * This is set via the {@link #trackSprite} method.
     *
     * @type {Phaser.GameObjects.Sprite|Object}
     */

  }, {
    key: "trackedSprite",
    get: function get() {
      return this._trackedSprite;
    },
    set: function set(value) {
      this._trackedSprite = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'trackedSprite');
    }
    /**
     * The Pointer currently being tracked by the Weapon, if any.
     * This is set via the {@link #trackPointer} method.
     *
     * @type {Phaser.Input.Pointer}
     */

  }, {
    key: "trackedPointer",
    get: function get() {
      return this._trackedPointer;
    },
    set: function set(value) {
      this._trackedPointer = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'trackedPointer');
    }
    /**
     * If you want this Weapon to be able to fire more than 1 bullet in a single
     * update, then set this property to `true`. When `true` the Weapon plugin won't
     * set the shot / firing timers until the `postRender` phase of the game loop.
     * This means you can call `fire` (and similar methods) as often as you like in one
     * single game update.
     *
     * @type {boolean}
     * @default
     */

  }, {
    key: "multiFire",
    get: function get() {
      return this._multiFire;
    },
    set: function set(value) {
      this._multiFire = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'multiFire');
    }
    /**
     * If the Weapon is tracking a Sprite, should it also track the Sprites rotation?
     * This is useful for a game such as Asteroids, where you want the weapon to fire based
     * on the sprites rotation.
     *
     * @type {boolean}
     * @default
     */

  }, {
    key: "trackRotation",
    get: function get() {
      return this._trackRotation;
    },
    set: function set(value) {
      this._trackRotation = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'trackRotation');
    }
    /**
     * The Track Offset is a Vector2 object that allows you to specify a pixel offset that bullets use
     * when launching from a tracked Sprite or Pointer. For example if you've got a bullet that is 2x2 pixels
     * in size, but you're tracking a Sprite that is 32x32, then you can set `trackOffset.x = 16` to have
     * the bullet launched from the center of the Sprite.
     *
     * @type {Phaser.Math.Vector2}
     */

  }, {
    key: "trackOffset",
    get: function get() {
      return this._trackOffset;
    },
    set: function set(value) {
      this._trackOffset = value;
      Object(_validateConfig__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'trackOffset');
    }
    /**
     * The x coordinate from which bullets are fired. This is the same as `Weapon.fireFrom.x`, and
     * can be overridden by the {@link #fire} arguments.
     *
     * @property {number} x
     */

  }, {
    key: "x",
    get: function get() {
      return this.fireFrom.x;
    },
    set: function set(value) {
      this.fireFrom.x = value;
    }
    /**
     * The y coordinate from which bullets are fired. This is the same as `Weapon.fireFrom.y`, and
     * can be overridden by the {@link #fire} arguments.
     *
     * @property {number} y
     */

  }, {
    key: "y",
    get: function get() {
      return this.fireFrom.y;
    },
    set: function set(value) {
      this.fireFrom.y = value;
    }
  }]);

  return Weapon;
}();

/* harmony default export */ __webpack_exports__["default"] = (Weapon);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var bulletID = 0;

var Bullet =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Bullet, _Phaser$GameObjects$S);

  /**
   * Create a new `Bullet` object. Bullets are used by the `Weapon` class, and are normal Sprites,
   * with a few extra properties in the data manager to handle Weapon specific features.
   *
   * @param {Phaser.Scene} scene - A reference to the currently running scene.
   * @param {number} x - The x coordinate (in world space) to position the Particle at.
   * @param {number} y - The y coordinate (in world space) to position the Particle at.
   * @param {string} key - This is the image or texture used by the Particle during rendering.
   * It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
   * @param {string|number} frame - If this Particle is using part of a sprite sheet or texture atlas
   * you can specify the exact frame to use by giving a string or numeric index.
   */
  function Bullet(scene, x, y, key, frame) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, scene, x, y, key, frame));
    _this.bulletID = bulletID;
    bulletID++;

    _this.scene.physics.add.existing(_assertThisInitialized(_this));

    _this.setDataEnabled();

    _this.setData({
      timeEvent: null,
      bulletManager: null,
      fromX: 0,
      fromY: 0,
      bodyDirty: true,
      rotateToVelocity: false,
      killType: 0,
      killDistance: 0,
      bodyBounds: new Phaser.Geom.Rectangle()
    });

    return _this;
  }
  /**
   * Prepares this bullet to be fired and interact with the rest of the scene
   * again.
   * @returns {void}
   */


  _createClass(Bullet, [{
    key: "prepare",
    value: function prepare(x, y) {
      this.setActive(true);
      this.setVisible(true);
      this.body.enable = true;
      this.body.reset(x, y);
      this.body.debugShowBody = this.getData('bulletManager').debugPhysics;
      this.body.debugShowVelocity = this.getData('bulletManager').debugPhysics;
    }
    /**
     * Kills the Bullet, freeing it up for re-use by the Weapon bullet pool.
     * Also dispatches the `Weapon`s kill signal.
     * @returns {Bullet} This instance of the bullet class
     */

  }, {
    key: "kill",
    value: function kill() {
      // Reproduce Phaser.Physics.Arcade.Components.Enable.disableBody because
      // we can't assume that the bullet class has it built in.
      this.body.stop();
      this.body.enable = false;
      this.setActive(false);
      this.setVisible(false);
      this.body.debugShowBody = false;
      this.body.debugShowVelocity = false; // TODO: potentially we don't need to destroy the time event and we can
      // just pause when the bullet is killed and restart it when it's refired.
      // For now though do the simple thing and discard it.
      // Another option would be to use Date.now() and manually process pause
      // events with a flag and some math.
      // Both of those are probably premature optimizations.

      if (this.getData('timeEvent') !== null) {
        this.getData('timeEvent').destroy();
        this.setData('timeEvent', null);
      }

      this.getData('bulletManager').eventEmitter.emit('kill', this);
      return this;
    }
    /**
     * Updates the Bullet, killing as required.
     * @returns {Bullet} This instance of the bullet class
     */

  }, {
    key: "update",
    value: function update() {
      if (!this.active) {
        // this was previously a check to this.exists
        return;
      }

      if (this.getData('killType') > _consts__WEBPACK_IMPORTED_MODULE_0__["default"].KILL_LIFESPAN) {
        if (this.getData('killType') === _consts__WEBPACK_IMPORTED_MODULE_0__["default"].KILL_DISTANCE) {
          if (new Phaser.Math.Vector2(this.getData('fromX'), this.getData('fromY')).distance(this) > this.getData('killDistance')) {
            this.kill();
          }
        } else if (!Phaser.Geom.Intersects.RectangleToRectangle(this.getData('bulletManager').bulletBounds, this.body.getBounds(this.getData('bodyBounds')))) {
          this.kill();
        }
      }

      if (this.getData('rotateToVelocity')) {
        this.rotation = this.body.velocity.atan();
      }

      if (this.getData('bulletManager').bulletWorldWrap) {
        this.scene.physics.world.wrap(this, this.getData('bulletManager').bulletWorldWrapPadding);
      }
    }
  }]);

  return Bullet;
}(Phaser.GameObjects.Sprite);

/* harmony default export */ __webpack_exports__["default"] = (Bullet);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * A {@link #bulletKillType} constant that stops the bullets from ever being destroyed automatically.
   * @constant
   * @type {integer}
   */
  KILL_NEVER: 0,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when their {@link #bulletLifespan} expires.
   * @constant
   * @type {integer}
   */
  KILL_LIFESPAN: 1,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets after they
   * exceed the {@link #bulletDistance} from their original firing position.
   * @constant
   * @type {integer}
   */
  KILL_DISTANCE: 2,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link #bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_WEAPON_BOUNDS: 3,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link Phaser.Camera#bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_CAMERA_BOUNDS: 4,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link Phaser.World#bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_WORLD_BOUNDS: 5,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link #bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_STATIC_BOUNDS: 6,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face up.
   * @constant
   * @type {integer}
   */
  ANGLE_UP: 270,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face down.
   * @constant
   * @type {integer}
   */
  ANGLE_DOWN: 90,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face left.
   * @constant
   * @type {integer}
   */
  ANGLE_LEFT: 180,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face right.
   * @constant
   * @type {integer}
   */
  ANGLE_RIGHT: 0,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face north east.
   * @constant Phaser.ANGLE_NORTH_EAST
   * @type {integer}
   */
  ANGLE_NORTH_EAST: 315,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face north west.
   * @constant
   * @type {integer}
   */
  ANGLE_NORTH_WEST: 225,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face south east.
   * @constant
   * @type {integer}
   */
  ANGLE_SOUTH_EAST: 45,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face south west.
   * @constant
   * @type {integer}
   */
  ANGLE_SOUTH_WEST: 135,

  /**
   * When selecting a bullet frame the same frame should always be used. This
   * is the default value.
   * @constant
   * @type { integer }
   */
  BULLET_FRAME_STABLE: 0,

  /**
   * When selecting a bullet frame the next frame should be used
   * @constant
   * @type { integer }
   */
  BULLET_FRAME_CYCLE: 1,

  /**
   * When selecting a bullet frame a random frame should be used.
   * @constant
   * @type { integer }
   */
  BULLET_FRAME_RANDOM: 2
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * Log text to the console or throw an error
 * @param {string} text - Text to be logged
 * @param {string} logLevel - The log level, either `warn`, `error' or `off`
 */

function log(text, logLevel) {
  if (logLevel === 'warn') {
    console.warn(text);
  } else if (logLevel === 'error') {
    throw new Error(text);
  }
}
/**
 * Check the config of the weapon for common errors and weird configurations.
 * @param {Weapon} weapon - The weapon being validated
 * @param {string} property - The property of the weapon being validated
 */


function validateConfig(weapon, property) {
  if (['bulletWorldWrap', 'bulletKillType'].includes(property) && weapon.bulletWorldWrap && (weapon.bulletKillType === _consts__WEBPACK_IMPORTED_MODULE_0__["default"].KILL_WORLD_BOUNDS || weapon.bulletKillType === _consts__WEBPACK_IMPORTED_MODULE_0__["default"].KILL_WEAPON_BOUNDS)) {
    log('Warning: KILL_WORLD_BOUNDS and KILL_WEAPON_BOUNDS does not work well with bulletWorldWrap set to true.', weapon.logLevel);
  }

  if (['bulletKillType', 'bulletLifespan'].includes(property) && weapon.bulletKillType === _consts__WEBPACK_IMPORTED_MODULE_0__["default"].KILL_LIFESPAN && weapon.bulletLifespan < 0) {
    log('Invalid bulletLifespan; must be > 0; currently ' + weapon.bulletLifespan, weapon.logLevel);
  }

  if (['fireLimit', 'fireRate', 'fireRateVariance', 'bulletAngleVariance', 'bulletSpeedVariance', 'bulletKillDistance'].includes(property) && weapon[property] < 0) {
    log('Invalid ' + property + '; must be >= 0; currently ' + weapon[property], weapon.logLevel);
  }
}


/* harmony default export */ __webpack_exports__["default"] = (validateConfig);

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=WeaponPlugin.js.map