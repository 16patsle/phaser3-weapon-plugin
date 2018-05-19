/**
 * @author       Patrick Sletvold
 * @author       Richard Davey
 * @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
 */

/**
 * Create a new `Bullet` object. Bullets are used by the `Phaser.Weapon` class, and are normal Sprites,
 * with a few extra properties in the data object to handle Weapon specific features.
 *
 * @param {Phaser.Scene} scene - A reference to the currently running scene.
 * @param {number} x - The x coordinate (in world space) to position the Particle at.
 * @param {number} y - The y coordinate (in world space) to position the Particle at.
 * @param {string} key - This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {string|number} frame - If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);

    this.anchor.set(0.5);

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
    this.alive = false;
    this.visible = false;

    this.data.bulletManager.onKill.dispatch(this);

    return this;
  }

  /**
   * Updates the Bullet, killing as required.
   * @returns {Bullet} This instance of the bullet class
   */
  update() {
    if (!this.exists) {
      return;
    }

    if (this.data.killType > Phaser.Weapon.KILL_LIFESPAN) {
      if (this.data.killType === Phaser.Weapon.KILL_DISTANCE) {
        if (
          this.game.physics.arcade.distanceToXY(this, this.data.fromX, this.data.fromY, true) >
          this.data.killDistance
        ) {
          this.kill();
        }
      } else if (!this.data.bulletManager.bulletBounds.intersects(this)) {
        this.kill();
      }
    }

    if (this.data.rotateToVelocity) {
      this.rotation = this.body.velocity.atan();
    }

    if (this.data.bulletManager.bulletWorldWrap) {
      this.game.world.wrap(this, this.data.bulletManager.bulletWorldWrapPadding);
    }
  }
}

module.exports = Bullet;
