import { ISessionToken } from '../models/AuthenticationModel';

const baseUrl = 'http://ec2-54-144-234-100.compute-1.amazonaws.com:8080/';
const loginUrl = `${baseUrl}login`;

export class LoginService {
  public async login(username: string, password: string): Promise<ISessionToken | undefined> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    const result = await fetch(loginUrl, options);
    if (result.status === 201) {
      return result.json();
    } else {
      return undefined;
    }
  }
}