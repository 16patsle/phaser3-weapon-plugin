<a name="Consts"></a>

## Consts
The constants for the Weapon Plugin

**Kind**: global class  

* [Consts](#Consts)
    * [.KILL_NEVER](#Consts+KILL_NEVER) : <code>integer</code>
    * [.KILL_LIFESPAN](#Consts+KILL_LIFESPAN) : <code>integer</code>
    * [.KILL_DISTANCE](#Consts+KILL_DISTANCE) : <code>integer</code>
    * [.KILL_WEAPON_BOUNDS](#Consts+KILL_WEAPON_BOUNDS) : <code>integer</code>
    * [.KILL_CAMERA_BOUNDS](#Consts+KILL_CAMERA_BOUNDS) : <code>integer</code>
    * [.KILL_WORLD_BOUNDS](#Consts+KILL_WORLD_BOUNDS) : <code>integer</code>
    * [.KILL_STATIC_BOUNDS](#Consts+KILL_STATIC_BOUNDS) : <code>integer</code>
    * [.ANGLE_UP](#Consts+ANGLE_UP) : <code>integer</code>
    * [.ANGLE_DOWN](#Consts+ANGLE_DOWN) : <code>integer</code>
    * [.ANGLE_LEFT](#Consts+ANGLE_LEFT) : <code>integer</code>
    * [.ANGLE_RIGHT](#Consts+ANGLE_RIGHT) : <code>integer</code>
    * [.ANGLE_NORTH_EAST](#Consts+ANGLE_NORTH_EAST) : <code>integer</code>
    * [.ANGLE_NORTH_WEST](#Consts+ANGLE_NORTH_WEST) : <code>integer</code>
    * [.ANGLE_SOUTH_EAST](#Consts+ANGLE_SOUTH_EAST) : <code>integer</code>
    * [.ANGLE_SOUTH_WEST](#Consts+ANGLE_SOUTH_WEST) : <code>integer</code>
    * [.BULLET_FRAME_STABLE](#Consts+BULLET_FRAME_STABLE) : <code>integer</code>
    * [.BULLET_FRAME_CYCLE](#Consts+BULLET_FRAME_CYCLE) : <code>integer</code>
    * [.BULLET_FRAME_RANDOM](#Consts+BULLET_FRAME_RANDOM) : <code>integer</code>

<a name="Consts+KILL_NEVER"></a>

### consts.KILL_NEVER : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that stops the bullets from ever being destroyed automatically.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+KILL_LIFESPAN"></a>

### consts.KILL_LIFESPAN : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that automatically kills the bullets
when their [#bulletLifespan](#bulletLifespan) expires.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+KILL_DISTANCE"></a>

### consts.KILL_DISTANCE : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that automatically kills the bullets after they
exceed the [#bulletDistance](#bulletDistance) from their original firing position.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+KILL_WEAPON_BOUNDS"></a>

### consts.KILL_WEAPON_BOUNDS : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that automatically kills the bullets
when they leave the [#bounds](#bounds) rectangle.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+KILL_CAMERA_BOUNDS"></a>

### consts.KILL_CAMERA_BOUNDS : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that automatically kills the bullets
when they leave the [Phaser.Camera#bounds](Phaser.Camera#bounds) rectangle.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+KILL_WORLD_BOUNDS"></a>

### consts.KILL_WORLD_BOUNDS : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that automatically kills the bullets
when they leave the [Phaser.World#bounds](Phaser.World#bounds) rectangle.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+KILL_STATIC_BOUNDS"></a>

### consts.KILL_STATIC_BOUNDS : <code>integer</code>
A [#bulletKillType](#bulletKillType) constant that automatically kills the bullets
when they leave the [#bounds](#bounds) rectangle.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_UP"></a>

### consts.ANGLE_UP : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face up.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_DOWN"></a>

### consts.ANGLE_DOWN : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face down.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_LEFT"></a>

### consts.ANGLE_LEFT : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face left.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_RIGHT"></a>

### consts.ANGLE_RIGHT : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face right.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_NORTH_EAST"></a>

### consts.ANGLE_NORTH_EAST : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face north east.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_NORTH_WEST"></a>

### consts.ANGLE_NORTH_WEST : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face north west.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_SOUTH_EAST"></a>

### consts.ANGLE_SOUTH_EAST : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face south east.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+ANGLE_SOUTH_WEST"></a>

### consts.ANGLE_SOUTH_WEST : <code>integer</code>
The Angle (in degrees) a Game Object needs to be set to in order to face south west.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+BULLET_FRAME_STABLE"></a>

### consts.BULLET_FRAME_STABLE : <code>integer</code>
When selecting a bullet frame the same frame should always be used. This
is the default value.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+BULLET_FRAME_CYCLE"></a>

### consts.BULLET_FRAME_CYCLE : <code>integer</code>
When selecting a bullet frame the next frame should be used

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
<a name="Consts+BULLET_FRAME_RANDOM"></a>

### consts.BULLET_FRAME_RANDOM : <code>integer</code>
When selecting a bullet frame a random frame should be used.

**Kind**: instance constant of [<code>Consts</code>](#Consts)  
