// Added quantity so we can display that in the cart -- only cart items have a quantity tho, not books
export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
}
