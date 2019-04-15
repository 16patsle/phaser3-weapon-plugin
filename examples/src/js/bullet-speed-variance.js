var config = {
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

var game = new Phaser.Game(config);

function preload() {
  this.load.image('bullet', 'assets/sprites/bullet.png');
  this.load.image('ship', 'assets/sprites/shmup-ship.png');
  this.load.scenePlugin('WeaponPlugin', './WeaponPlugin.js', null, 'weapons');
}

function create() {
  //  Creates 30 bullets, using the 'bullet' graphic
  this.weapon = this.add.weapon(30, 'bullet');

  // Enable physics debugging for the bullets
  this.weapon.debugPhysics = true;

  //  The bullet will be automatically killed when it leaves the world bounds
  console.log(`setting bulletKillType`);
  this.weapon.bulletKillType = WeaponPlugin.consts.KILL_WORLD_BOUNDS;

  //  Because our bullet is drawn facing up, we need to offset its rotation:
  this.weapon.bulletAngleOffset = 90;

  //  The speed at which the bullet is fired
  this.weapon.bulletSpeed = 400;

  //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
  this.weapon.fireRate = 60;

  //  Add a variance to the bullet speed by +- this value
  this.weapon.bulletSpeedVariance = 200;

  this.sprite = this.add.sprite(320, 500, 'ship');

  this.physics.add.existing(this.sprite);

  this.sprite.body.setDrag(70);
  this.sprite.body.maxVelocity.set(200);

  //  Tell the Weapon to track the 'player' Sprite
  this.weapon.trackSprite(this.sprite);

  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  this.sprite.body.velocity.x = 0;

  if (this.cursors.left.isDown) {
    this.sprite.body.velocity.x = -200;
  } else if (this.cursors.right.isDown) {
    this.sprite.body.velocity.x = 200;
  }

  if (this.cursors.space.isDown) {
    console.log('weapon fire');
    this.weapon.fire();
  }
}
