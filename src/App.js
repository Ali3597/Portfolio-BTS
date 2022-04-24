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
                  <Navbar user={user} />
                  <Content />
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
