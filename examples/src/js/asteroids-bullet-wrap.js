const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('bullet', 'assets/sprites/shmup-bullet.png');
  this.load.image('ship', 'assets/sprites/thrust_ship.png');
  // Load the plugin
  this.load.script('WeaponPlugin', './WeaponPlugin.js');
}

function create() {
  // Install the plugin
  this.plugins.installScenePlugin(
    'WeaponPlugin',
    WeaponPlugin.WeaponPlugin,
    'weapons',
    this
  );

  //  Creates 30 bullets, using the 'bullet' graphic
  this.weapon = this.add.weapon(30, 'bullet');

  // Enable physics debugging for the bullets
  this.weapon.debugPhysics = true;

  //  The bullets will be automatically killed when they are 2000ms old
  this.weapon.bulletKillType = WeaponPlugin.consts.KillType.KILL_LIFESPAN;
  this.weapon.bulletLifespan = 2000;

  //  The speed at which the bullet is fired
  this.weapon.bulletSpeed = 600;

  //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
  this.weapon.fireRate = 100;

  //  Wrap bullets around the world bounds to the opposite side
  this.weapon.bulletWorldWrap = true;

  this.sprite = this.add.sprite(400, 300, 'ship');

  this.physics.add.existing(this.sprite);

  this.sprite.body.setDrag(70);
  this.sprite.body.maxVelocity.set(200);

  //  Tell the Weapon to track the 'player' Sprite
  //  With no offsets from the position
  //  But the 'true' argument tells the weapon to track sprite rotation
  this.weapon.trackSprite(this.sprite, 0, 0, true);

  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (this.cursors.up.isDown) {
    /*this.physics.arcade.accelerationFromRotation(this.sprite.rotation, 300, this.sprite.body.acceleration);
    this.sprite.body.acceleration.x

       /* if (speed === undefined) { speed = 60; }
        point = point || new Phaser.Point();

        return point.setToPolar(rotation, speed);*/
    this.sprite.body.acceleration.setToPolar(this.sprite.rotation, 300);
  } else {
    this.sprite.body.acceleration.set(0);
  }

  if (this.cursors.left.isDown) {
    this.sprite.body.angularVelocity = -300;
  } else if (this.cursors.right.isDown) {
    this.sprite.body.angularVelocity = 300;
  } else {
    this.sprite.body.angularVelocity = 0;
  }

  if (this.cursors.space.isDown) {
    console.log('weapon fire');
    this.weapon.fire();
  }

  this.physics.world.wrap(this.sprite, 16);
}
