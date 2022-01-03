export interface IUser {
  id: number;
  dateCreated: number;
  username: string;
  password: string;
}

export interface ISession {
  id: number;
  dateCreated: number;
  username: string;
  /**
   * Time stamp indicating when the sesison was created, in Unix Miliseconds
   */
  issued: number;

  /**
   * TimeStamp indicating when the session should expire, in Unix Miliseconds
   */
  expiresIn: number;
}

export type PartialSession = Omit<ISession, "issued" | "expiresIn">;

export interface EncodeResult {
  token: string;
  expiresIn: string;
  issued: string;
}

export type DecodedResult = 
|{
    type:"valid";
    session:ISession;
}
|{
    type:"integrity-error"; 
}
|{
    type: "invalid-token";
}

export type ExpirationStatus = "expired" | "active" | "grace";