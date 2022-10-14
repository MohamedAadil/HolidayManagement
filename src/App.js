import React from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';

import Holidays from './pages/holidays';
import AddHoliday from './pages/addHoliday';
import EditHoliday from './pages/editHoliday';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/add-holiday" element={<AddHoliday/>} />
          <Route path="/edit-holiday/:id" element={<EditHoliday/>} />
          <Route path="/" element={<Holidays/>} />
      </Routes>
    </Router>
  );
}

export default App;
