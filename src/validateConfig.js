import consts from './consts';

export default function validateConfig(weapon, property){
  if (['bulletWorldWrap', 'bulletKillType'].includes(property) && weapon.bulletWorldWrap && (weapon.bulletKillType === consts.KILL_WORLD_BOUNDS || weapon.bulletKillType === consts.KILL_WEAPON_BOUNDS)){
    console.warn('Warning: KILL_WORLD_BOUNDS and KILL_WEAPON_BOUNDS does not work well with bulletWorldWrap set to true.');
  }
  if (['bulletKillType', 'bulletLifespan'].includes(property) && weapon.bulletKillType === consts.KILL_LIFESPAN && weapon.bulletLifespan <= 0) {
    throw new Error('Invalid bulletLifespan; must be > 0');
  }
  if (['fireLimit', 'fireRate', 'fireRateVariance', 'bulletAngleVariance', 'bulletSpeedVariance','bulletKillDistance'].includes(property) && weapon[property] < 0){
    throw new Error('Invalid ' + property + '; must be >= 0');
  }
}