import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Slider from './components/Slider';
import AlienExplorer from './components/AlienExplorer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <AlienExplorer />
      <Slider />
    </div>
  );
}

export default App;
