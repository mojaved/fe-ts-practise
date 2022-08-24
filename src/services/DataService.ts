import { User } from '../models/DataModels';

const baseUrl = 'http://localhost:8080/';
const userUrl = `${baseUrl}users`;

export class DataService {
  public async findByName(token: string, nameQuery: string): Promise<User[]> {
    const url = `${userUrl}?name=${nameQuery}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    };
    const result = await fetch(url, options);
    const users = await result.json();
    return users;
  }

  public async deleteUser(authorization: string, user: User): Promise<void> {
    const url = userUrl + '?id=' + user.id;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: authorization,
      },
    };
    await fetch(url, options);
  }
}