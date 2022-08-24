import { BaseController } from './BaseController';

export function LinkTextValue(elementId: string) {
  return function (target: BaseController, key: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let property = (target as any)[key];

    const getter = () => {
      return property;
    };
    const setter = (newValue: string) => {
      const element = document.getElementById(elementId);
      property = newValue;
      if (element) {
        element.innerHTML = newValue;
        if (newValue) {
          element.style.visibility = 'visible';
        } else {
          element.style.visibility = 'hidden';
        }
      }
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      configurable: true,
      enumerable: true,
    });
  };
}