import { Routes, Route } from 'react-router-dom';
import CountDownTimer from './components/CountDown';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CountDownTimer />} />
    </Routes>
  )
}