
/**
 * Extended by Auth.  Cast to this object to remove the token and expiration data info.
 */
export class User {

  constructor(
    public id: string,
    public email: string
  ) {}

}
