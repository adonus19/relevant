import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class NotesService {
  private notes: { date: string, note: string }[] = [];

  constructor(private storage: Storage) { }

  addNote(note: string, date: string) {
    if (note && note.trim()) {
      const newNote = { note: note, date: date }
      this.notes.push(newNote);
      this.storage.set('notes', this.notes)
        .then()
        .catch(error => {
          this.notes.splice(this.notes.indexOf(newNote), 1);
          return error;
        })
    }
  }

  loadNotes() {
    return this.notes.slice();
  }

  getNotes() {
    return this.storage.get('notes')
      .then((notes: { date: string, note: string }[]) => {
        this.notes = notes != null ? notes : [];
        return this.notes.slice();
      })
      .catch(error => {
        return error;
      });
  }

  editNote(note: string, date: string, index: number) {
    this.deleteNote(index);
    this.addNote(note, date);
  }

  deleteNote(index: number) {
    const currentNote = this.notes[index];
    this.notes.splice(index, 1);
    this.storage.set('notes', this.notes)
      .then()
      .catch(error => {
        this.addNote(currentNote.note, currentNote.date);
      });
  }
}
