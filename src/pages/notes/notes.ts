import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NoteCreateDetailPage } from '../note-create-detail/note-create-detail';
import { NotesService } from '../../services/notes';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage implements OnInit {
  notes: { date: string, note: string }[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private notesService: NotesService) {

  }

  ngOnInit() {
    console.log(`is this being triggered?`);
    this.notesService.getNotes()
      .then((notes: { date: string, note: string }[]) => {
        this.notes = notes;
      })
  }

  ionViewWillEnter() {
    this.notes = this.notesService.loadNotes();
  }

  newNote() {
    this.navCtrl.push(NoteCreateDetailPage);
  }

  viewNote(note: { date: string, note: string }, index: number) {
    this.navCtrl.push(NoteCreateDetailPage, { note: note.note, date: note.date, mode: 'edit', index: index });
  }

  deleteNote(index: number) {
    this.notesService.deleteNote(index);
    this.notes = this.notesService.loadNotes();
  }

}
