import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import ConfirmationPage from './pages/ConfirmationPage';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

//this is where everything runs :)
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/confirm/:title/:bookId/:price"
              element={<ConfirmationPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
