import { useNavigate } from 'react-router-dom';
import { Book } from '../types/Book';
import { useState, useEffect } from 'react';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  //The different useState variables we will be using
  //Each has a default value that is only changed if the server changes it
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    //async and await sit and wait for changes to happen to the server
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      //The url below needs to contain the different parameters we want to specify to the controller
      //i.e. how many cards to display at a time, how many pages we need, and whether we're sorting asc or desc
      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };
    fetchBooks();
    //The values in this array are what the page will receive if fetchBooks returns nothing (that's what I understand :))
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <>
      {/* No header this time :) */}
      <h1>Prof. Hilton's Bookstore</h1>
      <label>
        {/* This label//select section lets the user change the order type between asc and desc */}
        Sort by Title:
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
              onClick={() => navigate(`/confirm/${b.title}/${b.bookId}`)}
            >
              Add Book to Cart
            </button>
          </div>
        </div>
      ))}

      {/* Below here are the pagination buttons. The number of buttons is determined by the number of pages (calculated above)
When we are on the first page, the previous button and 1 button are disabled. The next button is disabled when we're on the 
last page */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/* Looping through the number of pages to dispaly the correct number of buttons */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key="{index + 1}"
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      {/* Below here is the dropdown for users to choose how many results to show on a given page */}
      <br />
      <label>
        Results per page:
        <select
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
    </>
  );
}

export default BookList;
