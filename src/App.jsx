import { Routes, Route } from 'react-router-dom';
import CountDownTimer from './components/CountDown';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CountDownTimer />} />
    </Routes>
  )
}

export default App
