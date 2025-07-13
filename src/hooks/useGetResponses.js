import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useGetUserInfo } from "./getUserInfo";

export const useGetResponses = () => {
  const [responses, setresponses] = useState([]);
  const { userID } = useGetUserInfo();
  console.log("Current userID:", userID);

  useEffect(() => {
    if (!userID) return;

    const responsesRef = collection(db, "responses");

    const q = query(
      responsesRef,
      where("userID", "==", userID),
      orderBy("date", "desc") // ✅ Use correct field: "date"
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setresponses(data);
    });

    return () => unsubscribe();
  }, [userID]);

  return { responses };
};
