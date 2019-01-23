import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { CalendarEvent } from '../../models/event';
import { NgForm } from '@angular/forms';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.event = this.navParams.get('event');
      this.imageUrl = this.event.imageUrl;
      this.eventTitle = this.event.title;
      this.eventDescription = this.event.description;
      this.eventDate = this.event.date;
      this.startTime = this.event.timeStart;
      this.endTime = this.event.timeEnd;
      this.eventLocation = this.event.location;
    }
  }

  getImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    this.camera.getPicture(options)
      .then(ImageData => {
        this.imageUrl = `data:image/jpeg;base64,${ImageData}`;
      })
      .catch(error => console.log(error));
  }

  submit(form: NgForm) {
    console.log(form.value, this.imageUrl);
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
