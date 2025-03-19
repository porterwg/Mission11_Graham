using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult GetAllBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            //In order to sort the books on the frontend, we have to return queryable data
            //Then we sort the data according to sortOrder (either asc or desc)
            var query = _context.Books.AsQueryable();

            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(x => x.Title);
            }
            else
            {
                    query = query.OrderBy(x => x.Title);
            }
            
            //After the data is sorted, we skip the number indicated by pageNum and return the number of records
            //indicated by pageSize
            var package = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            //Just the total count of books so we know how many pages we need
            var totalNumBooks = _context.Books.Count();

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
    }
}
