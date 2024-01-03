import { FC, ReactElement, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import userManager, {
  signInRedirect,
  signOutRedirect,
} from "./auth/user-service";
import AuthProvider from "./auth/auth-provider";
import SignInOidc from "./auth/SignInOidc";
import SignOutOidc from "./auth/SignOutOidc";
import NoteList from "./components/NoteComponents/NoteList/NoteList";
import { AuthContext } from "./context/auth-context";
import { Button, Navbar } from "react-bootstrap";
import NoteCreateModal from "./components/ModalComponents/CreateModal/NoteCreateModal";

const App: FC<{}> = (): ReactElement => {
  const [userName, setUser] = useState("");

  return (
    <AuthContext.Provider value={{ userName, setUser }}>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Dark Note</span>
          {userName ? (
            <button
              className="btn btn-outline-success"
              onClick={signOutRedirect}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-outline-success"
              onClick={signInRedirect}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {userName ? (
        <div className="container my-5">
          <AuthProvider userManager={userManager}>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={<NoteList userName={userName}></NoteList>}
                />
                <Route path="/signout-oidc" Component={SignOutOidc} />
              </Routes>
            </Router>
          </AuthProvider>
        </div>
      ) : (
        <div className="container text-center my-5 d-flex flex-column flex-grow-1 justify-content-center">
          <h1>Welcome to Dark Notes!</h1>
          <AuthProvider userManager={userManager}>
            <Router>
              <Routes>
                <Route path="/signin-oidc" Component={SignInOidc} />
              </Routes>
            </Router>
          </AuthProvider>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default App;
