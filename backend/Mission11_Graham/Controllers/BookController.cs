using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Mission11_Graham.Data;

namespace Mission11_Graham.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        //Creating our dbcontext instance
        private BookDbContext _context;

        public BookController(BookDbContext temp) => _context = temp;

        //Action that receives the parameters pageSize, pageNum, sortOrder and returns all the information accordingly
        //This json is sent to localhost:5000/api/Book/AllBooks because of the HttpGet tag we have below
        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "", [FromQuery] List<string>? bookTypes = null)
        {
            //In order to sort the books on the frontend, we have to return queryable data
            //Then we sort the data according to sortOrder (either asc or desc)
            var query = _context.Books.AsQueryable();

            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(x => x.Title);
            }
            else if (sortOrder.ToLower() == "asc")
            {
                    query = query.OrderBy(x => x.Title);
            }

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            //Just the total count of books so we know how many pages we need
            var totalNumBooks = query.Count();
            
            //After the data is sorted, we skip the number indicated by pageNum and return the number of records
            //indicated by pageSize
            var package = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            //We have to wrap the info together to be able to return it (we can technically only return
            //one thing, so we put them into one object
            var someObject = new
            {
                Books = package,
                TotalNumBooks = totalNumBooks
            };

            //Have to add ok so server doesn't freak out :)
            return Ok(someObject);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();
            
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
