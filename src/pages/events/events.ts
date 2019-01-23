import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CalendarEvent } from '../../models/event';
import { EventsService } from '../../services/events';
import { Subscription } from 'rxjs/Subscription';
import { EventDetailPage } from '../event-detail/event-detail';
import { AuthService } from '../../services/auth';
import { EventCreatePage } from '../event-create/event-create';



@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage implements OnInit {
  events: CalendarEvent[];
  eventsSubscription: Subscription;
  isAdmin = false;

  constructor(private navCtrl: NavController, private eventsService: EventsService, private modalCtrl: ModalController,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.eventsSubscription = this.eventsService.eventsChanged.subscribe(allEvents => {
      this.events = allEvents;
    });
    this.events = this.eventsService.getEvents();
    this.authService.isAdmin()
      .then(idTokenResult => {
        console.log(idTokenResult);
        if (idTokenResult.claims.admin) {
          this.isAdmin = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  newEvent() {
    this.navCtrl.push(EventCreatePage, { mode: 'New' });
  }

  showEvent(event: CalendarEvent) {
    const modal = this.modalCtrl.create(EventDetailPage, { event: event });
    modal.present();
  }

  getImgUrl(imageUrl: string) {
    // console.log({ "background-image": `url(${imageUrl})` });
    return { "background-image": `url(${imageUrl})` };
  }

}
