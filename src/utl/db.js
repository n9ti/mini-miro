import firebase from "firebase/app";
import "firebase/database";

export const db = firebase
  .initializeApp({ databaseURL: "https://mini-miro.firebaseio.com/" })
  .database();
