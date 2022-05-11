/* eslint-disable no-underscore-dangle */

export class User {
  constructor(
    private _token: string,
    public userId: number,
    public userName: string,
    public firstName: string,
    public lastName: string,
    public email: string
  ) {}

  get token() {
    return this._token;
  }
}
