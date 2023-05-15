import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {

 
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);



