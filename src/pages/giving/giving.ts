import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-giving',
  templateUrl: 'giving.html',
})
export class GivingPage {
  rootPage: any = TabsPage;
  url: string = "https://app.clovergive.com/app/giving/clodo-relevantchurch";

  constructor(private iab: InAppBrowser) {
  }

  openGiving() {
    const browser = this.iab.create(this.url, '_blank');
  }

}
