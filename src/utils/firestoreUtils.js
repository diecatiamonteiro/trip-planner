import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export const saveTrip = async (userId, tripData, tripId = null) => {
  const tripsRef = collection(db, "users", userId, "trips");
  
  if (tripId) {
    await setDoc(doc(tripsRef, tripId), tripData);
    return tripId;
  } else {
    const docRef = await addDoc(tripsRef, tripData);
    return docRef.id;
  }
};

export const getUserTrips = async (userId) => {
  const tripsRef = collection(db, "users", userId, "trips");
  const querySnapshot = await getDocs(tripsRef);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteTrip = async (userId, tripId) => {
  const tripRef = doc(db, "users", userId, "trips", tripId);
  await deleteDoc(tripRef);
}; 