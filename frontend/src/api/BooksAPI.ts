import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const api_url = `https://localhost:5000/api/Book`;

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sortOrder: string
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${api_url}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${api_url}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${api_url}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book', error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${api_url}/DeleteBook/${bookId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book', error);
  }
};
