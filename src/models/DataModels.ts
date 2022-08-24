export interface User {
  id: string,
  name: string,
  age: number,
  email: string,
  workingPosition: WorkingPosition
}

export enum WorkingPosition {
  JUNIOR,
  PROGRAMMER,
  SENIOR,
  EXPERT,
  MANAGER,
}