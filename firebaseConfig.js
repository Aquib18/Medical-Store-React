// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_BUCKET",
//   messagingSenderId: "YOUR_ID",
//   appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQaZ9Y_xQ-8vOPnVJJEAj_GpujLPAZK0Y",
  authDomain: "medical-app-6f402.firebaseapp.com",
  projectId: "medical-app-6f402",
  storageBucket: "medical-app-6f402.firebasestorage.app",
  messagingSenderId: "667055247023",
  appId: "1:667055247023:web:c3d119c9a8527e1a50ce5a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);