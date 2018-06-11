export default {
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
  BULLET_FRAME_RANDOM: 2,
};
