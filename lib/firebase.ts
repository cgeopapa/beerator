import * as firebaseApp from "firebase-admin";
import adminAccount from './firebase.json'

if(!firebaseApp.apps.length) {
    firebaseApp.initializeApp({
        credential: firebaseApp.credential.cert({
            privateKey: adminAccount.private_key,
            clientEmail: adminAccount.client_email,
            projectId: adminAccount.project_id
        }),
        databaseURL: 'https://beerator-71150.firebaseio.com'
    })
}
export default firebaseApp.firestore();
