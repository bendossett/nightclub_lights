import { Delay } from './utils';
import { Vector3 } from './types/Vector3';
import { LaserCombo } from './lights/laser-combo/laser-combo';
import { LaserColor, LaserPattern } from './lights/laser/laser-types';
import { PanelColor, PanelPattern } from './lights/panel/panel-types';

let laserCombo = null;

RegisterCommand('test', async (source, args, raw) => {
  const pos = Vector3.fromArray(GetEntityCoords(PlayerPedId(), false));
  const rot = Vector3.fromArray(GetEntityRotation(PlayerPedId(), 2));

  laserCombo = new LaserCombo(LaserColor.PURPLE_CYAN, LaserPattern.C, PanelColor.PURPLE_PURPLE, PanelPattern.A, pos, rot);

}, false);

RegisterCommand('testsetcolor', async (source, args, raw) => {
  laserCombo.laser.setColor(LaserColor.PURPLE_WHITE);
}, false);

RegisterCommand('testsetpattern', async (source, args, raw) => {
  laserCombo.laser.setPattern(LaserPattern.B);
}, false);


RegisterCommand('teston', async (source, args, raw) => {
  laserCombo.on(false);
}, false);

RegisterCommand('testoff', async (source, args, raw) => {
  laserCombo.off();
}, false);