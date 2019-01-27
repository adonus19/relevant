import { Component } from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { CalendarEvent } from '../../models/event';
import { EventCreatePage } from '../event-create/event-create';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: CalendarEvent;
  startAMPM: string = 'PM';
  endAMPM: string = 'PM'
  displayStartTime: string;
  displayEndTime: string;
  isAdmin = false;
  index: number;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.event = this.navParams.get('event');
    this.isAdmin = this.navParams.get('admin');
    this.index = this.navParams.get('index');
    if (this.event.timeStart < '11:59') {
      this.startAMPM = 'AM';
      if (this.event.timeStart > '09:59') {
        this.displayStartTime = this.event.timeStart;
      } else {
        const splitTime = this.event.timeStart.split('');
        splitTime.shift();
        this.displayStartTime = `${splitTime[0]}:${splitTime[2]}${splitTime[3]}`;
      }
    }
    if (this.event.timeEnd < '11:59') {
      this.endAMPM = 'AM';
      if (this.event.timeEnd < '09:59') {
        const splitTime = this.event.timeEnd.split('');
        splitTime.shift();
        this.displayEndTime = `${splitTime[0]}:${splitTime[2]}${splitTime[3]}`;
      } else {
        this.displayEndTime = this.event.timeEnd;
      }
    }
    if (this.event.timeStart > '12:59') {
      const splitTime = this.event.timeStart.split(':');
      const tempTime = (+splitTime[0]) - 12;
      this.displayStartTime = `${tempTime}:${splitTime[1]}`;
    }
    if (this.event.timeEnd > '12:59') {
      const splitTime = this.event.timeEnd.split(':');
      const tempTime = (+splitTime[0]) - 12;
      this.displayEndTime = `${tempTime}:${splitTime[1]}`;
    }
  }

  editEvent() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(EventCreatePage, { mode: 'Edit', event: this.event, index: this.index });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
