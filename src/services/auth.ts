import * as firebase from 'firebase/app';
import 'firebase/auth';

export class AuthService {
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  getActiveUser() {
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser;
    }
  }

  isAdmin() {
    return this.getActiveUser().getIdTokenResult();
  }
}
