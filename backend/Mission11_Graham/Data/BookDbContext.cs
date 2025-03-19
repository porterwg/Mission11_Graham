using Microsoft.EntityFrameworkCore;

namespace Mission11_Graham.Data;

//Creating bookDbContext that inherits from DbContext
public class BookDbContext: DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }
}