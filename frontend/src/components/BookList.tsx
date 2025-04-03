import { useNavigate } from 'react-router-dom';
import { Book } from '../types/Book';
import { useState, useEffect } from 'react';
import { fetchBooks } from '../api/BooksAPI';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  //The different useState variables we will be using
  //Each has a default value that is only changed if the server changes it
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          sortOrder
        );

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories, sortOrder]);

  if (loading) return <p>Loading Projects...</p>;
  if (error) return <p className="test-red-500">Error: {error}</p>;

  return (
    <>
      {/* No header this time :) */}
      <h1>Prof. Hilton's Bookstore</h1>
      <label>
        {/* This label//select section lets the user change the order type between asc and desc */}
        Sort by Title:
        <div className="dropdown">
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </label>

      {/* Below here are the actual cards containing the data. Each is styled with bootstrap and contains all the necessary info */}
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: {b.author}</strong>
              </li>
              <li>
                <strong>Publisher: {b.publisher}</strong>
              </li>
              <li>
                <strong>ISBN: {b.isbn}</strong>
              </li>
              <li>
                <strong>Classification: {b.classification}</strong>
              </li>
              <li>
                <strong>Gnere: {b.category}</strong>
              </li>
              <li>
                <strong>Pages: {b.pageCount}</strong>
              </li>
              <li>
                <strong>Price: ${b.price}</strong>
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/confirm/${b.title}/${b.bookId}/${b.price}`)
              }
            >
              Add Book to Cart
            </button>
          </div>
        </div>
      ))}

      {/* Below here are the pagination buttons. The number of buttons is determined by the number of pages (calculated above)
When we are on the first page, the previous button and 1 button are disabled. The next button is disabled when we're on the 
last page */}
      <div className="btn-group btn-group-sm pagination">
        <button
          className="btn btn-danger"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {/* Looping through the number of pages to dispaly the correct number of buttons */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-info"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Below here is the dropdown for users to choose how many results to show on a given page */}
      <br />
      <div className="label">
        <label className="label-danger">
          Results per page:
          <select
            className="form-select form-select-sm"
            value={pageSize}
            onChange={(b) => {
              setPageSize(Number(b.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
}

export default BookList;
