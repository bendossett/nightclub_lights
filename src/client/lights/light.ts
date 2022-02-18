import { Vector3 } from "../types/Vector3";
import { Delay } from "../utils";

export class Light {
  protected model: string;
  protected offModel?: string;
  protected anim?: string;
  protected animDict: string;

  protected position: Vector3;
  protected rotation: Vector3;

  protected entity: number;
  protected offEntity?: number;

  protected isOn: boolean;

  constructor(model: string, offModel: string | null, anim: string | null, animDict: string, position: Vector3, rotation: Vector3) {
    this.model = model;
    if (offModel) this.offModel = offModel;
    if (anim) this.anim = anim;
    this.animDict = animDict;
    this.position = position;
    this.rotation = rotation;

    this.loadModelsAndAnims()
      .then((res: boolean) => {
        if (res) {
          this.createObjects(false);
          this.isOn = false;
          this.on(true);
        } else {
          console.log('Error loading models and animations');
        }
      });
  }

  private async loadModelsAndAnims(): Promise<boolean> {
    let count = 0;

    RequestModel(this.model);
    while (count < 500 && !HasModelLoaded(this.model)) {
      await Delay(1);
      count++;
    }
    if (count >= 500) {
      console.log(`Failed to load model ${this.model}`);
      return false;
    }

    if (this.offModel) {
      count = 0;
      RequestModel(this.offModel);
      while (count < 500 && !HasModelLoaded(this.offModel)) {
        await Delay(1);
        count++;
      }
      if (count >= 500) {
        console.log(`Failed to load model ${this.offModel}`);
        return false;
      }
    }

    if (!this.anim) return true;

    count = 0;
    RequestAnimDict(this.animDict);
    while (count < 500 && !HasAnimDictLoaded(this.animDict)) {
      await Delay(1);
      count++;
    }
    if (count >= 500) {
      console.log(`Failed to load anim dict ${this.animDict}`);
      return false;
    }
    return true;
  }

  protected async createObjects(reloadModelsAndAnims: boolean): Promise<void> {
    if (reloadModelsAndAnims) {
      await this.loadModelsAndAnims();
    }

    if (this.entity) {
      DeleteEntity(this.entity);
    }

    this.entity = CreateObjectNoOffset(this.model, this.position.x, this.position.y, this.position.z, false, false, false);    
    SetEntityRotation(this.entity, this.rotation.x, this.rotation.y, this.rotation.z, 2, true);

    if (this.offModel) {
      this.offEntity = CreateObjectNoOffset(this.offModel, this.position.x, this.position.y, this.position.z, false, false, false);
      SetEntityRotation(this.offEntity, this.rotation.x, this.rotation.y, this.rotation.z, 2, true);
    }
  }

  public on(restartAnim: boolean): void {
    if (this.isOn) return; // Already on

    if (this.anim && restartAnim) {
      PlayEntityAnim(this.entity, this.anim, this.animDict, 1.0, true, true, false, 0, 0);
    }

    SetEntityAlpha(this.entity, 254, 0);

    if (this.offEntity) {
      SetEntityAlpha(this.offEntity, 0, 0);
    }

    this.isOn = true;
  }

  public off(): void {
    if (!this.isOn) return; // Already off

    SetEntityAlpha(this.entity, 0, 0);

    if (this.offEntity) {
      SetEntityAlpha(this.offEntity, 254, 0);
    }

    this.isOn = false;
  }

  public getPosition(): Vector3 {
    return this.position;
  }

  public setPosition(position: Vector3): void {
    SetEntityCoords(this.entity, position.x, position.y, position.z, false, false, false, false);
    if (this.offEntity)
      SetEntityCoords(this.offEntity, position.x, position.y, position.z, false, false, false, false);
  }

  public getRotation(): Vector3 {
    return this.rotation;
  }

  public setRotation(rotation: Vector3): void {
    SetEntityRotation(this.entity, rotation.x, rotation.y, rotation.z, 2, true);
    if (this.offEntity)
      SetEntityRotation(this.offEntity, rotation.x, rotation.y, rotation.z, 2, true);
  }

  public getEntity(): number {
    return this.entity;
  }
}