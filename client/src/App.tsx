import Nav from "./components/Nav";
import Auth from "./pages/Auth";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Links from "./pages/Links";

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/signin" element={<Auth />}></Route>
        <Route path="/links" element={<Links />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
