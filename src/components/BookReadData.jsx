import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BookReadData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCollection = async () => {
      const ref = collection(db, "books");
      let { docs } = await getDocs(ref);
      let list = [];
      docs.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData(list);
    };

    getCollection();
  }, []);

  // We're using useEffect here so we can monitor any changes
  //  made to our 'data' state
  useEffect(() => {
    console.log("effect:", data);
  }, [data]); // data inside our dependency array

  return <div>This is the listing page</div>;
};

export default BookReadData;
