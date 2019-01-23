import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  signup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up!'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(user => {
        loading.dismiss();
        this.alertCtrl.create({
          title: `Account Created`,
          message: `Your account has been created!`,
          buttons: [{
            text: `Ok`,
            handler: () => {
              this.navCtrl.setRoot(TabsPage);
            }
          }]
        }).present();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  goToLogin() {
    this.navCtrl.pop();
  }
}
