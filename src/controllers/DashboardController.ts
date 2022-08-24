import { AccessRights, ISessionToken } from '../models/AuthenticationModel';
import { User } from '../models/DataModels';
import { DataService } from '../services/DataService';
import { BaseController } from './BaseController';
import { LinkTextValue } from './Decorators';

export class DashboardController extends BaseController {
  private sessionToken: ISessionToken | undefined;

  private searchArea: HTMLInputElement | undefined;

  private searchResultArea: HTMLDivElement | undefined;

  private dataService: DataService = new DataService();

  private selectedLabel: HTMLLabelElement | undefined;

  private selectedUser: User | undefined;

  private errorLabel = this.createElement('label');

  @LinkTextValue('errorLabel')
  private errorLabelText = '';

  public setSessionToken(sessionToken: ISessionToken) {
    this.sessionToken = sessionToken;
  }

  public createView(): HTMLDivElement {
    this.createElement('h2', 'Dashboard Controller');
    if (this.sessionToken) {
      this.createElement('label', `welcome ${this.sessionToken.username}.`);
      this.insertBreak();
      this.generateButtons();
    } else {
      this.errorLabelText = 'please go the public parts of the application';
    }


    this.errorLabel.id = 'errorLabel';
    this.errorLabel.style.color = 'red';
    return this.container;
  }

  private generateButtons() {
    if (this.sessionToken) {
      for (const access of this.sessionToken.accessRights) {
        this.createElement('button', AccessRights[access], async () => {
          this.triggerAction(access);
        });
      }
      if (this.sessionToken.accessRights.includes(AccessRights.READ)) {
        this.insertBreak();
        this.createElement('label', 'Search: ');
        this.searchArea = this.createElement('input');
        this.searchResultArea = this.createElement('div');
      }
    }
  }

  private async triggerAction(access: AccessRights) {
    switch (access) {
      case AccessRights.READ:
        // eslint-disable-next-line no-case-declarations
        const users = await this.dataService.findByName(
          this.sessionToken!.tokenId,
          this.searchArea!.value);
        this.searchResultArea!.innerHTML = '';
        if (!users || users.length === 0) {
          this.errorLabelText = 'No users found';
        } else {
          this.errorLabelText = '';
          for (const user of users) {
            const label = this.createElement('label', JSON.stringify(user));
            label.onclick = () => {
              label.classList.toggle('selectedLabel');
              this.selectedUser = user;
              this.selectedLabel = label;
            };
            this.searchResultArea!.append(label);
            this.searchResultArea!.append(
              document.createElement('br'),
            );
          }
        }
        break;
      case AccessRights.DELETE:
        if (this.selectedUser) {
          await this.dataService.deleteUser(
            this.sessionToken!.tokenId,
            this.selectedUser,
          );
          this.selectedLabel!.innerHTML = '';
        }
        break;
      default:
        break;
    }
  }
}