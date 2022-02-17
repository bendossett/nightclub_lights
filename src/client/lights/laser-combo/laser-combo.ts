import { LaserColor, LaserPattern } from "../laser/laser-types";
import { PanelColor, PanelPattern } from "../panel/panel-types";
import { Delay } from "../../utils";
import { Vector3 } from '../../types/Vector3';
import { Light } from "../light";
import { Laser } from "../laser/laser";
import { Panel } from "../panel/panel";


export class LaserCombo extends Light {
  laser: Laser;
  panel: Panel;

  constructor(laserColor: LaserColor,
              laserPattern: LaserPattern,
              panelColor: PanelColor,
              panelPattern: PanelPattern,
              position: Vector3,
              rotation: Vector3) {
    
    super('ba_rig_dj_all_lights_04_off', null, 'ba_prop_battle_lights_05', position, rotation);
    
    this.laser = new Laser(laserColor, laserPattern, position, rotation);
    this.panel = new Panel(panelColor, panelPattern, position, rotation);
    this.isOn = false;
    this.on(true);
  }

  public on(restartAnim: boolean): void {
    if (this.isOn) return; // Already on

    this.laser.on(restartAnim);
    this.panel.on(restartAnim);
    SetEntityAlpha(this.entity, 0, 0);

    this.isOn = true;
  }

  public off(): void {
    if (!this.isOn) return; // Already off

    this.laser.off();
    this.panel.off();
    SetEntityAlpha(this.entity, 254, 0);

    this.isOn = false;
  }
}