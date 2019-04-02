import Bullet from './Bullet';
import consts from './consts';
import validateConfig, { log } from './validateConfig';

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
    this._fireAngle = consts.ANGLE_UP;

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

    validateConfig(this);

    this.createBullets(bulletLimit, key, frame, group);
  }

  /**
   * This is the Phaser.Group that contains all of the bullets managed by this plugin.
   * @type {Phaser.GameObjects.Group}
   */
  get bullets(){
    return this._bullets;
  }
  set bullets(value){
    this._bullets = value;

    validateConfig(this, 'bullets');
  }

  /**
   * Should the bullet pool run out of bullets (i.e. they are all in flight) then this
   * boolean controls if the Group will create a brand new bullet object or not.
   * @type {boolean}
   * @default
   */
  get autoExpandBulletsGroup(){
    return this._autoExpandBulletsGroup;
  }
  set autoExpandBulletsGroup(value) {
    this._autoExpandBulletsGroup = value;

    validateConfig(this, 'autoExpandBulletsGroup');
  }

  /**
   * Will this weapon auto fire? If set to true then a new bullet will be fired
   * based on the {@link #fireRate} value.
   * @type {boolean}
   * @default
   */
  get autofire() {
    return this._autofire;
  }
  set autofire(value) {
    this._autofire = value;

    validateConfig(this, 'autofire');
  }

  /**
 * The total number of bullets this Weapon has fired so far.
 * You can limit the number of shots allowed (via {@link #fireLimit}), and reset
 * this total via {@link #resetShots}.
 * @type {number}
 * @default
 */
  get shots() {
    return this._shots;
  }
  set shots(value) {
    this._shots = value;

    validateConfig(this, 'shots');
  }

  /**
 * The maximum number of shots that this Weapon is allowed to fire before it stops.
 * When the limit is hit the {@link #onFireLimit} event is dispatched.
 * You can reset the shot counter via {@link #resetShots}.
 * @type {number}
 * @default
 */
  get fireLimit(){
    return this._fireLimit;
  }
  set fireLimit(value){
    this._fireLimit = value;

    validateConfig(this, 'fireLimit');
  }

  /**
 * The minimum interval between shots, in milliseconds.
 * @type {number}
 * @default
 */
  get fireRate(){
    return this._fireRate;
  }
  set fireRate(value){
    this._fireRate = value;

    validateConfig(this, 'fireRate');
  }

  /**
 * This is a modifier that is added to the {@link #fireRate} each update to add variety
 * to the firing rate of the Weapon. The value is given in milliseconds.
 * If you've a `fireRate` of 200 and a `fireRateVariance` of 50 then the actual
 * firing rate of the Weapon will be between 150 and 250.
 * @type {number}
 * @default
 */
  get fireRateVariance(){
    return this._fireRateVariance;
  }
  set fireRateVariance(value){
    this._fireRateVariance = value;

    validateConfig(this, 'fireRateVariance');
  }

  /**
 * This is a Rectangle from within which the bullets are fired. By default it's a 1x1
 * rectangle, the equivalent of a Point. But you can change the width and height, and if
 * larger than 1x1 it'll pick a random point within the rectangle to launch the bullet from.
 * @type {Phaser.Geom.Rectangle}
 */
  get fireFrom(){
    return this._fireFrom;
  }
  set fireFrom(value){
    this._fireFrom = value;

    validateConfig(this, 'fireFrom');
  }

  /**
 * The angle at which the bullets are fired. This can be a const such as Phaser.ANGLE_UP
 * or it can be any number from 0 to 360 inclusive, where 0 degrees is to the right.
 * @type {integer}
 * @default
 */
  get fireAngle(){
    return this._fireAngle;
  }
  set fireAngle(value){
    this._fireAngle = value;

    validateConfig(this, 'fireAngle');
  }

  /**
 * When a Bullet is fired it can optionally inherit the velocity of the `trackedSprite` if set.
 * @type {boolean}
 * @default
 */
  get bulletInheritSpriteSpeed(){
    return this._bulletInheritSpriteSpeed;
  }
  set bulletInheritSpriteSpeed(value){
    this._bulletInheritSpriteSpeed = value;

    validateConfig(this, 'bulletInheritSpriteSpeed');
  }

  /**
 * The string based name of the animation that the Bullet will be given on launch.
 * This is set via {@link #addBulletAnimation}.
 * @type {string}
 * @default
 */
  get bulletAnimation(){
    return this._bulletAnimation;
  }
  set bulletAnimation(value){
    this._bulletAnimation = value;

    validateConfig(this, 'bulletAnimation');
  }

  /**
 * If you've added a set of frames via {@link #setBulletFrames} then you can optionally
 * chose for each Bullet fired to pick a random frame from the set.
 * @type {boolean}
 * @default
 */
  get bulletFrameRandom(){
    return this._bulletFrameRandom;
  }
  set bulletFrameRandom(value){
    this._bulletFrameRandom = value;

    validateConfig(this, 'bulletFrameRandom');
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
  get bulletFrameCycle(){
    return this._bulletFrameCycle;
  }
  set bulletFrameCycle(value){
    this._bulletFrameCycle = value;

    validateConfig(this, 'bulletFrameCycle');
  }

  /**
   * Should the Bullets wrap around the world bounds? This automatically calls
   * `World.wrap` on the Bullet each frame. See the docs for that method for details.
   * @type {boolean}
   * @default
   */
  get bulletWorldWrap(){
    return this._bulletWorldWrap;
  }
  set bulletWorldWrap(value){
    this._bulletWorldWrap = value;

    validateConfig(this, 'bulletWorldWrap');
  }

  /**
 * If `bulletWorldWrap` is true then you can provide an optional padding value with this
 * property. It's added to the calculations determining when the Bullet should wrap around
 * the world or not. The value is given in pixels.
 * @type {integer}
 * @default
 */
  get bulletWorldWrapPadding(){
    return this._bulletWorldWrapPadding;
  }
  set bulletWorldWrapPadding(value){
    this._bulletWorldWrapPadding = value;

    validateConfig(this, 'bulletWorldWrapPadding');
  }

  /**
 * An optional angle offset applied to the Bullets when they are launched.
 * This is useful if for example your bullet sprites have been drawn facing up, instead of
 * to the right, and you want to fire them at an angle. In which case you can set the
 * angle offset to be 90 and they'll be properly rotated when fired.
 * @type {number}
 * @default
 */
  get bulletAngleOffset(){
    return this._bulletAngleOffset;
  }
  set bulletAngleOffset(value){
    this._bulletAngleOffset = value;

    validateConfig(this, 'bulletAngleOffset');
  }

  /**
 * This is a variance added to the angle of Bullets when they are fired.
 * If you fire from an angle of 90 and have a `bulletAngleVariance` of 20 then the actual
 * angle of the Bullets will be between 70 and 110 degrees. This is a quick way to add a
 * great 'spread' effect to a Weapon.
 * @type {number}
 * @default
 */
  get bulletAngleVariance(){
    return this._bulletAngleVariance;
  }
  set bulletAngleVariance(value){
    this._bulletAngleVariance = value;

    validateConfig(this, 'bulletAngleVariance');
  }

  /**
 * The initial velocity of fired bullets, in pixels per second.
 * @type {number}
 * @default
 */
  get bulletSpeed(){
    return this._bulletSpeed;
  }
  set bulletSpeed(value){
    this._bulletSpeed = value;

    validateConfig(this, 'bulletSpeed');
  }

  /**
 * This is a variance added to the speed of Bullets when they are fired.
 * If bullets have a {@link #bulletSpeed} value of 200, and a `bulletSpeedVariance` of 50
 * then the actual speed of the Bullets will be between 150 and 250 pixels per second.
 * @type {number}
 * @default
 */
  get bulletSpeedVariance(){
    return this._bulletSpeedVariance;
  }
  set bulletSpeedVariance(value){
    this._bulletSpeedVariance = value;

    validateConfig(this, 'bulletSpeedVariance');
  }

  /**
 * If you've set {@link #bulletKillType} to `consts.KILL_LIFESPAN` this controls the amount
 * of lifespan the Bullets have set on launch. The value is given in milliseconds.
 * When a Bullet hits its lifespan limit it will be automatically killed.
 * @type {number}
 * @default
 */
  get bulletLifespan(){
    return this._bulletLifespan;
  }
  set bulletLifespan(value){
    this._bulletLifespan = value;

    validateConfig(this, 'bulletLifespan');
  }

  /**
 * If you've set {@link #bulletKillType} to `consts.KILL_DISTANCE` this controls the distance
 * the Bullet can travel before it is automatically killed. The distance is given in pixels.
 * @type {number}
 * @default
 */
  get bulletKillDistance() {
    return this._bulletKillDistance;
  }
  set bulletKillDistance(value) {
    this._bulletKillDistance = value;

    validateConfig(this, 'bulletKillDistance');
  }

  /**
 * This is the amount of {@link Phaser.Physics.Arcade.Body#gravity} added to the Bullets physics body when fired.
 * Gravity is expressed in pixels / second / second.
 * @type {Phaser.Math.Vector2}
 */
  get bulletGravity() {
    return this._bulletGravity;
  }
  set bulletGravity(value) {
    this._bulletGravity = value;

    validateConfig(this, 'bulletGravity');
  }

  /**
 * Bullets can optionally adjust their rotation in-flight to match their velocity.
 * This can create the effect of a bullet 'pointing' to the path it is following, for example
 * an arrow being fired from a bow, and works especially well when added to {@link #bulletGravity}.
 * @type {boolean}
 * @default
 */
  get bulletRotateToVelocity() {
    return this._bulletRotateToVelocity;
  }
  set bulletRotateToVelocity(value) {
    this._bulletRotateToVelocity = value;

    validateConfig(this, 'bulletRotateToVelocity');
  }

  /**
 * The Texture Key that the Bullets use when rendering.
 * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
 * @type {string}
 * @default
 */
  get bulletKey() {
    return this._bulletKey;
  }
  set bulletKey(value) {
    this._bulletKey = value;

    validateConfig(this, 'bulletKey');
  }

  /**
 * The Texture Frame that the Bullets use when rendering.
 * Changing this has no effect on bullets in-flight, only on newly spawned bullets.
 * @type {string|integer}
 * @default
 */
  get bulletFrame() {
    return this._bulletFrame;
  }
  set bulletFrame(value) {
    this._bulletFrame = value;

    validateConfig(this, 'bulletFrame');
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

    validateConfig(this, 'bulletClass');
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

    validateConfig(this, 'bulletCollideWorldBounds');
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

    validateConfig(this, 'bulletKillType');
  }

  /**
 * This Rectangle defines the bounds that are used when determining if a Bullet should be killed or not.
 * It's used in combination with {@link #bulletKillType} when that is set to either `consts.KILL_WEAPON_BOUNDS`
 * or `consts.KILL_STATIC_BOUNDS`. If you are not using either of these kill types then the bounds are ignored.
 * If you are tracking a Sprite or Point then the bounds are centered on that object every frame.
 *
 * @type {Phaser.Geom.Rectangle}
 */
  get bounds() {
    return this._bounds;
  }
  set bounds(value) {
    this._bounds = value;

    validateConfig(this, 'bounds');
  }

  /**
 * The Rectangle used to calculate the bullet bounds from.
 *
 * @type {Phaser.Geom.Rectangle}
 * @private
 */
  get bulletBounds() {
    return this._bulletBounds;
  }
  set bulletBounds(value) {
    this._bulletBounds = value;

    validateConfig(this, 'bulletBounds');
  }

  /**
 * This array stores the frames added via @link #setBulletFrames.
 *
 * @type {Array}
 * @protected
 */
  get bulletFrames() {
    return this._bulletFrames;
  }
  set bulletFrames(value) {
    this._bulletFrames = value;

    validateConfig(this, 'bulletFrames');
  }

  /**
 * The index of the frame within {@link #bulletFrames} that is currently being used.
 * This value is only used if {@link #bulletFrameCycle} is set to `true`.
 * @type {number}
 * @private
 */
  get bulletFrameIndex() {
    return this._bulletFrameIndex;
  }
  set bulletFrameIndex(value) {
    this._bulletFrameIndex = value;

    validateConfig(this, 'bulletFrameIndex');
  }

  /**
 * The Sprite currently being tracked by the Weapon, if any.
 * This is set via the {@link #trackSprite} method.
 *
 * @type {Phaser.GameObjects.Sprite|Object}
 */
  get trackedSprite() {
    return this._trackedSprite;
  }
  set trackedSprite(value) {
    this._trackedSprite = value;

    validateConfig(this, 'trackedSprite');
  }

  /**
 * The Pointer currently being tracked by the Weapon, if any.
 * This is set via the {@link #trackPointer} method.
 *
 * @type {Phaser.Input.Pointer}
 */
  get trackedPointer() {
    return this._trackedPointer;
  }
  set trackedPointer(value) {
    this._trackedPointer = value;

    validateConfig(this, 'trackedPointer');
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
  get multiFire() {
    return this._multiFire;
  }
  set multiFire(value) {
    this._multiFire = value;

    validateConfig(this, 'multiFire');
  }

  /**
 * If the Weapon is tracking a Sprite, should it also track the Sprites rotation?
 * This is useful for a game such as Asteroids, where you want the weapon to fire based
 * on the sprites rotation.
 *
 * @type {boolean}
 * @default
 */
  get trackRotation() {
    return this._trackRotation;
  }
  set trackRotation(value) {
    this._trackRotation = value;

    validateConfig(this, 'trackRotation');
  }

  /**
 * The Track Offset is a Vector2 object that allows you to specify a pixel offset that bullets use
 * when launching from a tracked Sprite or Pointer. For example if you've got a bullet that is 2x2 pixels
 * in size, but you're tracking a Sprite that is 32x32, then you can set `trackOffset.x = 16` to have
 * the bullet launched from the center of the Sprite.
 *
 * @type {Phaser.Math.Vector2}
 */
  get trackOffset() {
    return this._trackOffset;
  }
  set trackOffset(value) {
    this._trackOffset = value;

    validateConfig(this, 'trackOffset');
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
  resumeAll() {
    this.bullets.children.each(child => {
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
      bullet.setData('bulletManager', this);
    } else {
      bullet = this.bullets.getFirstDead(false);
    }

    if (bullet) {
      bullet.prepare(fromX, fromY);
      bullet.setData({
        fromX,
        fromY,
        killType: this.bulletKillType,
        killDistance: this.bulletKillDistance,
        rotateToVelocity: this.bulletRotateToVelocity,
      });

      if (this.bulletKillType === consts.KILL_LIFESPAN) {
        bullet.setData('timeEvent', this.scene.time.addEvent({
          delay: this.bulletLifespan,
          callback: bullet.kill,
          callbackScope: bullet,
        }));
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
  setBulletFrames(min, max, selectionMethod) {
    if (selectionMethod === undefined) {
      selectionMethod = consts.BULLET_FRAME_STABLE;
    }
    if (
      typeof selectionMethod !== 'number' ||
      selectionMethod < consts.BULLET_FRAME_STABLE ||
      selectionMethod > consts.BULLET_FRAME_RANDOM
    ) {
      log(`Invalid bullet frame selection method specified: ${selectionMethod}`, this.logLevel);
    }

    if (min > max) {
      log(`min frame (${min}) must be <= max frame (${max})`, this.logLevel);
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
