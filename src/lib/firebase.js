import firebase from 'firebase/app';
import config from '../../config';

export default function firebaseInit() {
  firebase.initializeApp(config);
}
