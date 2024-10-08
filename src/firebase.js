import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyC3fgkijB1D06GfxnmCGfEaV3FGenYHZTU",
  authDomain: "the-capital-hub.firebaseapp.com",
  projectId: "the-capital-hub",
  storageBucket: "the-capital-hub.appspot.com",
  messagingSenderId: "182478567082",
  appId: "1:182478567082:web:3826df607c1bd5b88942d3",
  measurementId: "G-KFPV1MRTCM",
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
export { auth, firebase };
