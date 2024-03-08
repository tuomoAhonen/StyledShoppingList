// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
//import {...} from 'firebase/database';
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.APIKEY,
	authDomain: process.env.AUTHDOMAIN,
	databaseURL: process.env.DATABASEURL,
	projectId: process.env.PROJECTID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGINGSENDERID,
	appId: process.env.APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
