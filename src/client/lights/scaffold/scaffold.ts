import { Vector3 } from "../../types/Vector3";
import { Delay } from "../../utils";
import { Light } from "../light";
import { ScaffoldColor, ScaffoldPattern } from "./scaffold-types";

export class Scaffold extends Light {
  scaffoldColor: ScaffoldColor;
  scaffoldPattern: ScaffoldPattern;

  constructor(scaffoldColor: ScaffoldColor,
              scaffoldPattern: ScaffoldPattern,
              position: Vector3,
              rotation: Vector3) {
//ba_rig_dj_01_lights_02_b ba_rig_dj_02_lights_02_a_uv_2
    const model = `ba_rig_dj_${scaffoldColor}_lights_02_${scaffoldPattern}`;
    const anim = `ba_rig_dj_${scaffoldColor}_lights_02_${scaffoldPattern}_uv_2`;

    rotation.z += 90.0;

    super(model, 'ba_rig_dj_all_lights_02_off', anim, 'ba_prop_battle_lights_03', position, rotation);

    this.scaffoldColor = scaffoldColor;
    this.scaffoldPattern = scaffoldPattern;
  }

  public async setColor(color: ScaffoldColor): Promise<void> {
    this.scaffoldColor = color;
    this.model = `ba_rig_dj_${this.scaffoldColor}_lights_02_${this.scaffoldPattern}`;
    this.anim  = `ba_rig_dj_${this.scaffoldColor}_lights_02_${this.scaffoldPattern}_uv_2`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }

  public async setPattern(pattern: ScaffoldPattern): Promise<void> {
    this.scaffoldPattern = pattern;

    this.model = `ba_rig_dj_${this.scaffoldColor}_lights_02_${this.scaffoldPattern}`;
    this.anim  = `ba_rig_dj_${this.scaffoldColor}_lights_02_${this.scaffoldPattern}_uv_2`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }
}