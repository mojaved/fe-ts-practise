import { LoginService } from '../services/LoginService';
import { BaseController } from './BaseController';
import { LinkTextValue } from './Decorators';

export class LoginController extends BaseController {
  private loginService: LoginService = new LoginService();

  private title = this.createElement('h2', 'Please Login');

  private breakElement = this.createElement('br');

  private lblUserName = this.createElement('label', 'Username');

  private txtUserName = this.createElement('input');

  private breakElement2 = this.createElement('br');

  private lblPassword = this.createElement('label', 'Password');

  private txtPassword = this.createElement('input');

  private breakElement3 = this.createElement('br');

  private lblError = this.createElement('label');

  @LinkTextValue('lblError')
  private lblErrorText = '';

  private breakElement4 = this.createElement('br');

  private button = this.createElement('button', 'Login', async () => {
    if (!this.txtUserName.value || !this.txtPassword.value) {
      this.lblErrorText = 'Please enter correct username and password';
    } else {
      const result = await this.loginService.login(this.txtUserName.value,
        this.txtPassword.value);
      if (result) {
        this.lblErrorText = '';
        this.router.switchToDashboard(result);
      } else {
        this.lblErrorText = 'Wrong username or password';
      }
    }
  });

  public createView(): HTMLDivElement {
    this.lblError.id = 'lblError';
    this.txtPassword.type = 'password';
    this.lblError.style.color = 'red';
    return this.container;
  }
}