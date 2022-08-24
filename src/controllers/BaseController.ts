import { Router } from "../Router";

export abstract class BaseController {

    protected container = document.createElement('div');
    protected router: Router;
    public abstract createView(): HTMLDivElement;

    constructor(router: Router) {
        this.router = router;
    }
    protected createElement<K extends keyof HTMLElementTagNameMap>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (elementType: K, innerText?: string, action?: any): HTMLElementTagNameMap[K] {
        const element = document.createElement(elementType);
        if (innerText) {
            element.innerText = innerText;
        }
        if (action) {
            element.onclick = action;
        }
        this.container.append(element);
        return element;
    }
    protected insertBreak() {
        this.createElement('br');
    }
}