import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBr7oQ3SYd1c5mcDPubBWcRNskLEk5Wq-c",
  authDomain: "react-course-b9c1b.firebaseapp.com",
  databaseURL: "https://react-course-b9c1b.firebaseio.com",
  projectId: "react-course-b9c1b",
  storageBucket: "react-course-b9c1b.appspot.com",
  messagingSenderId: "835724442889",
  appId: "1:835724442889:web:01b11708537b549984e7d8"
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(obj.title);
    let temp = {};
    obj.items.forEach((itm, idx) => {
      temp[idx] = itm;
    });
    batch.set(newDocRef, temp);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections, type) => {
  const transformedCollection = [];
  collections.forEach(function(doc) {
    let data = [];
    if (type) {
      data = Object.values(doc.data()).filter(supply => supply[type] === true);
    } else {
      data = Object.values(doc.data());
    }
    transformedCollection.push({ [doc.id]: data });
  });
  return transformedCollection;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
