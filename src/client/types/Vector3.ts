export class Vector3 {
  x: number;
  y: number;
  z: number;

  static fromIndividual(x: number, y: number, z: number) : Vector3 {
    const result = new Vector3();
    result.x = x;
    result.y = y;
    result.z = z;
    return result;
  }

  static fromArray(xyz: number[]) : Vector3 {
      const result = new Vector3();
      result.x = xyz[0];
      result.y = xyz[1];
      result.z = xyz[2];
      return result;
  }
}