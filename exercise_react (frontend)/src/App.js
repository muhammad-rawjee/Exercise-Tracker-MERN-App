import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
        <header>
          <h1>Exercise Tracker</h1>
          <p>Full Stack MERN Application Demonstration</p>
        </header>
      <Navigation />
      <div className="App-header">
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>} ></Route>
          <Route path="/add-exercise" element={<AddExercisePage />}></Route>
          <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
        </div>
        <footer>
            <p>&copy; 2022 Muhammad Ali Rawjee</p>
          </footer>
      </Router>
    </div>
  );
}

export default App;