import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Book from './pages/Book';
import Error404 from './pages/Error404';
import './App.css';

export default function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}
