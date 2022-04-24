import { Navbar } from "./components/Navbar";
import { Content } from "./pages/content/Content";
import "./App.css";
import { Footer } from "./components/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Login } from "./pages/login/Login";
import { useToggle } from "./hooks/index";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [admin, toggleAdmin] = useToggle(false);
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Navbar user={user} toggleAdmin={toggleAdmin} />
                  <Content admin={admin} />
                  <Footer />{" "}
                </>
              }
            />
            <Route
              path="/admin"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
