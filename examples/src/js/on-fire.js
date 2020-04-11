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
  this.load.image('bullet', 'assets/sprites/bullet.png');
  this.load.image('ship', 'assets/sprites/shmup-ship.png');
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

  //  Creates 3 bullets, using the 'bullet' graphic
  this.weapon = this.add.weapon(3, 'bullet');

  // Enable physics debugging for the bullets
  this.weapon.debugPhysics = true;

  //  The bullet will be automatically killed when it leaves the world bounds
  console.log(`setting bulletKillType`);
  this.weapon.bulletKillType = WeaponPlugin.consts.KILL_WORLD_BOUNDS;

  //  Because our bullet is drawn facing up, we need to offset its rotation:
  this.weapon.bulletAngleOffset = 90;

  //  The speed at which the bullet is fired
  this.weapon.bulletSpeed = 400;

  this.sprite = this.add.sprite(320, 500, 'ship');

  //  Tell the Weapon to track the 'player' Sprite
  this.weapon.trackSprite(this.sprite);

  this.cursors = this.input.keyboard.createCursorKeys();

  this.weapon.eventEmitter.on('fire', () => {
    // Teleport sprite to random location
    this.sprite.x = Math.random() * this.game.renderer.width;
    this.sprite.y = Math.random() * this.game.renderer.height;
  });
}

function update() {
  if (this.cursors.space.isDown) {
    console.log('weapon fire');
    this.weapon.fire();
  }
}
