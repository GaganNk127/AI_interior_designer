import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from './getUserInfo';

export const useAddResponses = () => {
  const { userID } = useGetUserInfo();
  const responsesCollectionRef = collection(db, "responses");

  const addResponses = async ({ responses }) => {
    await addDoc(responsesCollectionRef, {
      userID,
      responses,
      date: serverTimestamp(), // ✅ This will store a proper Firestore Timestamp
    });
  };

  return { addResponses };
};
