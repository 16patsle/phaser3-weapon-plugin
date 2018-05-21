module.exports = {
  /**
   * A {@link #bulletKillType} constant that stops the bullets from ever being destroyed automatically.
   * @constant
   * @type {integer}
   */
  KILL_NEVER: 0,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets when their {@link #bulletLifespan} expires.
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
   * A {@link #bulletKillType} constant that automatically kills the bullets when they leave the {@link #bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_WEAPON_BOUNDS: 3,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets when they leave the {@link Phaser.Camera#bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_CAMERA_BOUNDS: 4,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets when they leave the {@link Phaser.World#bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_WORLD_BOUNDS: 5,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets when they leave the {@link #bounds} rectangle.
   * @constant
   * @type {integer}
   */
  KILL_STATIC_BOUNDS: 6,
};
