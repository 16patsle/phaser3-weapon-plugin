import consts from './consts';

function log(text, logLevel){
  if(logLevel === 'warn'){
    console.warn(text);
  } else if (logLevel === 'error'){
    throw new Error(text);
  }
}

export default function validateConfig(weapon, property){
  if (
    ['bulletWorldWrap', 'bulletKillType'].includes(property) && 
    weapon.bulletWorldWrap && 
    (weapon.bulletKillType === consts.KILL_WORLD_BOUNDS || 
      weapon.bulletKillType === consts.KILL_WEAPON_BOUNDS)
  ){
    log(
      'Warning: KILL_WORLD_BOUNDS and KILL_WEAPON_BOUNDS does not work well with bulletWorldWrap set to true.', 
      weapon.logLevel
    );
  }
  if (['bulletKillType', 'bulletLifespan'].includes(property) && 
  weapon.bulletKillType === consts.KILL_LIFESPAN && 
  weapon.bulletLifespan <= 0
  ) {
    log('Invalid bulletLifespan; must be > 0', weapon.logLevel);
  }
  if (
    ['fireLimit', 
      'fireRate', 
      'fireRateVariance', 
      'bulletAngleVariance', 
      'bulletSpeedVariance',
      'bulletKillDistance'].includes(property) && 
    weapon[property] < 0
  ){
    log('Invalid ' + property + '; must be >= 0', weapon.logLevel);
  }
}