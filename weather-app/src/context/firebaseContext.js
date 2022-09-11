import { createContext, useContext, useEffect, useState } from "react";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    setDoc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export const firebaseContext = createContext();

export const useFirebase = () => {
    const context = useContext(firebaseContext);
    if (!context) throw new Error("There is no firebase provider");
    return context;
};

export function FirebaseProvider({ children }) {

    const databaseRef = collection(db, "weather");

    const getData = async (date, location, setter) => {
        const q = query(databaseRef, where('date', '==', date ), where('location.city', '==', location));
        // const myDocs = await getDocs(q)
        const unsubscribe = onSnapshot(q, (querySnapshot) => {  // onSnapshot es para hacer la base de datos en tiempo real
            setter(
                querySnapshot.docs.map((doc) => {
                    return doc.data();
                })
            );
        });

        return unsubscribe;
    };
    

    return (
        <firebaseContext.Provider value={{ getData }}>
            {children}
        </firebaseContext.Provider>
    );
}
