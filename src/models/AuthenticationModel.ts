export enum AccessRights {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export interface ISessionToken {
  tokenId: string;
  username: string;
  valid: boolean;
  expirationTime: Date;
  accessRights: AccessRights[]
}
