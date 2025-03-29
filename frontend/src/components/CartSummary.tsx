import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

//This is the little guy at the top of the main page showing the cart total items and total cost
const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: '6px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
      }}
      onClick={() => navigate('/cart')}
    >
      🛒{' '}
      <strong>
        {totalQuantity} Items - ${totalAmount.toFixed(2)}
      </strong>
    </div>
  );
};

export default CartSummary;
