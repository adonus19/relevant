import { Component } from '@angular/core';
import { SermonsPage } from '../sermons/sermons';
import { EventsPage } from '../events/events';
import { NotesPage } from '../notes/notes';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  sermonsPage = SermonsPage;
  eventsPage = EventsPage;
  notesPage = NotesPage;
  givingPage: string = 'GivingPage';

  constructor() {
  }

}
