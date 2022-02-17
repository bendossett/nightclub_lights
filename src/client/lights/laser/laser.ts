import { Vector3 } from "../../types/Vector3";
import { Delay } from "../../utils";
import { Light } from "../light";
import { LaserColor, LaserPattern } from "./laser-types";

export class Laser extends Light {
  laserColor: LaserColor;
  laserPattern: LaserPattern;

  constructor(laserColor: LaserColor,
              laserPattern: LaserPattern,
              position: Vector3,
              rotation: Vector3) {

    const model = `ba_rig_dj_${laserColor}_lights_04_${laserPattern}`;
    const anim = `ba_rig_dj_${laserColor}_lights_04_${laserPattern}`;

    super(model, anim, 'ba_prop_battle_lights_05', position, rotation);

    this.laserColor = laserColor;
    this.laserPattern = laserPattern;
  }

  public async setColor(color: LaserColor): Promise<void> {
    this.laserColor = color;
    this.model = `ba_rig_dj_${this.laserColor}_lights_04_${this.laserPattern}`;
    this.anim  = `ba_rig_dj_${this.laserColor}_lights_04_${this.laserPattern}`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }

  public async setPattern(pattern: LaserPattern): Promise<void> {
    this.laserPattern = pattern;

    this.model = `ba_rig_dj_${this.laserColor}_lights_04_${this.laserPattern}`;
    this.anim  = `ba_rig_dj_${this.laserColor}_lights_04_${this.laserPattern}`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }
}