using System.ComponentModel.DataAnnotations;

namespace Mission11_Graham.Data;
//Built to model the database. All fields are required. Price shows up as a 'REAL' in sqlite, so we 
//use double because that's the best comparison

public class Book
{
    [Key]
    public int BookId { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string Author { get; set; }
    
    [Required]
    public string Publisher { get; set; }
    
    [Required]
    public string ISBN { get; set; }
    
    [Required]
    public string Classification { get; set; }
    
    [Required]
    public string Category { get; set; }
    
    [Required]
    public int PageCount { get; set; }
    
    [Required]
    public double Price { get; set; }
}