import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { SignupPage } from '../signup/signup';
import { AuthService } from '../../services/auth';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'testuser@test.com';
  password: string = '123456';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: `Logging you in...`
    });
    loading.present();
    this.authService.login(form.value.email, form.value.password)
      .then(user => {
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

}
