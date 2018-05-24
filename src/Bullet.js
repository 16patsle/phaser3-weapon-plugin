/**
 * @author       Patrick Sletvold
 * @author       jdotr <https://github.com/jdotrjs>
 * @author       Richard Davey
 * @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
 */

const consts = require('./consts');

let bulletID = 0

class Bullet extends Phaser.GameObjects.Sprite {
  /**
   * Create a new `Bullet` object. Bullets are used by the `Weapon` class, and are normal Sprites,
   * with a few extra properties in the data object to handle Weapon specific features.
   *
   * @param {Phaser.Scene} scene - A reference to the currently running scene.
   * @param {number} x - The x coordinate (in world space) to position the Particle at.
   * @param {number} y - The y coordinate (in world space) to position the Particle at.
   * @param {string} key - This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
   * @param {string|number} frame - If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
   */
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.bulletID = bulletID
    bulletID++
    this.scene.physics.add.existing(this);

    this.data = {
      bulletManager: null,
      fromX: 0,
      fromY: 0,
      bodyDirty: true,
      rotateToVelocity: false,
      killType: 0,
      killDistance: 0,
    };
  }

  /**
   * Kills the Bullet, freeing it up for re-use by the Weapon bullet pool.
   * Also dispatches the `Weapon.onKill` signal.
   * @returns {Bullet} This instance of the bullet class
   */
  kill() {
    console.log(`Killing bullet ${this.bulletID}`)
    // alive no longer does stuff in v3?
    // this.alive = false;
    this.active = false;
    this.visible = false;

    this.data.bulletManager.eventEmitter.emit('kill', this);

    return this;
  }

  /**
   * Updates the Bullet, killing as required.
   * @returns {Bullet} This instance of the bullet class
   */
  update() {
    if (!this.active) {
      // this was previously a check to this.exists
      return;
    }

    if (this.data.killType > consts.KILL_LIFESPAN) {
      if (this.data.killType === consts.KILL_DISTANCE) {
        if (
          new Phaser.Math.Vector2(this.data.fromX, this.data.fromY).distance(this) >
          this.data.killDistance
        ) {
          this.kill();
        }
      } else if (
        !Phaser.Geom.Intersects.RectangleToRectangle(
          this.data.bulletManager.bulletBounds,
          // this is janky af. I don't recall the actual method to pull a bounds
          // rect from a v3 arcade body. getBounds() didn't work so I brute
          // forced it.
          new Phaser.Geom.Rectangle(
            this.body.x,
            this.body.y,
            this.body.width,
            this.body.height,
          )
        )
      ) {
        this.kill();
      }
    }

    if (this.data.rotateToVelocity) {
      this.rotation = this.body.velocity.atan();
    }

    if (this.data.bulletManager.bulletWorldWrap) {
      this.scene.physics.world.bounds.wrap(
        this,
        this.data.bulletManager.bulletWorldWrapPadding
      );
    }
  }
}

module.exports = Bullet;
