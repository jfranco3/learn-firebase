import React, { useState, useEffect } from "react"; // import firebase dependency
import { auth } from "./firebaseConfig"; // credentials provided by firebaseConfig file from above
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Router from "./Router";
import Add from "./components/Add";
import BookReadData from "./components/BookReadData";
import { functions } from "./firebaseConfig";
import { httpsCallable } from "firebase/functions";

const createRole = async (userCredential, userRole) => {
  // `httpsCallable()` takes in our functions config and the name
  //   of the function in our `functions/index.js` we want to call.
  //    It then returns a function for us to use.
  const addAdminRole = httpsCallable(functions, "addAdminRole");
  const email = userCredential?.user.email;
  const uid = userCredential?.user.uid;
  const role = userRole;
  // Our Serverless cloud function we made expects an object
  //   with the user `id` the users email and the role they will be assigned
  const result = await addAdminRole({ uid, email, role });
  console.log("result", result);
};

function App() {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");

  const register = async (event) => {
    event.preventDefault();
    try {
      // TRY CATCH MUST BE USED ASYNC/AWAIT WHEN WORKING WITH FIREBASE
      const user = await createUserWithEmailAndPassword(
        auth,
        registeredEmail,
        registeredPassword
      );
      console.log(user);
      createRole(user, "teacher");
    } catch (error) {
      // Give the user indication they need to try again and why
      // INVALID EMAIL
      // MISSING PASSWORD
      console.log(error.message);
      clearForm();
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // clear the form inputs
  const clearForm = () => {
    setRegisteredEmail("");
    setRegisteredPassword("");
  };

  console.log("auth.currentUser", auth.currentUser);

  return (
    <div>
      <h3> Register User </h3>
      <form id="user-form" onSubmit={register}>
        <input
          value={registeredEmail}
          placeholder="Email..."
          onChange={(event) => {
            setRegisteredEmail(event.target.value);
          }}
        />
        <input
          value={registeredPassword}
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setRegisteredPassword(event.target.value);
          }}
        />
        <input type="submit" placeholder="User Name" />
        <button onClick={logout}> Sign Out </button>
      </form>
    </div>
  );
}

export default App;
