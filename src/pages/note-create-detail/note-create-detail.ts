import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes';

@Component({
  selector: 'page-note-create-detail',
  templateUrl: 'note-create-detail.html',
})
export class NoteCreateDetailPage {
  note: string;
  date: string;
  edit: boolean = false;
  index: number;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
  @ViewChild('input') textareaSize: ElementRef

  constructor(public navParams: NavParams, private notesService: NotesService) {
    if (this.navParams.get('mode') === 'edit') {
      this.edit = true;
      this.date = this.navParams.get('date');
      this.note = this.navParams.get('note');
      this.index = this.navParams.get('index');
    } else {
      const now = Date.now();
      this.date = `${this.months[new Date(now).getMonth()]} ${new Date(now).getDate()}, ${new Date(now).getFullYear()}`;
    }
  }

  ionViewDidEnter() {
    if (this.edit) {
      this.resize();
    }
  }

  ionViewWillLeave() {
    if (this.edit) {
      this.getDate();
      this.notesService.editNote(this.note, this.date, this.index);
    } else {
      this.notesService.addNote(this.note, this.date);
    }
  }

  resize() {
    const element = this.textareaSize['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    const scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.textareaSize['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  getDate() {
    const now = Date.now();
    this.date = `${this.months[new Date(now).getMonth()]} ${new Date(now).getDate()}, ${new Date(now).getFullYear()}`;
  }

}
