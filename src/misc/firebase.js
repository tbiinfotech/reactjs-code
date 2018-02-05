import firebase from 'firebase'
import config from '../config.js'

firebase.initializeApp(config.environments[config.environment].firebase);
firebase.auth().useDeviceLanguage()
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {});

export default firebase