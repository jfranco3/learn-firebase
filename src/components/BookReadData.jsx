import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ListDelete from "./ListDelete";

const BookReadData = () => {
  const [data, setData] = useState([]);

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
    console.log("books", data);
  }, [data]);

  return (
    <div>
      This book page
      <ListDelete data={data} setData={setData} />
    </div>
  );
};

export default BookReadData;
