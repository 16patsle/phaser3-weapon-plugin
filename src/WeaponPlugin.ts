/**
 * @author       Patrick Sletvold
 * @author       jdotr <https://github.com/jdotrjs>
 * @author       Richard Davey
 * @license      {@link https://github.com/16patsle/phaser3-weapon-plugin/blob/master/LICENSE|MIT License}
 */
import Weapon from './Weapon';

type WeaponConfig = {
  /**
   * The quantity of bullets to seed the Weapon with. If -1 it will set the pool to automatically expand.
   */
  bulletLimit?: number;

  /**
   * The Game.cache key of the image that this Sprite will use.
   */
  key?: string;

  /**
   * If the Sprite image contains multiple frames you can specify which one to use here.
   */
  frame?: string;

  /**
   * Optional Group to add the object to. If not specified it will be added to the World group.
   */
  group?: Phaser.GameObjects.Group;

  /**
   * Optional custom class for the Weapon.
   */
  weaponClass?: typeof Weapon;
};

/**
 * The Weapon Plugin provides the ability to easily create a bullet pool
 * and manager.
 *
 * Weapons fire {@link Bullet} objects, which are essentially Sprites with a
 * few extra properties. The Bullets are enabled for Arcade Physics. They do
 * not currently work with Impact or Matter Physics.
 *
 * The Bullets are created inside of {@link Weapon.bullets weapon.bullets}, which is
 * a {@link https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html Group} instance. Anything you can usually do
 * with a Group, like iterate it, etc can be done to the bullets Group too.
 *
 * Bullets can have textures and even animations. You can control the speed at
 * which they are fired, the firing rate, the firing angle, and even set things
 * like gravity for them.
 *
 * A small example, using add.weapon, assumed to be running from within a
 * {@link https://photonstorm.github.io/phaser3-docs/Phaser.Types.Scenes.html#.SceneCreateCallback Phaser.Scene.create} method:
 *
 * ```javascript
 * var weapon = this.add.weapon(10, 'bullet');
 * weapon.fireFrom.setPosition(300, 300);
 * this.input.on(Phaser.Input.Events.POINTER_DOWN, weapon.fire, this);
 * ```
 */
class WeaponPlugin extends Phaser.Plugins.ScenePlugin {
  weapons: Weapon[];

  /**
   * @param scene - A reference to the {@link https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html Phaser.Scene} instance.
   * @param pluginManager - A reference to the
   *  {@link https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.PluginManager.html PluginManager} instance.
   */
  constructor(
    scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager
  ) {
    super(scene, pluginManager);

    this.weapons = [];

    // Register our new Game Object type
    pluginManager.registerGameObject(
      'weapon',
      this.add.bind(this),
      (config: WeaponConfig) => {
        return this.add(
          config.bulletLimit,
          config.key,
          config.frame,
          config.group,
          config.weaponClass
        );
      }
    );
  }

  /**
   *
   * @param bulletLimit - The quantity of bullets to seed the Weapon with. If -1 it will set the pool to automatically expand.
   * @param key - The Game.cache key of the image that this Sprite will use.
   * @param frame - If the Sprite image contains multiple frames you can specify which one to use here.
   * @param group - Optional Group to add the object to.
   * @param weaponClass - Optional custom class for the Weapon.
   * @returns The weapon that was created
   */
  add(
    bulletLimit?: number,
    key?: string,
    frame?: string,
    group?: Phaser.GameObjects.Group,
    weaponClass: typeof Weapon = Weapon
  ): Weapon {
    const weapon = new weaponClass(this.scene, bulletLimit, key, frame, group);

    this.weapons.push(weapon);

    return weapon;
  }

  /**
   * Called by the PluginManager when this plugin is started.
   * If a plugin is stopped, and then started again, this will get called again.
   * Typically called immediately after `BasePlugin.init`.
   */
  start(): void {
    this.systems.events.on(
      Phaser.Core.Events.POST_RENDER,
      this.postRender,
      this
    );
  }

  /**
   * If this is a Scene Plugin (i.e. installed into a Scene) then this method is called when the Scene boots.
   * By this point the plugin properties `scene` and `systems` will have already been set.
   * In here you can listen for Scene events and set-up whatever you need for this plugin to run.
   */
  boot(): void {
    const eventEmitter = this.systems.events;

    eventEmitter.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    eventEmitter.on(Phaser.Core.Events.DESTROY, this.destroy, this);
  }

  /**
   * Internal update method, called by the PluginManager.
   */
  protected update(): void {
    this.weapons.forEach(weapon => {
      weapon.update();
    });
  }

  /**
   * Internal update method, called by the PluginManager.
   */
  protected postRender(): void {
    this.weapons.forEach(weapon => {
      weapon.postRender();
    });
  }

  /**
   * Destroys this Weapon.
   * You must release everything in here, all references, all objects, free it all up.
   */
  destroy(): void {
    super.destroy();

    this.weapons.forEach(weapon => {
      weapon.destroy();
    });
  }
}

export default WeaponPlugin;
