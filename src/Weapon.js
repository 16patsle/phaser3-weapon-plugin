/**
 * @author       Patrick Sletvold
 * @author       jdotr <https://github.com/jdotrjs>
 * @author       Richard Davey
 * @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
 */
import Bullet from './Bullet';
import consts from './consts';

/**
 * The Weapon provides the ability to easily create a bullet pool and manager.
 *
 * Weapons fire {@link Bullet} objects, which are essentially Sprites with a
 * few extra properties. The Bullets are enabled for Arcade Physics. They do
 * not currently work with P2 Physics.
 *
 * The Bullets are created inside of {@link #bullets weapon.bullets}, which is
 * a {@link Phaser.GameObjects.Group} instance. Anything you can usually do
 * with a Group, such as move it around the display list, iterate it, etc can
 * be done to the bullets Group too.
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
 * weapon.fireFrom.set(300, 300);
 * this.input.onDown.add(weapon.fire, this); // Update this
 * ```
 */
class Weapon {
  /**
   * TODO: a builder style interface would be neat. Can be kicked way forward
   * into polishing.
   * @param {Phaser.Scene} scene - A reference to the Phaser.Scene instance.
   * @param {number} bulletLimit - The number of bullets to create.
   * @param {String} key - The texture key for the bullet.
   * @param {String} frame - The frame name for the bullet.
   * @param {Phaser.GameObjects.Group} group - A group to add the bullets to.
   */
  constructor(scene, bulletLimit, key, frame, group) {
    this.scene = scene;

    this.debugPhysics = null;

    /**
     * This is the Phaser.Group that contains all of the bullets managed by this plugin.
     * @type {Phaser.GameObjects.Group}
     */
    this.bullets = null;

    /**
     * Should the bullet pool run out of bullets (i.e. they are all in flight) then this
     * boolean controls if the Group will create a brand new bullet object or not.
     * @type {boolean}
     * @default
     */
    this.autoExpandBulletsGroup = false;

    /**
     * Will this weapon auto fire? If set to true then a new bullet will be fired
     * based on the {@link #fireRate} value.
     * @type {boolean}
     * @default
     */
    this.autofire = false;

    /**
     * The total number of bullets this Weapon has fired so far.
     * You can limit the number of shots allowed (via {@link #fireLimit}), and reset
     * this total via {@link #resetShots}.
     * @type {number}
     * @default
     */
    this.shots = 0;

    /**
     * The maximum number of shots that this Weapon is allowed to fire before it stops.
     * When the limit is his the {@link #onFireLimit} Signal is dispatched.
     * You can reset the shot counter via {@link #resetShots}.
     * @type {number}
     * @default
     */
    this.fireLimit = 0;

    /**
     * The minimum interval between shots, in milliseconds.
     * @type {number}
     * @default
     */
    this.fireRate = 100;

    /**
     * This is a modifier that is added to the {@link #fireRate} each update to add variety
     * to the firing rate of the Weapon. The value is given in milliseconds.
     * If you've a `fireRate` of 200 and a `fireRateVariance` of 50 then the actual
     * firing rate of the Weapon will be between 150 and 250.
     * @type {number}
     * @default
     */
    this.fireRateVariance = 0;

    /**
     * This is a Rectangle from within which the bullets are fired. By default it's a 1x1
     * rectangle, the equivalent of a Point. But you can change the width and height, and if
     * larger than 1x1 it'll pick a random point within the rectangle to launch the bullet from.
     * @type {Phaser.Geom.Rectangle}
     */
    this.fireFrom = new Phaser.Geom.Rectangle(0, 0, 1, 1);

    /**
     * The angle at which the bullets are fired. This can be a const such as Phaser.ANGLE_UP
     * or it can be any number from 0 to 360 inclusive, where 0 degrees is to the right.
     * @type {integer}
     * @default
     */
    this.fireAngle = consts.ANGLE_UP;

    /**
     * When a Bullet is fired it can optionally inherit the velocity of the `trackedSprite` if set.
     * @type {boolean}
     * @default
     */
    this.bulletInheritSpriteSpeed = false;

    /**
     * The string based name of the animation that the Bullet will be given on launch.
     * This is set via {@link #addBulletAnimation}.
     * @type {string}
     * @default
     */
    this.bulletAnimation = '';

    /**
     * If you've added a set of frames via {@link #setBulletFrames} then you can optionally
     * chose for each Bullet fired to pick a random frame from the set.
     * @type {boolean}
     * @default
     */
    this.bulletFrameRandom = false;

    /**
     * If you've added a set of frames via {@link #setBulletFrames} then you can optionally
     * chose for each Bullet fired to use the next frame in the set. The frame index is then
     * advanced one frame until it reaches the end of the set, then it starts from the start
     * again. Cycling frames like this allows you to create varied bullet effects via
     * sprite sheets.
     * @type {boolean}
     * @default
     */
    this.bulletFrameCycle = false;

    /**
     * Should the Bullets wrap around the world bounds? This automatically calls
     * `World.wrap` on the Bullet each frame. See the docs for that method for details.
     * @type {boolean}
     * @default
     */
    this.bulletWorldWrap = false;

    /**
     * If `bulletWorldWrap` is true then you can provide an optional padding value with this
     * property. It's added to the calculations determining when the Bullet should wrap around
     * the world or not. The value is given in pixels.
     * @type {integer}
     * @default
     */
    this.bulletWorldWrapPadding = 0;

    /**
     * An optional angle offset applied to the Bullets when they are launched.
     * This is useful if for example your bullet sprites have been drawn facing up, instead of
     * to the right, and you want to fire them at an angle. In which case you can set the
     * angle offset to be 90 and they'll be properly rotated when fired.
     * @type {number}
     * @default
     */
    this.bulletAngleOffset = 0;

    /**
     * This is a variance added to the angle of Bullets when they are fired.
     * If you fire from an angle of 90 and have a `bulletAngleVariance` of 20 then the actual
     * angle of the Bullets will be between 70 and 110 degrees. This is a quick way to add a
     * great 'spread' effect to a Weapon.
     * @type {number}
     * @default
     */
    this.bulletAngleVariance = 0;

    /**
     * The initial velocity of fired bullets, in pixels per second.
     * @type {number}
     * @default
     */
    this.bulletSpeed = 200;

    /**
     * This is a variance added to the speed of Bullets when they are fired.
     * If bullets have a {@link #bulletSpeed} value of 200, and a `bulletSpeedVariance` of 50
     * then the actual speed of the Bullets will be between 150 and 250 pixels per second.
     * @type {number}
     * @default
     */
    this.bulletSpeedVariance = 0;

    /**
     * If you've set {@link #bulletKillType} to `consts.KILL_LIFESPAN` this controls the amount
     * of lifespan the Bullets have set on launch. The value is given in milliseconds.
     * When a Bullet hits its lifespan limit it will be automatically killed.
     * @type {number}
     * @default
     */
    this.bulletLifespan = 0;

    /**
     * If you've set {@link #bulletKillType} to `consts.KILL_DISTANCE` this controls the distance
     * the Bullet can travel before it is automatically killed. The distance is given in pixels.
     * @type {number}
     * @default
     */
    this.bulletKillDistance = 0;

    /**
     * This is the amount of {@link Phaser.Physics.Arcade.Body#gravity} added to the Bullets physics body when fired.
     * Gravity is expressed in pixels / second / second.
     * @type {Phaser.Math.Vector2}
     */
    this.bulletGravity = new Phaser.Math.Vector2(0, 0);

    /**
     * Bullets can optionally adjust their rotation in-flight to match their velocity.
     * This can create the effect of a bullet 'pointing' to the path it is following, for example
     * an arrow being fired from a bow, and works especially well when added to {@link #bulletGravity}.
     * @type {boolean}
     * @default
     */
    this.bulletRotateToVelocity = false;

    /**
     * The Texture Key that the Bullets use when rendering.
     * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
     * @type {string}
     * @default
     */
    this.bulletKey = key || '';

    /**
     * The Texture Frame that the Bullets use when rendering.
     * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
     * @type {string|integer}
     * @default
     */
    this.bulletFrame = frame || '';

    /**
     * Private var that holds the public `bulletClass` property.
     * @type {function}
     * @private
     */
    this._bulletClass = Bullet;

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
    this._bulletKillType = consts.KILL_WORLD_BOUNDS;

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
      offsetY: 0,
    };

    /**
     * This Rectangle defines the bounds that are used when determining if a Bullet should be killed or not.
     * It's used in combination with {@link #bulletKillType} when that is set to either `consts.KILL_WEAPON_BOUNDS`
     * or `consts.KILL_STATIC_BOUNDS`. If you are not using either of these kill types then the bounds are ignored.
     * If you are tracking a Sprite or Point then the bounds are centered on that object every frame.
     *
     * @type {Phaser.Geom.Rectangle}
     */
    this.bounds = new Phaser.Geom.Rectangle();

    /**
     * The Rectangle used to calculate the bullet bounds from.
     *
     * @type {Phaser.Geom.Rectangle}
     * @private
     */
    this.bulletBounds = this.scene.physics.world.bounds;

    /**
     * This array stores the frames added via @link #setBulletFrames.
     *
     * @type {Array}
     * @protected
     */
    this.bulletFrames = [];

    /**
     * The index of the frame within {@link #bulletFrames} that is currently being used.
     * This value is only used if {@link #bulletFrameCycle} is set to `true`.
     * @type {number}
     * @private
     */
    this.bulletFrameIndex = 0;

    /**
     * An internal object that stores the animation data added via {@link #addBulletAnimation}.
     * @type {Object}
     * @private
     */
    this.anims = {};

    /**
     * The Sprite currently being tracked by the Weapon, if any.
     * This is set via the {@link #trackSprite} method.
     *
     * @type {Phaser.GameObjects.Sprite|Object}
     */
    this.trackedSprite = null;

    /**
     * The Pointer currently being tracked by the Weapon, if any.
     * This is set via the {@link #trackPointer} method.
     *
     * @type {Phaser.Input.Pointer}
     */
    this.trackedPointer = null;

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
    this.multiFire = false;

    /**
     * Internal multiFire test flag.
     *
     * @type {boolean}
     */
    this._hasFired = false;

    /**
     * If the Weapon is tracking a Sprite, should it also track the Sprites rotation?
     * This is useful for a game such as Asteroids, where you want the weapon to fire based
     * on the sprites rotation.
     *
     * @type {boolean}
     * @default
     */
    this.trackRotation = false;

    /**
     * The Track Offset is a Vector2 object that allows you to specify a pixel offset that bullets use
     * when launching from a tracked Sprite or Pointer. For example if you've got a bullet that is 2x2 pixels
     * in size, but you're tracking a Sprite that is 32x32, then you can set `trackOffset.x = 16` to have
     * the bullet launched from the center of the Sprite.
     *
     * @type {Phaser.Math.Vector2}
     */
    this.trackOffset = new Phaser.Math.Vector2();

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

    this.eventEmitter = new Phaser.Events.EventEmitter();

    this.createBullets(bulletLimit, key, frame, group);
  }

  /**
 * The Class of the bullets that are launched by this Weapon. Defaults to {@link Phaser.Bullet}, but can be
 * overridden before calling `createBullets` and set to your own class type.
 *
 * It should be a constructor function accepting `(game, x, y, key, frame)`.
 *
 * @property {function} bulletClass
 */
  get bulletClass() {
    return this._bulletClass;
  }
  set bulletClass(classType){
    this._bulletClass = classType;

    // `this.bullets` exists only after createBullets()
    if (this.bullets) {
      this.bullets.classType = this._bulletClass;
    }
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
  get bulletKillType(){
    return this._bulletKillType;
  }
  set bulletKillType(type){
    switch (type) {
      case consts.KILL_STATIC_BOUNDS:
      case consts.KILL_WEAPON_BOUNDS:
        this.bulletBounds = this.bounds;
        break;

      case consts.KILL_CAMERA_BOUNDS:
        this.bulletBounds = this.scene.sys.cameras.main._bounds;
        break;

      case consts.KILL_WORLD_BOUNDS:
        this.bulletBounds = this.scene.physics.world.bounds;
        break;
    }

    this._bulletKillType = type;
  }

  /**
 * Should bullets collide with the World bounds or not?
 *
 * @property {boolean} bulletCollideWorldBounds
 */
  get bulletCollideWorldBounds(){
    return this._bulletCollideWorldBounds;
  }
  set bulletCollideWorldBounds(value){
    this._bulletCollideWorldBounds = value;

    this.bullets.children.each(child => {
      child.body.collideWorldBounds = value;
      child.setData('bodyDirty', false);
    });
  }

  /**
 * The x coordinate from which bullets are fired. This is the same as `Weapon.fireFrom.x`, and
 * can be overridden by the {@link #fire} arguments.
 *
 * @property {number} x
 */
  get x(){
    return this.fireFrom.x;
  }
  set x(value){
    this.fireFrom.x = value;
  }

  /**
 * The y coordinate from which bullets are fired. This is the same as `Weapon.fireFrom.y`, and
 * can be overridden by the {@link #fire} arguments.
 *
 * @name Weapon#y
 * @property {number} y
 */
  get y(){
    return this.fireFrom.y;
  }
  set y(value){
    this.fireFrom.y = value;
  }

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
  createBullets(quantity, key, frame, group, bulletClass) {
    if (quantity === undefined) {
      quantity = 1;
    }
    if (bulletClass) {
      this._bulletClass = bulletClass;
    }
    /*if (group === undefined) {
      group = this.game.world;
    }*/

    if (this.bullets && !this.bullets.scene) {
      this.bullets = null;
    }

    if (!this.bullets) {
      this.bullets = this.scene.add.group({
        classType: this._bulletClass,
        maxSize: quantity,
        runChildUpdate: true,
      });
    }

    if (quantity !== 0) {
      if (quantity === -1) {
        this.autoExpandBulletsGroup = true;
        quantity = 1;
      }

      this.bullets.createMultiple({
        key,
        frame,
        repeat: quantity,
        active: false,
        visible: false,
      });

      this.bullets.children.each(function(child) {
        child.data.bulletManager = this;
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
  forEach(callback, callbackContext) {
    const extraArgs = arguments;

    this.bullets.children.each(child => {
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
  pauseAll() {
    this.bullets.children.each(child => {
      child.body.enable = false;
      if (child.data.timeEvent !== null) {
        child.data.timeEvent.paused = true;
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
  resumeAll() {
    this.bullets.children.each(child => {
      child.body.enable = true;
      if (child.data.timeEvent !== null) {
        child.data.timeEvent.paused = false;
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
  killAll() {
    this.bullets.children.each(child => {
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
  resetShots(newLimit) {
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
  trackSprite(sprite, offsetX, offsetY, trackRotation) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }
    if (trackRotation === undefined) {
      trackRotation = false;
    }

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
  trackPointer(pointer, offsetX, offsetY) {
    if (pointer === undefined && this.scene.input) {
      pointer = this.scene.input.activePointer;
    }
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
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
  fireMany(positions, from) {
    this.multiFire = true;

    const bullets = [];

    if (from || this.trackedSprite || this.trackedPointer) {
      positions.forEach(offset => {
        bullets.push(this.fire(from, null, null, offset.x, offset.y));
      });
    } else {
      positions.forEach(position => {
        bullets.push(this.fire(position));
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
  fireOffset(offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }

    return this.fire(null, null, null, offsetX, offsetY);
  }

  /**
   * Fires a bullet **at** the given Pointer. The bullet will be launched from the {@link #fireFrom} position,
   * or from a Tracked Sprite or Pointer, if you have one set.
   *
   * @param {Phaser.Input.Pointer} [pointer] - The Pointer to fire the bullet towards.
   * @return {Bullet} The fired bullet if successful, null otherwise.
   */
  fireAtPointer(pointer) {
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
  fireAtSprite(sprite) {
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
  fireAtXY(x, y) {
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
  fire(from, x, y, offsetX, offsetY) {
    if (x === undefined) {
      x = null;
    }
    if (y === undefined) {
      y = null;
    }

    if (
      this.scene.time.now < this._nextFire ||
      (this.fireLimit > 0 && this.shots === this.fireLimit)
    ) {
      return null;
    }

    let speed = this.bulletSpeed;

    //  Apply +- speed variance
    if (this.bulletSpeedVariance !== 0) {
      speed += Phaser.Math.Between(-this.bulletSpeedVariance, this.bulletSpeedVariance);
    }

    if (from) {
      if (this.fireFrom.width > 1) {
        this.fireFrom.CenterOn(from.x, from.y);
      } else {
        this.fireFrom.x = from.x;
        this.fireFrom.y = from.y;
      }
    } else if (this.trackedSprite) {
      if (this.trackRotation) {
        this._rotatedPoint.set(
          this.trackedSprite.x + this.trackOffset.x,
          this.trackedSprite.y + this.trackOffset.y
        );
        Phaser.Math.RotateAround(
          this._rotatedPoint,
          this.trackedSprite.x,
          this.trackedSprite.y,
          this.trackedSprite.rotation
        );

        if (this.fireFrom.width > 1) {
          this.fireFrom.CenterOn(this._rotatedPoint.x, this._rotatedPoint.y);
        } else {
          this.fireFrom.x = this._rotatedPoint.x;
          this.fireFrom.y = this._rotatedPoint.y;
        }
      } else if (this.fireFrom.width > 1) {
        this.fireFrom.CenterOn(
          this.trackedSprite.x + this.trackOffset.x,
          this.trackedSprite.y + this.trackOffset.y
        );
      } else {
        this.fireFrom.x = this.trackedSprite.x + this.trackOffset.x;
        this.fireFrom.y = this.trackedSprite.y + this.trackOffset.y;
      }

      if (this.bulletInheritSpriteSpeed) {
        speed += this.trackedSprite.body.speed;
      }
    } else if (this.trackedPointer) {
      if (this.fireFrom.width > 1) {
        this.fireFrom.CenterOn(
          this.trackedPointer.x + this.trackOffset.x,
          this.trackedPointer.y + this.trackOffset.y
        );
      } else {
        this.fireFrom.x = this.trackedPointer.x + this.trackOffset.x;
        this.fireFrom.y = this.trackedPointer.y + this.trackOffset.y;
      }
    }

    if (offsetX !== undefined) {
      this.fireFrom.x += offsetX;
    }

    if (offsetY !== undefined) {
      this.fireFrom.y += offsetY;
    }

    const randomX = this.fireFrom.x + Math.random() * this.fireFrom.width;
    const randomY = this.fireFrom.y + Math.random() * this.fireFrom.height;

    const fromX = this.fireFrom.width > 1 ? randomX : this.fireFrom.x;
    const fromY = this.fireFrom.height > 1 ? randomY : this.fireFrom.y;

    let angle = this.trackRotation ? this.trackedSprite.angle : this.fireAngle;

    //  The position (in world space) to fire the bullet towards, if set
    if (x !== null && y !== null) {
      angle = Phaser.Math.RadToDeg(Math.atan2(y - fromY, x - fromX));
    }

    //  Apply +- angle variance
    if (this.bulletAngleVariance !== 0) {
      angle += Phaser.Math.Between(-this.bulletAngleVariance, this.bulletAngleVariance);
    }

    let moveX = 0;
    let moveY = 0;

    //  Avoid sin/cos for right-angled shots
    if (angle === 0 || angle === 180) {
      moveX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
    } else if (angle === 90 || angle === 270) {
      moveY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;
    } else {
      moveX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
      moveY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;
    }

    let bullet = null;

    if (this.autoExpandBulletsGroup) {
      bullet = this.bullets.getFirstDead(true, fromX, fromY, this.bulletKey, this.bulletFrame);
      bullet.data.bulletManager = this;
    } else {
      bullet = this.bullets.getFirstDead(false);
    }

    if (bullet) {
      bullet.prepare(fromX, fromY);
      bullet.data.fromX = fromX;
      bullet.data.fromY = fromY;
      bullet.data.killType = this.bulletKillType;
      bullet.data.killDistance = this.bulletKillDistance;
      bullet.data.rotateToVelocity = this.bulletRotateToVelocity;

      if (this.bulletKillType === consts.KILL_LIFESPAN) {
        if (this.bulletLifespan <= 0) {
          throw new Error('Invalid bulletLifespan; must be > 0');
        }
        bullet.data.timeEvent = this.scene.time.addEvent({
          delay: this.bulletLifespan,
          // TODO: test to see if we can just pass callbackContext: bullet and
          // have it work. no need to re-bind every time we fire a bullet
          callback: bullet.kill.bind(bullet),
        });
        bullet.lifespan = this.bulletLifespan;
      }

      bullet.angle = angle + this.bulletAngleOffset;

      //  Frames and Animations
      if (this.bulletAnimation) {
        bullet.anims.play(this.bulletAnimation);
      } else if (this.bulletFrameCycle) {
        if (this.bulletFrameIndex >= this.bulletFrames.length) {
          this.bulletFrameIndex = 0;
        }
        bullet.setTexture(this.bulletKey, this.bulletFrameIndex);
        this.bulletFrameIndex++;
      } else if (this.bulletFrameRandom) {
        const nextFrame = Math.floor(Math.random() * this.bulletFrames.length);
        bullet.setTexture(this.bulletKey, nextFrame);
      }

      if (bullet.data.bodyDirty) {
        if (this._data.customBody) {
          bullet.body.setSize(this._data.width, this._data.height);
          bullet.body.setOffset(this._data.offsetX, this._data.offsetY);
        }

        bullet.body.collideWorldBounds = this.bulletCollideWorldBounds;

        bullet.data.bodyDirty = false;
      }

      bullet.body.setVelocity(moveX, moveY);
      bullet.body.setGravity(this.bulletGravity.x, this.bulletGravity.y);

      let next = 0;

      if (this.bulletSpeedVariance !== 0) {
        let rate = this.fireRate;

        rate += Phaser.Math.Between(-this.fireRateVariance, this.fireRateVariance);

        if (rate < 0) {
          rate = 0;
        }

        next = this.scene.time.now + rate;
      } else {
        next = this.scene.time.now + this.fireRate;
      }

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
      }

      this.eventEmitter.emit('fire', bullet, this, speed);

      if (this.fireLimit > 0 && this.shots === this.fireLimit) {
        this.eventEmitter('firelimit', this, this.fireLimit);
      }
    }

    return bullet;
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
   * @param {number} [offsetX] - The X offset of the Body from the top-left of the Sprites texture.
   * @param {number} [offsetY] - The Y offset of the Body from the top-left of the Sprites texture.
   * @return {Weapon} The Weapon Plugin.
   */
  setBulletBodyOffset(width, height, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = 0;
    }
    if (offsetY === undefined) {
      offsetY = 0;
    }

    this._data.customBody = true;
    this._data.width = width;
    this._data.height = height;
    this._data.offsetX = offsetX;
    this._data.offsetY = offsetY;

    //  Update all bullets in the pool
    this.bullets.children.each(child => {
      child.body.setSize(width, height);
      child.body.setOffset(offsetX, offsetY);
    });
    //this.bullets.setAll('data.bodyDirty', false);

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
  setBulletFrames(min, max, selectionMethod) {
    if (selectionMethod === undefined) {
      selectionMethod = consts.BULLET_FRAME_STABLE;
    }
    if (
      typeof selectionMethod !== 'number' ||
      selectionMethod < consts.BULLET_FRAME_STABLE ||
      selectionMethod > consts.BULLET_FRAME_RANDOM
    ) {
      throw new Error(`Invalid bullet frame selection method specified: ${selectionMethod}`);
    }

    if (min > max) {
      throw new Error(`min frame (${min}) must be <= max frame ${max}`);
    }

    this.bulletFrames = Phaser.Utils.Array.NumberArray(min, max);
    this.bulletFrameIndex = 0;
    this.bulletFrameCycle = selectionMethod === consts.BULLET_FRAME_CYCLE;
    this.bulletFrameRandom = selectionMethod === consts.BULLET_FRAME_RANDOM;

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
  addBulletAnimation(name, frames, frameRate, loop) {
    if (!this.scene.sys.anims.anims.contains(name)) {
      this.scene.sys.anims.create({
        key: name,
        frames,
        frameRate,
        loop,
      });

      this.anims[name] = this.scene.sys.anims.anims.entries[name];
    }

    this.bulletAnimation = name;

    return this;
  }

  /**
   * Uses `Game.Debug` to draw some useful information about this Weapon, including the number of bullets
   * both in-flight, and available. And optionally the physics debug bodies of the bullets.
   *
   * @param {integer} [x=16] - The coordinate, in screen space, at which to draw the Weapon debug data.
   * @param {integer} [y=32] - The coordinate, in screen space, at which to draw the Weapon debug data.
   * @param {boolean} [debugBodies=false] - Optionally draw the physics body of every bullet in-flight.
   */
  debug(x, y, debugBodies) {
    /*if (x === undefined) {
      x = 16;
    }
    if (y === undefined) {
      y = 32;
    }
    if (debugBodies === undefined) {
      debugBodies = false;
    }

    this.game.debug.text('Weapon Plugin', x, y);
    this.game.debug.text(
      'Bullets Alive: ' + this.bullets.total + ' - Total: ' + this.bullets.length,
      x,
      y + 24
    );

    if (debugBodies) {
      this.bullets.forEachExists(this.game.debug.body, this.game.debug, 'rgba(255, 0, 255, 0.8)');
    }*/
  }

  /**
   * Internal update method, called by the Weapon Plugin.
   * @returns {void}
   */
  update() {
    if (this._bulletKillType === consts.KILL_WEAPON_BOUNDS) {
      if (this.trackedSprite) {
        this.trackedSprite.updateTransform();
        this.bounds.centerOn(this.trackedSprite.x, this.trackedSprite.y);
      } else if (this.trackedPointer) {
        this.bounds.centerOn(this.trackedPointer.x, this.trackedPointer.y);
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
  postRender() {
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
  destroy() {
    this.scene = null;

    this.bullets.destroy(true);
  }
}

export default Weapon;
