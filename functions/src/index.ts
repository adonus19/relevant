import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp(functions.config().firebase);

exports.processSignUp = functions.auth.user().onCreate(user => {
  if (user.email && user.email.toLocaleLowerCase() === 'testuser@test.com') {
    const customClaims = { admin: true };
    return admin.auth().setCustomUserClaims(user.uid, customClaims)
      .then(() => {
        const metadataRefresh = admin.database().ref(user.uid);
        return metadataRefresh.set({ refreshTime: new Date().getTime() });
      })
      .catch(error => {
        console.log(error);
      });
  }
  return;
});
