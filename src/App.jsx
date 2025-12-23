import { Route, Routes } from "react-router-dom";
import Login from "./components/login/index.jsx";
import Home from "./components/Home/index.jsx";
import Jobs from "./components/Jobs/index.jsx";
import ProtectedRoute from "./components/Protected_route/index.jsx";
import JobDetailed from "./components/detailed_job/index.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/:id"
          element={
            <ProtectedRoute>
              <JobDetailed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
