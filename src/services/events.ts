import { Injectable } from "@angular/core";
import { CalendarEvent } from "../models/event";
import { Subject } from "rxjs/Subject";

@Injectable()
export class EventsService {
  // TODO: Add local storage ability

  private events: CalendarEvent[] = [
    { title: 'Youth Night', description: 'Youth Event', date: '2019-01-23', timeStart: '06:00', timeEnd: '08:00', location: 'YMCA', imageUrl: '../assets/DSC_0163.JPG' },
    { title: 'Night of Worship', description: `Let's worship God!`, date: '2019-01-23', timeStart: '18:00', timeEnd: '20:00', location: 'YMCA', imageUrl: '../assets/DSC_0171.JPG' },
    { title: `Men's Retreat`, description: `Find God in the Wilderness`, date: '2019-01-23', timeStart: '19:00', timeEnd: '20:00', location: 'Mountains', imageUrl: '../assets/DSC_0176.JPG' }
  ];
  eventsChanged = new Subject<CalendarEvent[]>();

  addEvent(title: string, description: string, date: string, timeStart: string, timeEnd: string, location: string, imageUrl: string) {
    const event = new CalendarEvent(title, description, date, timeStart, timeEnd, location, imageUrl);
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  getEvents() {
    return this.events.slice();
  }

  deleteEvent(index: number) {
    // TODO: add local storage removal
    const currentEvent = this.events[index]
    this.events.splice(index, 1);
  }
}
