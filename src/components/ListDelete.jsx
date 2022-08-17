import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const ListDelete = (props) => {
  const { data, setData } = props;
  // Let's assume we already have our data and we are passing it in as
  //  props to our List component and setting our state here.
  //   const [data, setData] = useState(props.data);

  // We will handle our delete document event in this function, this is
  //  being called by the onClick property on Line 26
  const handleDelete = async (id) => {
    // We make a request to Firestore to delete a specific document by id
    await deleteDoc(doc(db, "books", id));

    // We also want to update our current state to reflect the changes
    //  we have made. We will use filter here to update our state with the
    //  item instead of making an additional/unnecessary request to Firestore.
    const newData = data.filter((item) => item.id !== id);
    console.log("NEW DATA", newData);
    // Set the data of our new updated Array and force a re-render.
    setData(newData);
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}
            <span>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDelete;
