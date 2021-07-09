import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// importing components
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import useToken from "./useToken";
import Homepage from "./components/homepage/Homepage";
import Navbar from "./components/navbar/Navbar";
import CreateNewGroup from "./components/createNewGroup/CreateNewGroup";
import ViewGroup from "./components/viewGroup/ViewGroup";

export const AuthContext = React.createContext();

function App() {
  const { token, setToken, logout } = useToken();

  if (!token) {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/register" exact>
              <Register setToken={setToken} />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }
  return (
    <AuthContext.Provider value={token}>
      <Router>
        <div className="App">
          <Navbar logout={logout} />

          <Switch>
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/create-new-group" exact>
              <CreateNewGroup />
            </Route>
            <Route path="/group/:groupId" exact>
              <ViewGroup />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
