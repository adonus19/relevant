import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';

import { MyApp } from './app.component';
import { SermonsPage } from '../pages/sermons/sermons';
import { EventsPage } from '../pages/events/events';
import { NotesPage } from '../pages/notes/notes';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { EventsService } from '../services/events';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { VideoService } from '../services/videos';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';
import { EventCreatePage } from '../pages/event-create/event-create';
import { FirebaseConfig } from '../../firebase-config';

firebase.initializeApp({
  apiKey: FirebaseConfig.apiKey,
  authDomain: FirebaseConfig.authDomain,
  databaseURL: FirebaseConfig.databaseURL,
  projectId: FirebaseConfig.projectId,
  storageBucket: FirebaseConfig.storageBucket,
  messagingSenderId: FirebaseConfig.messagingSenderId
})

@NgModule({
  declarations: [
    MyApp,
    SermonsPage,
    EventsPage,
    NotesPage,
    TabsPage,
    LoginPage,
    EventDetailPage,
    SignupPage,
    EventCreatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SermonsPage,
    EventsPage,
    NotesPage,
    TabsPage,
    LoginPage,
    EventDetailPage,
    SignupPage,
    EventCreatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EventsService,
    VideoService,
    AuthService,
    Camera,
    DatePicker
  ]
})
export class AppModule { }
