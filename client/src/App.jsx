import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Todolist from "./pages/Todolist";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AuthProvider from "./Provider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/todolist" element={<Todolist />} />
          </Route>
          <Route path="*" element={<>Page Not Found</>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
