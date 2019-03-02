import { browser, element, by } from 'protractor';

/* tslint:disable */
export class AngularElectronPage {
  static navigateTo(route: string) {
    return browser.get(route);
  }
}
