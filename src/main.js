/**
 * @author       Patrick Sletvold
 * @author       jdotr <https://github.com/jdotrjs>
 * @author       Richard Davey
 * @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
 */
import Weapon from './Weapon';
import Bullet from './Bullet';
import consts from './consts';

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
class WeaponPlugin extends Phaser.Plugins.ScenePlugin {
  /**
   * @param {Phaser.Scene} scene - A reference to the Phaser.Scene instance.
   * @param {Phaser.Plugins.PluginManager} pluginManager - A reference to the
   *  Phaser.Plugins.PluginManager instance.
   */
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.weapons = [];

    // Register our new Game Object type
    // pluginManager.registerGameObject('weapon', this.add);
  }

  add(bulletLimit, key, frame, group, weaponClass) {
    if (!weaponClass) {
      weaponClass = Weapon;
    }
    const weapon = new weaponClass(this.scene, bulletLimit, key, frame, group);

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
  start() {
    this.systems.events.on('postrender', this.postRender, this);
  }

  /**
   * If this is a Scene Plugin (i.e. installed into a Scene) then this method is called when the Scene boots.
   * By this point the plugin properties `scene` and `systems` will have already been set.
   * In here you can listen for Scene events and set-up whatever you need for this plugin to run.
   * @returns {void}
   */
  boot() {
    const eventEmitter = this.systems.events;

    //  Listening to the following events is entirely optional,
    //  although we would recommend cleanly shutting down and destroying at least.
    //  If you don't need any of these events then remove the listeners and the relevant methods too.

    eventEmitter.on('preupdate', this.preUpdate, this);
    eventEmitter.on('update', this.update, this);
    eventEmitter.on('postupdate', this.postUpdate, this);

    eventEmitter.on('pause', this.pause, this);
    eventEmitter.on('resume', this.resume, this);

    eventEmitter.on('sleep', this.sleep, this);
    eventEmitter.on('wake', this.wake, this);

    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  }

  //  Called every Scene step - phase 1
  preUpdate(time, delta) {
    // Empty
  }

  /**
   * Internal update method, called by the PluginManager.
   *
   * @protected
   * @param {number} time - Current game time
   * @param {number} delta - Time since last call
   * @returns {void}
   */
  update(time, delta) {
    this.weapons.forEach(weapon => {
      weapon.update();
    });
  }

  //  Called every Scene step - phase 3
  postUpdate(time, delta) {
    // Empty
  }

  /**
   * Internal update method, called by the PluginManager.
   *
   * @protected
   * @returns {void}
   */
  postRender() {
    this.weapons.forEach(weapon => {
      weapon.postRender();
    });
  }

  //  Called when a Scene is paused. A paused scene doesn't have its Step run, but still renders.
  pause() {
    // Empty
  }

  //  Called when a Scene is resumed from a paused state.
  resume() {
    // Empty
  }

  //  Called when a Scene is put to sleep.
  //  A sleeping scene doesn't update or render, but isn't destroyed or shutdown. preUpdate events still fire.
  sleep() {
    // Empty
  }

  //  Called when a Scene is woken from a sleeping state.
  wake() {
    // Empty
  }

  //  Called when a Scene shuts down,
  //  it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
  shutdown() {
    // Empty
  }

  /**
   * Destroys this Weapon.
   * You must release everything in here, all references, all objects, free it all up.
   * @returns {void}
   */
  destroy() {
    this.pluginManager = null;
    this.game = null;
    this.scene = null;
    this.systems = null;
  }
}

WeaponPlugin.Weapon = Weapon;
WeaponPlugin.Bullet = Bullet;

WeaponPlugin.consts = consts;

//  Make sure you export the plugin for webpack to expose

export default WeaponPlugin;
