<a name="WeaponPlugin"></a>

## WeaponPlugin
The Weapon Plugin provides the ability to easily create a bullet pool
and manager.

Weapons fire [Bullet](#Bullet) objects, which are essentially Sprites with a
few extra properties. The Bullets are enabled for Arcade Physics. They do
not currently work with Impact or Matter Physics.

The Bullets are created inside of [weapon.bullets](#bullets), which is
a [Phaser.GameObjects.Group](Phaser.GameObjects.Group) instance. Anything you can usually do
with a Group, such as move it around the display list, iterate it, etc can
be done to the bullets Group too.

Bullets can have textures and even animations. You can control the speed at
which they are fired, the firing rate, the firing angle, and even set things
like gravity for them.

A small example, using add.weapon, assumed to be running from within a
[Phaser.Scene#create](Phaser.Scene#create) method:

```javascript
var weapon = this.add.weapon(10, 'bullet');
weapon.fireFrom.set(300, 300);
this.input.onDown.add(weapon.fire, this); // Update this
```

**Kind**: global class  

* [WeaponPlugin](#WeaponPlugin)
    * [new WeaponPlugin(scene, pluginManager)](#new_WeaponPlugin_new)
    * _instance_
        * [.add(bulletLimit, key, frame, group, weaponClass)](#WeaponPlugin+add) ⇒ [<code>Weapon</code>](#Weapon)
    * _static_
        * [.Weapon](#WeaponPlugin.Weapon) : [<code>Weapon</code>](#Weapon)
        * [.Bullet](#WeaponPlugin.Bullet) : [<code>Bullet</code>](#Bullet)
        * [.consts](#WeaponPlugin.consts) : [<code>Consts</code>](#Consts)

<a name="new_WeaponPlugin_new"></a>

### new WeaponPlugin(scene, pluginManager)

| Param | Type | Description |
| --- | --- | --- |
| scene | <code>Phaser.Scene</code> | A reference to the Phaser.Scene instance. |
| pluginManager | <code>Phaser.Plugins.PluginManager</code> | A reference to the  Phaser.Plugins.PluginManager instance. |

<a name="WeaponPlugin+add"></a>

### weaponPlugin.add(bulletLimit, key, frame, group, weaponClass) ⇒ [<code>Weapon</code>](#Weapon)
**Kind**: instance method of [<code>WeaponPlugin</code>](#WeaponPlugin)  

| Param | Type | Description |
| --- | --- | --- |
| bulletLimit | <code>number</code> | Max numbor of bullets to be created |
| key | <code>String</code> | The texture key to use |
| frame | <code>String</code> | The frame to use, if using an atlas. |
| group | <code>Phaser.GameObjects.Group</code> | Weapon game objects will be added to this group. |
| weaponClass | [<code>Weapon</code>](#Weapon) | The custom weapon class to use. Should extend Weapon. |

<a name="WeaponPlugin.Weapon"></a>

### WeaponPlugin.Weapon : [<code>Weapon</code>](#Weapon)
Shortcut to the Weapon class

**Kind**: static property of [<code>WeaponPlugin</code>](#WeaponPlugin)  
<a name="WeaponPlugin.Bullet"></a>

### WeaponPlugin.Bullet : [<code>Bullet</code>](#Bullet)
Shortcut to the Bullet class

**Kind**: static property of [<code>WeaponPlugin</code>](#WeaponPlugin)  
<a name="WeaponPlugin.consts"></a>

### WeaponPlugin.consts : [<code>Consts</code>](#Consts)
The WeaponPlugin constants

**Kind**: static property of [<code>WeaponPlugin</code>](#WeaponPlugin)  
