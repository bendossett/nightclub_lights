import { Vector3 } from "../../types/Vector3";
import { Delay } from "../../utils";
import { Light } from "../light";
import { PanelColor, PanelPattern } from "./panel-types";

export class Panel extends Light {
  panelColor: PanelColor;
  panelPattern: PanelPattern;

  constructor(panelColor: PanelColor,
              panelPattern: PanelPattern,
              position: Vector3,
              rotation: Vector3) {

    const model = `ba_rig_dj_${panelColor}_lights_04_${panelPattern}_scr`;
    const anim = `ba_rig_dj_${panelColor}_lights_04_${panelPattern}_scr_uv_4`;

    // rotation.z += 90.0;

    super(model, null, anim, 'ba_prop_battle_lights_05', position, rotation);

    this.panelColor = panelColor;
    this.panelPattern = panelPattern;
  }

  public async setColor(color: PanelColor): Promise<void> {
    this.panelColor = color;
    this.model = `ba_rig_dj_${this.panelColor}_lights_04_${this.panelPattern}_scr`;
    this.anim  = `ba_rig_dj_${this.panelColor}_lights_04_${this.panelPattern}_scr_uv_4`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }

  public async setPattern(pattern: PanelPattern): Promise<void> {
    this.panelPattern = pattern;
    this.model = `ba_rig_dj_${this.panelColor}_lights_04_${this.panelPattern}_scr`;
    this.anim  = `ba_rig_dj_${this.panelColor}_lights_04_${this.panelPattern}_scr_uv_4`;

    await this.createObjects(true);

    PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
  }
}