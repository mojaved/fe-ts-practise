import { DashboardController } from "./controllers/DashboardController";
import { LoginController } from "./controllers/LoginController";
import { MainController } from "./controllers/MainController";
import { ISessionToken } from "./models/AuthenticationModel";

export class Router {

    private mainElement = document.getElementById('main-container');
    public handleRequest() {
        console.log(`Handling request for: ${this.getRoute()}`)

        switch (this.getRoute()) {
            case '/login':
                this.switchToLoginView();
                break;
            case '/board':
                this.switchToDashboard(undefined);
                break;
            default:
                this.switchToMainView();
                break;
        }
    }
    public switchToLoginView() {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const loginController: LoginController = new LoginController(this);
            this.mainElement.append(loginController.createView());
        }
    }
    public switchToDashboard(sessionToken: ISessionToken | undefined) {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const dbController: DashboardController = new DashboardController(this);
            if(sessionToken){
                dbController.setSessionToken(sessionToken);
            }
            this.mainElement.append(dbController.createView());
        }
    }
    public switchToMainView() {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const mainController: MainController = new MainController(this);
            this.mainElement.append(mainController.createView());
        }
    }
    private getRoute(): string {
        return window.location.pathname;
    }
}