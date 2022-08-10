import { Routes, Route } from "react-router-dom";
// bring in the ProtectedRoute function so it can be used.
import { ProtectedRoute } from "./components/ProtectedRoute";
// bring in all of the components that can be routed to
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

// give the parameter `props` to the `Router` so it has a reference to
//   an arguments passed to it from up the chain.
const Router = (props) => {
  // In the `props` will be a property called `user` because it was sent
  //   by `onAuthStateChanged` from `App.js`. We'll capture the user by
  //   destructuring props. When you wrap it in  `{ }` you can extract
  //   any property names the same as your variable, i.e. user: user
  const { user } = props;

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        path="/Dashboard"
        // The `element` property will get the value of `ProtectedRoute`
        //   with two properties: `user` and `component`. The value of
        //   `user` will be sent to the `ProtectedRoute` function via
        //   props and read by the ternary operator (? :), and IF there
        //   is a user (`!!user`) then the `Dashboard` component will
        //   be rendered. If not `"/"` will be sent to the address bar.
        //   Thus, protecting the Dashboard.
        element={<ProtectedRoute user={user} component={Dashboard} />}
      />
    </Routes>
  );
};

export default Router;
