import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: ACCESS_TOKEN_SECRET,
    authDomain: "react-rom.firebaseapp.com",
    projectId: "react-rom",
    storageBucket: "react-rom.appspot.com",
    messagingSenderId: "523353544536",
    appId: "1:523353544536:web:111131e53d59aeca65f72d",
    measurementId: "G-W70NVGN18F"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}