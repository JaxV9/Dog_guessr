import React from 'react';
import './App.css';
import FetchDog from './components/FetchDog/FetchDog';
import Breeds from './components/Breeds';
import Scores from './components/Scores';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
   
        </header>
        
        <Routes>
          <Route path="/" element={<FetchDog />}>
          </Route>

          <Route path="/breed" element={<Breeds />}>
          </Route>
          
          <Route path="/dashboard" element={<Scores />}>
            
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;