import { Navbar } from "./components/Navbar";
import { Content } from "./pages/content/Content";
import "./App.css";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
