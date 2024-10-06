import { useState } from 'react';
import LoginModal from '../components/Auth/Login/LoginModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Abrir Modal
      </button>

      {isModalOpen && <LoginModal onClose={setIsModalOpen} />}
    </div>
  );
}

export default App;
