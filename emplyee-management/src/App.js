import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Components/navbar.component'
import EmployeeList from './Components/employee-list.component'
import CreateEmployee from "./Components/create-employee";
import UpdateEmployee from "./Components/update-employee";

function App() {
  return (
      <Router>
          <div className="container">
          <Navbar />
          <Routes>


              <Route path="/" element={<EmployeeList />} />
              <Route path="/create_employees" element={<CreateEmployee />} />
              <Route path="/update_employees/:id" element={<UpdateEmployee />} />

          </Routes>
          </div>
      </Router>
  );
}

export default App;
