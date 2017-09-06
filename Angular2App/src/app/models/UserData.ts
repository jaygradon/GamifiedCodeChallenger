/**
 * Created by helen on 1/08/2017.
 */


export class UserData {
  id: number;
  userId: string;
  displayName: string;
  gold: number;
  goldSpent: number;
  serializeStorage: string;
  simValues: Array<SimulationValue>;
}

export class SimulationValue {
  id: number;
  xPos: number;
  yPos: number;
  rotation: string;
  tile: Tile;
}

export class Tile {
  id: number;
  code: number;
  cost: number;
  value: number;
  type: string;
  label: string;
}
