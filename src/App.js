import React, { useState } from 'react';
import SegmentModal from './Components/SegmentModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <button onClick={openModal}>Save segment</button>
      {isModalOpen && <SegmentModal closeModal={closeModal} />}
    </div>
  );
}

export default App;
