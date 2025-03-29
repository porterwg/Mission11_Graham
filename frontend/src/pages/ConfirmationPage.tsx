import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';
import { CartItem } from '../types/CartItem';

//A little page in between the main page and the cart to make sure the customer actually wants to add the item to the cart
function ConfirmationPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No title found',
      price: Number(price),
      quantity: 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Add {title} to Cart?</h2>

      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <div>
        <button onClick={() => navigate('/books')}>Go Back to Browse</button>
      </div>
    </>
  );
}

export default ConfirmationPage;
