import React, { useState, useEffect } from "react"; // import firebase dependency
import auth from "./firebaseConfig"; // credentials provided by firebaseConfig file from above
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Router from "./Router";

function App() {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [user, setUser] = useState({});

  const register = async (events) => {
    events.preventDefault();
    try {
      // TRY CATCH MUST BE USED ASYNC/AWAIT WHEN WORKING WITH FIREBASE
      const user = await createUserWithEmailAndPassword(
        auth,
        registeredEmail,
        registeredPassword
      );
      console.log(user);
    } catch (error) {
      // Give the user indication they need to try again and why
      // INVALID EMAIL
      // MISSING PASSWORD
      console.log(error.message);
    }
    clearForm();
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
      setUser(currentUser);
    });

    console.log("auth.currentUser", auth.currentUser);

    return unsubscribe;
    // We only want 1 instance of the user connected to
    //  the database this cleans up and disconnects the
    //  observer function when component is unmounted.
  }, []);

  return (
    <div>
      <Router user={user} />
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
