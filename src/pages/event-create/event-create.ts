import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';

import { CalendarEvent } from '../../models/event';
import { NgForm } from '@angular/forms';
import { EventsService } from '../../services/events';
import { EventsPage } from '../events/events';

@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage implements OnInit {
  mode = 'New';
  event: CalendarEvent;
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventLocation: string;
  imageUrl: string = '';
  eventId: string;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private eventsService: EventsService, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.index = this.navParams.get('index');
      this.event = this.navParams.get('event');
      this.imageUrl = this.event.imageUrl;
      this.eventTitle = this.event.title;
      this.eventDescription = this.event.description;
      this.eventDate = this.event.date;
      this.startTime = this.event.timeStart;
      this.endTime = this.event.timeEnd;
      this.eventLocation = this.event.location;
      this.eventId = this.event.id;
    }
  }

  getImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    this.camera.getPicture(options)
      .then(ImageData => {
        this.imageUrl = `data:image/png;base64,${ImageData}`;
      })
      .catch(error => console.log(error));
  }

  submit(form: NgForm) {
    if (this.mode === 'Edit') {
      this.eventsService.editEvent(form.value, this.imageUrl, this.eventId)
        .then(() => {
          this.clearForm();
        })
        .catch(error => {
          this.alertCtrl.create({
            title: 'Event Edit Failed',
            message: error.message,
            buttons: ['Ok']
          }).present();
        });
    } else {
      this.eventsService.createEvent(form.value, this.imageUrl)
        .then(() => {
          this.clearForm();
        })
        .catch(error => {
          console.log(error);
          this.alertCtrl.create({
            title: 'Event Upload Failed',
            message: error.message,
            buttons: ['Ok']
          }).present();
        });
    }
  }

  deleteEvent() {
    this.alertCtrl.create({
      title: `About to delete!`,
      message: `Are you sure you want to delete this event?`,
      buttons: [
        { text: 'Cancel' },
        {
          text: 'DELETE',
          handler: () => {
            const loading = this.loadingCtrl.create({
              content: `Deleting event...`
            });
            loading.present();
            this.eventsService.deleteEvent(this.eventId, this.index).then(() => {
              loading.dismiss();
              this.navCtrl.popAll();
              this.toastCtrl.create({
                message: `Event Successfully Deleted`,
                duration: 3000
              }).present();
            }).catch(error => {
              this.alertCtrl.create({
                title: 'Event Deletion Failed',
                message: error.message,
                buttons: ['Ok']
              }).present();
            });
          }
        }
      ]
    }).present();
  }

  private clearForm() {
    this.imageUrl = null;
    this.eventTitle = null;
    this.eventDescription = null;
    this.eventDate = null;
    this.startTime = null;
    this.endTime = null;
    this.eventLocation = null;
    this.navCtrl.pop();
  }

}
