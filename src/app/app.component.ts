import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SermonsPage } from '../pages/sermons/sermons';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  loginPage: any = LoginPage;
  sermonsPage: any = SermonsPage;
  isBrowser = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
    console.log(platform.platforms());
    const platforms = platform.platforms();

    if (platforms.indexOf('mobile')) {
      this.isBrowser = true;
    }
    // TODO: install and initialize Firebase
    // TODO: use firebase to check authState

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  load(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout() {
    // not enabled yet
    // this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.sermonsPage);
  }
}

