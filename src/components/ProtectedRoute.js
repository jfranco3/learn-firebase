// import the Navigate function to change the user's address bar
import { Navigate } from "react-router-dom";

// create a function called ProtectedRoute that will determine if a user
//  is logged in or not and serve up the component they asked for or
//  Navigate them to the Home/Login component
export const ProtectedRoute = (props) => {
  // `props` captures anything passed to this function for it's parent

  // destructure the props so the pieces can easily be referenced:
  //   `component:` will equal `Component` and `user:` will equal
  //   `user` but spread(...) the `rest` of the props out as well.
  const { component: Component, user, ...rest } = props;

  // if there is a `user` return the `Component` requested but if
  //  not (:) `Navigate` them to the Home("/")
  return !!user ? <Component {...rest} /> : <Navigate to="/" />;
};
