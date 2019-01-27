import { Injectable } from "@angular/core";
import { CalendarEvent } from "../models/event";
import { Subject } from "rxjs/Subject";
import * as firebase from 'firebase';
import { LoadingController, AlertController } from "ionic-angular";

@Injectable()
export class EventsService {
  // TODO: Add local storage ability

  private events: any[] = [
    // { title: 'Youth Night', description: 'Youth Event', date: '2019-01-23', timeStart: '06:00', timeEnd: '08:00', location: 'YMCA', imageUrl: '../assets/DSC_0163.JPG', id: 'kljhasdflkjhasdf' },
    // { title: 'Night of Worship', description: `Let's worship God!`, date: '2019-01-23', timeStart: '18:00', timeEnd: '20:00', location: 'YMCA', imageUrl: '../assets/DSC_0171.JPG', id: 'kjahsdfkljhsdf' },
    // { title: `Men's Retreat`, description: `Find God in the Wilderness`, date: '2019-01-23', timeStart: '19:00', timeEnd: '20:00', location: 'Mountains', imageUrl: '../assets/DSC_0176.JPG', id: 'kljawheliusad' }
  ];
  eventsChanged = new Subject<CalendarEvent[]>();

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  addEvent(title: string, description: string, date: string, timeStart: string, timeEnd: string, location: string, imageUrl: string, id: string) {
    const event = new CalendarEvent(title, description, date, timeStart, timeEnd, location, imageUrl, id);
    this.events.push(event);
    this.eventsChanged.next(this.events.slice());
  }

  getEvents() {
    this.events = [];
    const loading = this.loadingCtrl.create({
      content: `Loading Events...`
    });
    loading.present();
    const query = firebase.firestore().collection('events');
    query.onSnapshot((snapshot) => {
      let changedDocs = snapshot.docChanges();
      changedDocs.forEach(change => {
        if (change.type == 'added') {

        }
        if (change.type == 'modified') {
          for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].id == change.doc.id) {
              this.events[i] = change.doc;
            }
          }
        }
        if (change.type == 'removed') {

        }
      })
    });
    query.get().then(docs => {
      console.log(docs);
      docs.forEach(doc => {
        const event = doc.data();
        event.id = doc.id;
        this.events.push(event);
      });
      loading.dismiss();
      this.eventsChanged.next(this.events.slice());
    })
      .catch(error => {
        console.log(error);
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Error in getting Events',
          message: error.message,
          buttons: ['Ok']
        }).present();
      });
    return this.events.slice();
  }

  createEvent(form, imageUrl) {
    return firebase.firestore().collection('events').add({
      title: form.title,
      description: form.description,
      date: form.date,
      timeStart: form.timeStart,
      timeEnd: form.timeEnd,
      location: form.location
    })
      .then(async doc => {
        await this.uploadPic(doc.id, imageUrl);
      })
      .catch(error => {
        console.log(error);
      });
  }

  editEvent(form, imageUrl, eventId) {
    return firebase.firestore().collection('events').doc(eventId).update({
      title: form.title,
      description: form.description,
      date: form.date,
      timeStart: form.timeStart,
      timeEnd: form.timeEnd,
      location: form.location
    })
      .then(async doc => {
        console.log(imageUrl.split(','));
        if (imageUrl.split(',')[0] === 'data:image/png;base64') {
          await this.deleteAndUploadNewPic(eventId, imageUrl);
        }
        this.getEvents();
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteEvent(eventId: string, index: number) {
    return firebase.firestore().collection('events').doc(eventId).delete()
      .then(() => {
        const ref = firebase.storage().ref(`eventImages/${eventId}`);
        ref.delete().then(() => {
          this.events.splice(index, 1);
          this.eventsChanged.next(this.events.slice());
        })
          .catch(error => {
            console.log(error);
          });
      }).catch(error => console.log(error));
  }

  deleteAndUploadNewPic(postId: string, imageUrl: string) {
    return new Promise((resolve, reject) => {
      const ref = firebase.storage().ref(`eventImages/${postId}`);
      ref.delete().then(() => {
        resolve(this.uploadPic(postId, imageUrl));
      })
        .catch(error => {
          reject(error);
        });
    });
  }

  private uploadPic(postId: string, imageUrl: string) {
    return new Promise((resolve, reject) => {
      let loading = this.loadingCtrl.create({
        content: `Uploading event...`
      });
      loading.present();
      const ref = firebase.storage().ref(`eventImages/${postId}`);
      const uploadTask = ref.putString(imageUrl.split(',')[1], 'base64');
      uploadTask.on('state_changed', (taskSnapshot: any) => {
        const percentUpload = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100;
        loading.setContent(`Uploaded ${Math.round(percentUpload)}%`);
      }, error => {
        loading.dismiss();
        console.log(error);
      }, () => {
        console.log(`Upload is complete!`);
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          firebase.firestore().collection('events').doc(postId).update({
            imageUrl: url
          })
            .then(() => {
              loading.dismiss();
              resolve();
            })
            .catch(error => {
              console.log(error);
              loading.dismiss();
              reject(error);
            });
        })
          .catch(error => {
            console.log(error);
            loading.dismiss();
            reject(error);
          });
      });
    });
  }
}
