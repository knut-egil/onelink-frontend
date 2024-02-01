import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import UserDto from "./models/UserDto";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState<UserDto>();

  /**
   * Handle successful user login
   * @param user
   */
  function onLoggedIn(user: UserDto) {
    // Set user
    setUser(user);
  }
  /**
   * Handle successful user registration
   * @param user
   */
  function onRegistered(user: UserDto) {
    // Set user
    setUser(user);
  }

  return (
    <>
      <UserContext.Provider
        value={{
          user: user,
          logout() {
            setUser(undefined);
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Landing />} />
            <Route
              path="/register"
              element={<Register onRegistered={onRegistered} />}
            />
            <Route path="/login" element={<Login onLoggedIn={onLoggedIn} />} />
            <Route path="/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
