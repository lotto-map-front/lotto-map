import './App.css';
import { Route, Routes } from 'react-router-dom';

import DrawNumber from './pages/DrawNumber';
import Home from './pages/Home';
import List from './pages/List';
import MyLottoStore from './pages/MyLottoStore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/myLottoStore" element={<MyLottoStore />} />
      <Route path="/drawNumber" element={<DrawNumber />} />
    </Routes>
  );
}

export default App;
