import { Delay } from './utils';
import { Vector3 } from './types/Vector3';
import { LaserCombo } from './lights/laser-combo/laser-combo';
import { LaserColor, LaserPattern } from './lights/laser/laser-types';
import { PanelColor, PanelPattern } from './lights/panel/panel-types';
import { Bands } from './lights/bands/bands';
import { BandsColor, BandsPattern } from './lights/bands/bands-types';
import { Scaffold } from './lights/scaffold/scaffold';
import { ScaffoldColor, ScaffoldPattern } from './lights/scaffold/scaffold-types';
import { Light } from './lights/light';


const scaffoldList = [
    {
        color: ScaffoldColor.PURPLE_CYAN,
        pattern: ScaffoldPattern.B,
        pos: Vector3.fromIndividual(720.7782592773438,527.510009765625,140.1400146484375),
        rot: Vector3.fromIndividual(0,0,107.95362091064453)
    }
]

const laserList = [
    {
        laserColor: LaserColor.PURPLE_CYAN,
        laserPattern: LaserPattern.BB,
        panelColor: PanelColor.PURPLE_PURPLE,
        panelPattern: PanelPattern.B,
        pos: Vector3.fromIndividual(678.343, 579.618, 135.351),
        rot: Vector3.fromIndividual(50.0,0,160.834)
    }
]

// setTick(async () => {
//   await Delay(1);
//   SetArtificialLightsState(true);
// });

const scaffolds: {[id: string]: Scaffold} = {};
const lasers: {[id: string]: LaserCombo} = {};
const bands: {[id: string]: Bands} = {};

RegisterCommand('test', async (source, args, raw) => {
  SetArtificialLightsState(true);

  for (const [i, s] of scaffoldList.entries()) {
    scaffolds['scaffold_' + i] = new Scaffold(s.color, s.pattern, s.pos, s.rot);
  }

  for (const [i, l] of laserList.entries()) {
    lasers['laser_' + i] = new LaserCombo(l.laserColor, l.laserPattern, l.panelColor, l.panelPattern, l.pos, l.rot);
  }

  for (const [k, scaffold] of Object.entries(scaffolds)) {
    scaffold.on(true);
  }

  for (const [k, laser] of Object.entries(lasers)) {
    laser.on(true);
  }

}, false);

RegisterCommand('testsetcolor', async (source, args, raw) => {
  console.log('args', args);
}, false);

RegisterCommand('testsetpattern', async (source, args, raw) => {
  console.log('args', args);
}, false);


RegisterCommand('teston', async (source, args, raw) => {
  for (const [k, scaffold] of Object.entries(scaffolds)) {
    scaffold.on(true);
  }
  for (const [k, laser] of Object.entries(lasers)) {
    laser.on(true);
  }
}, false);

RegisterCommand('testoff', async (source, args, raw) => {
  for (const [k, scaffold] of Object.entries(scaffolds)) {
    scaffold.off();
  }
  for (const [k, laser] of Object.entries(lasers)) {
    laser.off();
  }
}, false);

RegisterCommand('coords', (source, args, raw) => {
  emitNet('coords', GetEntityCoords(PlayerPedId(), false), GetEntityRotation(PlayerPedId(), 2), args[0]);
}, false);

let placing = false;
let entityBeingPlaced: Light;
let entityType: string;

setTick(async () => {
  await Delay(1);
  if (!placing) { 
    FreezeEntityPosition(PlayerPedId(), false);
    return;
  }
  FreezeEntityPosition(PlayerPedId(), true);

  const pos = entityBeingPlaced.getPosition();
  const rot = entityBeingPlaced.getRotation();

  if (IsControlPressed(0, 32)) {
    pos.x += 0.1;
  }
  if (IsControlPressed(0, 33)) {
    pos.x -= 0.1;
  }
  if (IsControlPressed(0, 34)) {
    pos.y += 0.1;
  }
  if (IsControlPressed(0, 35)) {
    pos.y -= 0.1;
  }
  if (IsControlPressed(0, 44)) {
    pos.z += 0.1;
  }
  if (IsControlPressed(0, 48)) {
    pos.z -= 0.1;
  }

  if (IsControlPressed(0, 111)) {
    rot.x += 0.2;
  }
  if (IsControlPressed(0, 110)) {
    rot.x -= 0.2;
  }
  if (IsControlPressed(0, 10)) {
    rot.y -= 0.2;
  }
  if (IsControlPressed(0, 11)) {
    rot.y += 0.2;
  }
  if (IsControlPressed(0, 108)) {
    rot.z -= 0.5;
  }
  if (IsControlPressed(0, 109)) {
    rot.z += 0.5;
  }

  entityBeingPlaced.setPosition(pos);
  entityBeingPlaced.setRotation(rot);
});

RegisterCommand('place', (source, args, raw) => {
  if (placing) {
    console.log("Already placing");
    return;
  }

  const toPlace: string = args[0];
  let entity;
  console.log('placing ' + toPlace);
  const coords = Vector3.fromArray(GetEntityCoords(PlayerPedId(), false));
  const rot = Vector3.fromArray(GetEntityRotation(PlayerPedId(), 2));

  switch (toPlace) {
    case 'scaffold':
      entity = new Scaffold(ScaffoldColor.PURPLE_CYAN, ScaffoldPattern.C, coords, rot);
      entityType = 'scaffold';
      break;
    case 'laser':
      entity = new LaserCombo(LaserColor.PURPLE_CYAN, LaserPattern.CC, PanelColor.PURPLE_PURPLE, PanelPattern.B, coords, rot);
      entityType = 'laser';
      break;
    case 'bands':
      entity = new Bands(BandsColor.ORANGE, BandsPattern.LIGHTNING, coords, rot);
      entityType = 'bands';
      break;
  }
  SetEntityAlpha(entity.entity, 150, 0);
  placing = true;
  entityBeingPlaced = entity;
}, false);

RegisterCommand('pause', (source, args, raw) => {
  if (!placing) return;
  placing = false;
}, false);

RegisterCommand('resume', (source, args, raw) => {
  if (placing) return;
  placing = true;
}, false);

RegisterCommand('finish', (source, args, raw) => {
  if (!placing) return;
  else placing = false;
  
  switch (entityType) {
    case 'scaffold':
      scaffolds['scaffold' + Object.keys(scaffolds).length] = entityBeingPlaced as Scaffold;
      break;
    case 'laser':
      lasers['laser' + Object.keys(lasers).length] = entityBeingPlaced as LaserCombo;
      break;
    case 'bands':
      bands['bands' + Object.keys(bands).length] = entityBeingPlaced as Bands;
      break;
  }
  console.log('placed');
}, false);

RegisterCommand('saveToFile', (source, args, raw) => {
  const data = {
    scaffolds: scaffolds,
    lasers: lasers,
    bands: bands
  };
  const json = JSON.stringify(data);
  emitNet('saveToFile', json);
}, false);