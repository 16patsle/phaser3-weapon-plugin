enum Consts {
  /**
   * A {@link #bulletKillType} constant that stops the bullets from ever being destroyed automatically.
   */
  KILL_NEVER = 0,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when their {@link #bulletLifespan} expires.
   */
  KILL_LIFESPAN = 1,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets after they
   * exceed the {@link #bulletDistance} from their original firing position.
   */
  KILL_DISTANCE = 2,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link #bounds} rectangle.
   */
  KILL_WEAPON_BOUNDS = 3,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link Phaser.Camera#bounds} rectangle.
   */
  KILL_CAMERA_BOUNDS = 4,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link Phaser.World#bounds} rectangle.
   */
  KILL_WORLD_BOUNDS = 5,

  /**
   * A {@link #bulletKillType} constant that automatically kills the bullets
   * when they leave the {@link #bounds} rectangle.
   */
  KILL_STATIC_BOUNDS = 6,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face up.
   */
  ANGLE_UP = 270,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face down.
   */
  ANGLE_DOWN = 90,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face left.
   */
  ANGLE_LEFT = 180,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face right.
   */
  ANGLE_RIGHT = 0,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face north east.
   */
  ANGLE_NORTH_EAST = 315,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face north west.
   */
  ANGLE_NORTH_WEST = 225,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face south east.
   */
  ANGLE_SOUTH_EAST = 45,

  /**
   * The Angle (in degrees) a Game Object needs to be set to in order to face south west.
   */
  ANGLE_SOUTH_WEST = 135,

  /**
   * When selecting a bullet frame the same frame should always be used. This
   * is the default value.
   */
  BULLET_FRAME_STABLE = 0,

  /**
   * When selecting a bullet frame the next frame should be used
   */
  BULLET_FRAME_CYCLE = 1,

  /**
   * When selecting a bullet frame a random frame should be used.
   */
  BULLET_FRAME_RANDOM = 2,
}

export default Consts;
