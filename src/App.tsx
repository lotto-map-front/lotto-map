import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SCRIPT_TYPE, SCRIPT_URL } from './constants/NaverMapScript';

import './App.css';

import Home from './pages/Home';
import List from './pages/List';
import MyLottoStore from './pages/MyLottoStore';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.type = SCRIPT_TYPE;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/myLottoStore" element={<MyLottoStore />} />
    </Routes>
  );
}

export default App;
