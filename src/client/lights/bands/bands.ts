import { Vector3 } from "../../types/Vector3";
import { Delay } from "../../utils";
import { Light } from "../light";
import { BandsColor, BandsPattern } from "./bands-types";

export class Bands extends Light {
  bandsColor: BandsColor;
  bandsPattern: BandsPattern;

  constructor(bandsColor: BandsColor,
              bandsPattern: BandsPattern,
              position: Vector3,
              rotation: Vector3) {

    const model = `ba_rig_dj_${bandsColor}_lights_03_${bandsPattern}`;
    const anim = `ba_rig_dj_${bandsColor}_lights_03_${bandsPattern}_uv_2`;

    super(model, 'ba_rig_dj_all_lights_03_off', anim, 'ba_prop_battle_lights_04', position, rotation);

    this.bandsColor = bandsColor;
    this.bandsPattern = bandsPattern;
  }

  public async setColor(color: BandsColor): Promise<void> {
    this.bandsColor = color;
    this.model = `ba_rig_dj_${this.bandsColor}_lights_03_${this.bandsPattern}`;
    this.anim  = `ba_rig_dj_${this.bandsColor}_lights_03_${this.bandsPattern}_uv_2`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }

  public async setPattern(pattern: BandsPattern): Promise<void> {
    this.bandsPattern = pattern;

    this.model = `ba_rig_dj_${this.bandsColor}_lights_03_${this.bandsPattern}`;
    this.anim  = `ba_rig_dj_${this.bandsColor}_lights_03_${this.bandsPattern}_uv_2`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }
}