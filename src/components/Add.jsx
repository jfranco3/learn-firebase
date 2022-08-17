import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./../firebaseConfig";

const Add = () => {
  // Make sure you implement some state to keep track of your inputs.
  const [body, setBody] = useState({
    title: "",
    author: "",
    // publish_date:'',
    characters: [],
  });

  // This state below is in charge with helping with the 'characters'
  // array in our body. Keep in mind we have a 'body.characters' array
  // and 'character' string, these are both different. This state below
  // is simply a placeholder for our character input which we push to
  // the 'body' state, shown a little later...
  const [character, setCharacter] = useState("");

  // This event handler function will allow us to "push" a string to our
  // characters array inside our body.
  const addToArrayHandler = () => {
    // Copy current state and assign object to a variable "newBody"
    const newBody = { ...body };
    // Push new character into newBody.characters array
    newBody.characters.push(character);
    // Set our "body" state with our "newBody" object we created with
    // our new data.
    setBody(newBody);
    // Set the character state to an empty string to await another input
    setCharacter("");
  };

  // Finally we have the 'submit' function which add the document to our
  // FireStore collection
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(body);
    const ref = collection(db, "books");
    // We will use a try/catch block here in case we run into any errors
    try {
      await addDoc(ref, {
        ...body,
        // overwrite our "publish_date" as a FireStore Timestamp

        // publish_date: Timestamp.fromDate(new Date(body.publish_date))
      });
    } catch (error) {
      console.log(error);
    }
    // Reset state to it's initial state if we want to add a different
    // input after
    setBody({ title: "", author: "", publish_date: "", characters: [] });
  };

  // We're using useEffect here so we can monitor any changes made to our
  // 'body' state
  useEffect(() => {
    console.log("effect:", body);
  }, [body]); // body inside our dependency array

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={body.title}
        onChange={(e) => {
          setBody({ ...body, title: e.target.value });
        }}
      />
      <input
        type="text"
        value={body.author}
        onChange={(e) => {
          setBody({ ...body, author: e.target.value });
        }}
      />
      <input
        type="date"
        value={body.publish_date}
        onChange={(e) => {
          setBody({ ...body, publish_date: e.target.value });
        }}
      />
      {/* This will list out any added characters in your body separated by
    a comma and a space. */}
      <p>Currently added Characters: {body.characters.join(", ")}</p>
      <span>
        <input
          type="text"
          value={character}
          onChange={(e) => {
            setCharacter(e.target.value);
          }}
        />
        <button type="button" onClick={addToArrayHandler}>
          Add
        </button>
      </span>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Add;
