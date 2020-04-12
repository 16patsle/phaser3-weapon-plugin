/**
 * This event is dispatched when a weapon is fired.
 *
 * @event WEAPON_FIRE
 *
 * @param {Bullet} bullet - The bullet that was fired
 * @param {Weapon} weapon - The weapon emitting the event
 * @param {number} speed - The speed of the bullet
 */
export const WEAPON_FIRE = 'fire';

/**
 * This event is dispatched when the weapon's fire limit is reached.
 *
 * @event WEAPON_FIRE_LIMIT
 *
 * @param {Weapon} weapon - The weapon emitting the event
 * @param {number} fireLimist - The fire limit
 */
export const WEAPON_FIRE_LIMIT = 'firelimit';

/**
 * This event is dispatched when a bullet is killed.
 *
 * @event BULLET_KILL
 *
 * @param {Bullet} bullet - The bullet that was killed
 * @param {Weapon} weapon - The weapon emitting the event
 */
export const BULLET_KILL = 'kill';

export default {
  WEAPON_FIRE,
  WEAPON_FIRE_LIMIT,
  BULLET_KILL,
};
