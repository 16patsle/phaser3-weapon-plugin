import consts from './consts';

let bulletID = 0;

class Bullet extends Phaser.GameObjects.Sprite {
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
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.bulletID = bulletID;
    bulletID++;
    this.scene.physics.add.existing(this);

    this.setDataEnabled();

    this.setData({
      timeEvent: null,
      bulletManager: null,
      fromX: 0,
      fromY: 0,
      bodyDirty: true,
      rotateToVelocity: false,
      killType: 0,
      killDistance: 0,
      bodyBounds: new Phaser.Geom.Rectangle(),
    });
  }

  /**
   * Prepares this bullet to be fired and interact with the rest of the scene
   * again.
   * @returns {void}
   */
  prepare(x, y) {
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
  kill() {
    // Reproduce Phaser.Physics.Arcade.Components.Enable.disableBody because
    // we can't assume that the bullet class has it built in.
    this.body.stop();
    this.body.enable = false;
    this.setActive(false);
    this.setVisible(false);
    this.body.debugShowBody = false;
    this.body.debugShowVelocity = false;

    // TODO: potentially we don't need to destroy the time event and we can
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
  update() {
    if (!this.active) {
      // this was previously a check to this.exists
      return;
    }

    if (this.getData('killType') > consts.KILL_LIFESPAN) {
      if (this.getData('killType') === consts.KILL_DISTANCE) {
        if (
          new Phaser.Math.Vector2(this.getData('fromX'), this.getData('fromY')).distance(this) >
          this.getData('killDistance')
        ) {
          this.kill();
        }
      } else if (
        !Phaser.Geom.Intersects.RectangleToRectangle(
          this.getData('bulletManager').bulletBounds,
          this.body.getBounds(this.getData('bodyBounds'))
        )
      ) {
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
}

export default Bullet;
