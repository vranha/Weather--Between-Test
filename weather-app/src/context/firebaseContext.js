import { createContext, useContext } from "react";
import { collection, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const firebaseContext = createContext();

export const useFirebase = () => {
    const context = useContext(firebaseContext);
    if (!context) throw new Error("There is no firebase provider");
    return context;
};

export function FirebaseProvider({ children }) {
    const databaseRef = collection(db, "weather");

    const getData = async (date, location, dataSetter) => {
        const q = query(databaseRef, where("date", "==", date), where("location.city", "==", location));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            dataSetter(
                querySnapshot.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id };
                })
            );
        });

        return unsubscribe;
    };

    const updateRain = async (id) => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(Math.floor(Math.random() * (100 - 0 + 1) + 0));
        }

        const docRef = doc(databaseRef, id);
        await updateDoc(docRef, {
            hourly_rain_chance: hours,
        });
    };

    return <firebaseContext.Provider value={{ getData, updateRain }}>{children}</firebaseContext.Provider>;
}
