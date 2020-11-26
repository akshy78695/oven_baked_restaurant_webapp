import { createStore, combineReducers, compose } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import alertReducer from "./components/reducers/alertReducer";
import toastReducer from "./components/reducers/toastReducer";
import cartReducer from "./components/reducers/cartReducer";
import helperReducer from "./components/reducers/helperReducer";

const firebaseConfig = {
    apiKey: "AIzaSyCmnuKn_XoTFzM6pQoDOc4TUFHyyYkc7h0",
    authDomain: "oven-baked-pizza-store.firebaseapp.com",
    databaseURL: "https://oven-baked-pizza-store.firebaseio.com",
    projectId: "oven-baked-pizza-store",
    storageBucket: "oven-baked-pizza-store.appspot.com",
    messagingSenderId: "273426250222",
    appId: "1:273426250222:web:268431eee2d61cab8576ff",
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// initialize firestore instance
export const db = firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    alert: alertReducer,
    toast: toastReducer,
    cart: cartReducer,
    helper: helperReducer,
});

const initialState = {};
const store = createStore(
    rootReducer,
    initialState,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};

export default store;
