import { useEffect, useState, useReducer } from "react";

import { db } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
let initialState = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, succes: false, error: false };
    case "ERROR":
      return {
        isPending: false,
        error: action.payload,
        succes: false,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        succes: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        succes: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        succes: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (whichCollection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  //collection ref

  const ref = collection(db, whichCollection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add documentn
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = await addDoc(ref, { ...doc });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const updateDocument = async (id, upDoc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docRef = doc(db, whichCollection, id);
      const updatedDocument = await updateDoc(docRef, { ...upDoc });
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docRef = doc(db, whichCollection, id);
      await deleteDoc(docRef);
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return { addDocument, deleteDocument, updateDocument, response };
};
