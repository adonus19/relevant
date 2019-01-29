import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GivingPage } from './giving';

@NgModule({
  declarations: [
    GivingPage
  ],
  imports: [
    IonicPageModule.forChild(GivingPage)
  ],
  providers: [InAppBrowser]
})
export class GivingPageModule { }
