import Nav from "./components/Nav";
import Auth from "./pages/Auth";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
        <Route path="/signin" element={<Auth />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
