/**
 * @author       Patrick Sletvold
 * @author       jdotr <https://github.com/jdotrjs>
 * @author       Richard Davey
 * @license      {@link https://github.com/16patsle/phaser3-weapon-plugin/blob/master/LICENSE|MIT License}
 */
import { Weapon } from './Weapon';

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
 * The Weapon Plugin provides the ability to easily create a {@link Weapon} with
 * its own bullet pool and manager.
 * @see {@link Weapon} for a more detailed explanation.
 *
 * @example
 * A small example on how to install the plugin, assumed to be running from within a
 * {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Scenes.SceneCreateCallback Phaser.Scene.create} method:
 *
 * ```javascript
 * // Install it into a scene
 * this.plugins.installScenePlugin(
 *   'WeaponPlugin',
 *   WeaponPlugin,
 *   'weapons',
 *   this
 * );
 * ```
 */
export class WeaponPlugin extends Phaser.Plugins.ScenePlugin {
  weapons: Weapon[];

  /**
   * @param scene - A reference to the {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene} instance.
   * @param pluginManager - A reference to the
   *  {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Plugins.PluginManager PluginManager} instance.
   * @param pluginKey - The key under which this plugin has been installed into the Scene Systems.
   */
  constructor(
    scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager,
    pluginKey: string
  ) {
    super(scene, pluginManager, pluginKey);

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
